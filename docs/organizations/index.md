---
hide:
  - navigation
  - toc
title: Организации
---

<div class="bt-orgs-index">

<header class="bt-index-head">
  <div class="bt-kicker">Раздел</div>
  <h1>Организации</h1>
  <p class="bt-lede">Структуры беларуской оппозиции в эмиграции. Каждая карточка показывает четыре индикатора прозрачности: устав, финансовая отчётность, внешний аудит, контрольный орган.</p>
</header>

<!-- ============================================================
     ФИЛЬТРЫ ПО ТИПУ ОРГАНИЗАЦИИ
     data-filter совпадает с org_type из frontmatter карточки.
     ============================================================ -->

<nav class="bt-org-filters">
  <a class="bt-filter bt-filter-active" data-filter="all" href="#">Все</a>
  <a class="bt-filter" data-filter="political-structure" href="#">Политические структуры</a>
  <a class="bt-filter" data-filter="foundation" href="#">Фонды</a>
  <a class="bt-filter" data-filter="media" href="#">Медиа</a>
  <a class="bt-filter" data-filter="initiative" href="#">Инициативы</a>
</nav>

<!-- ============================================================
     ЛЕНТА КАРТОЧЕК

     ВАЖНО: карточка — это <div data-href="...">, НЕ <a>.
     Причина: внутри карточки есть вложенная ссылка на персону
     (.bt-org-eq для one-person организаций), а <a> внутри <a>
     запрещён HTML-спецификацией — браузер закрывает внешнюю
     ссылку перед открытием внутренней, что разваливает вёрстку.

     Клик по карточке обрабатывает JS внизу страницы. Он же
     обеспечивает доступность с клавиатуры (Enter/Space).

     Каждая карточка пишется ОДНОЙ строкой HTML без переносов —
     иначе markdown-парсер развалит структуру (известная проблема).
     ============================================================ -->

<div class="bt-orgs-list" markdown="0">

<div class="bt-org-row" data-type="political-structure" data-href="opk/" role="link" tabindex="0" aria-label="Объединённый переходный кабинет"><div class="bt-org-row-head"><div class="bt-org-row-type">Политическая структура</div><div class="bt-org-row-status-line"><span class="bt-status bt-status-active">действует</span></div></div><div class="bt-org-row-name">Объединённый переходный кабинет</div><div class="bt-org-row-role">Координирует политическую оппозицию в эмиграции</div><div class="bt-tp-bar"><span class="bt-tp-seg bt-tp-yes"></span><span class="bt-tp-seg bt-tp-no"></span><span class="bt-tp-seg bt-tp-unk"></span><span class="bt-tp-seg bt-tp-part"></span></div><div class="bt-tp-legend"><span>устав</span><span>отчёты</span><span>аудит</span><span>контроль</span></div></div>

<div class="bt-org-row" data-type="foundation" data-href="byhelp/" role="link" tabindex="0" aria-label="Фонд солидарности By_help"><div class="bt-org-row-head"><div class="bt-org-row-type">Фонд</div><div class="bt-org-row-status-line"><span class="bt-status bt-status-active">действует</span><a class="bt-org-eq" href="../persons/ivan-ivanov/"><span class="bt-org-eq-sym">≡</span>Иван Иванов</a></div></div><div class="bt-org-row-name">Фонд солидарности By_help</div><div class="bt-org-row-role">Помощь пострадавшим от репрессий</div><div class="bt-tp-bar"><span class="bt-tp-seg bt-tp-no"></span><span class="bt-tp-seg bt-tp-no"></span><span class="bt-tp-seg bt-tp-no"></span><span class="bt-tp-seg bt-tp-no"></span></div><div class="bt-tp-legend"><span>устав</span><span>отчёты</span><span>аудит</span><span>контроль</span></div></div>

<div class="bt-org-row" data-type="media" data-href="example-media/" role="link" tabindex="0" aria-label="Название медиа"><div class="bt-org-row-head"><div class="bt-org-row-type">Медиа</div><div class="bt-org-row-status-line"><span class="bt-status bt-status-active">действует</span></div></div><div class="bt-org-row-name">Название медиа</div><div class="bt-org-row-role">Краткое описание издания одной строкой</div><div class="bt-tp-bar"><span class="bt-tp-seg bt-tp-yes"></span><span class="bt-tp-seg bt-tp-part"></span><span class="bt-tp-seg bt-tp-no"></span><span class="bt-tp-seg bt-tp-unk"></span></div><div class="bt-tp-legend"><span>устав</span><span>отчёты</span><span>аудит</span><span>контроль</span></div></div>

</div>

</div>

<!-- ============================================================
     СКРИПТ ФИЛЬТРАЦИИ И КЛИКА ПО КАРТОЧКЕ
     - Фильтры переключают видимость карточек по data-type.
     - Клик по карточке ведёт на data-href.
     - НЕ перехватываем клики по вложенным <a> (напр. ≡ Имя) —
       такие клики ведут на свой собственный href.
     - Клавиатура: Enter / Space на карточке = клик.
     ============================================================ -->

<script>
(function() {
  const filters = document.querySelectorAll('.bt-org-filters .bt-filter');
  const rows = document.querySelectorAll('.bt-orgs-list .bt-org-row');

  filters.forEach(f => {
    f.addEventListener('click', e => {
      e.preventDefault();
      filters.forEach(x => x.classList.remove('bt-filter-active'));
      f.classList.add('bt-filter-active');
      const target = f.dataset.filter;
      rows.forEach(r => {
        if (target === 'all' || r.dataset.type === target) {
          r.style.display = '';
        } else {
          r.style.display = 'none';
        }
      });
    });
  });

  rows.forEach(r => {
    const href = r.dataset.href;
    if (!href) return;

    r.addEventListener('click', e => {
      if (e.target.closest('a')) return;
      window.location.href = href;
    });

    r.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.closest('a')) return;
        e.preventDefault();
        window.location.href = href;
      }
    });
  });
})();
</script>
