(function() {
  'use strict';

  /* ============================================================
     BELARUS TRANSPARENCY — CASE WP №143/2025 DASHBOARD
     Self-contained renderer.
     Injects styles + HTML into #bt-wp143-dashboard, then draws dots.
     ============================================================ */

  var CSS = `
.bt-dash {
  --bt-bg-primary:        #FBF9F4;
  --bt-bg-secondary:      #F4F2EC;
  --bt-text-primary:      #1A1A1A;
  --bt-text-secondary:    #555555;
  --bt-text-tertiary:     #888888;
  --bt-border-secondary:  #D5D2C5;
  --bt-border-tertiary:   #E5E3D8;
  --bt-accent:            #D85A30;
  --bt-accent-bg:         #FAECE7;
  --bt-accent-text:       #4A1B0C;
  --bt-accent-strong:     #993C1D;
  --bt-accent-medium:     #712B13;
  --bt-radius-md: 8px;
  --bt-radius-lg: 12px;
  --bt-font-sans:  'Inter', -apple-system, BlinkMacSystemFont, system-ui, 'Segoe UI', Roboto, sans-serif;
  --bt-font-serif: 'Source Serif Pro', Georgia, 'Cormorant Garamond', serif;
  --bt-font-mono:  'JetBrains Mono', Menlo, Monaco, Consolas, monospace;
  font-family: var(--bt-font-sans);
  color: var(--bt-text-primary);
  line-height: 1.5;
  max-width: 760px;
  margin: 0 auto;
  padding: 1.5rem;
  background: var(--bt-bg-primary);
  box-sizing: border-box;
}
.bt-dash *, .bt-dash *::before, .bt-dash *::after { box-sizing: border-box; }
@media (prefers-color-scheme: dark) {
  .bt-dash:not([data-theme="light"]) {
    --bt-bg-primary:       #1F1E1B;
    --bt-bg-secondary:     #2B2A26;
    --bt-text-primary:     #F5F2EA;
    --bt-text-secondary:   #B3B0A6;
    --bt-text-tertiary:    #828079;
    --bt-border-secondary: #3E3C36;
    --bt-border-tertiary:  #34322D;
    --bt-accent-bg:        #712B13;
    --bt-accent-text:      #F5C4B3;
    --bt-accent-strong:    #F0997B;
    --bt-accent-medium:    #F5C4B3;
  }
}
.bt-dash[data-theme="dark"] {
  --bt-bg-primary:       #1F1E1B;
  --bt-bg-secondary:     #2B2A26;
  --bt-text-primary:     #F5F2EA;
  --bt-text-secondary:   #B3B0A6;
  --bt-text-tertiary:    #828079;
  --bt-border-secondary: #3E3C36;
  --bt-border-tertiary:  #34322D;
  --bt-accent-bg:        #712B13;
  --bt-accent-text:      #F5C4B3;
  --bt-accent-strong:    #F0997B;
  --bt-accent-medium:    #F5C4B3;
}
.bt-dash .bt-sr-only {
  position:absolute; left:-10000px; width:1px; height:1px; overflow:hidden;
}
.bt-dash .bt-hero {
  background: var(--bt-bg-secondary);
  border-radius: var(--bt-radius-lg);
  padding: 1.5rem;
  margin-bottom: 1.25rem;
}
.bt-dash .bt-hero-eyebrow {
  font-size: 11px; color: var(--bt-text-tertiary);
  margin: 0 0 8px; text-transform: uppercase;
  letter-spacing: 0.8px; line-height: 1.5;
}
.bt-dash .bt-hero-title {
  font-family: var(--bt-font-serif);
  font-size: 22px; font-weight: 600;
  line-height: 1.3; margin: 0 0 6px;
  color: var(--bt-text-primary);
}
.bt-dash .bt-hero-authors {
  font-size: 12px; color: var(--bt-text-secondary);
  margin: 0 0 14px; font-style: italic;
}
.bt-dash .bt-hero-verdict {
  background: var(--bt-accent-bg);
  border-radius: var(--bt-radius-md);
  border-left: 3px solid var(--bt-accent-strong);
  padding: 10px 14px; margin: 0 0 14px;
}
.bt-dash .bt-hero-verdict-label {
  font-size: 10px; font-weight: 600;
  color: var(--bt-accent-strong);
  text-transform: uppercase; letter-spacing: 1px;
  margin: 0 0 4px;
}
.bt-dash .bt-hero-verdict-text {
  font-size: 14px; font-weight: 500;
  color: var(--bt-accent-text);
  line-height: 1.4; margin: 0;
}
.bt-dash .bt-hero-meta {
  font-size: 12px; color: var(--bt-text-secondary);
  margin: 0; line-height: 1.6;
}
.bt-dash .bt-hero-meta strong {
  color: var(--bt-text-primary); font-weight: 500;
}
.bt-dash .bt-metrics {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px; margin-bottom: 1.5rem;
}
.bt-dash .bt-metric {
  background: var(--bt-bg-secondary);
  border-radius: var(--bt-radius-md);
  padding: 14px 12px;
}
.bt-dash .bt-metric-label {
  font-size: 11px; color: var(--bt-text-secondary);
  margin: 0 0 6px; line-height: 1.3;
}
.bt-dash .bt-metric-value {
  font-family: var(--bt-font-serif);
  font-size: 24px; font-weight: 700;
  color: var(--bt-text-primary);
  line-height: 1.1; margin: 0;
}
.bt-dash .bt-metric-sub {
  font-size: 11px; color: var(--bt-text-tertiary);
  margin: 6px 0 0; line-height: 1.4;
}
.bt-dash .bt-section { margin-bottom: 1.75rem; }
.bt-dash .bt-section-title {
  font-family: var(--bt-font-serif);
  font-size: 16px; font-weight: 600;
  margin: 0 0 10px; color: var(--bt-text-primary);
}
.bt-dash .bt-section-lede {
  font-size: 14px; color: var(--bt-text-secondary);
  margin: 0 0 12px; line-height: 1.6;
}
.bt-dash .bt-section-lede strong {
  color: var(--bt-text-primary); font-weight: 500;
}
.bt-dash .bt-subprose {
  font-size: 14px; color: var(--bt-text-secondary);
  margin: 1.25rem 0 10px; line-height: 1.6;
}
.bt-dash .bt-subprose strong {
  color: var(--bt-text-primary); font-weight: 500;
}
.bt-dash .bt-question {
  font-size: 14px; color: var(--bt-text-primary);
  font-weight: 500; line-height: 1.55;
  margin: 0 0 12px;
}
.bt-dash .bt-dots {
  display: grid;
  grid-template-columns: repeat(25, 1fr);
  gap: 7px; padding: 18px;
  background: var(--bt-bg-secondary);
  border-radius: var(--bt-radius-md);
  margin-bottom: 8px;
}
.bt-dash .bt-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  background: var(--bt-border-secondary);
  justify-self: center;
}
.bt-dash .bt-dot.bt-red { background: var(--bt-accent); }
.bt-dash .bt-dots-caption {
  font-size: 11px; color: var(--bt-text-tertiary);
  margin: 0; line-height: 1.5;
}
.bt-dash .bt-bigdots-wrap {
  background: var(--bt-bg-secondary);
  border-radius: var(--bt-radius-md);
  padding: 18px; text-align: center;
  margin-bottom: 8px;
}
.bt-dash .bt-bigdots-wrap canvas {
  display: block; margin: 0 auto;
  max-width: 100%; height: auto;
}
.bt-dash .bt-callout {
  display: flex; gap: 10px;
  background: var(--bt-bg-secondary);
  border-radius: var(--bt-radius-md);
  padding: 12px 14px;
  margin-top: 1.25rem;
  font-size: 14px;
  color: var(--bt-text-primary);
  line-height: 1.6;
}
.bt-dash .bt-callout.bt-ironic { border-left: 3px solid var(--bt-accent); }
.bt-dash .bt-callout.bt-curio  { border-left: 3px solid var(--bt-border-secondary); margin-top: 0.75rem; }
.bt-dash .bt-callout.bt-postscript {
  border-left: 3px solid var(--bt-border-secondary);
  padding: 14px 16px; margin-top: 1.75rem;
}
.bt-dash .bt-callout .bt-icon {
  flex-shrink: 0; margin-top: 1px;
  width: 18px; height: 18px;
}
.bt-dash .bt-callout.bt-ironic .bt-icon { color: var(--bt-accent); }
.bt-dash .bt-callout.bt-curio  .bt-icon,
.bt-dash .bt-callout.bt-postscript .bt-icon { color: var(--bt-text-secondary); width: 20px; height: 20px; }
.bt-dash .bt-callout-body { flex: 1; }
.bt-dash .bt-callout p { margin: 0; }
.bt-dash .bt-callout p + p { margin-top: 8px; }
.bt-dash .bt-callout strong { font-weight: 500; }
.bt-dash .bt-callout-label {
  font-size: 10px; font-weight: 600;
  color: var(--bt-text-secondary);
  text-transform: uppercase; letter-spacing: 1px;
  margin: 0 0 5px;
}
.bt-dash .bt-callout code {
  font-family: var(--bt-font-mono);
  font-size: 12px;
  background: var(--bt-bg-primary);
  padding: 1px 5px; border-radius: 3px;
}
.bt-dash .bt-markers {
  background: var(--bt-bg-secondary);
  border-radius: var(--bt-radius-md);
  padding: 6px 16px;
}
.bt-dash .bt-marker {
  display: flex; gap: 10px;
  padding: 12px 0;
  border-bottom: 0.5px solid var(--bt-border-tertiary);
}
.bt-dash .bt-marker:last-child { border-bottom: none; }
.bt-dash .bt-marker .bt-icon {
  flex-shrink: 0; margin-top: 1px;
  width: 18px; height: 18px;
  color: var(--bt-accent);
}
.bt-dash .bt-marker-body {
  flex: 1; font-size: 14px;
  color: var(--bt-text-primary);
  line-height: 1.5;
}
.bt-dash .bt-marker-sub {
  font-size: 13px;
  color: var(--bt-text-secondary);
  margin-top: 4px; line-height: 1.55;
}
.bt-dash .bt-marker-sub strong { color: var(--bt-text-primary); font-weight: 500; }
.bt-dash .bt-chain {
  background: var(--bt-bg-secondary);
  border-radius: var(--bt-radius-md);
  padding: 6px 16px;
}
.bt-dash .bt-chain-step {
  display: flex; gap: 12px;
  padding: 12px 0;
  border-bottom: 0.5px solid var(--bt-border-tertiary);
}
.bt-dash .bt-chain-step:last-child { border-bottom: none; }
.bt-dash .bt-chain-num {
  width: 24px; height: 24px;
  border-radius: 50%;
  background: var(--bt-bg-primary);
  color: var(--bt-text-secondary);
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; flex-shrink: 0; font-weight: 500;
  border: 0.5px solid var(--bt-border-tertiary);
}
.bt-dash .bt-chain-body {
  flex: 1; font-size: 14px;
  color: var(--bt-text-primary); line-height: 1.5;
}
.bt-dash .bt-chain-body strong { font-weight: 500; }
.bt-dash .bt-chain-sub {
  font-size: 12px; color: var(--bt-text-tertiary);
  margin-top: 4px; line-height: 1.5;
}
.bt-dash .bt-svg-wrap {
  background: var(--bt-bg-secondary);
  border-radius: var(--bt-radius-md);
  padding: 12px;
}
.bt-dash .bt-svg-coral-fill { fill: var(--bt-accent-bg); }
.bt-dash .bt-svg-coral-stroke { stroke: var(--bt-accent-strong); }
.bt-dash .bt-svg-coral-title { fill: var(--bt-accent-medium); }
.bt-dash .bt-svg-coral-sub { fill: var(--bt-accent-strong); }
.bt-dash .bt-svg-coral-strong { fill: var(--bt-accent-strong); }
.bt-dash .bt-svg-coral-line { stroke: var(--bt-accent-strong); opacity: 0.25; }
.bt-dash .bt-svg-bg { fill: var(--bt-bg-primary); stroke: var(--bt-border-secondary); }
.bt-dash .bt-svg-text-primary { fill: var(--bt-text-primary); }
.bt-dash .bt-svg-text-secondary { fill: var(--bt-text-secondary); }
.bt-dash .bt-svg-text-tertiary { stroke: var(--bt-text-tertiary); }
.bt-dash .bt-footnote {
  font-size: 11px;
  color: var(--bt-text-tertiary);
  margin: 1rem 4px 0;
  line-height: 1.6;
}
@media (max-width: 560px) {
  .bt-dash { padding: 1rem; }
  .bt-dash .bt-hero { padding: 1.2rem; }
  .bt-dash .bt-hero-title { font-size: 19px; }
  .bt-dash .bt-metrics { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .bt-dash .bt-metric-value { font-size: 20px; }
  .bt-dash .bt-dots { gap: 4px; padding: 12px; }
  .bt-dash .bt-dot { width: 8px; height: 8px; }
}
`;

  /* ---- inject styles once ---- */
  if (!document.getElementById('bt-wp143-styles')) {
    var style = document.createElement('style');
    style.id = 'bt-wp143-styles';
    style.textContent = CSS;
    document.head.appendChild(style);

    /* preconnect + load Google Fonts for the dashboard, if not already present */
    if (!document.querySelector('link[href*="fonts.googleapis.com/css2?family=Inter"]')) {
      var pre1 = document.createElement('link');
      pre1.rel = 'preconnect';
      pre1.href = 'https://fonts.googleapis.com';
      document.head.appendChild(pre1);
      var pre2 = document.createElement('link');
      pre2.rel = 'preconnect';
      pre2.href = 'https://fonts.gstatic.com';
      pre2.crossOrigin = '';
      document.head.appendChild(pre2);
      var fontsLink = document.createElement('link');
      fontsLink.rel = 'stylesheet';
      fontsLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Source+Serif+Pro:wght@400;600;700&family=JetBrains+Mono:wght@400&display=swap';
      document.head.appendChild(fontsLink);
    }
  }

  /* ---- build HTML ---- */
  var HTML = `
<article class="bt-dash">

  <h2 class="bt-sr-only">Дашборд анализа Working Paper CASE №143/2025 о беларуских мигрантах-предпринимателях в ЕС</h2>

  <div class="bt-hero">
    <p class="bt-hero-eyebrow">Belarus Transparency Brief · CASE Working Paper №143 / 2025</p>
    <h1 class="bt-hero-title">Exploring the Entrepreneurial Potential of Belarusian Migrants in the EU</h1>
    <p class="bt-hero-authors">O. Aleszko-Lessels, A. Kulesa, M. Zarychta · CASE, 2025</p>
    <div class="bt-hero-verdict">
      <p class="bt-hero-verdict-label">Суть</p>
      <p class="bt-hero-verdict-text">Имитация полевой работы. Вместо заявленных экспертных интервью — три анонимных кейса и компиляция открытых источников на 48 страницах.</p>
    </div>
    <p class="bt-hero-meta">
      Работа — один из деливераблов гранта Еврокомиссии в <strong>€1 млн</strong>, выданного в декабре 2022 года консорциуму четырёх организаций: <strong>Association of Belarusian Business Abroad</strong> (ABBA, заказчик и со-бенефициар), <strong>CASE — Center for Social and Economic Research</strong> (польский think tank), <strong>Krajowa Izba Gospodarcza</strong> (KIG, Польская национальная торговая палата) и <strong>Lietuvos darbdavių konfederacija</strong> (LDK, Конфедерация работодателей Литвы). Название проекта: «Support to Belarusian businesses in exile and ABBA Capacity Development».
    </p>
  </div>

  <div class="bt-metrics">
    <div class="bt-metric">
      <p class="bt-metric-label">Грант ЕС консорциуму</p>
      <p class="bt-metric-value">€1 млн</p>
      <p class="bt-metric-sub">работа — один из элементов; бюджет публикации не раскрыт</p>
    </div>
    <div class="bt-metric">
      <p class="bt-metric-label">Объём публикации</p>
      <p class="bt-metric-value">48 стр.</p>
      <p class="bt-metric-sub">~8 страниц чисто иллюстраций (~17%)</p>
    </div>
    <div class="bt-metric">
      <p class="bt-metric-label">Своего материала</p>
      <p class="bt-metric-value">~5 стр.</p>
      <p class="bt-metric-sub">3 анонимных интервью; остальное — компиляция</p>
    </div>
    <div class="bt-metric">
      <p class="bt-metric-label">Анонимных интервью</p>
      <p class="bt-metric-value">3 / 19 000</p>
      <p class="bt-metric-sub">на бизнес-единицы беларусов в ЕС</p>
    </div>
  </div>

  <section class="bt-section">
    <h3 class="bt-section-title">Выборка: 3 анонимных интервью при 5 988 предприятиях с беларуским участием в Польше</h3>
    <p class="bt-section-lede">
      ABBA — заказчик гранта — заявляет о <strong>125 верифицированных по уставу бизнесах-членах из 13 стран</strong>. Устав ABBA требует проверки на отсутствие связей с режимом; членство означает <strong>публичное заявление о противостоянии Лукашенко</strong>.
    </p>
    <p class="bt-question">
      Почему ни одна из 125 организаций не смогла принять открытое — не анонимное — участие в интервью?
    </p>
    <div id="bt-dots-125" class="bt-dots"></div>
    <p class="bt-dots-caption">Точка — бизнес-член ABBA, публично декларирующий борьбу с режимом. Красные — анонимные интервью в работе.</p>

    <p class="bt-subprose">
      <strong>Предположим, авторы не захотели общаться с членами ABBA и искали интервьюируемых сами — картина становится ещё невероятнее.</strong> На сентябрь 2023 в Польше — 5 988 предприятий с беларуским участием (Central Economic Information Centre, цит. в CASE WP стр. 21):
    </p>
    <div class="bt-bigdots-wrap">
      <canvas id="bt-bigdots" role="img" aria-label="Сетка из 5988 точек, представляющих все предприятия с беларуским участием в Польше на сентябрь 2023; красные точки — анонимные интервью"></canvas>
    </div>
    <p class="bt-dots-caption">Точка — предприятие с беларуским участием в Польше (sp. z o.o., S.A.). Красные — те же анонимные интервью.</p>

    <div class="bt-callout bt-ironic">
      <svg class="bt-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1"/>
        <path d="M12 16v.01"/>
        <path d="M12 13a2 2 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483"/>
      </svg>
      <div class="bt-callout-body">
        <p><strong>Можно ли по трём анонимным интервью делать выводы о целой бизнес-диаспоре?</strong> Все обобщения работы, оценка польской программы Poland.Business Harbour, оценка барьеров в Балтии, рекомендации для Еврокомиссии — опираются на эту полевую базу.</p>
        <p>Авторы в разделе ограничений признают: респонденты могли давать «социально желательные ответы», «страх политических последствий» мог влиять на формулировки. В Summary и рекомендациях признания нет — выводы сформулированы, будто базы достаточно.</p>
      </div>
    </div>
  </section>

  <section class="bt-section">
    <h3 class="bt-section-title">Кто кому кем приходится: CASE — ABBA — BEROC</h3>
    <p class="bt-section-lede">
      За три месяца до контракта с ЕС польский <strong>CASE Warsaw поглотил CASE Belarus</strong>. В правлении CASE Belarus сидели два вице-президента ABBA. Соавтор Kulesa — в надзорном совете того же CASE Belarus, рядом с директором и экономистом BEROC, цитируемого в работе дважды как «независимый источник».
    </p>
    <div class="bt-svg-wrap">
      <svg width="100%" viewBox="0 0 680 520" role="img" xmlns="http://www.w3.org/2000/svg">
        <title>Сеть институционального сращивания CASE — ABBA — BEROC</title>
        <desc>Диаграмма показывает: грант ЕС идёт консорциуму CASE и ABBA; CASE Belarus, поглощённая CASE Warsaw в сентябре 2022, служила общей точкой — в её правлении сидели вице-президенты ABBA, в надзорном совете — соавтор Working Paper и руководство BEROC.</desc>
        <defs>
          <marker id="bt-dasharrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </marker>
        </defs>

        <rect class="bt-svg-bg" x="240" y="20" width="200" height="48" rx="8" stroke-width="0.5"/>
        <text class="bt-svg-text-primary" x="340" y="40" text-anchor="middle" dominant-baseline="central" font-size="14" font-weight="600">Еврокомиссия</text>
        <text class="bt-svg-text-secondary" x="340" y="58" text-anchor="middle" dominant-baseline="central" font-size="12">грант €1 млн · декабрь 2022</text>

        <line class="bt-svg-text-tertiary" x1="280" y1="68" x2="200" y2="98" stroke-width="1" marker-end="url(#bt-dasharrow)"/>
        <line class="bt-svg-text-tertiary" x1="400" y1="68" x2="480" y2="98" stroke-width="1" marker-end="url(#bt-dasharrow)"/>

        <rect class="bt-svg-bg" x="40" y="100" width="280" height="76" rx="8" stroke-width="0.5"/>
        <text class="bt-svg-text-primary" x="180" y="120" text-anchor="middle" dominant-baseline="central" font-size="14" font-weight="600">CASE Warsaw</text>
        <text class="bt-svg-text-secondary" x="180" y="139" text-anchor="middle" dominant-baseline="central" font-size="12">издатель Working Paper №143/2025</text>
        <text class="bt-svg-text-secondary" x="180" y="156" text-anchor="middle" dominant-baseline="central" font-size="12">авторы: Aleszko-Lessels, Kulesa, Zarychta</text>

        <rect class="bt-svg-bg" x="360" y="100" width="280" height="76" rx="8" stroke-width="0.5"/>
        <text class="bt-svg-text-primary" x="500" y="120" text-anchor="middle" dominant-baseline="central" font-size="14" font-weight="600">ABBA</text>
        <text class="bt-svg-text-secondary" x="500" y="139" text-anchor="middle" dominant-baseline="central" font-size="12">заказчик / со-бенефициар гранта</text>
        <text class="bt-svg-text-secondary" x="500" y="156" text-anchor="middle" dominant-baseline="central" font-size="12">VP: Naurodski, Alachnovič · президент: Бурый</text>

        <line class="bt-svg-text-tertiary" x1="180" y1="176" x2="180" y2="218" stroke-width="1" marker-end="url(#bt-dasharrow)"/>
        <text class="bt-svg-coral-strong" x="190" y="194" text-anchor="start" font-size="11" font-weight="600">поглощение</text>
        <text class="bt-svg-coral-strong" x="190" y="209" text-anchor="start" font-size="11">15.09.2022</text>

        <line class="bt-svg-text-tertiary" x1="500" y1="176" x2="500" y2="218" stroke-width="1" marker-end="url(#bt-dasharrow)"/>
        <text class="bt-svg-coral-strong" x="490" y="194" text-anchor="end" font-size="11" font-weight="600">оба VP →</text>
        <text class="bt-svg-coral-strong" x="490" y="209" text-anchor="end" font-size="11">в правлении</text>

        <rect class="bt-svg-coral-fill bt-svg-coral-stroke" x="40" y="220" width="600" height="190" rx="10" stroke-width="1"/>
        <text class="bt-svg-coral-title" x="340" y="244" text-anchor="middle" dominant-baseline="central" font-size="14" font-weight="600">CASE Belarus (до слияния 15 сентября 2022)</text>
        <text class="bt-svg-coral-sub" x="340" y="262" text-anchor="middle" dominant-baseline="central" font-size="12">за 3 месяца до подписания контракта с Еврокомиссией</text>

        <line class="bt-svg-coral-line" x1="60" y1="280" x2="620" y2="280" stroke-width="0.5"/>

        <text class="bt-svg-coral-sub" x="70" y="305" font-size="12" font-weight="600">Правление (Zarząd)</text>
        <text class="bt-svg-coral-title" x="70" y="328" font-size="13">Naurodski → Prezes</text>
        <text class="bt-svg-coral-strong" x="84" y="346" font-size="11">↳ одновременно VP of ABBA</text>
        <text class="bt-svg-coral-title" x="70" y="370" font-size="13">Alachnovič → Wiceprezes</text>
        <text class="bt-svg-coral-strong" x="84" y="388" font-size="11">↳ одновременно VP of ABBA</text>

        <text class="bt-svg-coral-sub" x="360" y="305" font-size="12" font-weight="600">Надзорный совет (Rada Fundacji)</text>
        <text class="bt-svg-coral-title" x="360" y="328" font-size="13">Kulesa</text>
        <text class="bt-svg-coral-strong" x="374" y="346" font-size="11">↳ соавтор Working Paper №143/2025</text>
        <text class="bt-svg-coral-title" x="360" y="370" font-size="13">Daneyko · Pelipas</text>
        <text class="bt-svg-coral-strong" x="374" y="388" font-size="11">↳ директор и экономист BEROC</text>

        <line class="bt-svg-text-tertiary" x1="500" y1="410" x2="500" y2="438" stroke-width="1" marker-end="url(#bt-dasharrow)"/>

        <rect class="bt-svg-bg" x="360" y="440" width="280" height="72" rx="8" stroke-width="0.5"/>
        <text class="bt-svg-text-primary" x="500" y="460" text-anchor="middle" dominant-baseline="central" font-size="14" font-weight="600">BEROC</text>
        <text class="bt-svg-text-secondary" x="500" y="479" text-anchor="middle" dominant-baseline="central" font-size="12">цитируется в работе дважды</text>
        <text class="bt-svg-coral-strong" x="500" y="496" text-anchor="middle" dominant-baseline="central" font-size="11">как «независимый источник»</text>
      </svg>
    </div>
  </section>

  <section class="bt-section">
    <h3 class="bt-section-title">Признаки текста «под донора»</h3>
    <div class="bt-markers">

      <div class="bt-marker">
        <svg class="bt-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M10.24 3.957l-8.422 14.06A1.989 1.989 0 0 0 3.518 21h16.964a1.989 1.989 0 0 0 1.7 -2.983l-8.422 -14.06a1.989 1.989 0 0 0 -3.52 0z"/>
          <path d="M12 9v4"/><path d="M12 17h.01"/>
        </svg>
        <div class="bt-marker-body">
          Опорный первоисточник методологически чище самой работы CASE
          <div class="bt-marker-sub">Ключевой источник CASE по барьерам в Польше — отчёт Forum Obywatelskiego Rozwoju (FOR) Babakova, Gomon, Naranovich, Oliński, изданный в партнёрстве с Польско-Украинской торговой палатой. <strong>У FOR нет полевых интервью</strong>: работа стоит на правовом обзоре и анализе открытой статистики <strong>Министерство развития и технологий Польши</strong> и <strong>Управление по делам иностранцев Польши> — каждая таблица подписана как ответ на запрос публичной информации, любой может повторить запрос. CASE опирается на эту работу, <em>добавляет</em> три анонимных интервью и заявляет «mixed-methods»...</div>
        </div>
      </div>

      <div class="bt-marker">
        <svg class="bt-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M10.24 3.957l-8.422 14.06A1.989 1.989 0 0 0 3.518 21h16.964a1.989 1.989 0 0 0 1.7 -2.983l-8.422 -14.06a1.989 1.989 0 0 0 -3.52 0z"/>
          <path d="M12 9v4"/><path d="M12 17h.01"/>
        </svg>
        <div class="bt-marker-body">
          Открытая публичная статистика — оформлена как «личная коммуникация»
          <div class="bt-marker-sub">Латвия (4 584 ВНЖ), Эстония (2 872 ВНЖ) — публичная статистика на сайтах PMLP и PPA; в работе оформлена как личная коммуникация с ведомствами.</div>
        </div>
      </div>

      <div class="bt-marker">
        <svg class="bt-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M10.24 3.957l-8.422 14.06A1.989 1.989 0 0 0 3.518 21h16.964a1.989 1.989 0 0 0 1.7 -2.983l-8.422 -14.06a1.989 1.989 0 0 0 -3.52 0z"/>
          <path d="M12 9v4"/><path d="M12 17h.01"/>
        </svg>
        <div class="bt-marker-body">
          Смешанные методы декларированы, но количественной фазы нет
          <div class="bt-marker-sub">Заявлено «оценить масштаб», «изучить склонность», «определить вызовы», «оценить влияние» — фактически обзор литературы плюс три иллюстративных интервью.</div>
        </div>
      </div>

      <div class="bt-marker">
        <svg class="bt-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M10.24 3.957l-8.422 14.06A1.989 1.989 0 0 0 3.518 21h16.964a1.989 1.989 0 0 0 1.7 -2.983l-8.422 -14.06a1.989 1.989 0 0 0 -3.52 0z"/>
          <path d="M12 9v4"/><path d="M12 17h.01"/>
        </svg>
        <div class="bt-marker-body">
          Раздел «Предыстория миграции» — переработка статьи CASE 2021 года
          <div class="bt-marker-sub">Та же соавтор Kulesa, та же организация, новые цифры на старый каркас.</div>
        </div>
      </div>

      <div class="bt-marker">
        <svg class="bt-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M10.24 3.957l-8.422 14.06A1.989 1.989 0 0 0 3.518 21h16.964a1.989 1.989 0 0 0 1.7 -2.983l-8.422 -14.06a1.989 1.989 0 0 0 -3.52 0z"/>
          <path d="M12 9v4"/><path d="M12 17h.01"/>
        </svg>
        <div class="bt-marker-body">
          Эмпирический казус выборки замалчивается
          <div class="bt-marker-sub">3 анонимных интервью при 125 публично заявивших о борьбе с режимом бизнесах ABBA. Авторы в разделе ограничений ссылаются на «страх политических последствий респондентов» — но члены ABBA уже публично объявили позицию.</div>
        </div>
      </div>

      <div class="bt-marker">
        <svg class="bt-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M10.24 3.957l-8.422 14.06A1.989 1.989 0 0 0 3.518 21h16.964a1.989 1.989 0 0 0 1.7 -2.983l-8.422 -14.06a1.989 1.989 0 0 0 -3.52 0z"/>
          <path d="M12 9v4"/><path d="M12 17h.01"/>
        </svg>
        <div class="bt-marker-body">
          Институциональная аффилиация CASE и ABBA — не раскрыта в самой работе
          <div class="bt-marker-sub">Ни в разделе раскрытия, ни в благодарностях, ни во введении.</div>
        </div>
      </div>

      <div class="bt-marker">
        <svg class="bt-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M10.24 3.957l-8.422 14.06A1.989 1.989 0 0 0 3.518 21h16.964a1.989 1.989 0 0 0 1.7 -2.983l-8.422 -14.06a1.989 1.989 0 0 0 -3.52 0z"/>
          <path d="M12 9v4"/><path d="M12 17h.01"/>
        </svg>
        <div class="bt-marker-body">
          Теоретическая рамка — заявлена, но не работает
          <div class="bt-marker-sub">Работа объявляет модель «смешанной встроенности» Клоостермана–Рата. По модели успех мигранта-предпринимателя зависит от трёх вещей: <em>(а)</em> ресурсы, которые он приносит (квалификация, контакты, капитал); <em>(б)</em> рыночные ниши в принимающей стране; <em>(в)</em> регуляторная среда (правила, бюрократия, барьеры). В эмпирической части ни один компонент не развёрнут: нет анализа ресурсов беларуского бизнеса, нет анализа открытых ниш, нет сравнения регуляторных режимов. Терминология есть, инструмента нет.</div>
        </div>
      </div>

      <div class="bt-marker">
        <svg class="bt-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M10.24 3.957l-8.422 14.06A1.989 1.989 0 0 0 3.518 21h16.964a1.989 1.989 0 0 0 1.7 -2.983l-8.422 -14.06a1.989 1.989 0 0 0 -3.52 0z"/>
          <path d="M12 9v4"/><path d="M12 17h.01"/>
        </svg>
        <div class="bt-marker-body">
          Нагромождение источников: около половины библиографии — декорация
          <div class="bt-marker-sub">В списке литературы 101 позиция. На аргументацию реально работают около 15 источников; ещё ~35 — первичная фактура (пресса, реестры, отчёты). Остальные ~50 — декоративные академические ссылки без аналитической нагрузки. Стандартный приём «продемонстрировать научную глубину» через массу ссылок.</div>
        </div>
      </div>

    </div>
  </section>

  <section class="bt-section">
    <h3 class="bt-section-title">Цепочка делегирования полевой работы</h3>
    <div class="bt-chain">
      <div class="bt-chain-step">
        <div class="bt-chain-num">1</div>
        <div class="bt-chain-body">
          <strong>Еврокомиссия</strong> выделила €1 млн консорциуму ABBA + CASE + KIG + LDK
          <div class="bt-chain-sub">декабрь 2022, цель — «поддержка беларуского бизнеса в эмиграции»</div>
        </div>
      </div>
      <div class="bt-chain-step">
        <div class="bt-chain-num">2</div>
        <div class="bt-chain-body">
          <strong>ABBA</strong> делегировала исследовательскую часть на CASE Warsaw
          <div class="bt-chain-sub">CASE Warsaw к тому моменту уже поглотил CASE Belarus (15.09.2022), в правлении которого сидели вице-президенты самой ABBA</div>
        </div>
      </div>
      <div class="bt-chain-step">
        <div class="bt-chain-num">3</div>
        <div class="bt-chain-body">
          <strong>CASE</strong> оперся на отчёт FOR Babakova et al. — про украинский опыт в Польше
          <div class="bt-chain-sub">польская миграционная политика для иностранцев из стран вне ЕС с украинским фокусом</div>
        </div>
      </div>
    </div>

    <div class="bt-callout bt-curio">
      <svg class="bt-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9"/>
        <path d="M9 10l.01 0"/>
        <path d="M15 10l.01 0"/>
        <path d="M9.5 15a3.5 3.5 0 0 0 5 0"/>
      </svg>
      <div class="bt-callout-body">
        <p><strong>Курьёз национальных составов.</strong> Польскую миграционную политику для иностранцев в Польше разбирает польско-украинская команда FOR (логично — украинцы там главная мигрантская группа). А исследование о беларуском бизнесе в ЕС беларуский фасад ABBA перепоручил трём польским сотрудницам CASE. Беларусов в авторском составе нет.</p>
      </div>
    </div>
  </section>

  <div class="bt-callout bt-postscript">
    <svg class="bt-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="5" y="5" width="14" height="14" rx="1"/>
      <path d="M9 9h6v6h-6z"/>
      <path d="M3 10h2"/><path d="M3 14h2"/>
      <path d="M10 3v2"/><path d="M14 3v2"/>
      <path d="M21 10h-2"/><path d="M21 14h-2"/>
      <path d="M14 21v-2"/><path d="M10 21v-2"/>
    </svg>
    <div class="bt-callout-body">
      <p class="bt-callout-label">Постскриптум · AI-воспроизводимость такого «труда»</p>
      <p>Промпт на ~300 слов плюс список из <strong>10 ключевых организаций по теме</strong> (CASE, ABBA, BEROC, ZPP, FOR, OKO.press, Belsat, Devby, PMLP, Urząd do Spraw Cudzoziemców) — современная LLM выдаёт текст такого жанра за <strong>15–30 минут</strong>. Объём генерации — <strong>~10 000 слов</strong> основного текста. Полевую часть (три анонимных кейса) разрешается поручить модели самой; AI как минимум не перепутал бы имя респондентки <code>Olga/Anna</code> в кейсе 4.2.1 и не датировал бы полномасштабное вторжение России в Украину 2014 годом (стр. 30 работы CASE).</p>
    </div>
  </div>

  <p class="bt-footnote" style="text-align:center;margin-top:1.5rem;">
    Верификация: KRS 0000289206 (CASE Belarus), KRS 0000167095 (CASE Warsaw), abbabusiness.org/about-us, dialog.case-belarus.eu, tsikhanouskaya.org · 15.07.2024, nashaniva.com/ru/357826, CASE WP №143/2025 (стр. 11, 21, 30), for.org.pl, kig.pl, ldk.lt.
  </p>

</article>
`;

  /* ---- mount ---- */
  function mount() {
    var host = document.getElementById('bt-wp143-dashboard');
    if (!host) return;
    host.innerHTML = HTML;
    drawDots();
  }

  function drawDots() {
    /* Small dot grid: 125 dots, 3 reds */
    var dotsEl = document.getElementById('bt-dots-125');
    if (dotsEl) {
      var reds125 = {22: 1, 71: 1, 103: 1};
      for (var i = 0; i < 125; i++) {
        var d = document.createElement('div');
        d.className = 'bt-dot' + (reds125[i] ? ' bt-red' : '');
        dotsEl.appendChild(d);
      }
    }

    /* Big canvas grid: 5988 dots, 3 reds */
    var cv = document.getElementById('bt-bigdots');
    if (!cv) return;
    var cols = 100, rows = 60;
    var total = 5988;
    var cellPx = 5;
    var dotSize = 3;
    var w = cols * cellPx - (cellPx - dotSize);
    var h = rows * cellPx - (cellPx - dotSize);
    var dpr = window.devicePixelRatio || 1;
    cv.width = Math.round(w * dpr);
    cv.height = Math.round(h * dpr);
    cv.style.width = w + 'px';
    cv.style.height = h + 'px';
    var ctx = cv.getContext('2d');
    ctx.scale(dpr, dpr);
    var isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var host = cv.closest('.bt-dash');
    if (host && host.getAttribute('data-theme') === 'dark') isDark = true;
    if (host && host.getAttribute('data-theme') === 'light') isDark = false;
    ctx.fillStyle = isDark ? '#73726C' : '#B4B2A9';
    for (var k = 0; k < total; k++) {
      var c = k % cols;
      var r = Math.floor(k / cols);
      ctx.fillRect(c * cellPx, r * cellPx, dotSize, dotSize);
    }
    var reds6k = [856, 2987, 4912];
    ctx.fillStyle = '#D85A30';
    for (var j = 0; j < reds6k.length; j++) {
      var idx = reds6k[j];
      var c2 = idx % cols;
      var r2 = Math.floor(idx / cols);
      ctx.fillRect(c2 * cellPx, r2 * cellPx, dotSize, dotSize);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
