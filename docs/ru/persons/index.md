---
hide:
  - navigation
  - toc
title: Персоналии
---

<div class="bt-persons-index">

<header class="bt-index-head">
  <div class="bt-kicker">Раздел</div>
  <h1>Персоналии</h1>
  <p class="bt-lede">Карточки публичных фигур и связанных лиц с указанием функциональной роли и структурной позиции в основной организации. Используйте фильтр для отбора по типу деятельности.</p>
</header>

<!-- ============================================================
     ФИЛЬТРЫ ПО ФУНКЦИОНАЛЬНОЙ РОЛИ
     data-filter совпадает с полем role из frontmatter карточки.
     ============================================================ -->

<nav class="bt-persons-filters">
  <a class="bt-filter bt-filter-active" data-filter="all" href="#">Все</a>
  <a class="bt-filter" data-filter="politician" href="#">Политики</a>
  <a class="bt-filter" data-filter="media" href="#">Медиа</a>
  <a class="bt-filter" data-filter="expert" href="#">Эксперты</a>
  <a class="bt-filter" data-filter="civic" href="#">Активисты</a>
  <a class="bt-filter" data-filter="business" href="#">Бизнес</a>
  <a class="bt-filter" data-filter="private" href="#">Частные лица</a>
</nav>

<!-- ============================================================
     ЛЕНТА ПЛАШЕК

     По образцу .bt-org-row: каждая плашка — это <div data-href="...">,
     не <a>. Это позволяет внутри плашки иметь вложенные ссылки
     (например, на основную организацию). Клик и доступность с
     клавиатуры обрабатывает inline-скрипт внизу страницы.

     Каждая плашка пишется ОДНОЙ строкой HTML без переносов —
     иначе markdown-парсер развалит структуру.

     data-role / data-position — для будущих фильтров и стилей.
     ============================================================ -->

<div class="bt-persons-list" markdown="0">

<div class="bt-person-row" data-role="politician" data-position="nominal" data-href="artsiom-praskalovich/" role="link" tabindex="0" aria-label="Artsiom Praskalovich"><div class="bt-person-row-photo" style="background-image: url('./assets/artsiom-praskalovich-thumb.webp');"></div><div class="bt-person-row-info"><div class="bt-person-row-name">Artsiom Praskalovich</div><div class="bt-person-row-role">Председатель правления BP · зам. Представителя ОПК по транзиту власти</div></div><div class="bt-person-row-badges"><span class="bt-badge bt-badge-role-politician">политик</span><span class="bt-badge bt-badge-position-nominal">номинал</span></div></div>

<div class="bt-person-row" data-role="politician" data-position="nominal" data-href="artsiom-brukhan/" role="link" tabindex="0" aria-label="Artsiom Brukhan"><div class="bt-person-row-photo" style="background-image: url('./assets/artsiom-brukhan-thumb.webp');"></div><div class="bt-person-row-info"><div class="bt-person-row-name">Artsiom Brukhan</div><div class="bt-person-row-role">Член надзорного органа BP · зам. главы НАУ · спикер Координационной рады</div></div><div class="bt-person-row-badges"><span class="bt-badge bt-badge-role-politician">политик</span><span class="bt-badge bt-badge-position-nominal">номинал</span></div></div>

<div class="bt-person-row" data-role="politician" data-position="nominal" data-href="vladzimir-astapenka/" role="link" tabindex="0" aria-label="Vladzimir Astapenka"><div class="bt-person-row-photo" style="background-image: url('./assets/vladzimir-astapenka-thumb.webp');"></div><div class="bt-person-row-info"><div class="bt-person-row-name">Vladzimir Astapenka</div><div class="bt-person-row-role">Член надзорного органа BP · Представитель ОПК по международному сотрудничеству</div></div><div class="bt-person-row-badges"><span class="bt-badge bt-badge-role-politician">политик</span><span class="bt-badge bt-badge-position-nominal">номинал</span></div></div>

<div class="bt-person-row" data-role="private" data-position="kin" data-href="yana-latushka/" role="link" tabindex="0" aria-label="Yana Latushka"><div class="bt-person-row-photo" style="background-image: url('./assets/yana-latushka-thumb.webp');"></div><div class="bt-person-row-info"><div class="bt-person-row-name">Yana Latushka</div><div class="bt-person-row-role">Член надзорного органа BP · дочь Павла Латушко</div></div><div class="bt-person-row-badges"><span class="bt-badge bt-badge-role-private">частное лицо</span><span class="bt-badge bt-badge-position-kin">родственник</span></div></div>

<div class="bt-person-row" data-role="politician" data-position="nominal" data-href="iryna-khalopitsa/" role="link" tabindex="0" aria-label="Iryna Khalopitsa"><div class="bt-person-row-photo" style="background-image: url('./assets/iryna-khalopitsa-thumb.webp');"></div><div class="bt-person-row-info"><div class="bt-person-row-name">Iryna Khalopitsa</div><div class="bt-person-row-role">Член надзорного органа BP · соцсети Латушко в НАУ с 2023 · член Координационной рады</div></div><div class="bt-person-row-badges"><span class="bt-badge bt-badge-role-politician">политик</span><span class="bt-badge bt-badge-position-nominal">номинал</span></div></div>

<div class="bt-person-row" data-role="private" data-position="witness" data-href="anna-panov/" role="link" tabindex="0" aria-label="Anna Panov"><div class="bt-person-row-photo" style="background-image: url('./assets/anna-panov-thumb.webp');"></div><div class="bt-person-row-info"><div class="bt-person-row-name">Anna Panov</div><div class="bt-person-row-role">Бывший член надзорного органа BP (2022–2026)</div></div><div class="bt-person-row-badges"><span class="bt-badge bt-badge-role-private">частное лицо</span><span class="bt-badge bt-badge-position-witness">свидетель</span></div></div>

</div>

</div>

<!-- ============================================================
     СКРИПТ ФИЛЬТРАЦИИ И КЛИКА ПО ПЛАШКЕ
     Логика идентична витрине организаций.
     ============================================================ -->

<script>
(function() {
  const filters = document.querySelectorAll('.bt-persons-filters .bt-filter');
  const rows = document.querySelectorAll('.bt-persons-list .bt-person-row');

  filters.forEach(f => {
    f.addEventListener('click', e => {
      e.preventDefault();
      filters.forEach(x => x.classList.remove('bt-filter-active'));
      f.classList.add('bt-filter-active');
      const target = f.dataset.filter;
      rows.forEach(r => {
        if (target === 'all' || r.dataset.role === target) {
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
