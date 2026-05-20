---
hide:
  - navigation
  - toc
title: Расследования
---

{% set data = config.extra.investigations_data %}

<div class="bt-inv-index">

<header class="bt-inv-head">
  <div class="bt-kicker">Раздел сайта</div>
  <h1>Расследования</h1>
  <p class="bt-lede">Реконструкции движения денег ЕС и США, выделенных на поддержку беларуской демократии после гражданского протеста 2020 года.</p>
</header>

<div class="bt-inv-filters">
  <span class="bt-inv-flabel">Фильтр:</span>
  {%- for key, label in data.filters.items() %}
  <button class="bt-inv-filter{% if key == 'all' %} active{% endif %}" data-filter="{{ key }}" type="button">{{ label }}</button>
  {%- endfor %}
</div>

<div class="bt-inv-list" markdown="0">
{%- for inv in data.investigations %}
{%- set card_href = '/source-protection/#open-investigations' if inv.status == 'collecting' else inv.href %}
{%- set bg = "url('" ~ inv.cover ~ "')" if inv.cover else inv.cover_gradient %}
<a class="bt-inv-card" href="{{ card_href }}" data-tags="{{ inv.filter_tags | join(' ') }}" style="background-image: {{ bg }};">
  <div class="bt-inv-cover">
    <div class="bt-inv-cover-top">
      <div class="bt-inv-code">{{ inv.code }}</div>
      <div class="bt-inv-date">{{ inv.date }}</div>
    </div>
    <div class="bt-inv-cover-bottom">
      <div class="bt-inv-title">{{ inv.title }}</div>
      <p class="bt-inv-lede">{{ inv.lede | safe }}</p>
    </div>
  </div>
  <div class="bt-inv-foot">
    <div class="bt-inv-tags">
      {%- for t in inv.tags %}<span class="bt-inv-tag">{{ t }}</span>{%- endfor %}
    </div>
    <div class="bt-inv-grants">
      <div class="bt-inv-bar"><div class="bt-inv-bar-fill" style="width: {{ inv.grants_pct }}%;"></div></div>
      <span class="bt-inv-sum"><span class="bt-inv-sum-val">≈&nbsp;{{ inv.grants_eur }}&nbsp;млн&nbsp;€</span><span class="bt-inv-pct">·&nbsp;{{ inv.grants_pct }}%</span></span>
    </div>
    <span class="bt-inv-status {{ inv.status }}">{% if inv.status == 'published' %}Опубликовано{% else %}Сбор данных{% endif %}</span>
  </div>
</a>
{%- endfor %}
</div>

</div>

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