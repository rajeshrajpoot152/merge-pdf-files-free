/**
 * MergePDFFilesFree - Workspace Controller
 * Controls the left sidebar collapse/expand, tool search, and mobile drawer.
 */
document.addEventListener('DOMContentLoaded', function () {
  const sidebar = document.getElementById('workspace-sidebar');
  const toggleBtn = document.getElementById('sidebar-toggle-btn');
  const toggleIcon = document.getElementById('sidebar-toggle-icon');
  const mobileToggleBtn = document.getElementById('mobile-sidebar-toggle');
  const closeMobileBtn = document.getElementById('mobile-sidebar-close');
  const backdrop = document.getElementById('sidebar-backdrop');
  const searchInput = document.getElementById('sidebar-search-input');
  const toolLinks = document.querySelectorAll('.tool-link');

  // 1. Desktop Toggle & LocalStorage Memory
  const isCollapsed = localStorage.getItem('mergepdf_sidebar_collapsed') === 'true';
  if (isCollapsed && sidebar && window.innerWidth >= 1024) {
    sidebar.classList.add('collapsed');
    updateToggleIcon(true);
  }

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', function () {
      const currentlyCollapsed = sidebar.classList.toggle('collapsed');
      localStorage.setItem('mergepdf_sidebar_collapsed', currentlyCollapsed);
      updateToggleIcon(currentlyCollapsed);
    });
  }

  function updateToggleIcon(collapsed) {
    if (!toggleIcon) return;
    if (collapsed) {
      toggleIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />';
      if (toggleBtn) toggleBtn.setAttribute('title', 'Expand Tools Sidebar (Ctrl+B)');
    } else {
      toggleIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />';
      if (toggleBtn) toggleBtn.setAttribute('title', 'Collapse Tools Sidebar (Ctrl+B)');
    }
  }

  // Keyboard shortcut Ctrl+B or Cmd+B
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      if (toggleBtn) toggleBtn.click();
    }
  });

  // 2. Mobile Drawer Open/Close
  if (mobileToggleBtn && sidebar) {
    mobileToggleBtn.addEventListener('click', function () {
      sidebar.classList.remove('-translate-x-full');
      sidebar.classList.remove('collapsed');
      if (backdrop) backdrop.classList.remove('hidden');
      document.body.classList.add('overflow-hidden', 'lg:overflow-auto');
    });
  }

  function closeMobileDrawer() {
    if (!sidebar) return;
    sidebar.classList.add('-translate-x-full');
    if (backdrop) backdrop.classList.add('hidden');
    document.body.classList.remove('overflow-hidden', 'lg:overflow-auto');
  }

  if (closeMobileBtn) closeMobileBtn.addEventListener('click', closeMobileDrawer);
  if (backdrop) backdrop.addEventListener('click', closeMobileDrawer);

  // 3. Real-time Search / Filter across tools in sidebar
  if (searchInput) {
    searchInput.addEventListener('input', function (e) {
      const q = e.target.value.toLowerCase().trim();
      let matchCount = 0;

      toolLinks.forEach(function (link) {
        const text = link.textContent.toLowerCase();
        const parentLi = link.closest('li');
        if (!parentLi) return;

        if (!q || text.includes(q)) {
          parentLi.style.display = '';
          matchCount++;
        } else {
          parentLi.style.display = 'none';
        }
      });

      // Show/hide category headers based on whether any tools in that category are visible
      document.querySelectorAll('.tool-category-group').forEach(function (group) {
        const visibleItems = group.querySelectorAll('li:not([style*="display: none"])');
        group.style.display = visibleItems.length > 0 ? '' : 'none';
      });
    });
  }
});
