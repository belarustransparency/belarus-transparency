(function() {
  'use strict';

  /* ============================================================
     BELARUS TRANSPARENCY — CASE WP №143/2025 DASHBOARD
     
     Архитектура — как у dashboard-kc-2026.js:
     - этот файл генерирует HTML
     - все стили живут в docs/stylesheets/extra.css,
       секция «Дашборд WP143»
     - префикс классов: bt-wp143-*
     
     Структура взята из шаблона case_wp143_dashboard.html:
       1. Hero (eyebrow, англ. заголовок, авторы, verdict, meta)
       2. Metrics (4 карточки)
       3. Sample (lede + question + subprose + callout «ironic»)
          → сетки точек 125/5988 вынесены в PDF, на странице нет
       4. Network (SVG-диаграмма CASE — ABBA — BEROC)
       5. Markers (8 маркеров «Признаки текста под донора»)
       6. Chain (3 шага делегирования + callout «curio»)
       7. Postscript (callout про AI-воспроизводимость)
       8. Footer (верификация)
     ============================================================ */

  var ROOT = document.getElementById('bt-wp143-dashboard');
  if (!ROOT) return;

  ROOT.innerHTML = ''
    + renderHero()
    + renderMetrics()
    + renderSample()
    + renderNetwork()
    + renderMarkers()
    + renderChain()
    + renderPostscript()
    + renderFooter();

  /* ============================================================
     SVG ICONS (inline, без внешних зависимостей)
     ============================================================ */

  function iconTriangleAlert(){
    return ''
      + '<svg class="bt-wp143-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
      +   '<path d="M10.24 3.957l-8.422 14.06A1.989 1.989 0 0 0 3.518 21h16.964a1.989 1.989 0 0 0 1.7 -2.983l-8.422 -14.06a1.989 1.989 0 0 0 -3.52 0z"/>'
      +   '<path d="M12 9v4"/><path d="M12 17h.01"/>'
      + '</svg>';
  }

  function iconIronic(){
    return ''
      + '<svg class="bt-wp143-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
      +   '<path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1"/>'
      +   '<path d="M12 16v.01"/>'
      +   '<path d="M12 13a2 2 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483"/>'
      + '</svg>';
  }

  function iconCurio(){
    return ''
      + '<svg class="bt-wp143-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
      +   '<circle cx="12" cy="12" r="9"/>'
      +   '<path d="M9 10l.01 0"/>'
      +   '<path d="M15 10l.01 0"/>'
      +   '<path d="M9.5 15a3.5 3.5 0 0 0 5 0"/>'
      + '</svg>';
  }

  function iconPostscript(){
    return ''
      + '<svg class="bt-wp143-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
      +   '<rect x="5" y="5" width="14" height="14" rx="1"/>'
      +   '<path d="M9 9h6v6h-6z"/>'
      +   '<path d="M3 10h2"/><path d="M3 14h2"/>'
      +   '<path d="M10 3v2"/><path d="M14 3v2"/>'
      +   '<path d="M21 10h-2"/><path d="M21 14h-2"/>'
      +   '<path d="M14 21v-2"/><path d="M10 21v-2"/>'
      + '</svg>';
  }

  /* ============================================================
     1. HERO
     ============================================================ */
  function renderHero(){
    return ''
      + '<div class="bt-wp143-hero">'
      +   '<p class="bt-wp143-hero-eyebrow">Belarus Transparency Brief · CASE Working Paper №143 / 2025</p>'
      +   '<h1 class="bt-wp143-hero-title">Exploring the Entrepreneurial Potential of Belarusian Migrants in the EU</h1>'
      +   '<p class="bt-wp143-hero-authors">O. Aleszko-Lessels, A. Kulesa, M. Zarychta · CASE, 2025</p>'
      +   '<div class="bt-wp143-hero-verdict">'
      +     '<p class="bt-wp143-hero-verdict-label">Суть</p>'
      +     '<p class="bt-wp143-hero-verdict-text">Имитация полевой работы. Вместо заявленных экспертных интервью — три анонимных кейса и компиляция открытых источников на 48 страницах.</p>'
      +   '</div>'
      +   '<p class="bt-wp143-hero-meta">'
      +     'Работа — один из деливераблов гранта Еврокомиссии в <strong>€1 млн</strong>, выданного в декабре 2022 года консорциуму четырёх организаций: <strong>Association of Belarusian Business Abroad</strong> (ABBA, заказчик и со-бенефициар), <strong>CASE — Center for Social and Economic Research</strong> (польский think tank), <strong>Krajowa Izba Gospodarcza</strong> (KIG, Польская национальная торговая палата) и <strong>Lietuvos darbdavių konfederacija</strong> (LDK, Конфедерация работодателей Литвы). Название проекта: «Support to Belarusian businesses in exile and ABBA Capacity Development».'
      +   '</p>'
      + '</div>';
  }

  /* ============================================================
     2. METRICS
     ============================================================ */
  function renderMetrics(){
    var items = [
      { label: 'Грант ЕС консорциуму', value: '€1 млн',    sub: 'работа — один из элементов; бюджет публикации не раскрыт' },
      { label: 'Объём публикации',     value: '48 стр.',   sub: '~8 страниц чисто иллюстраций (~17%)' },
      { label: 'Своего материала',     value: '~5 стр.',   sub: '3 анонимных интервью; остальное — компиляция' },
      { label: 'Анонимных интервью',   value: '3 / 19 000', sub: 'на бизнес-единицы беларусов в ЕС' }
    ];
    var html = items.map(function(m){
      return ''
        + '<div class="bt-wp143-metric">'
        +   '<p class="bt-wp143-metric-label">' + m.label + '</p>'
        +   '<p class="bt-wp143-metric-value">' + m.value + '</p>'
        +   '<p class="bt-wp143-metric-sub">' + m.sub + '</p>'
        + '</div>';
    }).join('');
    return '<div class="bt-wp143-metrics">' + html + '</div>';
  }

  /* ============================================================
     3. SAMPLE — без сеток точек (вынесены в PDF)
     ============================================================ */
  function renderSample(){
    return ''
      + '<section class="bt-wp143-section">'
      +   '<h3 class="bt-wp143-section-title">Выборка: 3 анонимных интервью при 5 988 предприятиях с беларуским участием в Польше</h3>'
      +   '<p class="bt-wp143-section-lede">'
      +     'ABBA — заказчик гранта — заявляет о <strong>125 верифицированных по уставу бизнесах-членах из 13 стран</strong>. Устав ABBA требует проверки на отсутствие связей с режимом; членство означает <strong>публичное заявление о противостоянии Лукашенко</strong>.'
      +   '</p>'
      +   '<p class="bt-wp143-question">'
      +     'Почему ни одна из 125 организаций не смогла принять открытое — не анонимное — участие в интервью?'
      +   '</p>'
      +   '<p class="bt-wp143-subprose">'
      +     '<strong>Предположим, авторы не захотели общаться с членами ABBA и искали интервьюируемых сами — картина становится ещё невероятнее.</strong> На сентябрь 2023 в Польше — 5 988 предприятий с беларуским участием (Central Economic Information Centre, цит. в CASE WP стр. 21).'
      +   '</p>'
      +   '<div class="bt-wp143-callout bt-wp143-callout-ironic">'
      +     iconIronic()
      +     '<div class="bt-wp143-callout-body">'
      +       '<p><strong>Можно ли по трём анонимным интервью делать выводы о целой бизнес-диаспоре?</strong> Все обобщения работы, оценка польской программы Poland.Business Harbour, оценка барьеров в Балтии, рекомендации для Еврокомиссии — опираются на эту полевую базу.</p>'
      +       '<p>Авторы в разделе ограничений признают: респонденты могли давать «социально желательные ответы», «страх политических последствий» мог влиять на формулировки. В Summary и рекомендациях признания нет — выводы сформулированы, будто базы достаточно.</p>'
      +     '</div>'
      +   '</div>'
      + '</section>';
  }

  /* ============================================================
     4. NETWORK — SVG-диаграмма CASE — ABBA — BEROC
     ============================================================ */
  function renderNetwork(){
    return ''
      + '<section class="bt-wp143-section">'
      +   '<h3 class="bt-wp143-section-title">Кто кому кем приходится: CASE — ABBA — BEROC</h3>'
      +   '<p class="bt-wp143-section-lede">'
      +     'За три месяца до контракта с ЕС польский <strong>CASE Warsaw поглотил CASE Belarus</strong>. В правлении CASE Belarus сидели два вице-президента ABBA. Соавтор Kulesa — в надзорном совете того же CASE Belarus, рядом с директором и экономистом BEROC, цитируемого в работе дважды как «независимый источник».'
      +   '</p>'
      +   '<div class="bt-wp143-svg-wrap">'
      +     renderNetworkSvg()
      +   '</div>'
      + '</section>';
  }

  function renderNetworkSvg(){
    return ''
      + '<svg width="100%" viewBox="0 0 680 520" role="img" xmlns="http://www.w3.org/2000/svg">'
      +   '<title>Сеть институционального сращивания CASE — ABBA — BEROC</title>'
      +   '<desc>Диаграмма показывает: грант ЕС идёт консорциуму CASE и ABBA; CASE Belarus, поглощённая CASE Warsaw в сентябре 2022, служила общей точкой — в её правлении сидели вице-президенты ABBA, в надзорном совете — соавтор Working Paper и руководство BEROC.</desc>'
      +   '<defs>'
      +     '<marker id="bt-wp143-dasharrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">'
      +       '<path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>'
      +     '</marker>'
      +   '</defs>'

      /* Еврокомиссия */
      +   '<rect class="bt-wp143-svg-bg" x="240" y="20" width="200" height="48" rx="8" stroke-width="0.5"/>'
      +   '<text class="bt-wp143-svg-text-primary" x="340" y="40" text-anchor="middle" dominant-baseline="central" font-size="14" font-weight="600">Еврокомиссия</text>'
      +   '<text class="bt-wp143-svg-text-secondary" x="340" y="58" text-anchor="middle" dominant-baseline="central" font-size="12">грант €1 млн · декабрь 2022</text>'

      /* стрелки от Еврокомиссии */
      +   '<line class="bt-wp143-svg-line" x1="280" y1="68" x2="200" y2="98" stroke-width="1" marker-end="url(#bt-wp143-dasharrow)"/>'
      +   '<line class="bt-wp143-svg-line" x1="400" y1="68" x2="480" y2="98" stroke-width="1" marker-end="url(#bt-wp143-dasharrow)"/>'

      /* CASE Warsaw */
      +   '<rect class="bt-wp143-svg-bg" x="40" y="100" width="280" height="76" rx="8" stroke-width="0.5"/>'
      +   '<text class="bt-wp143-svg-text-primary" x="180" y="120" text-anchor="middle" dominant-baseline="central" font-size="14" font-weight="600">CASE Warsaw</text>'
      +   '<text class="bt-wp143-svg-text-secondary" x="180" y="139" text-anchor="middle" dominant-baseline="central" font-size="12">издатель Working Paper №143/2025</text>'
      +   '<text class="bt-wp143-svg-text-secondary" x="180" y="156" text-anchor="middle" dominant-baseline="central" font-size="12">авторы: Aleszko-Lessels, Kulesa, Zarychta</text>'

      /* ABBA */
      +   '<rect class="bt-wp143-svg-bg" x="360" y="100" width="280" height="76" rx="8" stroke-width="0.5"/>'
      +   '<text class="bt-wp143-svg-text-primary" x="500" y="120" text-anchor="middle" dominant-baseline="central" font-size="14" font-weight="600">ABBA</text>'
      +   '<text class="bt-wp143-svg-text-secondary" x="500" y="139" text-anchor="middle" dominant-baseline="central" font-size="12">заказчик / со-бенефициар гранта</text>'
      +   '<text class="bt-wp143-svg-text-secondary" x="500" y="156" text-anchor="middle" dominant-baseline="central" font-size="12">VP: Naurodski, Alachnovič · президент: Бурый</text>'

      /* стрелка поглощения */
      +   '<line class="bt-wp143-svg-line" x1="180" y1="176" x2="180" y2="218" stroke-width="1" marker-end="url(#bt-wp143-dasharrow)"/>'
      +   '<text class="bt-wp143-svg-coral-strong" x="190" y="194" text-anchor="start" font-size="11" font-weight="600">поглощение</text>'
      +   '<text class="bt-wp143-svg-coral-strong" x="190" y="209" text-anchor="start" font-size="11">15.09.2022</text>'

      /* стрелка от ABBA */
      +   '<line class="bt-wp143-svg-line" x1="500" y1="176" x2="500" y2="218" stroke-width="1" marker-end="url(#bt-wp143-dasharrow)"/>'
      +   '<text class="bt-wp143-svg-coral-strong" x="490" y="194" text-anchor="end" font-size="11" font-weight="600">оба VP →</text>'
      +   '<text class="bt-wp143-svg-coral-strong" x="490" y="209" text-anchor="end" font-size="11">в правлении</text>'

      /* CASE Belarus — коралловая плашка */
      +   '<rect class="bt-wp143-svg-coral-fill bt-wp143-svg-coral-stroke" x="40" y="220" width="600" height="190" rx="10" stroke-width="1"/>'
      +   '<text class="bt-wp143-svg-coral-title" x="340" y="244" text-anchor="middle" dominant-baseline="central" font-size="14" font-weight="600">CASE Belarus (до слияния 15 сентября 2022)</text>'
      +   '<text class="bt-wp143-svg-coral-sub" x="340" y="262" text-anchor="middle" dominant-baseline="central" font-size="12">за 3 месяца до подписания контракта с Еврокомиссией</text>'
      +   '<line class="bt-wp143-svg-coral-divider" x1="60" y1="280" x2="620" y2="280" stroke-width="0.5"/>'

      /* Правление */
      +   '<text class="bt-wp143-svg-coral-sub" x="70" y="305" font-size="12" font-weight="600">Правление (Zarząd)</text>'
      +   '<text class="bt-wp143-svg-coral-title" x="70" y="328" font-size="13">Naurodski → Prezes</text>'
      +   '<text class="bt-wp143-svg-coral-strong" x="84" y="346" font-size="11">↳ одновременно VP of ABBA</text>'
      +   '<text class="bt-wp143-svg-coral-title" x="70" y="370" font-size="13">Alachnovič → Wiceprezes</text>'
      +   '<text class="bt-wp143-svg-coral-strong" x="84" y="388" font-size="11">↳ одновременно VP of ABBA</text>'

      /* Надзорный совет */
      +   '<text class="bt-wp143-svg-coral-sub" x="360" y="305" font-size="12" font-weight="600">Надзорный совет (Rada Fundacji)</text>'
      +   '<text class="bt-wp143-svg-coral-title" x="360" y="328" font-size="13">Kulesa</text>'
      +   '<text class="bt-wp143-svg-coral-strong" x="374" y="346" font-size="11">↳ соавтор Working Paper №143/2025</text>'
      +   '<text class="bt-wp143-svg-coral-title" x="360" y="370" font-size="13">Daneyko · Pelipas</text>'
      +   '<text class="bt-wp143-svg-coral-strong" x="374" y="388" font-size="11">↳ директор и экономист BEROC</text>'

      /* стрелка к BEROC */
      +   '<line class="bt-wp143-svg-line" x1="500" y1="410" x2="500" y2="438" stroke-width="1" marker-end="url(#bt-wp143-dasharrow)"/>'

      /* BEROC */
      +   '<rect class="bt-wp143-svg-bg" x="360" y="440" width="280" height="72" rx="8" stroke-width="0.5"/>'
      +   '<text class="bt-wp143-svg-text-primary" x="500" y="460" text-anchor="middle" dominant-baseline="central" font-size="14" font-weight="600">BEROC</text>'
      +   '<text class="bt-wp143-svg-text-secondary" x="500" y="479" text-anchor="middle" dominant-baseline="central" font-size="12">цитируется в работе дважды</text>'
      +   '<text class="bt-wp143-svg-coral-strong" x="500" y="496" text-anchor="middle" dominant-baseline="central" font-size="11">как «независимый источник»</text>'
      + '</svg>';
  }

  /* ============================================================
     5. MARKERS — 8 шт.
     ============================================================ */
  function renderMarkers(){
    var markers = [
      {
        title: 'Опорный первоисточник методологически чище самой работы CASE',
        sub: 'Ключевой источник CASE по барьерам в Польше — отчёт FOR (Forum Obywatelskiego Rozwoju) Babakova, Gomon, Naranovich, Oliński, изданный в партнёрстве с Польско-Украинской торговой палатой. <strong>У FOR нет полевых интервью</strong>: работа стоит на правовом обзоре и анализе открытой статистики <strong>Ministerstwo Rozwoju i Technologii</strong> (Министерство развития и технологий Польши) и <strong>Urząd do Spraw Cudzoziemców</strong> (Управление по делам иностранцев Польши) — каждая таблица подписана как ответ на запрос публичной информации, любой может повторить запрос. CASE опирается на эту работу, <em>добавляет</em> три анонимных интервью и заявляет «mixed-methods», а ту же по природе публичную статистику миграционных служб Латвии (PMLP) и Эстонии (PPA) оформляет как «personal communication». Источник честнее по жанру, чем работа, которая на него опирается. Состав авторов FOR по разделам: правовой обзор — Oliński (поляк, юрист FOR); анализ барьеров и рекомендации — Babakova и Naranovich, без Olińskiego.'
      },
      {
        title: 'Открытая публичная статистика — оформлена как «личная коммуникация»',
        sub: 'Латвия (4 584 ВНЖ), Эстония (2 872 ВНЖ) — публичная статистика на сайтах PMLP и PPA; в работе оформлена как личная коммуникация с ведомствами.'
      },
      {
        title: 'Смешанные методы декларированы, но количественной фазы нет',
        sub: 'Заявлено «оценить масштаб», «изучить склонность», «определить вызовы», «оценить влияние» — фактически обзор литературы плюс три иллюстративных интервью.'
      },
      {
        title: 'Раздел «Предыстория миграции» — переработка статьи CASE 2021 года',
        sub: 'Та же соавтор Kulesa, та же организация, новые цифры на старый каркас.'
      },
      {
        title: 'Эмпирический казус выборки замалчивается',
        sub: '3 анонимных интервью при 125 публично заявивших о борьбе с режимом бизнесах ABBA. Авторы в разделе ограничений ссылаются на «страх политических последствий респондентов» — но члены ABBA уже публично объявили позицию.'
      },
      {
        title: 'Институциональная аффилиация CASE и ABBA — не раскрыта в самой работе',
        sub: 'Ни в разделе раскрытия, ни в благодарностях, ни во введении.'
      },
      {
        title: 'Теоретическая рамка — заявлена, но не работает',
        sub: 'Работа объявляет модель «смешанной встроенности» Клоостермана–Рата. По модели успех мигранта-предпринимателя зависит от трёх вещей: <em>(а)</em> ресурсы, которые он приносит (квалификация, контакты, капитал); <em>(б)</em> рыночные ниши в принимающей стране; <em>(в)</em> регуляторная среда (правила, бюрократия, барьеры). В эмпирической части ни один компонент не развёрнут: нет анализа ресурсов беларуского бизнеса, нет анализа открытых ниш, нет сравнения регуляторных режимов. Терминология есть, инструмента нет.'
      },
      {
        title: 'Нагромождение источников: около половины библиографии — декорация',
        sub: 'В списке литературы 101 позиция. На аргументацию реально работают около 15 источников; ещё ~35 — первичная фактура (пресса, реестры, отчёты). Остальные ~50 — декоративные академические ссылки без аналитической нагрузки. Стандартный приём «продемонстрировать научную глубину» через массу ссылок.'
      }
    ];
    var items = markers.map(function(m){
      return ''
        + '<div class="bt-wp143-marker">'
        +   iconTriangleAlert()
        +   '<div class="bt-wp143-marker-body">'
        +     m.title
        +     '<div class="bt-wp143-marker-sub">' + m.sub + '</div>'
        +   '</div>'
        + '</div>';
    }).join('');
    return ''
      + '<section class="bt-wp143-section">'
      +   '<h3 class="bt-wp143-section-title">Признаки текста «под донора»</h3>'
      +   '<div class="bt-wp143-markers">' + items + '</div>'
      + '</section>';
  }

  /* ============================================================
     6. CHAIN — 3 шага + callout «curio»
     ============================================================ */
  function renderChain(){
    var steps = [
      {
        num: '1',
        title: '<strong>Еврокомиссия</strong> выделила €1 млн консорциуму ABBA + CASE + KIG + LDK',
        sub: 'декабрь 2022, цель — «поддержка беларуского бизнеса в эмиграции»'
      },
      {
        num: '2',
        title: '<strong>ABBA</strong> делегировала исследовательскую часть на CASE Warsaw',
        sub: 'CASE Warsaw к тому моменту уже поглотил CASE Belarus (15.09.2022), в правлении которого сидели вице-президенты самой ABBA'
      },
      {
        num: '3',
        title: '<strong>CASE</strong> оперся на отчёт FOR Babakova et al. — про украинский опыт в Польше',
        sub: 'польская миграционная политика для иностранцев из стран вне ЕС с украинским фокусом'
      }
    ];
    var items = steps.map(function(s){
      return ''
        + '<div class="bt-wp143-chain-step">'
        +   '<div class="bt-wp143-chain-num">' + s.num + '</div>'
        +   '<div class="bt-wp143-chain-body">'
        +     s.title
        +     '<div class="bt-wp143-chain-sub">' + s.sub + '</div>'
        +   '</div>'
        + '</div>';
    }).join('');
    return ''
      + '<section class="bt-wp143-section">'
      +   '<h3 class="bt-wp143-section-title">Цепочка делегирования полевой работы</h3>'
      +   '<div class="bt-wp143-chain">' + items + '</div>'
      +   '<div class="bt-wp143-callout bt-wp143-callout-curio">'
      +     iconCurio()
      +     '<div class="bt-wp143-callout-body">'
      +       '<p><strong>Курьёз национальных составов.</strong> Польскую миграционную политику для иностранцев в Польше разбирает польско-украинская команда FOR (логично — украинцы там главная мигрантская группа). А исследование о беларуском бизнесе в ЕС беларуский фасад ABBA перепоручил трём польским сотрудницам CASE. Беларусов в авторском составе нет.</p>'
      +     '</div>'
      +   '</div>'
      + '</section>';
  }

  /* ============================================================
     7. POSTSCRIPT
     ============================================================ */
  function renderPostscript(){
    return ''
      + '<div class="bt-wp143-callout bt-wp143-callout-postscript">'
      +   iconPostscript()
      +   '<div class="bt-wp143-callout-body">'
      +     '<p class="bt-wp143-callout-label">Постскриптум · AI-воспроизводимость такого «труда»</p>'
      +     '<p>Промпт на ~300 слов плюс список из <strong>10 ключевых организаций по теме</strong> (CASE, ABBA, BEROC, ZPP, FOR, OKO.press, Belsat, Devby, PMLP, Urząd do Spraw Cudzoziemców) — современная LLM выдаёт текст такого жанра за <strong>15–30 минут</strong>. Объём генерации — <strong>~10 000 слов</strong> основного текста. Полевую часть (три анонимных кейса) разрешается поручить модели самой; AI как минимум не перепутал бы имя респондентки <code>Olga/Anna</code> в кейсе 4.2.1 и не датировал бы полномасштабное вторжение России в Украину 2014 годом (стр. 30 работы CASE).</p>'
      +   '</div>'
      + '</div>';
  }

  /* ============================================================
     8. FOOTER
     ============================================================ */
  function renderFooter(){
    return ''
      + '<p class="bt-wp143-footnote">'
      +   'Верификация: KRS 0000289206 (CASE Belarus), KRS 0000167095 (CASE Warsaw), abbabusiness.org/about-us, dialog.case-belarus.eu, tsikhanouskaya.org · 15.07.2024, nashaniva.com/ru/357826, CASE WP №143/2025 (стр. 11, 21, 30), for.org.pl, kig.pl, ldk.lt.'
      + '</p>';
  }

})();
