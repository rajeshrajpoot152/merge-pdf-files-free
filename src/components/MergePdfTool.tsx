'use client';

import React, { useState, useRef } from 'react';

interface UploadedPdf {
  id: string;
  file: File;
  name: string;
  size: string;
}

interface MergePdfToolProps {
  heroTitle?: string;
  heroLead?: string;
}

export default function MergePdfTool({
  heroTitle = 'Merge PDF Files Free Online',
  heroLead = 'Combine multiple documents into one single PDF in seconds. 100% private in-browser processing — your files never touch any server.',
}: MergePdfToolProps) {
  const [files, setFiles] = useState<UploadedPdf[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFiles = (incomingFiles: FileList | null) => {
    if (!incomingFiles) return;
    const pdfs: UploadedPdf[] = [];
    for (let i = 0; i < incomingFiles.length; i++) {
      const f = incomingFiles[i];
      if (f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf')) {
        pdfs.push({
          id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          file: f,
          name: f.name,
          size: formatSize(f.size),
        });
      }
    }
    setFiles((prev) => [...prev, ...pdfs]);
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    setFiles((prev) => {
      const updated = [...prev];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= updated.length) return prev;
      const temp = updated[index];
      updated[index] = updated[targetIndex];
      updated[targetIndex] = temp;
      return updated;
    });
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((item) => item.id !== id));
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      alert('Please select at least 2 PDF files to merge!');
      return;
    }

    setIsProcessing(true);
    setStatusMessage('Merging your files locally... almost done! 🚀');

    try {
      const { PDFDocument } = await import('pdf-lib');
      const mergedPdf = await PDFDocument.create();

      for (const item of files) {
        const arrayBuffer = await item.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'merged_mergepdffilesfree.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setStatusMessage('Success! Your unified PDF has been downloaded. 🎉');
    } catch (err) {
      console.error('Merge Error:', err);
      setStatusMessage('Error merging files. Please verify that files are valid and not password-protected.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section aria-label="PDF Merge Tool Workspace">
      {/* Hero Headline */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {heroTitle}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
          {heroLead}
        </p>
      </div>

      {/* Above-the-fold Drag & Drop Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 mb-8">
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragOver(false);
            handleFiles(e.dataTransfer.files);
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`cursor-pointer rounded-xl border-2 border-dashed p-8 sm:p-12 text-center transition-all duration-200 flex flex-col items-center justify-center min-h-[200px] ${
            isDragOver
              ? 'border-blue-500 bg-blue-50/60 scale-[0.99]'
              : 'border-slate-300 hover:border-blue-400 bg-slate-50/70 hover:bg-blue-50/30'
          }`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click();
          }}
          aria-label="Upload PDF Files Dropzone"
        >
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-3 shadow-xs">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <p className="text-base sm:text-lg font-bold text-slate-800">
            Drop your PDFs right here! 🎯
          </p>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            or <span className="text-blue-600 font-bold hover:underline">browse files</span> from your device
          </p>
          <span className="inline-block mt-3 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            🔒 100% In-Browser Privacy • Zero Server Uploads
          </span>
        </div>

        {/* Uploaded File Queue */}
        {files.length > 0 && (
          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider pb-2 border-b border-slate-100">
              <span>{files.length} Document{files.length > 1 ? 's' : ''} in Queue</span>
              <button
                type="button"
                onClick={() => setFiles([])}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                Clear All
              </button>
            </div>

            <ul className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
              {files.map((item, idx) => (
                <li key={item.id} className="py-2.5 flex items-center justify-between gap-3 text-sm">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-6 h-6 rounded bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="truncate font-medium text-slate-800 max-w-[200px] sm:max-w-md">
                      {item.name}
                    </span>
                    <span className="text-xs text-slate-400 shrink-0">({item.size})</span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveFile(idx, 'up')}
                      className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30"
                      title="Move Up"
                      aria-label="Move file up"
                    >
                      ▲
                    </button>
                    <button
                      type="button"
                      disabled={idx === files.length - 1}
                      onClick={() => moveFile(idx, 'down')}
                      className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30"
                      title="Move Down"
                      aria-label="Move file down"
                    >
                      ▼
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFile(item.id)}
                      className="p-1 rounded text-red-500 hover:bg-red-50 ml-1"
                      title="Delete"
                      aria-label="Remove file"
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Merge Action CTA */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors"
              >
                + Add More Files
              </button>

              <button
                type="button"
                disabled={isProcessing || files.length < 2}
                onClick={handleMerge}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>Merging locally...</span>
                  </>
                ) : (
                  <span>Merge PDF Files &rarr;</span>
                )}
              </button>
            </div>

            {statusMessage && (
              <p className="text-center text-xs font-semibold text-blue-700 mt-2">
                {statusMessage}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
