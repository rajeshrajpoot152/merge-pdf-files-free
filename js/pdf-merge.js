/**
 * MergePDFFilesFree.com - PDF Merge Engine
 * 100% Client-Side In-Browser PDF Processing
 * Zero Server Uploads • Fast, Secure & Private
 */

(function() {
  'use strict';

  // State
  let pdfFiles = [];
  let isMerging = false;

  // DOM Elements
  const dropZone = document.getElementById('merge-dropzone');
  const fileInput = document.getElementById('merge-file-input');
  const filesContainer = document.getElementById('merge-files-container');
  const filesList = document.getElementById('merge-files-list');
  const mergeBtn = document.getElementById('merge-action-btn');
  const clearBtn = document.getElementById('merge-clear-btn');
  const addMoreBtn = document.getElementById('merge-add-more-btn');
  const progressContainer = document.getElementById('merge-progress-container');
  const progressBar = document.getElementById('merge-progress-bar');
  const progressText = document.getElementById('merge-progress-text');
  const resultContainer = document.getElementById('merge-result-container');
  const downloadBtn = document.getElementById('merge-download-btn');
  const resetBtn = document.getElementById('merge-reset-btn');
  const resultSummary = document.getElementById('merge-result-summary');
  const fileCountBadge = document.getElementById('merge-file-count');

  let mergedBlobUrl = null;

  // Initialize
  function init() {
    if (!dropZone || !fileInput) return;

    // Drag and drop events
    ['dragenter', 'dragover'].forEach(eventName => {
      dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.add('border-blue-500', 'bg-blue-50/80', 'scale-[1.01]');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.remove('border-blue-500', 'bg-blue-50/80', 'scale-[1.01]');
      }, false);
    });

    dropZone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files && files.length) {
        handleFiles(files);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (fileInput.files && fileInput.files.length) {
        handleFiles(fileInput.files);
        fileInput.value = ''; // Reset for re-selection
      }
    });

    if (addMoreBtn) {
      addMoreBtn.addEventListener('click', () => fileInput.click());
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', resetAll);
    }

    if (mergeBtn) {
      mergeBtn.addEventListener('click', executeMerge);
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', resetAll);
    }
  }

  // Format File Size
  function formatBytes(bytes, decimals = 1) {
    if (!+bytes) return '0 B';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  // Handle incoming file selection
  async function handleFiles(files) {
    const validFiles = Array.from(files).filter(f => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'));

    if (validFiles.length === 0) {
      alert('Please upload valid PDF files.');
      return;
    }

    // Hide result if already shown
    if (resultContainer) resultContainer.classList.add('hidden');
    if (progressContainer) progressContainer.classList.add('hidden');

    for (const file of validFiles) {
      const fileId = 'pdf_' + Math.random().toString(36).substr(2, 9);
      const fileObj = {
        id: fileId,
        file: file,
        name: file.name,
        size: file.size,
        pageCount: 'Loading...',
        arrayBuffer: null
      };

      pdfFiles.push(fileObj);
      renderFileList();

      // Read array buffer and get page count asynchronously
      try {
        const buffer = await file.arrayBuffer();
        fileObj.arrayBuffer = buffer;

        if (window.PDFLib) {
          try {
            const pdfDoc = await PDFLib.PDFDocument.load(buffer, { ignoreEncryption: true });
            fileObj.pageCount = pdfDoc.getPageCount();
          } catch (e) {
            fileObj.pageCount = 'Encrypted / Unknown';
          }
        } else {
          fileObj.pageCount = 'Ready';
        }
      } catch (err) {
        console.error('Error reading PDF:', err);
        fileObj.pageCount = 'Error reading';
      }

      renderFileList();
    }

    updateUIState();
  }

  // Render the file reordering list
  function renderFileList() {
    if (!filesList) return;

    filesList.innerHTML = '';

    pdfFiles.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'flex items-center justify-between p-3.5 sm:p-4 bg-white border border-slate-200 rounded-xl shadow-xs hover:shadow-md transition-all duration-200';
      card.setAttribute('data-id', item.id);

      const pageBadge = typeof item.pageCount === 'number' 
        ? `<span class="px-2 py-0.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-md">${item.pageCount} ${item.pageCount === 1 ? 'page' : 'pages'}</span>`
        : `<span class="px-2 py-0.5 text-xs font-medium text-slate-500 bg-slate-100 rounded-md">${item.pageCount}</span>`;

      card.innerHTML = `
        <div class="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
          <div class="flex-shrink-0 w-8 h-8 rounded-lg bg-red-50 border border-red-200 text-red-600 font-bold text-xs flex items-center justify-center">
            ${index + 1}
          </div>
          <div class="flex-shrink-0 text-red-500">
            <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 2h7l5 5v13a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2zm6 1.5V8h4.5L13 3.5zm-5 8v2h8v-2H8zm0 3v2h8v-2H8z"/>
            </svg>
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-sm font-semibold text-slate-900 truncate" title="${escapeHtml(item.name)}">${escapeHtml(item.name)}</p>
            <div class="flex items-center space-x-2 mt-0.5">
              <span class="text-xs text-slate-500">${formatBytes(item.size)}</span>
              <span class="text-xs text-slate-300">•</span>
              ${pageBadge}
            </div>
          </div>
        </div>
        <div class="flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0 ml-3">
          <button type="button" class="btn-move-up p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors ${index === 0 ? 'opacity-30 cursor-not-allowed' : ''}" title="Move Up" data-index="${index}" ${index === 0 ? 'disabled' : ''}>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/></svg>
          </button>
          <button type="button" class="btn-move-down p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors ${index === pdfFiles.length - 1 ? 'opacity-30 cursor-not-allowed' : ''}" title="Move Down" data-index="${index}" ${index === pdfFiles.length - 1 ? 'disabled' : ''}>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <button type="button" class="btn-delete p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Remove PDF" data-index="${index}">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
      `;

      filesList.appendChild(card);
    });

    // Attach button listeners
    filesList.querySelectorAll('.btn-move-up').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        if (idx > 0) {
          const temp = pdfFiles[idx];
          pdfFiles[idx] = pdfFiles[idx - 1];
          pdfFiles[idx - 1] = temp;
          renderFileList();
        }
      });
    });

    filesList.querySelectorAll('.btn-move-down').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        if (idx < pdfFiles.length - 1) {
          const temp = pdfFiles[idx];
          pdfFiles[idx] = pdfFiles[idx + 1];
          pdfFiles[idx + 1] = temp;
          renderFileList();
        }
      });
    });

    filesList.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        pdfFiles.splice(idx, 1);
        renderFileList();
        updateUIState();
      });
    });
  }

  // Update UI Visibility & State
  function updateUIState() {
    if (pdfFiles.length > 0) {
      if (dropZone) dropZone.classList.add('hidden');
      if (filesContainer) filesContainer.classList.remove('hidden');
      if (fileCountBadge) fileCountBadge.textContent = `${pdfFiles.length} ${pdfFiles.length === 1 ? 'file' : 'files'} selected`;
    } else {
      if (dropZone) dropZone.classList.remove('hidden');
      if (filesContainer) filesContainer.classList.add('hidden');
    }

    if (mergeBtn) {
      if (pdfFiles.length >= 2) {
        mergeBtn.disabled = false;
        mergeBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        mergeBtn.classList.add('hover:bg-blue-700', 'shadow-lg');
      } else {
        mergeBtn.disabled = true;
        mergeBtn.classList.add('opacity-50', 'cursor-not-allowed');
        mergeBtn.classList.remove('hover:bg-blue-700', 'shadow-lg');
      }
    }
  }

  // Execute PDF Merge
  async function executeMerge() {
    if (pdfFiles.length < 2 || isMerging) return;

    if (!window.PDFLib) {
      alert('PDF Library is still loading or could not be loaded. Please check your internet connection and refresh.');
      return;
    }

    isMerging = true;
    if (mergeBtn) mergeBtn.disabled = true;
    if (progressContainer) progressContainer.classList.remove('hidden');
    if (resultContainer) resultContainer.classList.add('hidden');

    try {
      const { PDFDocument } = window.PDFLib;
      const mergedPdf = await PDFDocument.create();
      let totalPagesAdded = 0;

      for (let i = 0; i < pdfFiles.length; i++) {
        const item = pdfFiles[i];
        const percent = Math.round(((i + 1) / pdfFiles.length) * 85);
        if (progressBar) progressBar.style.width = `${percent}%`;
        if (progressText) progressText.textContent = `Merging "${item.name}" (${i + 1} of ${pdfFiles.length})...`;

        let buffer = item.arrayBuffer;
        if (!buffer) {
          buffer = await item.file.arrayBuffer();
          item.arrayBuffer = buffer;
        }

        const sourcePdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
        const pageIndices = sourcePdf.getPageIndices();
        const copiedPages = await mergedPdf.copyPages(sourcePdf, pageIndices);

        copiedPages.forEach(page => {
          mergedPdf.addPage(page);
          totalPagesAdded++;
        });
      }

      if (progressText) progressText.textContent = 'Finalizing merged PDF document...';
      if (progressBar) progressBar.style.width = '95%';

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });

      if (mergedBlobUrl) {
        URL.revokeObjectURL(mergedBlobUrl);
      }
      mergedBlobUrl = URL.createObjectURL(blob);

      if (progressBar) progressBar.style.width = '100%';
      if (progressText) progressText.textContent = 'Merge Complete!';

      setTimeout(() => {
        if (progressContainer) progressContainer.classList.add('hidden');
        if (filesContainer) filesContainer.classList.add('hidden');
        if (resultContainer) resultContainer.classList.remove('hidden');

        const totalMergedSize = formatBytes(mergedPdfBytes.byteLength);
        if (resultSummary) {
          resultSummary.textContent = `Successfully merged ${pdfFiles.length} files into 1 PDF with ${totalPagesAdded} pages (${totalMergedSize}).`;
        }

        if (downloadBtn) {
          downloadBtn.onclick = () => {
            const a = document.createElement('a');
            a.href = mergedBlobUrl;
            a.download = `merged_${Date.now()}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          };
        }
      }, 500);

    } catch (err) {
      console.error('Merge Error:', err);
      alert('An error occurred while merging your PDFs. Please ensure none of the files are password-protected or corrupted.');
      if (progressContainer) progressContainer.classList.add('hidden');
    } finally {
      isMerging = false;
      if (mergeBtn) mergeBtn.disabled = false;
    }
  }

  // Reset State
  function resetAll() {
    pdfFiles = [];
    isMerging = false;
    if (mergedBlobUrl) {
      URL.revokeObjectURL(mergedBlobUrl);
      mergedBlobUrl = null;
    }
    if (filesList) filesList.innerHTML = '';
    if (filesContainer) filesContainer.classList.add('hidden');
    if (progressContainer) progressContainer.classList.add('hidden');
    if (resultContainer) resultContainer.classList.add('hidden');
    if (dropZone) dropZone.classList.remove('hidden');
    if (fileInput) fileInput.value = '';
    updateUIState();
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
