/**
 * MergePDFFilesFree.com - Global Multi-Language Application Controller (js/app.js)
 * 100% Client-Side In-Browser PDF Processing
 * Zero External CDNs • Zero Server Uploads • Zero CLS
 * Supports Top 10 Global Languages: en, es, fr, de, pt, ru, ja, zh, ar, it
 */

(function () {
  'use strict';

  // Detect current document language (fallback to 'en')
  const docLang = (document.documentElement.lang || 'en').toLowerCase().substring(0, 2);

  // Comprehensive UI Localization Dictionary (10 Global Languages)
  const i18n = {
    en: {
      invalidPdf: "Oops! Looks like you didn't select a valid PDF. Let's try that again with .pdf files.",
      needTwo: "Please select at least 2 PDF files to merge.",
      merging: "Merging your files locally... almost done! 🚀",
      mergingFile: 'Merging "{name}" ({curr} of {total})...',
      finalizing: "Finalizing your combined PDF...",
      complete: "Merge Complete! 🚀",
      errorMerge: "Could not merge these PDF files. Please ensure none of the files are password-encrypted or corrupt.",
      summary: "Successfully merged {count} documents into 1 PDF with {pages} pages ({size}).",
      page: "page",
      pages: "pages",
      file: "file",
      files: "files",
      reading: "Reading...",
      encrypted: "Encrypted",
      ready: "Ready",
      err: "Error",
      moveUp: "Move Up",
      moveDown: "Move Down",
      remove: "Remove PDF"
    },
    es: {
      invalidPdf: "¡Ups! Parece que no seleccionaste un PDF válido. Intentémoslo de nuevo con archivos .pdf.",
      needTwo: "Por favor, selecciona al menos 2 archivos PDF para unir.",
      merging: "Uniendo tus archivos localmente... ¡casi listo! 🚀",
      mergingFile: 'Uniendo "{name}" ({curr} de {total})...',
      finalizing: "Finalizando tu PDF combinado...",
      complete: "¡Fusión completada! 🚀",
      errorMerge: "No se pudieron unir los archivos. Asegúrate de que no tengan contraseña ni estén dañados.",
      summary: "Se unieron con éxito {count} documentos en 1 PDF con {pages} páginas ({size}).",
      page: "página",
      pages: "páginas",
      file: "archivo",
      files: "archivos",
      reading: "Leyendo...",
      encrypted: "Protegido",
      ready: "Listo",
      err: "Error",
      moveUp: "Mover arriba",
      moveDown: "Mover abajo",
      remove: "Eliminar"
    },
    fr: {
      invalidPdf: "Oups ! Il semble que vous n'ayez pas sélectionné un PDF valide. Réessayons avec des fichiers .pdf.",
      needTwo: "Veuillez sélectionner au moins 2 fichiers PDF à fusionner.",
      merging: "Fusion de vos fichiers en local... presque terminé ! 🚀",
      mergingFile: 'Fusion de "{name}" ({curr} sur {total})...',
      finalizing: "Finalisation de votre PDF combiné...",
      complete: "Fusion terminée ! 🚀",
      errorMerge: "Impossible de fusionner ces fichiers. Vérifiez qu'aucun n'est protégé par mot de passe.",
      summary: "{count} documents fusionnés avec succès en 1 PDF de {pages} pages ({size}).",
      page: "page",
      pages: "pages",
      file: "fichier",
      files: "fichiers",
      reading: "Lecture...",
      encrypted: "Chiffré",
      ready: "Prêt",
      err: "Erreur",
      moveUp: "Monter",
      moveDown: "Descendre",
      remove: "Supprimer"
    },
    de: {
      invalidPdf: "Hoppla! Sie haben keine gültige PDF-Datei ausgewählt. Bitte versuchen Sie es erneut mit .pdf-Dateien.",
      needTwo: "Bitte wählen Sie mindestens 2 PDF-Dateien zum Zusammenfügen aus.",
      merging: "Führe Dateien lokal zusammen... fast fertig! 🚀",
      mergingFile: 'Führe "{name}" zusammen ({curr} von {total})...',
      finalizing: "Stelle kombiniertes PDF fertig...",
      complete: "Zusammenfügen abgeschlossen! 🚀",
      errorMerge: "PDF-Dateien konnten nicht zusammengefügt werden. Bitte prüfen Sie auf Passwortschutz.",
      summary: "Erfolgreich {count} Dokumente zu 1 PDF mit {pages} Seiten zusammengefügt ({size}).",
      page: "Seite",
      pages: "Seiten",
      file: "Datei",
      files: "Dateien",
      reading: "Lese...",
      encrypted: "Geschützt",
      ready: "Bereit",
      err: "Fehler",
      moveUp: "Nach oben",
      moveDown: "Nach unten",
      remove: "Entfernen"
    },
    pt: {
      invalidPdf: "Opa! Parece que você não selecionou um PDF válido. Vamos tentar novamente com arquivos .pdf.",
      needTwo: "Por favor, selecione pelo menos 2 arquivos PDF para juntar.",
      merging: "Juntando seus arquivos localmente... quase pronto! 🚀",
      mergingFile: 'Juntando "{name}" ({curr} de {total})...',
      finalizing: "Finalizando seu PDF combinado...",
      complete: "Fusão concluída! 🚀",
      errorMerge: "Não foi possível juntar os arquivos. Certifique-se de que não estejam protegidos por senha.",
      summary: "{count} documentos combinados com sucesso em 1 PDF de {pages} páginas ({size}).",
      page: "página",
      pages: "páginas",
      file: "arquivo",
      files: "arquivos",
      reading: "Lendo...",
      encrypted: "Protegido",
      ready: "Pronto",
      err: "Erro",
      moveUp: "Mover para cima",
      moveDown: "Mover para baixo",
      remove: "Remover"
    },
    ru: {
      invalidPdf: "Ой! Похоже, вы выбрали не PDF файл. Пожалуйста, выберите файлы с расширением .pdf.",
      needTwo: "Пожалуйста, выберите как минимум 2 PDF файла для объединения.",
      merging: "Объединяем файлы прямо в браузере... почти готово! 🚀",
      mergingFile: 'Объединение "{name}" ({curr} из {total})...',
      finalizing: "Финализация объединенного PDF...",
      complete: "Готово! 🚀",
      errorMerge: "Не удалось объединить файлы. Убедитесь, что они не защищены паролем и не повреждены.",
      summary: "Успешно объединено {count} документов в 1 PDF с {pages} страницами ({size}).",
      page: "страница",
      pages: "страниц",
      file: "файл",
      files: "файлов",
      reading: "Чтение...",
      encrypted: "Защищен",
      ready: "Готов",
      err: "Ошибка",
      moveUp: "Вверх",
      moveDown: "Вниз",
      remove: "Удалить"
    },
    ja: {
      invalidPdf: "おっと！有効なPDFファイルが選択されていません。.pdfファイルで再度お試しください。",
      needTwo: "結合するには少なくとも2つのPDFファイルを選択してください。",
      merging: "ブラウザ内で安全に結合中... もうすぐ完了します！ 🚀",
      mergingFile: '"{name}" を結合中 ({curr} / {total})...',
      finalizing: "結合されたPDFを生成中...",
      complete: "結合が完了しました！ 🚀",
      errorMerge: "ファイルを結合できませんでした。パスワード保護や破損がないか確認してください。",
      summary: "{count} 個のファイルを {pages} ページの1つのPDFに正常に結合しました ({size})。",
      page: "ページ",
      pages: "ページ",
      file: "ファイル",
      files: "ファイル",
      reading: "読み込み中...",
      encrypted: "暗号化",
      ready: "準備完了",
      err: "エラー",
      moveUp: "上へ移動",
      moveDown: "下へ移動",
      remove: "削除"
    },
    zh: {
      invalidPdf: "哎呀！您选择的似乎不是有效的PDF文件。请重新选择.pdf格式的文件。",
      needTwo: "请至少选择 2 个 PDF 文件进行合并。",
      merging: "正在本地快速合并您的文件... 马上完成！ 🚀",
      mergingFile: '正在合并 "{name}" ({curr} / {total})...',
      finalizing: "正在生成最终的合并 PDF...",
      complete: "合并完成！ 🚀",
      errorMerge: "无法合并这些 PDF 文件，请确保文件未加密且未损坏。",
      summary: "成功将 {count} 个文档合并为包含 {pages} 页的单一 PDF ({size})。",
      page: "页",
      pages: "页",
      file: "个文件",
      files: "个文件",
      reading: "读取中...",
      encrypted: "已加密",
      ready: "就绪",
      err: "错误",
      moveUp: "上移",
      moveDown: "下移",
      remove: "删除"
    },
    ar: {
      invalidPdf: "عذراً! يبدو أنك لم تختر ملف PDF صالح. يرجى المحاولة مرة أخرى باستخدام ملفات .pdf.",
      needTwo: "يرجى تحديد ملفي PDF على الأقل للدمج.",
      merging: "جاري دمج ملفاتك محلياً... أوشكنا على الانتهاء! 🚀",
      mergingFile: 'جاري دمج "{name}" ({curr} من {total})...',
      finalizing: "جاري إنهاء ملف PDF المدمج...",
      complete: "اكتمل الدمج بنجاح! 🚀",
      errorMerge: "تعذر دمج ملفات PDF هذه. يرجى التأكد من أنها ليست محمية بكلمة مرور أو تالفة.",
      summary: "تم دمج {count} مستندات بنجاح في ملف PDF واحد يحتوي على {pages} صفحة ({size}).",
      page: "صفحة",
      pages: "صفحات",
      file: "ملف",
      files: "ملفات",
      reading: "جاري القراءة...",
      encrypted: "محمي",
      ready: "جاهز",
      err: "خطأ",
      moveUp: "تحريك لأعلى",
      moveDown: "تحريك لأسفل",
      remove: "حذف"
    },
    it: {
      invalidPdf: "Ops! Sembra che tu non abbia selezionato un PDF valido. Riprova con file .pdf.",
      needTwo: "Seleziona almeno 2 file PDF da unire.",
      merging: "Unione dei file in corso localmente... quasi fatto! 🚀",
      mergingFile: 'Unione di "{name}" ({curr} di {total})...',
      finalizing: "Finalizzazione del tuo PDF unito...",
      complete: "Unione completata! 🚀",
      errorMerge: "Impossibile unire questi PDF. Assicurati che non siano protetti da password o danneggiati.",
      summary: "Uniti con successo {count} documenti in 1 PDF di {pages} pagine ({size}).",
      page: "pagina",
      pages: "pagine",
      file: "file",
      files: "file",
      reading: "Lettura...",
      encrypted: "Protetto",
      ready: "Pronto",
      err: "Errore",
      moveUp: "Sposta su",
      moveDown: "Sposta giù",
      remove: "Rimuovi"
    }
  };

  const t = i18n[docLang] || i18n.en;

  // Internal State
  let selectedFiles = [];
  let isMerging = false;
  let mergedBlobUrl = null;

  // DOM Elements Cache
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('file-input');
  const browseBtn = document.getElementById('browse-btn');
  const dragOverlay = document.getElementById('drag-overlay');
  const fileManagementContainer = document.getElementById('file-management-container');
  const fileList = document.getElementById('file-list');
  const selectedCountBadge = document.getElementById('selected-count-badge');
  const addMoreBtn = document.getElementById('add-more-btn');
  const clearAllBtn = document.getElementById('clear-all-btn');
  const mergeNowBtn = document.getElementById('merge-now-btn');
  const processingContainer = document.getElementById('processing-container');
  const processingText = document.getElementById('processing-text');
  const processingProgressBar = document.getElementById('processing-progress-bar');
  const successContainer = document.getElementById('success-container');
  const successSummary = document.getElementById('success-summary');
  const downloadMergedBtn = document.getElementById('download-merged-btn');
  const startOverBtn = document.getElementById('start-over-btn');
  const langButton = document.getElementById('lang-menu-button');
  const langDropdown = document.getElementById('lang-dropdown');

  // Format bytes helper
  function formatBytes(bytes, decimals = 1) {
    if (!+bytes) return '0 B';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  // Prevent XSS
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text || '';
    return div.innerHTML;
  }

  // Initialize
  function init() {
    if (!dropzone || !fileInput) return;

    // File Browser Triggers
    if (browseBtn) {
      browseBtn.addEventListener('click', () => fileInput.click());
    }
    dropzone.addEventListener('click', (e) => {
      if (browseBtn && e.target !== browseBtn && !browseBtn.contains(e.target)) {
        fileInput.click();
      }
    });

    // Drag and Drop Feedback
    let dragCounter = 0;
    ['dragenter'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter++;
        if (dragOverlay) dragOverlay.classList.remove('hidden');
      });
    });

    ['dragleave'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter--;
        if (dragCounter <= 0) {
          dragCounter = 0;
          if (dragOverlay) dragOverlay.classList.add('hidden');
        }
      });
    });

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.stopPropagation();
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter = 0;
      if (dragOverlay) dragOverlay.classList.add('hidden');
      if (e.dataTransfer && e.dataTransfer.files) {
        handleIncomingFiles(e.dataTransfer.files);
      }
    });

    // Input Change
    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files.length) {
        handleIncomingFiles(fileInput.files);
        fileInput.value = '';
      }
    });

    // Button Events
    if (addMoreBtn) addMoreBtn.addEventListener('click', () => fileInput.click());
    if (clearAllBtn) clearAllBtn.addEventListener('click', resetAll);
    if (mergeNowBtn) mergeNowBtn.addEventListener('click', executeMerge);
    if (startOverBtn) startOverBtn.addEventListener('click', resetAll);

    // Language Dropdown
    if (langButton && langDropdown) {
      langButton.addEventListener('click', (e) => {
        e.stopPropagation();
        if (typeof megaMenuPanel !== 'undefined' && megaMenuPanel) megaMenuPanel.classList.add('hidden');
        const isHidden = langDropdown.classList.toggle('hidden');
        langButton.setAttribute('aria-expanded', !isHidden);
      });
      document.addEventListener('click', () => {
        langDropdown.classList.add('hidden');
        langButton.setAttribute('aria-expanded', 'false');
      });
    }

    // Mega Menu Dropdown Logic
    const megaMenuBtn = document.getElementById('mega-menu-btn');
    const megaMenuPanel = document.getElementById('mega-menu-panel');
    const megaMenuChevron = document.getElementById('mega-menu-chevron');

    if (megaMenuBtn && megaMenuPanel) {
      megaMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (langDropdown) langDropdown.classList.add('hidden');
        const isHidden = megaMenuPanel.classList.toggle('hidden');
        megaMenuBtn.setAttribute('aria-expanded', !isHidden);
        if (megaMenuChevron) {
          if (!isHidden) {
            megaMenuChevron.classList.add('rotate-180');
          } else {
            megaMenuChevron.classList.remove('rotate-180');
          }
        }
      });

      document.addEventListener('click', (e) => {
        if (!megaMenuPanel.contains(e.target) && !megaMenuBtn.contains(e.target)) {
          megaMenuPanel.classList.add('hidden');
          megaMenuBtn.setAttribute('aria-expanded', 'false');
          if (megaMenuChevron) megaMenuChevron.classList.remove('rotate-180');
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          megaMenuPanel.classList.add('hidden');
          megaMenuBtn.setAttribute('aria-expanded', 'false');
          if (megaMenuChevron) megaMenuChevron.classList.remove('rotate-180');
        }
      });
    }

    // Tools Filter Tabs Logic
    const filterBtns = document.querySelectorAll('.tools-filter-btn');
    const toolCards = document.querySelectorAll('.pdf-tool-card');

    if (filterBtns.length > 0 && toolCards.length > 0) {
      filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          filterBtns.forEach((b) => {
            b.classList.remove('bg-blue-600', 'text-white', 'shadow-sm');
            b.classList.add('bg-white', 'text-slate-600', 'border', 'border-slate-200');
          });
          btn.classList.add('bg-blue-600', 'text-white', 'shadow-sm');
          btn.classList.remove('bg-white', 'text-slate-600', 'border', 'border-slate-200');

          const filter = btn.getAttribute('data-filter');
          toolCards.forEach((card) => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
              card.classList.remove('hidden');
            } else {
              card.classList.add('hidden');
            }
          });
        });
      });
    }
  }

  // Handle & Validate Files
  async function handleIncomingFiles(incomingFiles) {
    const rawFiles = Array.from(incomingFiles);
    const validPdfs = rawFiles.filter(f => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'));

    if (validPdfs.length === 0) {
      alert(t.invalidPdf);
      return;
    }

    if (successContainer) successContainer.classList.add('hidden');
    if (processingContainer) processingContainer.classList.add('hidden');

    for (const file of validPdfs) {
      const fileId = 'pdf_' + Math.random().toString(36).substr(2, 9);
      const item = {
        id: fileId,
        file: file,
        name: file.name,
        size: file.size,
        pageCount: t.reading,
        arrayBuffer: null
      };

      selectedFiles.push(item);
      renderFileList();

      try {
        const buffer = await file.arrayBuffer();
        item.arrayBuffer = buffer;

        const PDFLibInstance = window.PDFLib || (typeof PDFLib !== 'undefined' ? PDFLib : null);
        if (PDFLibInstance) {
          try {
            const pdfDoc = await PDFLibInstance.PDFDocument.load(buffer, { ignoreEncryption: true });
            item.pageCount = pdfDoc.getPageCount();
          } catch (loadErr) {
            item.pageCount = t.encrypted;
          }
        } else {
          item.pageCount = t.ready;
        }
      } catch (readErr) {
        console.error('Error reading PDF:', readErr);
        item.pageCount = t.err;
      }
      renderFileList();
    }

    updateUIState();
  }

  // Render Touch-Friendly File List
  function renderFileList() {
    if (!fileList) return;
    fileList.innerHTML = '';

    selectedFiles.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'flex items-center justify-between p-2.5 sm:p-3 bg-white border border-slate-200 rounded-xl shadow-2xs hover:border-slate-300 transition-all';
      card.setAttribute('data-id', item.id);

      const pageBadge = typeof item.pageCount === 'number'
        ? `<span class="px-2 py-0.5 text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 rounded-md">${item.pageCount} ${item.pageCount === 1 ? t.page : t.pages}</span>`
        : `<span class="px-2 py-0.5 text-[11px] font-medium text-slate-500 bg-slate-100 rounded-md">${item.pageCount}</span>`;

      card.innerHTML = `
        <div class="flex items-center space-x-2.5 sm:space-x-3 min-w-0 flex-1">
          <span class="flex-shrink-0 w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center border border-slate-200">
            ${index + 1}
          </span>
          <div class="flex-shrink-0 text-red-500">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7 2h7l5 5v13a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2zm6 1.5V8h4.5L13 3.5zm-5 8v2h8v-2H8zm0 3v2h8v-2H8z"/></svg>
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-xs sm:text-sm font-semibold text-slate-900 truncate" title="${escapeHtml(item.name)}">${escapeHtml(item.name)}</p>
            <div class="flex items-center space-x-2 mt-0.5">
              <span class="text-[11px] text-slate-500">${formatBytes(item.size)}</span>
              <span class="text-[11px] text-slate-300">&bull;</span>
              ${pageBadge}
            </div>
          </div>
        </div>

        <div class="flex items-center space-x-1 sm:space-x-1.5 flex-shrink-0 ml-2">
          <button type="button" class="btn-move-up p-2 sm:p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors ${index === 0 ? 'opacity-30 cursor-not-allowed' : ''}" title="${t.moveUp}" data-index="${index}" ${index === 0 ? 'disabled' : ''} aria-label="${t.moveUp}">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/></svg>
          </button>
          <button type="button" class="btn-move-down p-2 sm:p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors ${index === selectedFiles.length - 1 ? 'opacity-30 cursor-not-allowed' : ''}" title="${t.moveDown}" data-index="${index}" ${index === selectedFiles.length - 1 ? 'disabled' : ''} aria-label="${t.moveDown}">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <button type="button" class="btn-remove p-2 sm:p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="${t.remove}" data-index="${index}" aria-label="${t.remove}">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
      `;

      fileList.appendChild(card);
    });

    // Reorder Handlers
    fileList.querySelectorAll('.btn-move-up').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        if (idx > 0) {
          const temp = selectedFiles[idx];
          selectedFiles[idx] = selectedFiles[idx - 1];
          selectedFiles[idx - 1] = temp;
          renderFileList();
        }
      });
    });

    fileList.querySelectorAll('.btn-move-down').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        if (idx < selectedFiles.length - 1) {
          const temp = selectedFiles[idx];
          selectedFiles[idx] = selectedFiles[idx + 1];
          selectedFiles[idx + 1] = temp;
          renderFileList();
        }
      });
    });

    fileList.querySelectorAll('.btn-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        selectedFiles.splice(idx, 1);
        renderFileList();
        updateUIState();
      });
    });
  }

  // Update Visibility
  function updateUIState() {
    if (selectedFiles.length > 0) {
      if (dropzone) dropzone.classList.add('hidden');
      if (fileManagementContainer) fileManagementContainer.classList.remove('hidden');
      if (selectedCountBadge) {
        selectedCountBadge.textContent = `${selectedFiles.length} ${selectedFiles.length === 1 ? t.file : t.files}`;
      }
    } else {
      if (dropzone) dropzone.classList.remove('hidden');
      if (fileManagementContainer) fileManagementContainer.classList.add('hidden');
    }

    if (mergeNowBtn) {
      if (selectedFiles.length >= 2) {
        mergeNowBtn.disabled = false;
        mergeNowBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        mergeNowBtn.classList.add('hover:bg-blue-700', 'shadow-lg');
      } else {
        mergeNowBtn.disabled = true;
        mergeNowBtn.classList.add('opacity-50', 'cursor-not-allowed');
        mergeNowBtn.classList.remove('hover:bg-blue-700', 'shadow-lg');
      }
    }
  }

  // 100% Client-Side PDF Merge Execution
  async function executeMerge() {
    if (selectedFiles.length < 2) {
      alert(t.needTwo);
      return;
    }

    if (isMerging) return;

    const PDFLibInstance = window.PDFLib || (typeof PDFLib !== 'undefined' ? PDFLib : null);
    if (!PDFLibInstance) {
      alert(t.err);
      return;
    }

    isMerging = true;
    if (fileManagementContainer) fileManagementContainer.classList.add('hidden');
    if (processingContainer) processingContainer.classList.remove('hidden');
    if (successContainer) successContainer.classList.add('hidden');

    try {
      const { PDFDocument } = PDFLibInstance;
      const mergedPdf = await PDFDocument.create();
      let totalPagesMerged = 0;

      for (let i = 0; i < selectedFiles.length; i++) {
        const item = selectedFiles[i];
        const percent = Math.round(((i + 1) / selectedFiles.length) * 85);
        if (processingProgressBar) processingProgressBar.style.width = `${percent}%`;
        if (processingText) {
          processingText.textContent = t.mergingFile
            .replace('{name}', item.name)
            .replace('{curr}', i + 1)
            .replace('{total}', selectedFiles.length);
        }

        let buffer = item.arrayBuffer;
        if (!buffer) {
          buffer = await item.file.arrayBuffer();
          item.arrayBuffer = buffer;
        }

        const sourceDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
        const pageIndices = sourceDoc.getPageIndices();
        const copiedPages = await mergedPdf.copyPages(sourceDoc, pageIndices);

        copiedPages.forEach(page => {
          mergedPdf.addPage(page);
          totalPagesMerged++;
        });
      }

      if (processingText) processingText.textContent = t.finalizing;
      if (processingProgressBar) processingProgressBar.style.width = '95%';

      const mergedBytes = await mergedPdf.save();
      const blob = new Blob([mergedBytes], { type: 'application/pdf' });

      if (mergedBlobUrl) {
        URL.revokeObjectURL(mergedBlobUrl);
      }
      mergedBlobUrl = URL.createObjectURL(blob);

      if (processingProgressBar) processingProgressBar.style.width = '100%';
      if (processingText) processingText.textContent = t.complete;

      setTimeout(() => {
        if (processingContainer) processingContainer.classList.add('hidden');
        if (successContainer) successContainer.classList.remove('hidden');

        const totalSizeFormatted = formatBytes(mergedBytes.byteLength);
        if (successSummary) {
          successSummary.textContent = t.summary
            .replace('{count}', selectedFiles.length)
            .replace('{pages}', totalPagesMerged)
            .replace('{size}', totalSizeFormatted);
        }

        // Trigger Confetti Celebration
        launchConfetti();

        // Exact Required Auto-Download File Name
        const downloadFilename = 'merged_mergepdffilesfree.pdf';
        const autoLink = document.createElement('a');
        autoLink.href = mergedBlobUrl;
        autoLink.download = downloadFilename;
        document.body.appendChild(autoLink);
        autoLink.click();
        document.body.removeChild(autoLink);

        if (downloadMergedBtn) {
          downloadMergedBtn.onclick = () => {
            const manualLink = document.createElement('a');
            manualLink.href = mergedBlobUrl;
            manualLink.download = downloadFilename;
            document.body.appendChild(manualLink);
            manualLink.click();
            document.body.removeChild(manualLink);
          };
        }
      }, 450);

    } catch (error) {
      console.error('Merge Failure:', error);
      alert(t.errorMerge);
      if (processingContainer) processingContainer.classList.add('hidden');
      if (fileManagementContainer) fileManagementContainer.classList.remove('hidden');
    } finally {
      isMerging = false;
    }
  }

  // Reset
  function resetAll() {
    selectedFiles = [];
    isMerging = false;
    if (mergedBlobUrl) {
      URL.revokeObjectURL(mergedBlobUrl);
      mergedBlobUrl = null;
    }
    if (fileList) fileList.innerHTML = '';
    if (fileManagementContainer) fileManagementContainer.classList.add('hidden');
    if (processingContainer) processingContainer.classList.add('hidden');
    if (successContainer) successContainer.classList.add('hidden');
    if (dropzone) dropzone.classList.remove('hidden');
    if (fileInput) fileInput.value = '';
    updateUIState();
  }

  // Native Lightweight Canvas Confetti Burst
  function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const colors = ['#2563EB', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#3B82F6'];

    for (let i = 0; i < 90; i++) {
      pieces.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        w: Math.random() * 8 + 4,
        h: Math.random() * 6 + 4,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.7) * 14,
        rot: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1
      });
    }

    let animationFrame;
    const startTime = Date.now();

    function render() {
      const elapsed = Date.now() - startTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pieces.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35;
        p.rot += p.vRot;
        p.alpha = Math.max(0, 1 - elapsed / 2200);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      if (elapsed < 2200) {
        animationFrame = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animationFrame);
      }
    }

    render();
  }

  // Auto-init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
