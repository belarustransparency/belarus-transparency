---
hide:
  - navigation
  - toc
  - tags
title: ""
---

{#- ===========================================================
    Дашборд "Следи за деньгами" — универсальный для 4 локалей.
    Файл идентичен в docs/ru/, docs/en/, docs/pl/, docs/lt/
    в папке dashboards/follow-the-money/

    Данные — из config.extra.investigations_data (тот же yml
    что и витрина расследований).
=========================================================== -#}

{%- set data = config.extra.investigations_data -%}
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
  {%- else -%}{{ field }}{%- endif -%}
{%- endmacro -%}

{#- Считаем суммарные цифры для хедера -#}
{%- set ns = namespace(confirmed=0, investigating=0) -%}
{%- for inv in data.investigations -%}
  {%- if inv.status == 'published' -%}
    {%- set ns.confirmed = ns.confirmed + (inv.grants_bar_eur | default(inv.grants_eur) | float | round(0, 'ceil') | int) -%}
  {%- elif inv.status == 'collecting' or inv.status == 'draft' -%}
    {%- set ns.investigating = ns.investigating + (inv.grants_bar_eur | default(inv.grants_eur) | float | round(0, 'ceil') | int) -%}
  {%- endif -%}
{%- endfor -%}
{%- set total_covered = ns.confirmed + ns.investigating -%}
{%- set total_budget = data.ui.dashboard_budget | default(300) -%}
{%- set covered_pct = ((total_covered / total_budget) * 100) | round(0, 'ceil') | int -%}

<div class="bt-ftm" markdown="0">

<div class="bt-ftm-header">
  <div class="bt-ftm-header-left">
    <div class="bt-ftm-kicker">{{ tr(data.ui.ftm_kicker) }}</div>
    <div class="bt-ftm-title">{{ tr(data.ui.ftm_title) }}</div>
    <div class="bt-ftm-sub">{{ tr(data.ui.ftm_sub) }}</div>
  </div>
  <div class="bt-ftm-stats">
    <div class="bt-ftm-stat">
      <div class="bt-ftm-stat-val">€{{ total_budget }}M</div>
      <div class="bt-ftm-stat-label">{{ tr(data.ui.ftm_stat_total) }}</div>
    </div>
    <div class="bt-ftm-stat">
      <div class="bt-ftm-stat-val bt-ftm-amber">€{{ ns.investigating }}M</div>
      <div class="bt-ftm-stat-label">{{ tr(data.ui.ftm_stat_investigating) }}</div>
    </div>
    <div class="bt-ftm-stat">
      <div class="bt-ftm-stat-val bt-ftm-red">€{{ ns.confirmed }}M</div>
      <div class="bt-ftm-stat-label">{{ tr(data.ui.ftm_stat_confirmed) }}</div>
    </div>
    <div class="bt-ftm-stat">
      <div class="bt-ftm-stat-val">{{ covered_pct }}%</div>
      <div class="bt-ftm-stat-label">{{ tr(data.ui.ftm_stat_covered) }}</div>
    </div>
  </div>
</div>

<div class="bt-ftm-quote">
  <div class="bt-ftm-quote-bar"></div>
  <div class="bt-ftm-quote-body">
    <div class="bt-ftm-quote-text">{{ tr(data.ui.ftm_quote_text) }}</div>
    <div class="bt-ftm-quote-cite">{{ tr(data.ui.ftm_quote_cite) }}</div>
  </div>
</div>

<div class="bt-ftm-body">

  <div class="bt-ftm-matrix">
    {%- for sector in data.sectors %}
    <div class="bt-ftm-sector">
      <div class="bt-ftm-sector-label">
        <div class="bt-ftm-sector-name">{{ tr(sector.name) }}</div>
        <div class="bt-ftm-sector-amt">€{{ sector.total }}M</div>
      </div>
      <div class="bt-ftm-dots" data-sector="{{ sector.id }}" data-total="{{ sector.total }}">
      {%- for inv in data.investigations -%}
        {%- if inv.sector == sector.id -%}
          {%- set bar_dots = (inv.grants_bar_eur | default(inv.grants_eur) | float) | round(0, 'ceil') | int -%}
          {%- for i in range(bar_dots) -%}
          <span class="bt-ftm-dot {{ inv.status }}"
            data-title="{{ tr(inv.title) }}"
            data-orgs="{%- for o in inv.orgs %}{%- if not loop.first %}, {% endif %}{{ o.name }}{%- endfor %}"
            data-persons="{%- for p in inv.persons %}{%- if not loop.first %}, {% endif %}{{ p.name }}{%- endfor %}"
            data-href="{{ inv.href }}"></span>
          {%- endfor -%}
        {%- endif -%}
      {%- endfor -%}
      </div>
    </div>
    {%- endfor %}
  </div>

  <div class="bt-ftm-sidebar">
    <div class="bt-ftm-sb-block">
      <div class="bt-ftm-sb-title">{{ tr(data.ui.ftm_orgs_label) }}</div>
      <div class="bt-ftm-chips" id="ftm-orgs">
        {%- set seen_orgs = [] -%}
        {%- for inv in data.investigations -%}
          {%- for org in inv.orgs -%}
            {%- if org.slug not in seen_orgs -%}
              {%- set _ = seen_orgs.append(org.slug) -%}
              <a class="bt-ftm-chip {{ inv.status }}" href="/{{ lang }}/organizations/{{ org.slug }}/"><span class="bt-ftm-chip-dot {{ inv.status }}"></span>{{ org.name }}</a>
            {%- endif -%}
          {%- endfor -%}
        {%- endfor -%}
      </div>
    </div>
    <div class="bt-ftm-sb-block">
      <div class="bt-ftm-sb-title">{{ tr(data.ui.ftm_persons_label) }}</div>
      <div class="bt-ftm-chips" id="ftm-persons">
        {%- set seen_persons = [] -%}
        {%- for inv in data.investigations -%}
          {%- for person in inv.persons -%}
            {%- if person.slug not in seen_persons -%}
              {%- set _ = seen_persons.append(person.slug) -%}
              <a class="bt-ftm-chip {{ inv.status }}" href="/{{ lang }}/persons/{{ person.slug }}/"><span class="bt-ftm-chip-dot {{ inv.status }}"></span>{{ person.name }}</a>
            {%- endif -%}
          {%- endfor -%}
        {%- endfor -%}
      </div>
    </div>
  </div>

</div>

<div class="bt-ftm-footer">
  <div class="bt-ftm-legend">
    <span class="bt-ftm-leg-item"><span class="bt-ftm-leg-dot uninvestigated"></span>{{ tr(data.ui.ftm_legend_uninvestigated) }}</span>
    <span class="bt-ftm-leg-sep"></span>
    <span class="bt-ftm-leg-item"><span class="bt-ftm-leg-dot collecting"></span>{{ tr(data.ui.ftm_legend_investigating) }}</span>
    <span class="bt-ftm-leg-sep"></span>
    <span class="bt-ftm-leg-item"><span class="bt-ftm-leg-dot published"></span>{{ tr(data.ui.ftm_legend_confirmed) }}</span>
  </div>
  <div class="bt-ftm-footer-note">{{ tr(data.ui.ftm_footer_note) }}</div>
</div>

</div>

<script>
(function() {
  var dots = document.querySelectorAll('.bt-ftm-dot');

  var tooltip = document.createElement('div');
  tooltip.className = 'bt-ftm-tooltip';
  document.body.appendChild(tooltip);

  dots.forEach(function(dot) {
    var sector = dot.closest('.bt-ftm-sector');
    var total = parseInt(sector.querySelector('.bt-ftm-dots').dataset.total, 10);
    var uninvCount = total - sector.querySelectorAll('.bt-ftm-dot').length;
    for (var i = 0; i < uninvCount; i++) {
      var u = document.createElement('span');
      u.className = 'bt-ftm-dot uninvestigated';
      sector.querySelector('.bt-ftm-dots').appendChild(u);
    }

    dot.addEventListener('mouseenter', function(e) {
      if (!dot.dataset.title) return;
      var status = dot.classList.contains('published') ? '● Нарушения подтверждены' :
                   dot.classList.contains('collecting') ? '◐ Расследование идёт' : '';
      var html = '<div class="bt-ftm-tt-status ' + (dot.classList.contains('published') ? 'confirmed' : 'investigating') + '">' + status + '</div>';
      html += '<div class="bt-ftm-tt-title">' + dot.dataset.title + '</div>';
      if (dot.dataset.orgs) html += '<div class="bt-ftm-tt-sub">' + dot.dataset.orgs + '</div>';
      if (dot.dataset.persons) html += '<div class="bt-ftm-tt-sub">' + dot.dataset.persons + '</div>';
      if (dot.dataset.href) html += '<div class="bt-ftm-tt-link">→ Читать расследование</div>';
      tooltip.innerHTML = html;
      tooltip.classList.add('show');
    });
    dot.addEventListener('mouseleave', function() { tooltip.classList.remove('show'); });
    dot.addEventListener('mousemove', function(e) {
      tooltip.style.left = Math.min(e.clientX + 14, window.innerWidth - 260) + 'px';
      tooltip.style.top = (e.clientY - 10) + 'px';
    });
    if (dot.dataset.href) {
      dot.addEventListener('click', function() { window.location = dot.dataset.href; });
    }
  });

  var sectors = document.querySelectorAll('.bt-ftm-sector');
  sectors.forEach(function(sector) {
    var wrap = sector.querySelector('.bt-ftm-dots');
    var total = parseInt(wrap.dataset.total, 10);
    var existing = wrap.querySelectorAll('.bt-ftm-dot').length;
    for (var i = existing; i < total; i++) {
      var u = document.createElement('span');
      u.className = 'bt-ftm-dot uninvestigated';
      wrap.appendChild(u);
    }
  });
})();
</script>
