---
hide:
  - navigation
  - toc
title: Events
---

{#- ===========================================================
    Универсальный шаблон витрины событий для всех 4 локалей.
    Файл идентичен в docs/ru/, docs/en/, docs/pl/, docs/lt/.

    Локализация:
    - Текущий язык определяется по первому сегменту page.url.
    - UI-надписи берутся из config.extra.events_data.ui[поле][lang].
    - Данные событий — из events_data.events[i].title[lang] и т.д.
    - Тип события в плашке — events_data.types[event_type][lang].
    - Дата в плашке — три строки: день / месяц числом / год
      (как на витрине дашбордов). Словарь months больше не
      используется в блоке даты, но оставлен в events.yml.
    - Fallback: lang → en → ru. Логика — макрос tr() ниже.
=========================================================== -#}

{%- set data = config.extra.events_data -%}

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

<div class="bt-index">

<header class="bt-index-head">
  <div class="bt-kicker">{{ tr(data.ui.kicker) }}</div>
  <h1>{{ tr(data.ui.h1) }}</h1>
  <p class="bt-lede">{{ tr(data.ui.lede) }}</p>
</header>

<!-- ============================================================
     ФИЛЬТРЫ ПО ТИПУ СОБЫТИЯ
     data-filter совпадает с event_type в events.yml.
     ============================================================ -->

<div class="bt-event-filters" markdown="0">
{%- for key, label in data.filters.items() %}
<span class="bt-filter{% if key == 'all' %} active{% endif %}" data-filter="{{ key }}">{{ tr(label) }}</span>
{%- endfor %}
</div>

<!-- ============================================================
     ЛЕНТА СОБЫТИЙ
     Каждая плашка — ОДНОЙ строкой HTML, иначе markdown-парсер
     развалит грид (известная проблема).
     Дата — три строки: день / месяц числом / год.
     ============================================================ -->

<div class="bt-events-list" markdown="0">

{%- for ev in data.events %}
<a class="bt-event-row" data-type="{{ ev.event_type }}" href="{{ ev.slug }}/"><div class="bt-event-date"><div class="bt-event-day">{{ ev.date_day }}</div><div class="bt-event-month">{{ ev.date_month_key }}</div><div class="bt-event-year">{{ ev.date_year }}</div></div><div class="bt-event-type">{{ tr(data.types[ev.event_type]) }}</div><div class="bt-event-info"><div class="bt-event-title">{{ tr(ev.title) }}</div><div class="bt-event-summary">{{ tr(ev.summary) | safe }}</div></div><div class="bt-event-place">{{ tr(ev.place) }}</div></a>
{%- endfor %}

</div>

</div>

<!-- ============================================================
     СКРИПТ ФИЛЬТРАЦИИ
     ============================================================ -->

<script>
(function() {
  const filters = document.querySelectorAll('.bt-event-filters .bt-filter');
  const rows = document.querySelectorAll('.bt-events-list .bt-event-row');

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
