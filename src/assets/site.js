// 保險工具人 · 全站共用前端腳本
// 明暗模式（localStorage 記憶）＋ 切換圖示 ＋ 自動年份
(function () {
  var root = document.documentElement;
  var toggle = document.querySelector('[data-theme-toggle]');
  var yearEls = document.querySelectorAll('[data-year]');

  function paint(theme) {
    root.setAttribute('data-theme', theme);
    if (toggle) {
      var icon = toggle.querySelector('[data-theme-icon]');
      if (icon) {
        icon.innerHTML = theme === 'dark'
          ? '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>'
          : '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
      }
      toggle.setAttribute('aria-label', theme === 'dark' ? '切換淺色模式' : '切換深色模式');
    }
  }

  var theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  paint(theme);

  if (toggle) {
    toggle.addEventListener('click', function () {
      theme = theme === 'dark' ? 'light' : 'dark';
      paint(theme);
      try { localStorage.setItem('insurance-toolman-theme', theme); } catch (e) {}
    });
  }

  yearEls.forEach(function (e) { e.textContent = new Date().getFullYear(); });
})();