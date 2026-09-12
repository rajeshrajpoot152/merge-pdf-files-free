/**
 * MergePDFFilesFree.com - PDF Split Engine
 * 100% Client-Side In-Browser PDF Splitting
 * Zero Server Uploads • Fast, Secure & Private
 */

(function() {
  'use strict';

  // State
  let currentFile = null;
  let currentPdfDoc = null;
  let totalPages = 0;
  let activeMode = 'range'; // 'range' | 'extract' | 'all'
  let selectedPages = new Set();
  let splitResultBlobUrl = null;
  let isSplitting = false;

  // DOM Elements
  const dropZone = document.getElementById('split-dropzone');
  const fileInput = document.getElementById('split-file-input');
  const workspace = document.getElementById('split-workspace');
  const fileNameDisplay = document.getElementById('split-file-name');
  const fileMetaDisplay = document.getElementById('split-file-meta');
  const changeFileBtn = document.getElementById('split-change-file-btn');
  
  // Mode switchers
  const modeRangeBtn = document.getElementById('mode-range-btn');
  const modeExtractBtn = document.getElementById('mode-extract-btn');
  const modeAllBtn = document.getElementById('mode-all-btn');
  const modeRangeContainer = document.getElementById('mode-range-container');
  const modeExtractContainer = document.getElementById('mode-extract-container');
  const modeAllContainer = document.getElementById('mode-all-container');

  // Mode inputs
  const rangeInput = document.getElementById('split-range-input');
  const rangeMergeOption = document.getElementById('split-range-merge-option');
  const pagesGrid = document.getElementById('split-pages-grid');
  const selectAllBtn = document.getElementById('split-select-all-btn');
  const deselectAllBtn = document.getElementById('split-deselect-all-btn');
  const selectedCountDisplay = document.getElementById('split-selected-count');

  // Action & Progress
  const splitBtn = document.getElementById('split-action-btn');
  const progressContainer = document.getElementById('split-progress-container');
  const progressBar = document.getElementById('split-progress-bar');
  const progressText = document.getElementById('split-progress-text');
  const resultContainer = document.getElementById('split-result-container');
  const downloadBtn = document.getElementById('split-download-btn');
  const resetBtn = document.getElementById('split-reset-btn');
  const resultSummary = document.getElementById('split-result-summary');

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
        handleFile(files[0]);
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files.length) {
        handleFile(fileInput.files[0]);
        fileInput.value = '';
      }
    });

    if (changeFileBtn) {
      changeFileBtn.addEventListener('click', resetAll);
    }

    // Mode Buttons
    if (modeRangeBtn) {
      modeRangeBtn.addEventListener('click', () => switchMode('range'));
    }
    if (modeExtractBtn) {
      modeExtractBtn.addEventListener('click', () => switchMode('extract'));
    }
    if (modeAllBtn) {
      modeAllBtn.addEventListener('click', () => switchMode('all'));
    }

    // Select/Deselect All in Extract mode
    if (selectAllBtn) {
      selectAllBtn.addEventListener('click', () => {
        for (let i = 1; i <= totalPages; i++) {
          selectedPages.add(i);
        }
        updateGridSelection();
      });
    }

    if (deselectAllBtn) {
      deselectAllBtn.addEventListener('click', () => {
        selectedPages.clear();
        updateGridSelection();
      });
    }

    if (splitBtn) {
      splitBtn.addEventListener('click', executeSplit);
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', resetAll);
    }
  }

  function formatBytes(bytes, decimals = 1) {
    if (!+bytes) return '0 B';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  async function handleFile(file) {
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      alert('Please select a valid PDF file.');
      return;
    }

    if (!window.PDFLib) {
      alert('PDF processing engine is loading. Please wait a moment and try again.');
      return;
    }

    try {
      const buffer = await file.arrayBuffer();
      const pdfDoc = await PDFLib.PDFDocument.load(buffer, { ignoreEncryption: true });
      totalPages = pdfDoc.getPageCount();

      if (totalPages <= 1) {
        alert('This PDF only contains 1 page. A multi-page PDF is required to perform splitting.');
        return;
      }

      currentFile = file;
      currentPdfDoc = pdfDoc;
      selectedPages.clear();

      // Update Header Display
      if (fileNameDisplay) fileNameDisplay.textContent = file.name;
      if (fileMetaDisplay) fileMetaDisplay.textContent = `${formatBytes(file.size)} • ${totalPages} pages`;

      // Set default range suggestion (e.g. 1-2, 3-N)
      if (rangeInput) {
        const mid = Math.ceil(totalPages / 2);
        rangeInput.value = `1-${mid}, ${mid + 1}-${totalPages}`;
        rangeInput.placeholder = `e.g. 1-${mid}, ${mid + 1}-${totalPages}`;
      }

      // Render Visual Page Grid for Extract mode
      renderPagesGrid();

      // Show Workspace
      if (dropZone) dropZone.classList.add('hidden');
      if (workspace) workspace.classList.remove('hidden');
      if (resultContainer) resultContainer.classList.add('hidden');

      switchMode('range');

    } catch (err) {
      console.error('Error loading PDF:', err);
      alert('Could not open this PDF. It may be encrypted or password-protected.');
    }
  }

  function switchMode(mode) {
    activeMode = mode;

    [modeRangeBtn, modeExtractBtn, modeAllBtn].forEach(btn => {
      if (btn) {
        btn.classList.remove('bg-blue-600', 'text-white', 'shadow-sm');
        btn.classList.add('bg-white', 'text-slate-700', 'hover:bg-slate-100');
      }
    });

    [modeRangeContainer, modeExtractContainer, modeAllContainer].forEach(c => {
      if (c) c.classList.add('hidden');
    });

    if (mode === 'range') {
      if (modeRangeBtn) {
        modeRangeBtn.classList.remove('bg-white', 'text-slate-700', 'hover:bg-slate-100');
        modeRangeBtn.classList.add('bg-blue-600', 'text-white', 'shadow-sm');
      }
      if (modeRangeContainer) modeRangeContainer.classList.remove('hidden');
    } else if (mode === 'extract') {
      if (modeExtractBtn) {
        modeExtractBtn.classList.remove('bg-white', 'text-slate-700', 'hover:bg-slate-100');
        modeExtractBtn.classList.add('bg-blue-600', 'text-white', 'shadow-sm');
      }
      if (modeExtractContainer) modeExtractContainer.classList.remove('hidden');
    } else if (mode === 'all') {
      if (modeAllBtn) {
        modeAllBtn.classList.remove('bg-white', 'text-slate-700', 'hover:bg-slate-100');
        modeAllBtn.classList.add('bg-blue-600', 'text-white', 'shadow-sm');
      }
      if (modeAllContainer) modeAllContainer.classList.remove('hidden');
    }
  }

  function renderPagesGrid() {
    if (!pagesGrid) return;
    pagesGrid.innerHTML = '';

    // By default select the first page
    selectedPages.add(1);

    for (let i = 1; i <= totalPages; i++) {
      const card = document.createElement('div');
      const isSelected = selectedPages.has(i);

      card.className = `group relative border rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer transition-all duration-150 select-none ${
        isSelected 
          ? 'border-blue-600 bg-blue-50/70 shadow-xs' 
          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
      }`;
      card.setAttribute('data-page', i);

      card.innerHTML = `
        <div class="w-12 h-16 bg-white border ${isSelected ? 'border-blue-400' : 'border-slate-200'} rounded shadow-2xs flex items-center justify-center mb-2">
          <svg class="w-6 h-6 ${isSelected ? 'text-blue-600' : 'text-slate-400'}" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
          </svg>
        </div>
        <div class="flex items-center space-x-1.5">
          <input type="checkbox" class="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 pointer-events-none" ${isSelected ? 'checked' : ''} />
          <span class="text-xs font-semibold ${isSelected ? 'text-blue-900' : 'text-slate-700'}">Page ${i}</span>
        </div>
      `;

      card.addEventListener('click', () => {
        if (selectedPages.has(i)) {
          selectedPages.delete(i);
        } else {
          selectedPages.add(i);
        }
        updateGridSelection();
      });

      pagesGrid.appendChild(card);
    }

    updateSelectionCount();
  }

  function updateGridSelection() {
    if (!pagesGrid) return;
    const cards = pagesGrid.querySelectorAll('[data-page]');
    cards.forEach(card => {
      const pageNum = parseInt(card.getAttribute('data-page'), 10);
      const isSelected = selectedPages.has(pageNum);
      const checkbox = card.querySelector('input[type="checkbox"]');
      const label = card.querySelector('span');
      const iconBox = card.querySelector('div:first-child');
      const icon = iconBox.querySelector('svg');

      if (isSelected) {
        card.className = 'group relative border rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer transition-all duration-150 select-none border-blue-600 bg-blue-50/70 shadow-xs';
        iconBox.className = 'w-12 h-16 bg-white border border-blue-400 rounded shadow-2xs flex items-center justify-center mb-2';
        icon.className = 'w-6 h-6 text-blue-600';
        label.className = 'text-xs font-semibold text-blue-900';
        if (checkbox) checkbox.checked = true;
      } else {
        card.className = 'group relative border rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer transition-all duration-150 select-none border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs';
        iconBox.className = 'w-12 h-16 bg-white border border-slate-200 rounded shadow-2xs flex items-center justify-center mb-2';
        icon.className = 'w-6 h-6 text-slate-400';
        label.className = 'text-xs font-semibold text-slate-700';
        if (checkbox) checkbox.checked = false;
      }
    });

    updateSelectionCount();
  }

  function updateSelectionCount() {
    if (selectedCountDisplay) {
      selectedCountDisplay.textContent = `${selectedPages.size} of ${totalPages} pages selected`;
    }
  }

  // Parse page ranges like "1-3, 5, 7-10"
  function parseRanges(str, max) {
    const parts = str.split(',').map(s => s.trim()).filter(Boolean);
    const ranges = [];

    for (const part of parts) {
      if (part.includes('-')) {
        const [startStr, endStr] = part.split('-');
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        if (isNaN(start) || isNaN(end) || start < 1 || end > max || start > end) {
          throw new Error(`Invalid range: "${part}". Must be between 1 and ${max}.`);
        }
        const pages = [];
        for (let p = start; p <= end; p++) pages.push(p - 1); // 0-indexed
        ranges.push({ label: `${start}-${end}`, pages });
      } else {
        const p = parseInt(part, 10);
        if (isNaN(p) || p < 1 || p > max) {
          throw new Error(`Invalid page number: "${part}". Must be between 1 and ${max}.`);
        }
        ranges.push({ label: `page_${p}`, pages: [p - 1] });
      }
    }

    if (ranges.length === 0) {
      throw new Error('Please enter at least one valid range or page number.');
    }

    return ranges;
  }

  // Execute PDF Split Action
  async function executeSplit() {
    if (!currentPdfDoc || isSplitting) return;

    isSplitting = true;
    if (splitBtn) splitBtn.disabled = true;
    if (progressContainer) progressContainer.classList.remove('hidden');
    if (progressBar) progressBar.style.width = '15%';
    if (progressText) progressText.textContent = 'Processing PDF...';

    try {
      const { PDFDocument } = window.PDFLib;
      const baseName = currentFile.name.replace(/\.[^/.]+$/, '');

      if (activeMode === 'range') {
        // Range Mode
        const rawRange = rangeInput ? rangeInput.value.trim() : '';
        const ranges = parseRanges(rawRange, totalPages);
        const shouldMerge = rangeMergeOption ? rangeMergeOption.checked : true;

        if (shouldMerge) {
          // Merge all requested ranges into 1 single output PDF
          if (progressText) progressText.textContent = 'Creating combined PDF from ranges...';
          const newDoc = await PDFDocument.create();
          
          for (const r of ranges) {
            const copiedPages = await newDoc.copyPages(currentPdfDoc, r.pages);
            copiedPages.forEach(p => newDoc.addPage(p));
          }

          const pdfBytes = await newDoc.save();
          const blob = new Blob([pdfBytes], { type: 'application/pdf' });
          setupDownload(blob, `${baseName}_ranges.pdf`, `Extracted ${ranges.reduce((acc, r) => acc + r.pages.length, 0)} pages into a single PDF.`);

        } else {
          // Create separate PDF for each range and ZIP them
          if (!window.JSZip) {
            alert('ZIP module not loaded. Merging ranges into a single PDF instead.');
            return;
          }
          if (progressText) progressText.textContent = 'Generating separate range PDFs & ZIP archive...';
          const zip = new window.JSZip();

          for (let i = 0; i < ranges.length; i++) {
            const r = ranges[i];
            const newDoc = await PDFDocument.create();
            const copiedPages = await newDoc.copyPages(currentPdfDoc, r.pages);
            copiedPages.forEach(p => newDoc.addPage(p));
            const bytes = await newDoc.save();
            zip.file(`${baseName}_range_${r.label}.pdf`, bytes);
            if (progressBar) progressBar.style.width = `${20 + Math.round((i / ranges.length) * 70)}%`;
          }

          const zipBlob = await zip.generateAsync({ type: 'blob' });
          setupDownload(zipBlob, `${baseName}_ranges.zip`, `Split into ${ranges.length} separate PDFs bundled in a ZIP archive.`);
        }

      } else if (activeMode === 'extract') {
        // Extract Selected Pages into 1 single PDF
        if (selectedPages.size === 0) {
          alert('Please select at least one page to extract.');
          if (progressContainer) progressContainer.classList.add('hidden');
          isSplitting = false;
          if (splitBtn) splitBtn.disabled = false;
          return;
        }

        if (progressText) progressText.textContent = `Extracting ${selectedPages.size} selected pages...`;
        const sortedPageNumbers = Array.from(selectedPages).sort((a, b) => a - b);
        const indicesToCopy = sortedPageNumbers.map(p => p - 1);

        const newDoc = await PDFDocument.create();
        const copiedPages = await newDoc.copyPages(currentPdfDoc, indicesToCopy);
        copiedPages.forEach(p => newDoc.addPage(p));

        const pdfBytes = await newDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        setupDownload(blob, `${baseName}_extracted.pdf`, `Successfully extracted ${selectedPages.size} selected pages into a new PDF.`);

      } else if (activeMode === 'all') {
        // Split Every Page into individual single-page PDFs inside a ZIP
        if (!window.JSZip) {
          alert('ZIP library is required to download all split pages.');
          return;
        }

        const zip = new window.JSZip();
        for (let i = 0; i < totalPages; i++) {
          const pageNum = i + 1;
          const percent = Math.round((pageNum / totalPages) * 80);
          if (progressBar) progressBar.style.width = `${percent}%`;
          if (progressText) progressText.textContent = `Extracting page ${pageNum} of ${totalPages}...`;

          const singleDoc = await PDFDocument.create();
          const [copiedPage] = await singleDoc.copyPages(currentPdfDoc, [i]);
          singleDoc.addPage(copiedPage);
          const bytes = await singleDoc.save();
          const paddedNum = String(pageNum).padStart(totalPages >= 100 ? 3 : 2, '0');
          zip.file(`${baseName}_page_${paddedNum}.pdf`, bytes);
        }

        if (progressText) progressText.textContent = 'Compressing into ZIP file...';
        if (progressBar) progressBar.style.width = '95%';

        const zipBlob = await zip.generateAsync({ type: 'blob' });
        setupDownload(zipBlob, `${baseName}_all_pages.zip`, `Split all ${totalPages} pages into individual PDF files packaged in a ZIP archive.`);
      }

    } catch (err) {
      console.error('Split Error:', err);
      alert(err.message || 'An error occurred during splitting.');
      if (progressContainer) progressContainer.classList.add('hidden');
    } finally {
      isSplitting = false;
      if (splitBtn) splitBtn.disabled = false;
    }
  }

  function setupDownload(blob, filename, summaryText) {
    if (progressBar) progressBar.style.width = '100%';
    if (progressText) progressText.textContent = 'Completed!';

    if (splitResultBlobUrl) {
      URL.revokeObjectURL(splitResultBlobUrl);
    }
    splitResultBlobUrl = URL.createObjectURL(blob);

    setTimeout(() => {
      if (progressContainer) progressContainer.classList.add('hidden');
      if (workspace) workspace.classList.add('hidden');
      if (resultContainer) resultContainer.classList.remove('hidden');

      if (resultSummary) {
        resultSummary.textContent = `${summaryText} (${formatBytes(blob.size)})`;
      }

      if (downloadBtn) {
        downloadBtn.onclick = () => {
          const a = document.createElement('a');
          a.href = splitResultBlobUrl;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        };
      }
    }, 400);
  }

  function resetAll() {
    currentFile = null;
    currentPdfDoc = null;
    totalPages = 0;
    selectedPages.clear();
    isSplitting = false;

    if (splitResultBlobUrl) {
      URL.revokeObjectURL(splitResultBlobUrl);
      splitResultBlobUrl = null;
    }

    if (workspace) workspace.classList.add('hidden');
    if (progressContainer) progressContainer.classList.add('hidden');
    if (resultContainer) resultContainer.classList.add('hidden');
    if (dropZone) dropZone.classList.remove('hidden');
    if (fileInput) fileInput.value = '';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
