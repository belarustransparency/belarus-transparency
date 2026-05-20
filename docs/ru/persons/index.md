---
hide:
  - navigation
  - toc
title: Persons
---

{#- ===========================================================
    Универсальный шаблон витрины персон для всех 4 локалей.
    Файл идентичен в docs/ru/, docs/en/, docs/pl/, docs/lt/.

    Локализация:
    - Текущий язык определяется по первому сегменту page.url.
    - UI-надписи берутся из config.extra.persons_data.ui[поле][lang].
    - Данные персон — из persons_data.persons[i].role_short[lang].
    - Бейджи — из persons_data.badges.role[role][lang] и .position[pos][lang].
    - Fallback: lang → en → ru. Логика — макрос tr() ниже.
=========================================================== -#}

{%- set data = config.extra.persons_data -%}

{%- set parts = (page.url or '').split('/') -%}
{%- set lang = 'ru' -%}
{%- if parts[0] in ['ru', 'en', 'pl', 'lt'] -%}
  {%- set lang = parts[0] -%}
{%- endif -%}

{%- macro tr(field) -%}
  {%- if field is mapping -%}
    {%- if field[lang] is defined and field[lang] -%}{{ field[lang] }}
    {%- elif field['en'] is defined and field['en'] -%}{{ field['en'] }}
    {%- elif field['ru'] is defined and field['ru'] -%}{{ field['ru'] }}
    {%- endif -%}
  {%- else -%}
    {{ field }}
  {%- endif -%}
{%- endmacro -%}

<div class="bt-persons-index">

<header class="bt-index-head">
  <div class="bt-kicker">{{ tr(data.ui.kicker) }}</div>
  <h1>{{ tr(data.ui.h1) }}</h1>
  <p class="bt-lede">{{ tr(data.ui.lede) }}</p>
</header>

<!-- ============================================================
     ФИЛЬТРЫ ПО ФУНКЦИОНАЛЬНОЙ РОЛИ
     data-filter совпадает с полем role в persons.yml.
     ============================================================ -->

<nav class="bt-persons-filters">
  {%- for key, label in data.filters.items() %}
  <a class="bt-filter{% if key == 'all' %} bt-filter-active{% endif %}" data-filter="{{ key }}" href="#">{{ tr(label) }}</a>
  {%- endfor %}
</nav>

<!-- ============================================================
     ЛЕНТА ПЛАШЕК
     Каждая плашка — <div data-href="...">, не <a>, чтобы внутри
     могли быть вложенные ссылки. Клик и доступность обрабатывает
     inline-скрипт ниже.
     ============================================================ -->

<div class="bt-persons-list" markdown="0">

{%- for p in data.persons %}
<div class="bt-person-row" data-role="{{ p.role }}" data-position="{{ p.position }}" data-href="{{ p.slug }}/" role="link" tabindex="0" aria-label="{{ p.name }}"><div class="bt-person-row-photo" style="background-image: url('{{ p.thumbnail }}');"></div><div class="bt-person-row-info"><div class="bt-person-row-name">{{ p.name }}</div><div class="bt-person-row-role">{{ tr(p.role_short) }}</div></div><div class="bt-person-row-badges"><span class="bt-badge bt-badge-role-{{ p.role }}">{{ tr(data.badges.role[p.role]) }}</span><span class="bt-badge bt-badge-position-{{ p.position }}">{{ tr(data.badges.position[p.position]) }}</span></div></div>
{%- endfor %}

</div>

</div>

<!-- ============================================================
     СКРИПТ ФИЛЬТРАЦИИ И КЛИКА ПО ПЛАШКЕ
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
