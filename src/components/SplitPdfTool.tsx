'use client';

import React, { useState, useRef } from 'react';

interface SplitPdfToolProps {
  heroTitle?: string;
  heroLead?: string;
}

export default function SplitPdfTool({
  heroTitle = 'Split PDF Files Free Online',
  heroLead = 'Extract specific pages or separate every single page into separate documents instantly. 100% private with zero server uploads.',
}: SplitPdfToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [activeMode, setActiveMode] = useState<'range' | 'extract' | 'all'>('range');
  const [rangeInput, setRangeInput] = useState('');
  const [mergeRanges, setMergeRanges] = useState(true);
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressText, setProgressText] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);
  const [resultBlobUrl, setResultBlobUrl] = useState<string | null>(null);
  const [resultFilename, setResultFilename] = useState('');
  const [resultSummary, setResultSummary] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileSelect = async (selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf' && !selectedFile.name.toLowerCase().endsWith('.pdf')) {
      alert('Please select a valid PDF file.');
      return;
    }

    try {
      setIsProcessing(true);
      setProgressText('Reading PDF document...');
      setProgressPercent(30);

      const arrayBuffer = await selectedFile.arrayBuffer();
      const { PDFDocument } = await import('pdf-lib');
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const count = pdfDoc.getPageCount();

      setFile(selectedFile);
      setTotalPages(count);
      setRangeInput(`1-${Math.min(count, 3)}`);
      setSelectedPages(new Set([1]));
      setIsProcessing(false);
      setProgressPercent(0);
      setResultBlobUrl(null);
    } catch (err: any) {
      console.error(err);
      setIsProcessing(false);
      alert('Failed to read PDF file: ' + (err.message || 'File might be protected.'));
    }
  };

  const parseRanges = (str: string, max: number) => {
    const parts = str.split(',').map((s) => s.trim()).filter(Boolean);
    const ranges: { label: string; pages: number[] }[] = [];

    for (const part of parts) {
      if (part.includes('-')) {
        const [startStr, endStr] = part.split('-');
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        if (isNaN(start) || isNaN(end) || start < 1 || end > max || start > end) {
          throw new Error(`Invalid range "${part}". Must be numbers between 1 and ${max}.`);
        }
        const pages: number[] = [];
        for (let p = start; p <= end; p++) pages.push(p - 1);
        ranges.push({ label: `${start}-${end}`, pages });
      } else {
        const p = parseInt(part, 10);
        if (isNaN(p) || p < 1 || p > max) {
          throw new Error(`Invalid page number "${part}". Must be between 1 and ${max}.`);
        }
        ranges.push({ label: `page_${p}`, pages: [p - 1] });
      }
    }

    if (ranges.length === 0) {
      throw new Error('Please enter at least one valid range or page number.');
    }

    return ranges;
  };

  const executeSplit = async () => {
    if (!file || totalPages === 0 || isProcessing) return;

    setIsProcessing(true);
    setProgressPercent(15);
    setProgressText('Processing PDF...');

    try {
      const { PDFDocument } = await import('pdf-lib');
      const baseName = file.name.replace(/\.[^/.]+$/, '');
      const arrayBuffer = await file.arrayBuffer();
      const sourceDoc = await PDFDocument.load(arrayBuffer);

      if (activeMode === 'range') {
        const ranges = parseRanges(rangeInput, totalPages);

        if (mergeRanges) {
          setProgressText('Combining selected ranges into single PDF...');
          setProgressPercent(50);
          const newDoc = await PDFDocument.create();

          for (const r of ranges) {
            const copiedPages = await newDoc.copyPages(sourceDoc, r.pages);
            copiedPages.forEach((p) => newDoc.addPage(p));
          }

          const pdfBytes = await newDoc.save();
          const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          const filename = `${baseName}_ranges.pdf`;

          setResultBlobUrl(url);
          setResultFilename(filename);
          setResultSummary(`Combined ${ranges.reduce((acc, r) => acc + r.pages.length, 0)} pages from ranges into 1 PDF.`);
          triggerAutoDownload(url, filename);
        } else {
          setProgressText('Bundling separate range PDFs into ZIP...');
          setProgressPercent(30);
          const JSZip = (await import('jszip')).default;
          const zip = new JSZip();

          for (let i = 0; i < ranges.length; i++) {
            const r = ranges[i];
            const newDoc = await PDFDocument.create();
            const copiedPages = await newDoc.copyPages(sourceDoc, r.pages);
            copiedPages.forEach((p) => newDoc.addPage(p));
            const bytes = await newDoc.save();
            zip.file(`${baseName}_range_${r.label}.pdf`, bytes);
            setProgressPercent(30 + Math.round(((i + 1) / ranges.length) * 50));
          }

          const zipBlob = await zip.generateAsync({ type: 'blob' });
          const url = URL.createObjectURL(zipBlob);
          const filename = `${baseName}_ranges.zip`;

          setResultBlobUrl(url);
          setResultFilename(filename);
          setResultSummary(`Split into ${ranges.length} range PDFs inside a ZIP archive.`);
          triggerAutoDownload(url, filename);
        }
      } else if (activeMode === 'extract') {
        if (selectedPages.size === 0) {
          alert('Please select at least one page to extract.');
          setIsProcessing(false);
          return;
        }

        setProgressText(`Extracting ${selectedPages.size} pages...`);
        setProgressPercent(60);

        const sortedPages = Array.from(selectedPages).sort((a, b) => a - b);
        const indices = sortedPages.map((p) => p - 1);

        const newDoc = await PDFDocument.create();
        const copiedPages = await newDoc.copyPages(sourceDoc, indices);
        copiedPages.forEach((p) => newDoc.addPage(p));

        const pdfBytes = await newDoc.save();
        const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const filename = `${baseName}_extracted.pdf`;

        setResultBlobUrl(url);
        setResultFilename(filename);
        setResultSummary(`Extracted ${selectedPages.size} selected pages into a new PDF.`);
        triggerAutoDownload(url, filename);
      } else if (activeMode === 'all') {
        setProgressText(`Splitting all ${totalPages} pages...`);
        setProgressPercent(20);

        const JSZip = (await import('jszip')).default;
        const zip = new JSZip();

        for (let i = 0; i < totalPages; i++) {
          const newDoc = await PDFDocument.create();
          const [copiedPage] = await newDoc.copyPages(sourceDoc, [i]);
          newDoc.addPage(copiedPage);
          const bytes = await newDoc.save();
          zip.file(`${baseName}_page_${i + 1}.pdf`, bytes);
          setProgressPercent(20 + Math.round(((i + 1) / totalPages) * 70));
        }

        setProgressText('Finalizing ZIP archive...');
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(zipBlob);
        const filename = `${baseName}_all_pages.zip`;

        setResultBlobUrl(url);
        setResultFilename(filename);
        setResultSummary(`Split all ${totalPages} pages into individual PDFs bundled in a ZIP.`);
        triggerAutoDownload(url, filename);
      }

      setProgressPercent(100);
    } catch (err: any) {
      console.error(err);
      alert('Split failed: ' + (err.message || 'Please check your page ranges.'));
    } finally {
      setIsProcessing(false);
    }
  };

  const triggerAutoDownload = (url: string, filename: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const togglePageSelection = (pageNum: number) => {
    setSelectedPages((prev) => {
      const next = new Set(prev);
      if (next.has(pageNum)) {
        next.delete(pageNum);
      } else {
        next.add(pageNum);
      }
      return next;
    });
  };

  const selectAll = () => {
    const all = new Set<number>();
    for (let i = 1; i <= totalPages; i++) all.add(i);
    setSelectedPages(all);
  };

  const deselectAll = () => {
    setSelectedPages(new Set());
  };

  const resetAll = () => {
    setFile(null);
    setTotalPages(0);
    setResultBlobUrl(null);
    setResultFilename('');
    setResultSummary('');
    setIsProcessing(false);
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
            handleFileSelect(e.target.files[0]);
          }
        }}
        accept=".pdf,application/pdf"
        className="hidden"
      />

      {/* State 1: Dropzone (No File Selected) */}
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
              handleFileSelect(e.dataTransfer.files[0]);
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
            Select PDF file to split
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
            <span>🔒 100% In-Browser &bull; Zero Server Retention</span>
          </div>
        </div>
      )}

      {/* State 2: Active Workspace */}
      {file && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
          {/* File Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200">
                📄
              </div>
              <div className="min-w-0">
                <p className="font-bold text-slate-900 text-sm sm:text-base truncate">
                  {file.name}
                </p>
                <p className="text-xs text-slate-500">
                  {totalPages} pages &bull; {formatSize(file.size)}
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

          {/* Mode Selector Tabs */}
          <div className="grid grid-cols-3 gap-2 my-6 p-1.5 bg-slate-100 rounded-xl text-xs sm:text-sm font-bold text-slate-700">
            <button
              type="button"
              onClick={() => setActiveMode('range')}
              className={`py-2.5 px-3 rounded-lg transition-all ${
                activeMode === 'range' ? 'bg-white text-blue-600 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              Custom Range
            </button>
            <button
              type="button"
              onClick={() => setActiveMode('extract')}
              className={`py-2.5 px-3 rounded-lg transition-all ${
                activeMode === 'extract' ? 'bg-white text-blue-600 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              Extract Pages
            </button>
            <button
              type="button"
              onClick={() => setActiveMode('all')}
              className={`py-2.5 px-3 rounded-lg transition-all ${
                activeMode === 'all' ? 'bg-white text-blue-600 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              Split All Pages
            </button>
          </div>

          {/* Mode 1: Range Input */}
          {activeMode === 'range' && (
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Page Ranges (e.g. 1-3, 5, 8-10)
                </label>
                <input
                  type="text"
                  value={rangeInput}
                  onChange={(e) => setRangeInput(e.target.value)}
                  placeholder={`1-${Math.min(totalPages, 5)}`}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Total document pages: 1 to {totalPages}. Separate individual pages or ranges with commas.
                </p>
              </div>

              <label className="flex items-center gap-2 cursor-pointer select-none text-xs sm:text-sm text-slate-700 font-medium">
                <input
                  type="checkbox"
                  checked={mergeRanges}
                  onChange={(e) => setMergeRanges(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <span>Merge all specified ranges into one single PDF (unchecked = individual PDFs inside a ZIP)</span>
              </label>
            </div>
          )}

          {/* Mode 2: Visual Extract Page Grid */}
          {activeMode === 'extract' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-semibold">
                <span className="text-slate-600">
                  {selectedPages.size} of {totalPages} pages selected
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={selectAll}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                  >
                    Select All
                  </button>
                  <button
                    onClick={deselectAll}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                  >
                    Deselect All
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 max-h-80 overflow-y-auto p-3 border border-slate-200 rounded-2xl bg-slate-50">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  const isSelected = selectedPages.has(pageNum);
                  return (
                    <div
                      key={pageNum}
                      onClick={() => togglePageSelection(pageNum)}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all select-none ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="w-10 h-12 bg-white border border-slate-200 rounded flex items-center justify-center mb-1.5 shadow-2xs">
                        <span className="text-xs font-bold text-slate-400">📄</span>
                      </div>
                      <span className="text-xs font-bold">Page {pageNum}</span>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        readOnly
                        className="w-3.5 h-3.5 mt-1 text-blue-600 pointer-events-none rounded"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Mode 3: Split All Pages */}
          {activeMode === 'all' && (
            <div className="p-6 bg-blue-50/70 border border-blue-200 rounded-2xl text-center space-y-2">
              <span className="text-3xl">📦</span>
              <h3 className="text-base font-bold text-slate-900">
                Extract All {totalPages} Pages as Individual PDF Files
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Every page in your document will be separated into its own standalone PDF file and neatly packaged in a single ZIP archive.
              </p>
            </div>
          )}

          {/* Progress Bar */}
          {isProcessing && (
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-600">
                <span>{progressText}</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Result Banner */}
          {resultBlobUrl && !isProcessing && (
            <div className="mt-6 p-5 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="font-bold text-emerald-900 text-sm sm:text-base">
                  Ready! {resultFilename}
                </p>
                <p className="text-xs text-emerald-700 mt-0.5">{resultSummary}</p>
              </div>
              <a
                href={resultBlobUrl}
                download={resultFilename}
                className="px-5 py-2.5 bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-xl hover:bg-emerald-700 shadow-md shadow-emerald-600/20 transition-all whitespace-nowrap"
              >
                Download Again
              </a>
            </div>
          )}

          {/* Action Trigger Button */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              disabled={isProcessing}
              onClick={executeSplit}
              className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span>Splitting PDF in Browser...</span>
                </>
              ) : (
                <>
                  <span>Split PDF Now</span>
                  <span>&rarr;</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
