---
hide:
  - navigation
  - toc
title: Organizations
---

{#- ===========================================================
    Универсальный шаблон витрины организаций для всех 4 локалей.
    Файл идентичен в docs/ru/, docs/en/, docs/pl/, docs/lt/.

    Локализация:
    - Текущий язык определяется по первому сегменту page.url.
    - UI-надписи берутся из config.extra.organizations_data.ui[поле][lang].
    - Данные организаций — из organizations_data.organizations[i].
    - Fallback: lang → en → ru. Логика — макрос tr() ниже.
=========================================================== -#}

{%- set data = config.extra.organizations_data -%}

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

<div class="bt-orgs-index">

<header class="bt-index-head">
  <div class="bt-kicker">{{ tr(data.ui.kicker) }}</div>
  <h1>{{ tr(data.ui.h1) }}</h1>
  <p class="bt-lede">{{ tr(data.ui.lede) }}</p>
</header>

<!-- ============================================================
     ФИЛЬТРЫ ПО ТИПУ ОРГАНИЗАЦИИ
     data-filter совпадает с полем type из organizations.yml.
     ============================================================ -->

<nav class="bt-org-filters">
  {%- for key, label in data.filters.items() %}
  <a class="bt-filter{% if key == 'all' %} bt-filter-active{% endif %}" data-filter="{{ key }}" href="#">{{ tr(label) }}</a>
  {%- endfor %}
</nav>

<!-- ============================================================
     ЛЕНТА КАРТОЧЕК
     ВАЖНО: карточка — <div data-href="...">, не <a>, чтобы внутри
     могли быть вложенные ссылки. Клик и доступность с клавиатуры —
     inline-скрипт ниже.
     Каждая карточка пишется ОДНОЙ строкой HTML без переносов.
     ============================================================ -->

<div class="bt-orgs-list" markdown="0">

{%- for org in data.organizations %}
<div class="bt-org-row" data-type="{{ org.type }}" data-href="{{ org.slug }}/" role="link" tabindex="0" aria-label="{{ org.name }}"><div class="bt-org-row-head"><div class="bt-org-row-type">{{ tr(org.type_label) }}</div><div class="bt-org-row-status-line"><span class="bt-status bt-status-{{ org.status }}">{{ tr(data.statuses[org.status]) }}</span></div></div><div class="bt-org-row-name">{{ org.name }}</div><div class="bt-org-row-role">{{ tr(org.role_short) }}</div><div class="bt-tp-bar"><span class="bt-tp-seg bt-tp-{{ org.transparency.charter }}"></span><span class="bt-tp-seg bt-tp-{{ org.transparency.reports }}"></span><span class="bt-tp-seg bt-tp-{{ org.transparency.audit }}"></span><span class="bt-tp-seg bt-tp-{{ org.transparency.control }}"></span></div><div class="bt-tp-legend"><span>{{ tr(data.ui.tp_legend.charter) }}</span><span>{{ tr(data.ui.tp_legend.reports) }}</span><span>{{ tr(data.ui.tp_legend.audit) }}</span><span>{{ tr(data.ui.tp_legend.control) }}</span></div></div>
{%- endfor %}

</div>

</div>

<!-- ============================================================
     СКРИПТ ФИЛЬТРАЦИИ И КЛИКА ПО КАРТОЧКЕ
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
