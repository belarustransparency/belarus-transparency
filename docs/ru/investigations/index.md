---
hide:
  - navigation
  - toc
title: Investigations
---

{#- ===========================================================
    Универсальный шаблон витрины расследований для всех 4 локалей.
    Файл идентичен в docs/ru/, docs/en/, docs/pl/, docs/lt/.

    Локализация:
    - Текущий язык определяется по первому сегменту page.url.
    - UI-надписи берутся из config.extra.investigations_data.ui[поле][lang].
    - Данные расследований — из investigations_data.investigations[i].поле[lang].
    - Если перевод на текущий язык отсутствует, шаблон fallback'ается
      на en, потом на ru. Логика fallback'а — макрос tr() ниже.
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
  {%- else -%}
    {{ field }}
  {%- endif -%}
{%- endmacro -%}

<div class="bt-inv-index">

<header class="bt-inv-head">
  <div class="bt-kicker">{{ tr(data.ui.kicker) }}</div>
  <h1>{{ tr(data.ui.h1) }}</h1>
  <p class="bt-lede">{{ tr(data.ui.lede) }}</p>
</header>

<div class="bt-inv-filters">
  <span class="bt-inv-flabel">{{ tr(data.ui.filter_label) }}</span>
  {%- for key, label in data.filters.items() %}
  <button class="bt-inv-filter{% if key == 'all' %} active{% endif %}" data-filter="{{ key }}" type="button">{{ tr(label) }}</button>
  {%- endfor %}
</div>

<div class="bt-ftm-inv-banner" markdown="0">
  <div class="bt-ftm-ib-left">
    <div class="bt-ftm-ib-kicker">Следуй за деньгами</div>
    <div class="bt-ftm-ib-title">Западные налогоплательщики отдали сотни миллионов евро на беларускую демократию в эмиграции.</div>
    <div class="bt-ftm-ib-tagline">Давайте поможем отчитаться об успехах. Если найдём, конечно.</div>
  </div>
  <div class="bt-ftm-ib-right">
    <div class="bt-ftm-ib-dots" id="ftm-ib-dots"></div>
    <a class="bt-ftm-ib-link" href="../dashboards/follow-the-money/">Открыть карту →</a>
  </div>
</div>

<div class="bt-inv-list" markdown="0">
{%- for inv in data.investigations %}
{%- set card_href = '/' ~ lang ~ '/source-protection/#open-investigations' if inv.status == 'collecting' or inv.status == 'draft' else inv.href %}
{%- set bg = "url('" ~ inv.cover ~ "')" if inv.cover else inv.cover_gradient %}
<a class="bt-inv-card" href="{{ card_href }}" data-tags="{{ inv.filter_tags | join(' ') }}" style="background-image: {{ bg }};">
  <div class="bt-inv-cover">
    <div class="bt-inv-cover-top">
      <div class="bt-inv-code">{{ inv.code }}</div>
      <div class="bt-inv-date">{{ tr(inv.date) }}</div>
    </div>
    <div class="bt-inv-cover-bottom">
      <div class="bt-inv-title">{{ tr(inv.title) }}</div>
      <p class="bt-inv-lede">{{ tr(inv.lede) | safe }}</p>
    </div>
  </div>
  <div class="bt-inv-foot">
    <div class="bt-inv-tags">
      {%- set tag_list = inv.tags[lang] if inv.tags[lang] is defined else inv.tags['en'] if inv.tags['en'] is defined else inv.tags['ru'] -%}
      {%- for t in tag_list %}<span class="bt-inv-tag">{{ t }}</span>{%- endfor %}
    </div>
    <div class="bt-inv-grants">
      <span class="bt-inv-sum"><span class="bt-inv-prefix">{{ tr(data.ui.grants_prefix) }}</span><span class="bt-inv-sum-val">{{ inv.grants_eur }}&nbsp;{{ tr(data.ui.grants_unit) | safe }}</span></span>
      <span class="bt-inv-sep"></span>
      <span class="bt-inv-status {{ inv.status }}">{% if inv.status == 'published' %}{{ tr(data.ui.status_published) }}{% elif inv.status == 'active' %}{{ tr(data.ui.status_active) }}{% elif inv.status == 'draft' %}{{ tr(data.ui.status_draft) }}{% else %}{{ tr(data.ui.status_collecting) }}{% endif %}</span>
    </div>
  </div>
</a>
{%- endfor %}
</div>

</div>

<script>
(function(){
  var d=document.getElementById('ftm-ib-dots');
  if(!d)return;
  for(var i=0;i<35;i++){
    var s=document.createElement('span');
    s.className='bt-ftm-ib-dot'+(i<1?' published':i<3?' collecting':'');
    d.appendChild(s);
  }
})();
</script>
<script>
(function() {
  function init() {
    var btns = document.querySelectorAll('.bt-inv-filter');
    if (!btns.length) return;
    btns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        btns.forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var f = btn.getAttribute('data-filter');
        document.querySelectorAll('.bt-inv-card').forEach(function(card) {
          var tags = (card.getAttribute('data-tags') || '').split(' ');
          card.style.display = (f === 'all' || tags.indexOf(f) !== -1) ? '' : 'none';
        });
      });
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
</script>
