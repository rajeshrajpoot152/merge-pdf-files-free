'use client';

import React, { useState, useRef } from 'react';

interface ImageItem {
  id: string;
  file: File;
  dataUrl: string;
  width: number;
  height: number;
}

interface JpgToPdfToolProps {
  heroTitle?: string;
  heroLead?: string;
}

export default function JpgToPdfTool({
  heroTitle = 'Convert JPG to PDF Free Online',
  heroLead = 'Turn your images (JPG, PNG, WebP) into professional PDF documents. 100% private, no file uploads, processed in your browser.',
}: JpgToPdfToolProps) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [orientation, setOrientation] = useState<'auto' | 'portrait' | 'landscape'>('auto');
  const [margin, setMargin] = useState<'none' | 'small' | 'normal'>('small');
  const [isConverting, setIsConverting] = useState(false);
  const [progressText, setProgressText] = useState('');
  const [resultBlobUrl, setResultBlobUrl] = useState<string | null>(null);
  const [resultFilename, setResultFilename] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const validFiles = Array.from(fileList).filter((f) => f.type.startsWith('image/'));

    if (validFiles.length === 0) {
      alert('Please select valid image files (JPG, PNG, WebP).');
      return;
    }

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        const img = new Image();
        img.onload = () => {
          setImages((prev) => [
            ...prev,
            {
              id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
              file,
              dataUrl,
              width: img.naturalWidth,
              height: img.naturalHeight,
            },
          ]);
        };
        img.src = dataUrl;
      };
      reader.readAsDataURL(file);
    });
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    setImages((prev) => {
      const updated = [...prev];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= updated.length) return prev;
      const temp = updated[index];
      updated[index] = updated[targetIndex];
      updated[targetIndex] = temp;
      return updated;
    });
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const convertToPdf = async () => {
    if (images.length === 0 || isConverting) return;

    setIsConverting(true);
    setProgressText('Initializing PDF compiler...');

    try {
      const { PDFDocument, PageSizes } = await import('pdf-lib');
      const pdfDoc = await PDFDocument.create();

      const marginSize = margin === 'none' ? 0 : margin === 'small' ? 15 : 30;

      for (let i = 0; i < images.length; i++) {
        const item = images[i];
        setProgressText(`Processing image ${i + 1} of ${images.length}...`);

        let pageWidth = PageSizes.A4[0];
        let pageHeight = PageSizes.A4[1];

        if (orientation === 'landscape') {
          pageWidth = PageSizes.A4[1];
          pageHeight = PageSizes.A4[0];
        } else if (orientation === 'auto') {
          // If the image is wider than tall, make page landscape; otherwise portrait
          if (item.width > item.height) {
            pageWidth = PageSizes.A4[1];
            pageHeight = PageSizes.A4[0];
          } else {
            pageWidth = PageSizes.A4[0];
            pageHeight = PageSizes.A4[1];
          }
        }

        // Convert image to JPEG bytes via canvas if WebP or other format
        let embeddedImage: any;
        const mime = item.file.type.toLowerCase();

        if (mime === 'image/jpeg' || mime === 'image/jpg') {
          const bytes = await item.file.arrayBuffer();
          embeddedImage = await pdfDoc.embedJpg(bytes);
        } else if (mime === 'image/png') {
          const bytes = await item.file.arrayBuffer();
          embeddedImage = await pdfDoc.embedPng(bytes);
        } else {
          // Convert to JPEG using HTML5 canvas
          const canvas = document.createElement('canvas');
          canvas.width = item.width;
          canvas.height = item.height;
          const ctx = canvas.getContext('2d');
          const imgEl = new Image();
          imgEl.src = item.dataUrl;
          await new Promise((res) => {
            imgEl.onload = res;
          });
          ctx?.drawImage(imgEl, 0, 0);
          const jpegDataUrl = canvas.toDataURL('image/jpeg', 0.92);
          const base64Data = jpegDataUrl.split(',')[1];
          const binaryStr = window.atob(base64Data);
          const len = binaryStr.length;
          const bytes = new Uint8Array(len);
          for (let b = 0; b < len; b++) {
            bytes[b] = binaryStr.charCodeAt(b);
          }
          embeddedImage = await pdfDoc.embedJpg(bytes);
        }

        // Calculate fitted dimensions preserving aspect ratio within printable area
        const printableWidth = pageWidth - marginSize * 2;
        const printableHeight = pageHeight - marginSize * 2;

        const imgAspect = item.width / item.height;
        const printableAspect = printableWidth / printableHeight;

        let drawWidth = printableWidth;
        let drawHeight = printableHeight;

        if (imgAspect > printableAspect) {
          drawHeight = printableWidth / imgAspect;
        } else {
          drawWidth = printableHeight * imgAspect;
        }

        const x = marginSize + (printableWidth - drawWidth) / 2;
        const y = marginSize + (printableHeight - drawHeight) / 2;

        const page = pdfDoc.addPage([pageWidth, pageHeight]);
        page.drawImage(embeddedImage, {
          x,
          y,
          width: drawWidth,
          height: drawHeight,
        });
      }

      setProgressText('Compiling final PDF...');
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const filename = `images_converted_${Date.now()}.pdf`;

      setResultBlobUrl(url);
      setResultFilename(filename);

      // Auto download
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err: any) {
      console.error(err);
      alert('Conversion failed: ' + (err.message || 'Error processing images.'));
    } finally {
      setIsConverting(false);
    }
  };

  const resetAll = () => {
    setImages([]);
    setResultBlobUrl(null);
    setResultFilename('');
    setIsConverting(false);
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
        onChange={(e) => handleFiles(e.target.files)}
        accept="image/jpeg,image/jpg,image/png,image/webp"
        multiple
        className="hidden"
      />

      {/* State 1: Dropzone */}
      {images.length === 0 && (
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
            handleFiles(e.dataTransfer.files);
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
            Select Images to Convert
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1.5">
            or drag and drop JPG, PNG, or WebP files here
          </p>
          <button
            type="button"
            className="mt-6 px-6 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-xl hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all pointer-events-none"
          >
            Browse Image Files
          </button>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 py-1 px-3 rounded-full w-fit mx-auto border border-emerald-200">
            <span>🔒 100% In-Browser &bull; High Resolution &bull; Zero Server Retention</span>
          </div>
        </div>
      )}

      {/* State 2: Active Image Workspace */}
      {images.length > 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200">
                🖼️
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm sm:text-base">
                  {images.length} {images.length === 1 ? 'Image' : 'Images'} Selected
                </p>
                <p className="text-xs text-slate-500">
                  Arrange images in desired document sequence.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                + Add More
              </button>
              <button
                type="button"
                onClick={resetAll}
                className="text-xs font-semibold text-slate-600 hover:text-red-600 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-red-200 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Options Bar: Orientation & Margin */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Page Orientation
              </label>
              <select
                value={orientation}
                onChange={(e) => setOrientation(e.target.value as any)}
                className="w-full bg-white border border-slate-300 text-slate-800 text-xs font-bold rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="auto">Auto (Match Image Ratio)</option>
                <option value="portrait">Portrait (Standard A4)</option>
                <option value="landscape">Landscape (Wide A4)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Page Margins
              </label>
              <select
                value={margin}
                onChange={(e) => setMargin(e.target.value as any)}
                className="w-full bg-white border border-slate-300 text-slate-800 text-xs font-bold rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="none">No Margin (Full Page Edge-to-Edge)</option>
                <option value="small">Small Margin (Clean Border)</option>
                <option value="normal">Normal Margin (Standard)</option>
              </select>
            </div>
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-96 overflow-y-auto p-4 border border-slate-200 rounded-2xl bg-slate-50">
            {images.map((img, idx) => (
              <div
                key={img.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs flex flex-col group"
              >
                <div className="h-32 bg-slate-100 flex items-center justify-center overflow-hidden relative">
                  <img
                    src={img.dataUrl}
                    alt={`Preview ${idx + 1}`}
                    className="max-h-full max-w-full object-contain"
                  />
                  <span className="absolute top-1.5 left-1.5 bg-slate-900/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                    #{idx + 1}
                  </span>
                </div>

                <div className="p-2.5 flex items-center justify-between gap-1 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveImage(idx, 'up')}
                      className="p-1 rounded hover:bg-slate-100 text-slate-600 disabled:opacity-30 text-xs"
                      title="Move Left/Up"
                    >
                      &larr;
                    </button>
                    <button
                      type="button"
                      disabled={idx === images.length - 1}
                      onClick={() => moveImage(idx, 'down')}
                      className="p-1 rounded hover:bg-slate-100 text-slate-600 disabled:opacity-30 text-xs"
                      title="Move Right/Down"
                    >
                      &rarr;
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(img.id)}
                    className="p-1 rounded hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors text-xs"
                    title="Remove Image"
                  >
                    &times;
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Indicator */}
          {isConverting && (
            <div className="my-6 p-6 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-3">
              <svg className="animate-spin h-6 w-6 text-blue-600 mx-auto" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <p className="text-sm font-bold text-slate-800">{progressText}</p>
            </div>
          )}

          {/* Success Banner */}
          {resultBlobUrl && !isConverting && (
            <div className="my-6 p-5 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-bold text-emerald-900 text-sm sm:text-base">
                  Ready! {resultFilename}
                </p>
                <p className="text-xs text-emerald-700 mt-0.5">
                  Combined {images.length} images into a single PDF document.
                </p>
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
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              disabled={isConverting}
              onClick={convertToPdf}
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2"
            >
              {isConverting ? (
                <span>Generating PDF in Browser...</span>
              ) : (
                <>
                  <span>Convert to PDF Now</span>
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
