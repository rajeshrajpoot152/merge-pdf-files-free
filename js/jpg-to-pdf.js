/**
 * MergePDFFilesFree.com - Client-Side JPG to PDF Engine
 * Zero Server Uploads • Fast HTML5 Canvas + PDF-Lib
 */
(function() {
  'use strict';

  let imagesList = []; // Array of { id, file, dataUrl, width, height }
  let isConverting = false;

  const dropzone = document.getElementById('jpg-dropzone');
  const fileInput = document.getElementById('jpg-file-input');
  const browseBtn = document.getElementById('jpg-browse-btn');
  const workspace = document.getElementById('jpg-workspace');
  const grid = document.getElementById('jpg-grid');
  const countBadge = document.getElementById('jpg-count-badge');
  const addMoreBtn = document.getElementById('jpg-add-more-btn');
  const clearBtn = document.getElementById('jpg-clear-btn');
  const convertBtn = document.getElementById('jpg-convert-btn');
  const orientationSelect = document.getElementById('jpg-orientation');
  const progressDiv = document.getElementById('jpg-progress');
  const progressText = document.getElementById('jpg-progress-text');
  const resultDiv = document.getElementById('jpg-result');
  const downloadBtn = document.getElementById('jpg-download-btn');
  const startOverBtn = document.getElementById('jpg-start-over-btn');
  const resultSummary = document.getElementById('jpg-result-summary');

  let generatedPdfBytes = null;

  function init() {
    if (!dropzone || !fileInput) return;

    browseBtn.addEventListener('click', () => fileInput.click());
    dropzone.addEventListener('click', (e) => {
      if (e.target !== browseBtn && !browseBtn.contains(e.target)) {
        fileInput.click();
      }
    });

    ['dragenter', 'dragover'].forEach(name => {
      dropzone.addEventListener(name, (e) => {
        e.preventDefault();
        dropzone.classList.add('border-blue-500', 'bg-blue-50/80');
      });
    });

    ['dragleave', 'drop'].forEach(name => {
      dropzone.addEventListener(name, (e) => {
        e.preventDefault();
        dropzone.classList.remove('border-blue-500', 'bg-blue-50/80');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      if (e.dataTransfer && e.dataTransfer.files) {
        handleFiles(e.dataTransfer.files);
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files) {
        handleFiles(fileInput.files);
        fileInput.value = '';
      }
    });

    addMoreBtn.addEventListener('click', () => fileInput.click());
    clearBtn.addEventListener('click', resetAll);
    startOverBtn.addEventListener('click', resetAll);
    convertBtn.addEventListener('click', convertToPdf);
    downloadBtn.addEventListener('click', triggerDownload);
  }

  function handleFiles(fileList) {
    const validFiles = Array.from(fileList).filter(f => f.type.startsWith('image/'));
    if (!validFiles.length) {
      alert('Please select valid image files (JPG, PNG, WebP).');
      return;
    }

    let loaded = 0;
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        const img = new Image();
        img.onload = () => {
          imagesList.push({
            id: 'img_' + Math.random().toString(36).substring(2, 9),
            file: file,
            dataUrl: dataUrl,
            width: img.naturalWidth,
            height: img.naturalHeight
          });
          loaded++;
          if (loaded === validFiles.length) {
            renderGrid();
          }
        };
        img.src = dataUrl;
      };
      reader.readAsDataURL(file);
    });
  }

  function renderGrid() {
    if (!imagesList.length) {
      dropzone.classList.remove('hidden');
      workspace.classList.add('hidden');
      return;
    }

    dropzone.classList.add('hidden');
    workspace.classList.remove('hidden');
    countBadge.textContent = imagesList.length + (imagesList.length === 1 ? ' image' : ' images');

    grid.innerHTML = '';
    imagesList.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'relative p-2 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center group';
      card.innerHTML = 
        <div class="w-full h-28 bg-slate-200 rounded-lg overflow-hidden flex items-center justify-center mb-2">
          <img src="" alt="Preview" class="w-full h-full object-cover" />
        </div>
        <span class="text-[11px] font-semibold text-slate-700 truncate w-full text-center"></span>
        <span class="text-[10px] text-slate-400">Page </span>
        <div class="flex items-center space-x-1 mt-1.5">
          <button type="button" class="move-up px-1.5 py-0.5 text-[10px] bg-slate-200 hover:bg-slate-300 rounded font-bold text-slate-700 ">↑</button>
          <button type="button" class="move-down px-1.5 py-0.5 text-[10px] bg-slate-200 hover:bg-slate-300 rounded font-bold text-slate-700 ">↓</button>
          <button type="button" class="delete-img px-1.5 py-0.5 text-[10px] bg-red-100 hover:bg-red-200 text-red-600 rounded font-bold">✕</button>
        </div>
      ;

      card.querySelector('.move-up').addEventListener('click', () => {
        if (index > 0) {
          const temp = imagesList[index];
          imagesList[index] = imagesList[index - 1];
          imagesList[index - 1] = temp;
          renderGrid();
        }
      });

      card.querySelector('.move-down').addEventListener('click', () => {
        if (index < imagesList.length - 1) {
          const temp = imagesList[index];
          imagesList[index] = imagesList[index + 1];
          imagesList[index + 1] = temp;
          renderGrid();
        }
      });

      card.querySelector('.delete-img').addEventListener('click', () => {
        imagesList.splice(index, 1);
        renderGrid();
      });

      grid.appendChild(card);
    });
  }

  async function convertToPdf() {
    if (!imagesList.length || isConverting) return;
    if (typeof PDFLib === 'undefined') {
      alert('PDF library is loading, please try again in a moment.');
      return;
    }

    isConverting = true;
    workspace.classList.add('hidden');
    progressDiv.classList.remove('hidden');

    try {
      const pdfDoc = await PDFLib.PDFDocument.create();
      const orientation = orientationSelect.value; // 'auto', 'portrait', 'landscape'

      for (let i = 0; i < imagesList.length; i++) {
        const item = imagesList[i];
        progressText.textContent = Converting image  of ...;

        let embeddedImage;
        const fileType = item.file.type;
        const arrayBuffer = await item.file.arrayBuffer();

        if (fileType === 'image/jpeg' || fileType === 'image/jpg') {
          embeddedImage = await pdfDoc.embedJpg(arrayBuffer);
        } else if (fileType === 'image/png') {
          embeddedImage = await pdfDoc.embedPng(arrayBuffer);
        } else {
          // For WebP or other formats, convert to PNG via canvas first
          const pngBuffer = await convertDataUrlToPngBuffer(item.dataUrl);
          embeddedImage = await pdfDoc.embedPng(pngBuffer);
        }

        const imgWidth = embeddedImage.width;
        const imgHeight = embeddedImage.height;

        let pageWidth, pageHeight;

        if (orientation === 'portrait') {
          pageWidth = 595.28; // Standard A4 portrait
          pageHeight = 841.89;
        } else if (orientation === 'landscape') {
          pageWidth = 841.89; // Standard A4 landscape
          pageHeight = 595.28;
        } else {
          // Auto: match image dimensions or proportional A4
          pageWidth = imgWidth;
          pageHeight = imgHeight;
        }

        const page = pdfDoc.addPage([pageWidth, pageHeight]);

        // Scale image to fit inside page with margins
        const margin = 20;
        const maxWidth = pageWidth - (margin * 2);
        const maxHeight = pageHeight - (margin * 2);

        const scale = Math.min(maxWidth / imgWidth, maxHeight / imgHeight, 1);
        const drawWidth = imgWidth * scale;
        const drawHeight = imgHeight * scale;
        const drawX = (pageWidth - drawWidth) / 2;
        const drawY = (pageHeight - drawHeight) / 2;

        page.drawImage(embeddedImage, {
          x: drawX,
          y: drawY,
          width: drawWidth,
          height: drawHeight
        });
      }

      progressText.textContent = 'Finalizing your PDF...';
      generatedPdfBytes = await pdfDoc.save();

      progressDiv.classList.add('hidden');
      resultDiv.classList.remove('hidden');
      resultSummary.textContent = Successfully converted  images into a clean PDF ( KB).;

      // Trigger Celebration Confetti
      fireConfetti();

      // Trigger automatic download
      triggerDownload();

    } catch (err) {
      console.error('Conversion error:', err);
      alert('Failed to convert images: ' + (err.message || 'Unknown error'));
      progressDiv.classList.add('hidden');
      workspace.classList.remove('hidden');
    } finally {
      isConverting = false;
    }
  }

  function convertDataUrlToPngBuffer(dataUrl) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          blob.arrayBuffer().then(resolve);
        }, 'image/png');
      };
      img.src = dataUrl;
    });
  }

  function triggerDownload() {
    if (!generatedPdfBytes) return;
    const blob = new Blob([generatedPdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted_mergepdffilesfree.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  function resetAll() {
    imagesList = [];
    generatedPdfBytes = null;
    resultDiv.classList.add('hidden');
    progressDiv.classList.add('hidden');
    workspace.classList.add('hidden');
    dropzone.classList.remove('hidden');
  }

  function fireConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#2563eb', '#4f46e5', '#10b981', '#f59e0b', '#ec4899'];

    for (let i = 0; i < 75; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        r: Math.random() * 5 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.7) * 14,
        alpha: 1
      });
    }

    let animationFrame;
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.alpha -= 0.015;
        if (p.alpha > 0) {
          alive = true;
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      if (alive) {
        animationFrame = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    render();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
