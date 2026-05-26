(function() {
  'use strict';

  /* ============================================================
     BELARUS TRANSPARENCY — CASE WP №143/2025 DASHBOARD
     
     Архитектура — как у dashboard-kc-2026.js:
     - этот файл генерирует HTML и подключает Canvas-рендер
     - все стили живут в docs/stylesheets/extra.css,
       секция «Дашборд WP143»
     - префикс классов: bt-wp143-*
     ============================================================ */

  var ROOT = document.getElementById('bt-wp143-dashboard');
  if (!ROOT) return;

  /* ---- HTML ---- */
  ROOT.innerHTML = ''
    + renderHeader()
    + renderStats()
    + renderVerdict()
    + renderHero()
    + renderDots()
    + renderChain()
    + renderMarkers()
    + renderAiPostscript()
    + renderFooter();

  /* Draw dots after DOM injected */
  drawDots();

  /* ============================================================
     RENDER FUNCTIONS
     ============================================================ */

  function renderHeader(){
    return ''
      + '<header class="bt-wp143-header">'
      +   '<div class="bt-wp143-header-main">'
      +     '<h1 class="bt-wp143-h1">'
      +       'Имитация полевой работы: '
      +       '<span class="bt-wp143-accent">грант €1 млн за три анонимных интервью</span>'
      +     '</h1>'
      +     '<p class="bt-wp143-sub">Разбор Working Paper CASE №143/2025 «Exploring the Entrepreneurial Potential of Belarusian Migrants in the EU» — O. Aleszko-Lessels, A. Kulesa, M. Zarychta (CASE, 2025, 48 стр.).</p>'
      +   '</div>'
      +   '<div class="bt-wp143-date-badge">'
      +     '<div class="bt-wp143-date-label">Презентация в Eurochambres</div>'
      +     '<div class="bt-wp143-date-value">24 апреля 2025</div>'
      +   '</div>'
      + '</header>';
  }

  function renderStats(){
    var items = [
      { label: 'Грант ЕК консорциуму', value: '€1 млн', sub: 'SCR.CTR.436909, 2022 · ABBA + CASE + KIG + LDK', warn: false },
      { label: 'Страниц в публикации', value: '48',     sub: 'Из них около 8 страниц — иллюстрации',         warn: false },
      { label: 'Авторских страниц',    value: '~5',     sub: 'Остальное — компиляция вторичных источников',  warn: true },
      { label: 'Анонимных интервью',   value: '3',      sub: 'На 5 988 беларуских предприятий в Польше',      warn: true }
    ];
    var html = items.map(function(s){
      var cls = 'bt-wp143-stat' + (s.warn ? ' bt-wp143-stat-warn' : '');
      return ''
        + '<div class="' + cls + '">'
        +   '<div class="bt-wp143-stat-label">' + s.label + '</div>'
        +   '<div class="bt-wp143-stat-val">' + s.value + '</div>'
        +   '<div class="bt-wp143-stat-sub">' + s.sub + '</div>'
        + '</div>';
    }).join('');
    return '<div class="bt-wp143-stats">' + html + '</div>';
  }

  function renderVerdict(){
    return ''
      + '<div class="bt-wp143-verdict">'
      +   '<div class="bt-wp143-verdict-label">Суть</div>'
      +   '<p class="bt-wp143-verdict-text">Имитация полевой работы. Вместо заявленных экспертных интервью — три анонимных кейса и компиляция открытых источников на 48 страницах за €1 млн гранта Еврокомиссии.</p>'
      + '</div>';
  }

  function renderHero(){
    return ''
      + '<div class="bt-wp143-section">'
      +   '<div class="bt-wp143-section-title">Контекст: грант на €1 млн консорциуму</div>'
      +   '<p class="bt-wp143-prose">Работа выполнена в рамках консорциумного гранта Еврокомиссии — контракт <strong>SCR.CTR.436909</strong>, декабрь 2022, программа NDICI-Global Europe. Бенефициар по EU FTS — <strong>Fundacja ABBA</strong> (PL7011051861). Консорциум — четыре организации: ABBA (заказчик и со-бенефициар), <strong>CASE</strong> — польский think tank (исполнитель исследования), <strong>KIG</strong> — Польская национальная торговая палата, <strong>LDK</strong> — Конфедерация работодателей Литвы. Название проекта: «Support to Belarusian businesses in exile and ABBA Capacity Development».</p>'
      + '</div>';
  }

  function renderDots(){
    return ''
      + '<div class="bt-wp143-section">'
      +   '<div class="bt-wp143-section-title">Эмпирическая база: 3 интервью на 5 988 предприятий</div>'
      +   '<p class="bt-wp143-prose">На сентябрь 2023 года в Польше — <strong>5 988</strong> предприятий с беларуским участием (Central Economic Information Centre). В работе CASE — <strong>3 анонимных интервью</strong>. Каждая точка ниже — одно предприятие; красные — три, на которых построена работа.</p>'
      +   '<div class="bt-wp143-dots-wrap">'
      +     '<canvas id="bt-wp143-dots-canvas" class="bt-wp143-dots-canvas" aria-label="Сетка точек: 5 988 беларуских предприятий в Польше. Красные — 3 анонимных интервью в работе."></canvas>'
      +   '</div>'
      + '</div>';
  }

  function renderChain(){
    var steps = [
      { num: '1', title: 'Декабрь 2022 — €1 млн от Еврокомиссии консорциуму',
        sub: 'Контракт SCR.CTR.436909, программа NDICI-Global Europe. Бенефициар по EU FTS — Fundacja ABBA.' },
      { num: '2', title: 'ABBA делегировала исследование CASE Warsaw',
        sub: 'CASE к тому моменту поглотил <strong>CASE Belarus</strong>, в правлении которого 16 лет сидели оба VP ABBA.' },
      { num: '3', title: 'Сентябрь 2024 — CASE завершил работу за 21 месяц',
        sub: 'Опёрся на отчёт FOR Babakova et al. о миграционной политике. Беларусов в составе CASE нет.' },
      { num: '4', title: '24 апреля 2025 — презентация работы в Eurochambres',
        sub: 'Через 3 месяца после получения консорциумом во главе с Eurochambres нового <strong>€3 млн</strong> гранта ЕК (BDI 2025–2027).',
        apex: true }
    ];
    var items = steps.map(function(s){
      var cls = 'bt-wp143-chain-step' + (s.apex ? ' bt-wp143-chain-step-apex' : '');
      return ''
        + '<div class="' + cls + '">'
        +   '<div class="bt-wp143-chain-num">' + s.num + '</div>'
        +   '<div class="bt-wp143-chain-body">'
        +     '<div class="bt-wp143-chain-title">' + s.title + '</div>'
        +     '<div class="bt-wp143-chain-sub">' + s.sub + '</div>'
        +   '</div>'
        + '</div>';
    }).join('');
    return ''
      + '<div class="bt-wp143-section">'
      +   '<div class="bt-wp143-section-title">Цепочка делегирования и финал в Брюсселе</div>'
      +   '<div class="bt-wp143-chain">' + items + '</div>'
      + '</div>';
  }

  function renderMarkers(){
    var markers = [
      { title: 'Декларация vs. реализация',
        text: 'В аннотации заявлен <strong>mixed-methods</strong> подход с экспертными интервью; в реализации — три анонимных кейса и обзор вторичных источников.' },
      { title: 'Несовпадение масштаба',
        text: 'Заявка опирается на тысячи беларуских предпринимателей в ЕС, аналитический корпус — <strong>3 интервью</strong>.' },
      { title: 'Анонимизация без объяснения',
        text: 'Три кейса даны без идентификаторов и без обоснования анонимности; верификация невозможна.' },
      { title: 'Тематический сдвиг к Украине',
        text: 'Ключевой обзор польской миграционной политики опирается на <strong>FOR Babakova et al.</strong> — отчёт о приёме украинских беженцев.' },
      { title: 'Отсутствие беларусов в авторском составе',
        text: 'Все авторы — польские исследователи CASE Warsaw, при том что заказчик и со-бенефициар (ABBA) позиционирует себя как беларуская диаспорная структура.' },
      { title: 'Несинхронность публикации и презентации',
        text: 'Работа завершена в сентябре 2024, но публично презентована только в апреле 2025 — через <strong>8 месяцев</strong>, в офисе Eurochambres.' },
      { title: 'Синхронность с новым грантом',
        text: 'Презентация — через 3 месяца после получения консорциумом во главе с Eurochambres нового гранта <strong>€3 млн</strong> на BDI 2025–2027.' },
      { title: 'Институциональное смешение',
        text: 'CASE к моменту начала работы уже поглотил CASE Belarus, в правлении которого 16 лет сидели оба VP ABBA, — исследователь и заказчик не независимы.' }
    ];
    var items = markers.map(function(m, i){
      return ''
        + '<div class="bt-wp143-marker">'
        +   '<div class="bt-wp143-marker-num">' + (i + 1) + '</div>'
        +   '<div class="bt-wp143-marker-body">'
        +     '<div class="bt-wp143-marker-title">' + m.title + '</div>'
        +     '<div class="bt-wp143-marker-text">' + m.text + '</div>'
        +   '</div>'
        + '</div>';
    }).join('');
    return ''
      + '<div class="bt-wp143-section">'
      +   '<div class="bt-wp143-section-title">Признаки текста «под донора»: 8 маркеров</div>'
      +   '<div class="bt-wp143-markers">' + items + '</div>'
      + '</div>';
  }

  function renderAiPostscript(){
    return ''
      + '<div class="bt-wp143-section">'
      +   '<div class="bt-wp143-section-title">AI-постскриптум</div>'
      +   '<p class="bt-wp143-prose">Стилистические маркеры — устойчивые конструкции «it should be noted that», «in particular», цикличные перечисления тех же тезисов в разных разделах, типовое распределение объёмов между секциями, отсутствие живой полевой фактуры при декларируемой «field research», — характерны для текстов, существенно опирающихся на генеративные языковые модели. Это не доказательство, а наблюдение: атрибуция авторства LLM требует отдельной экспертизы и не входит в задачу настоящего разбора. Само наблюдение служит ещё одним маркером того, что эмпирическая база работы — символическая.</p>'
      + '</div>';
  }

  function renderFooter(){
    return ''
      + '<div class="bt-wp143-footer">'
      +   'Верификация: KRS 0000289206 · EU FTS SCR.CTR.436909 · ISBN 978-83-67407-26-7'
      + '</div>';
  }

  /* ============================================================
     CANVAS — 5 988 dots
     ============================================================ */
  function drawDots(){
    var canvas = document.getElementById('bt-wp143-dots-canvas');
    if (!canvas || !canvas.getContext) return;

    /* Размеры — на основе фактической ширины контейнера */
    var rect = canvas.parentElement.getBoundingClientRect();
    var ratio = window.devicePixelRatio || 1;
    var W = Math.floor(rect.width);
    var H = 180;

    canvas.width = W * ratio;
    canvas.height = H * ratio;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';

    var ctx = canvas.getContext('2d');
    ctx.scale(ratio, ratio);

    /* dark / light mode */
    var isDark = document.documentElement.getAttribute('data-md-color-scheme') === 'slate';

    /* 80 × 22 = 1760 — иллюстративная сетка, не буквальные 5988 */
    var cols = 80, rows = 22, total = 1760;
    var cellW = W / cols;
    var cellH = H / rows;
    var dotSize = Math.min(cellW, cellH) * 0.55;
    var redSize = Math.min(cellW, cellH) * 0.90;

    /* Серые точки */
    ctx.fillStyle = isDark ? '#73726C' : '#7A7873';
    for (var k = 0; k < total; k++) {
      var c = k % cols;
      var r = Math.floor(k / cols);
      var x = c * cellW + (cellW - dotSize) / 2;
      var y = r * cellH + (cellH - dotSize) / 2;
      ctx.fillRect(x, y, dotSize, dotSize);
    }

    /* Красные — 3 точки, перекрывают серые */
    var reds = [287, 943, 1472];
    ctx.fillStyle = isDark ? '#D85A30' : '#B8341E';
    for (var j = 0; j < reds.length; j++) {
      var idx = reds[j];
      var c2 = idx % cols;
      var r2 = Math.floor(idx / cols);
      var x2 = c2 * cellW + (cellW - redSize) / 2;
      var y2 = r2 * cellH + (cellH - redSize) / 2;
      ctx.fillRect(x2, y2, redSize, redSize);
    }
  }

  /* Перерисовка при смене темы — через MutationObserver на data-md-color-scheme */
  var schemeObserver = new MutationObserver(function(){
    drawDots();
  });
  schemeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-md-color-scheme']
  });

  /* Перерисовка при resize */
  var resizeTimer = null;
  window.addEventListener('resize', function(){
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(drawDots, 150);
  });

})();
