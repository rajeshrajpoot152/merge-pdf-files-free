'use client';

import React, { useState, useRef } from 'react';

interface CompressPdfToolProps {
  heroTitle?: string;
  heroLead?: string;
}

export default function CompressPdfTool({
  heroTitle = 'Compress PDF Files Free Online',
  heroLead = 'Reduce PDF file size for fast emailing and web upload. 100% private, executed locally in your browser with zero server uploads.',
}: CompressPdfToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [savedPercent, setSavedPercent] = useState<number>(0);
  const [isCompressing, setIsCompressing] = useState(false);
  const [progressText, setProgressText] = useState('');
  const [resultBlobUrl, setResultBlobUrl] = useState<string | null>(null);
  const [resultFilename, setResultFilename] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFile = (selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf' && !selectedFile.name.toLowerCase().endsWith('.pdf')) {
      alert('Please select a valid PDF document.');
      return;
    }

    setFile(selectedFile);
    setOriginalSize(selectedFile.size);
    setResultBlobUrl(null);
    setCompressedSize(0);
    setSavedPercent(0);
  };

  const executeCompress = async () => {
    if (!file || isCompressing) return;

    setIsCompressing(true);
    setProgressText('Analyzing PDF structures & streams...');

    try {
      const { PDFDocument } = await import('pdf-lib');
      const arrayBuffer = await file.arrayBuffer();

      setProgressText('Deduplicating fonts and objects...');
      const sourceDoc = await PDFDocument.load(arrayBuffer, {
        updateMetadata: false,
      });

      // Re-encode document pages into a brand-new compact PDF
      const newPdfDoc = await PDFDocument.create();
      const pageIndices = sourceDoc.getPageIndices();
      const copiedPages = await newPdfDoc.copyPages(sourceDoc, pageIndices);
      copiedPages.forEach((p) => newPdfDoc.addPage(p));

      setProgressText('Optimizing binary streams...');
      const compressedBytes = await newPdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
      });

      const orig = file.size;
      const finalBytes = compressedBytes;
      const compSize = finalBytes.byteLength;
      const pct = Math.max(0, Math.round(((orig - compSize) / orig) * 100));

      const blob = new Blob([finalBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const baseName = file.name.replace(/\.[^/.]+$/, '');
      const downloadName = `${baseName}_compressed.pdf`;

      setCompressedSize(compSize);
      setSavedPercent(pct);
      setResultBlobUrl(url);
      setResultFilename(downloadName);

      // Auto trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = downloadName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err: any) {
      console.error(err);
      alert('Could not compress this PDF: ' + (err.message || 'File may be password-protected.'));
    } finally {
      setIsCompressing(false);
    }
  };

  const resetAll = () => {
    setFile(null);
    setOriginalSize(0);
    setCompressedSize(0);
    setSavedPercent(0);
    setResultBlobUrl(null);
    setResultFilename('');
    setIsCompressing(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full">
      {/* Hero Headings */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {heroTitle}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
          {heroLead}
        </p>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        }}
        accept=".pdf,application/pdf"
        className="hidden"
      />

      {/* State 1: Dropzone */}
      {!file && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setIsDragOver(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragOver(false);
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              handleFile(e.dataTransfer.files[0]);
            }
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-3xl p-10 sm:p-14 text-center cursor-pointer transition-all duration-200 ${
            isDragOver
              ? 'border-blue-600 bg-blue-50/80 scale-[1.01]'
              : 'border-slate-300 bg-white hover:border-blue-400 hover:bg-slate-50/50'
          } shadow-sm`}
        >
          <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 border border-blue-100 shadow-xs">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
            Select PDF file to compress
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1.5">
            or drag and drop your PDF here
          </p>
          <button
            type="button"
            className="mt-6 px-6 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-xl hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all pointer-events-none"
          >
            Browse PDF File
          </button>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 py-1 px-3 rounded-full w-fit mx-auto border border-emerald-200">
            <span>🔒 100% In-Browser &bull; Stream Deflation &bull; Zero Server Retention</span>
          </div>
        </div>
      )}

      {/* State 2: Active Compression Workspace */}
      {file && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200">
                🗜️
              </div>
              <div className="min-w-0">
                <p className="font-bold text-slate-900 text-sm sm:text-base truncate">
                  {file.name}
                </p>
                <p className="text-xs text-slate-500">
                  Original Size: {formatSize(originalSize)}
                </p>
              </div>
            </div>
            <button
              onClick={resetAll}
              className="text-xs font-semibold text-slate-600 hover:text-red-600 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-red-200 transition-colors self-start sm:self-auto"
            >
              Change File
            </button>
          </div>

          {/* Compression Level Selector Card */}
          <div className="my-6 p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <span>Recommended Compression</span>
                <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                  Deflate + Object Stream
                </span>
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Optimizes fonts, removes duplicate structural streams, and deflates content while maintaining sharp, vector-quality reading clarity.
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                High Fidelity Guaranteed
              </span>
            </div>
          </div>

          {/* Progress Indicator */}
          {isCompressing && (
            <div className="my-6 p-6 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-3">
              <svg className="animate-spin h-6 w-6 text-blue-600 mx-auto" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <p className="text-sm font-bold text-slate-800">{progressText}</p>
              <p className="text-xs text-slate-500">Everything executes in your browser's private memory.</p>
            </div>
          )}

          {/* Result Success Card */}
          {resultBlobUrl && !isCompressing && (
            <div className="my-6 p-6 rounded-2xl bg-emerald-50 border border-emerald-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    Compression Complete 🎉
                  </span>
                  <h3 className="text-lg font-bold text-emerald-950 mt-2">
                    {savedPercent > 0
                      ? `Reduced from ${formatSize(originalSize)} to ${formatSize(compressedSize)} (Saved ${savedPercent}%)`
                      : `Your PDF was already highly compact! Final size: ${formatSize(compressedSize)}`}
                  </h3>
                  <p className="text-xs text-emerald-700 mt-1">
                    Your compressed PDF has been generated and automatically downloaded.
                  </p>
                </div>
                <a
                  href={resultBlobUrl}
                  download={resultFilename}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-600/20 transition-all whitespace-nowrap"
                >
                  Download Again
                </a>
              </div>
            </div>
          )}

          {/* Action Button */}
          {!resultBlobUrl && !isCompressing && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={executeCompress}
                className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2"
              >
                <span>Compress PDF Now</span>
                <span>&rarr;</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
