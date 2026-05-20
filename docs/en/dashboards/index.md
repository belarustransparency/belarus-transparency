---
hide:
  - navigation
  - toc
title: Dashboards
description: "Interactive dashboards — structures of democratic forces in exile, their connections and shares of influence."
---

{#- ===========================================================
    Универсальный шаблон витрины дашбордов для всех 4 локалей.
    Файл идентичен в docs/ru/, docs/en/, docs/pl/, docs/lt/.

    Локализация: lang → en → ru fallback через макрос tr().
    Контент самих дашбордов (kc-2026 и т.д.) пока на русском
    во всех локалях — отдельная задача в техническом долге.
=========================================================== -#}

{%- set data = config.extra.dashboards_data -%}

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

<div class="bt-index-head">
  <h1>{{ tr(data.ui.h1) }}</h1>
  <p class="bt-lede">{{ tr(data.ui.lede) }}</p>
</div>

<div class="bt-events-list bt-events-list--dashboards" markdown="0">
{%- for dash in data.dashboards %}
<a class="bt-event-row" href="{{ dash.slug }}/"><div class="bt-event-date"><div class="bt-event-day">{{ dash.date_day }}</div><div class="bt-event-month">{{ dash.date_month }}</div><div class="bt-event-year">{{ dash.date_year }}</div></div><div class="bt-event-info"><div class="bt-event-title">{{ tr(dash.title) }}</div><div class="bt-event-summary">{{ tr(dash.summary) }}</div></div></a>
{%- endfor %}
</div>
