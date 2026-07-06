---
hide:
  - navigation
  - toc
title: Archive
---

{#- ===========================================================
    Универсальный шаблон витрины архива для всех 4 локалей.
    Файл идентичен в docs/ru/, docs/en/, docs/pl/, docs/lt/.

    Логика отображения названия документа:
    - title_original — на языке оригинала (lang_original).
    - Если lang_original == текущий язык страницы → только оригинал.
    - Если lang_original != текущий язык:
        * есть title_translated[lang] → оригинал + перевод мелким шрифтом
        * нет → только оригинал
=========================================================== -#}

{%- set data = config.extra.archive_data -%}

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

<div class="bt-archive">

<header class="bt-index-head">
  <div class="bt-kicker">{{ tr(data.ui.kicker) }}</div>
  <h1>{{ tr(data.ui.h1) }}</h1>
  <p class="bt-lede">{{ tr(data.ui.lede) }}</p>
</header>

<div class="bt-archive-filters" markdown="0">
{%- for key, label in data.filters.items() %}
<span class="bt-filter{% if key == 'all' %} active{% endif %}" data-filter="{{ key }}">{{ tr(label) }}</span>
{%- endfor %}
</div>

<table class="bt-archive-table" markdown="0">
<thead>
<tr>
  <th class="bt-col-id">{{ tr(data.ui.col_id) }}</th>
  <th>{{ tr(data.ui.col_doc) }}</th>
  <th class="bt-col-type">{{ tr(data.ui.col_type) }}</th>
  <th class="bt-col-date">{{ tr(data.ui.col_date) }}</th>
  <th class="bt-col-status">{{ tr(data.ui.col_source) }}</th>
</tr>
</thead>
<tbody>
{%- for doc in data.documents %}
{%- set show_translation = (doc.lang_original != lang) and (doc.title_translated is defined) and (doc.title_translated[lang] is defined) and doc.title_translated[lang] -%}
<tr data-type="{{ doc.type }}"><td class="bt-arc-id"><a href="{{ doc.id }}/">{{ doc.id }}</a></td><td class="bt-arc-title"><a href="{{ doc.id }}/">{{ doc.title_original }}</a>{% if show_translation %}<div class="bt-arc-title-tr">{{ doc.title_translated[lang] }}</div>{% endif %}</td><td class="bt-arc-type">{{ doc.type | upper }}</td><td class="bt-arc-date">{{ doc.year }}</td><td class="bt-arc-status">{% if doc.source_alive %}<span class="bt-src-alive">{{ doc.source_domain }}</span>{% else %}<span class="bt-src-dead">{{ tr(data.ui.source_dead) }}</span>{% endif %}</td></tr>
{%- endfor %}
</tbody>
</table>

</div>

<script>
(function() {
  const filters = document.querySelectorAll('.bt-archive-filters .bt-filter');
  const rows = document.querySelectorAll('.bt-archive-table tbody tr');

  filters.forEach(f => {
    f.addEventListener('click', e => {
      e.preventDefault();
      filters.forEach(x => x.classList.remove('active'));
      f.classList.add('active');
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
