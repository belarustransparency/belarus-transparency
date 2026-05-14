---
hide:
  - navigation
  - toc
title: Расследования
---

<div class="bt-inv-index" markdown>

<header class="bt-inv-head">
  <div class="bt-kicker">Раздел сайта</div>
  <h1>Расследования</h1>
  <p class="bt-lede">Реконструкции движения денег ЕС, выделенных на поддержку беларусов после 2020 года. «Участие в грантах» — оценочная доля от общей помощи ЕС (~750 млн €).</p>
</header>

<div class="bt-inv-filters" markdown="0">
  <span class="bt-inv-flabel">Фильтр:</span>
  <button class="bt-inv-filter active" data-filter="all" type="button">Все</button>
  <button class="bt-inv-filter" data-filter="opk" type="button">ОПК</button>
  <button class="bt-inv-filter" data-filter="media" type="button">Медиа</button>
  <button class="bt-inv-filter" data-filter="ngo" type="button">НКО в эмиграции</button>
  <button class="bt-inv-filter" data-filter="finansy" type="button">Финансы</button>
  <button class="bt-inv-filter" data-filter="litva" type="button">Литва</button>
</div>

<div class="bt-inv-list" markdown="0">

<a class="bt-inv-card" href="opk-grants-2022-2025/" data-tags="opk finansy litva" style="background-image: linear-gradient(135deg, #4a3d35 0%, #20191a 100%);">
  <div class="bt-inv-cover">
    <div class="bt-inv-cover-top">
      <div class="bt-inv-code">BT-001</div>
      <div class="bt-inv-date">март 2026</div>
    </div>
    <div class="bt-inv-cover-bottom">
      <div class="bt-inv-title">Куда уходят гранты ОПК: реконструкция расходов 2022–2025</div>
      <div class="bt-inv-tags">
        <span class="bt-inv-tag">ОПК</span>
        <span class="bt-inv-tag">Финансы</span>
        <span class="bt-inv-tag">Литва</span>
      </div>
    </div>
  </div>
  <div class="bt-inv-foot">
    <span class="bt-inv-status published">Опубликовано</span>
    <p class="bt-inv-lede">Структура расходов Офиса Тихановской и связанных НКО по отчётам грантодателей.</p>
    <div class="bt-inv-bar"><div class="bt-inv-bar-fill" style="width: 18%;"></div></div>
    <span class="bt-inv-sum">≈ 135 млн € <span class="bt-inv-pct">· 18%</span></span>
  </div>
</a>

<a class="bt-inv-card" href="media-eu-funding/" data-tags="media finansy" style="background-image: linear-gradient(135deg, #2c3540 0%, #161c24 100%);">
  <div class="bt-inv-cover">
    <div class="bt-inv-cover-top">
      <div class="bt-inv-code">BT-002</div>
      <div class="bt-inv-date">апрель 2026</div>
    </div>
    <div class="bt-inv-cover-bottom">
      <div class="bt-inv-title">Медиа в эмиграции: кто получил деньги ЕС и за какой контент</div>
      <div class="bt-inv-tags">
        <span class="bt-inv-tag">Медиа</span>
        <span class="bt-inv-tag">Финансы</span>
      </div>
    </div>
  </div>
  <div class="bt-inv-foot">
    <span class="bt-inv-status collecting">Сбор данных</span>
    <p class="bt-inv-lede">Кто из беларуских редакций получал финансирование через EED, NED и USAID.</p>
    <div class="bt-inv-bar"><div class="bt-inv-bar-fill" style="width: 12%;"></div></div>
    <span class="bt-inv-sum">≈ 90 млн € <span class="bt-inv-pct">· 12%</span></span>
  </div>
</a>

<a class="bt-inv-card" href="ngo-lithuania/" data-tags="ngo litva" style="background-image: linear-gradient(135deg, #3d3530 0%, #20191a 100%);">
  <div class="bt-inv-cover">
    <div class="bt-inv-cover-top">
      <div class="bt-inv-code">BT-003</div>
      <div class="bt-inv-date">в работе</div>
    </div>
    <div class="bt-inv-cover-bottom">
      <div class="bt-inv-title">Карта беларуских НКО в Литве: учредители, бюджеты, пересечения</div>
      <div class="bt-inv-tags">
        <span class="bt-inv-tag">НКО в эмиграции</span>
        <span class="bt-inv-tag">Литва</span>
      </div>
    </div>
  </div>
  <div class="bt-inv-foot">
    <span class="bt-inv-status draft">Черновик</span>
    <p class="bt-inv-lede">31 организация зарегистрирована беларусами в Литве с 2020 года.</p>
    <div class="bt-inv-bar"><div class="bt-inv-bar-fill" style="width: 7%;"></div></div>
    <span class="bt-inv-sum">≈ 53 млн € <span class="bt-inv-pct">· 7%</span></span>
  </div>
</a>

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
