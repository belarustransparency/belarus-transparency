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
     Атрибут data-type должен совпадать с org_type из frontmatter
     карточки организации.
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
     Каждая карточка — одна строка HTML без переносов внутри <a>,
     иначе markdown-парсер разваливает структуру (см. manual).

     data-type — для фильтрации, совпадает с org_type
     ============================================================ -->

<div class="bt-orgs-list" markdown="0">

<a class="bt-org-row" data-type="political-structure" href="opk/"><div class="bt-org-row-head"><div class="bt-org-row-type">Политическая структура</div><div class="bt-org-row-status-line"><span class="bt-status bt-status-active">действует</span></div></div><div class="bt-org-row-name">Объединённый переходный кабинет</div><div class="bt-org-row-role">Координирует политическую оппозицию в эмиграции</div><div class="bt-tp-bar"><span class="bt-tp-seg bt-tp-yes"></span><span class="bt-tp-seg bt-tp-no"></span><span class="bt-tp-seg bt-tp-unk"></span><span class="bt-tp-seg bt-tp-part"></span></div><div class="bt-tp-legend"><span>устав</span><span>отчёты</span><span>аудит</span><span>контроль</span></div></a>

<a class="bt-org-row" data-type="foundation" href="byhelp/"><div class="bt-org-row-head"><div class="bt-org-row-type">Фонд</div><div class="bt-org-row-status-line"><span class="bt-status bt-status-active">действует</span><a class="bt-org-eq" href="../persons/ivan-ivanov/"><span class="bt-org-eq-sym">≡</span>Иван Иванов</a></div></div><div class="bt-org-row-name">Фонд солидарности By_help</div><div class="bt-org-row-role">Помощь пострадавшим от репрессий</div><div class="bt-tp-bar"><span class="bt-tp-seg bt-tp-no"></span><span class="bt-tp-seg bt-tp-no"></span><span class="bt-tp-seg bt-tp-no"></span><span class="bt-tp-seg bt-tp-no"></span></div><div class="bt-tp-legend"><span>устав</span><span>отчёты</span><span>аудит</span><span>контроль</span></div></a>

<a class="bt-org-row" data-type="media" href="example-media/"><div class="bt-org-row-head"><div class="bt-org-row-type">Медиа</div><div class="bt-org-row-status-line"><span class="bt-status bt-status-active">действует</span></div></div><div class="bt-org-row-name">Название медиа</div><div class="bt-org-row-role">Краткое описание издания одной строкой</div><div class="bt-tp-bar"><span class="bt-tp-seg bt-tp-yes"></span><span class="bt-tp-seg bt-tp-part"></span><span class="bt-tp-seg bt-tp-no"></span><span class="bt-tp-seg bt-tp-unk"></span></div><div class="bt-tp-legend"><span>устав</span><span>отчёты</span><span>аудит</span><span>контроль</span></div></a>

</div>

</div>

<!-- ============================================================
     СКРИПТ ФИЛЬТРАЦИИ
     Минимальный inline JS — переключает класс активного фильтра
     и видимость карточек. Без сторонних зависимостей.
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
})();
</script>
