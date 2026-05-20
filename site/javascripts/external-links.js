/* === external-links.js ===
 * Открывает все внешние ссылки в новой вкладке.
 * Внутренние ссылки (на текущий домен или относительные) — без изменений.
 * Добавляет rel="noopener noreferrer" для безопасности.
 *
 * Подключается в mkdocs.yml:
 *   extra_javascript:
 *     - javascripts/external-links.js
 *
 * Поддерживает SPA-навигацию Material (instant loading): обработчик
 * срабатывает на каждой смене страницы, не только при первом запуске.
 */

(function() {
  'use strict';

  function processLinks() {
    var currentHost = window.location.hostname;
    var links = document.querySelectorAll('a[href]');

    links.forEach(function(link) {
      // Пропустить, если уже обработано
      if (link.hasAttribute('data-external-processed')) return;
      link.setAttribute('data-external-processed', 'true');

      var href = link.getAttribute('href');
      if (!href) return;

      // Пропустить якоря и спецпротоколы
      if (href.startsWith('#') ||
          href.startsWith('mailto:') ||
          href.startsWith('tel:') ||
          href.startsWith('javascript:')) {
        return;
      }

      // Проверка: внешняя ли это ссылка
      var isExternal = false;

      if (href.startsWith('http://') || href.startsWith('https://')) {
        try {
          var url = new URL(href);
          if (url.hostname !== currentHost) {
            isExternal = true;
          }
        } catch (e) {
          // некорректный URL — пропустить
          return;
        }
      }
      // Относительные ссылки (./, ../, /path) — внутренние, не трогаем

      if (isExternal) {
        link.setAttribute('target', '_blank');
        // Сохраняем существующий rel, если есть, добавляем noopener+noreferrer
        var rel = link.getAttribute('rel') || '';
        var relParts = rel.split(' ').filter(Boolean);
        if (relParts.indexOf('noopener') === -1) relParts.push('noopener');
        if (relParts.indexOf('noreferrer') === -1) relParts.push('noreferrer');
        link.setAttribute('rel', relParts.join(' '));
      }
    });
  }

  // Первая обработка после загрузки
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', processLinks);
  } else {
    processLinks();
  }

  // Material for MkDocs использует instant loading — страница переключается
  // без полной перезагрузки. Используем document$ если доступен.
  if (typeof document$ !== 'undefined' && document$.subscribe) {
    document$.subscribe(processLinks);
  }
})();
