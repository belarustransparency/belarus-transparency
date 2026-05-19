(function(){
  'use strict';

  var DATA_URL = './data.json';
  var ROOT = document.getElementById('bt-kc-dashboard');
  if (!ROOT) return;

  var state = {
    data: null,
    mode: 'before',
    openFactionId: null
  };

  fetch(DATA_URL)
    .then(function(r){ return r.json(); })
    .then(function(data){
      state.data = data;
      state.mode = (data.meta && data.meta.default_mode) || 'before';
      renderAll();
    })
    .catch(function(err){
      ROOT.innerHTML = '<p style="color:var(--bt-danger,#993C1D)">Ошибка загрузки данных дашборда: ' + err.message + '</p>';
    });

  function escapeHtml(s){
    if (s == null) return '';
    return String(s).replace(/[&<>"']/g, function(c){
      return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c];
    });
  }

  function getInitials(fullName){
    if (!fullName) return '';
    var clean = fullName.replace(/\(.*?\)/g, '').trim();
    var parts = clean.split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  function findFaction(factions, id){
    for (var i = 0; i < factions.length; i++) if (factions[i].id === id) return factions[i];
    return null;
  }

  function renderAll(){
    state.openFactionId = null;
    var d = state.data;
    var mode = d.modes[state.mode];
    var html = '';
    html += renderPdfBtn();
    html += renderModeToggle();
    html += renderHeader(d.meta, mode);
    html += renderStats(mode);
    if (state.mode === 'after' && mode.highlight) {
      html += renderHighlight(mode.highlight);
    }
    html += renderDonut(mode);
    html += renderRoutes(d.routes, d.factions);
    html += renderFactionsBars(d.factions, mode);
    if (mode.disclaimer) {
      html += renderDisclaimer(mode.disclaimer);
    }
    html += renderFooter(d.meta);
    ROOT.innerHTML = html;

    drawDonutChart('bt-kc-donut', mode.donut.segments);
    bindModeToggle();
    bindFactionToggles();
  }

  function renderPdfBtn(){
    return ''
      + '<div class="bt-kc-pdf-mobile">'
      +   '<a class="bt-kc-pdf-btn" href="./files/kc-2026-dashboard.pdf" download>Скачать дашборд в PDF</a>'
      + '</div>';
  }

  function renderModeToggle(){
    var modes = state.data.modes;
    var html = '<div class="bt-kc-mode-toggle">';
    Object.keys(modes).forEach(function(key){
      var cls = 'bt-kc-mode-btn' + (state.mode === key ? ' is-active' : '');
      html += '<button class="' + cls + '" type="button" data-mode="' + key + '">' + escapeHtml(modes[key].label) + '</button>';
    });
    html += '</div>';
    return html;
  }

  function renderHeader(meta, mode){
    return ''
      + '<header class="bt-kc-header">'
      +   '<div class="bt-kc-header-main">'
      +     '<h1 class="bt-kc-h1">' + mode.title_html + '</h1>'
      +     '<p class="bt-kc-sub">' + escapeHtml(mode.subtitle) + '</p>'
      +   '</div>'
      +   '<div class="bt-kc-date-badge">'
      +     '<div class="bt-kc-date-label">' + escapeHtml(mode.date_label) + '</div>'
      +     '<div class="bt-kc-date-value">' + escapeHtml(mode.date_value) + '</div>'
      +   '</div>'
      + '</header>';
  }

  function renderStats(mode){
    var items = mode.stats.map(function(s){
      var cls = 'bt-kc-stat' + (s.warn ? ' bt-kc-stat-warn' : '');
      return ''
        + '<div class="' + cls + '">'
        +   '<div class="bt-kc-stat-label">' + escapeHtml(s.label) + '</div>'
        +   '<div class="bt-kc-stat-val">' + escapeHtml(s.value) + '</div>'
        +   '<div class="bt-kc-stat-sub">' + escapeHtml(s.sub) + '</div>'
        + '</div>';
    }).join('');
    return '<div class="bt-kc-stats">' + items + '</div>';
  }

  function renderHighlight(h){
    return ''
      + '<div class="bt-kc-highlight">'
      +   '<div class="bt-kc-highlight-label">' + escapeHtml(h.label) + '</div>'
      +   '<div class="bt-kc-highlight-title">' + escapeHtml(h.title) + '</div>'
      +   '<div class="bt-kc-highlight-big">' + escapeHtml(h.big) + '</div>'
      +   '<div class="bt-kc-highlight-sub">' + escapeHtml(h.sub) + '</div>'
      + '</div>';
  }

  function renderDonut(mode){
    var legend = mode.donut.segments.map(function(d){
      return ''
        + '<div class="bt-kc-leg-row">'
        +   '<span class="bt-kc-leg-dot bt-kc-color-' + escapeHtml(d.color) + '"></span>'
        +   '<span class="bt-kc-leg-text"><span class="bt-kc-leg-strong">' + d.value + '</span> — ' + escapeHtml(d.label) + '</span>'
        + '</div>';
    }).join('');

    return ''
      + '<div class="bt-kc-donut-section">'
      +   '<div class="bt-kc-section-title">' + escapeHtml(mode.donut.title) + '</div>'
      +   '<div class="bt-kc-donut-flex">'
      +     '<div class="bt-kc-donut-wrap"><canvas id="bt-kc-donut" width="200" height="200"></canvas></div>'
      +     '<div class="bt-kc-donut-legend">'
      +       legend
      +       '<p class="bt-kc-leg-note">' + escapeHtml(mode.donut.note) + '</p>'
      +     '</div>'
      +   '</div>'
      + '</div>';
  }

  function renderRoutes(routes, factions){
    var isAfter = state.mode === 'after';
    var title = isAfter ? state.data.routes_after_label : state.data.routes_before_label;
    var titleHtml = escapeHtml(title).replace('Офис Тихановской', '<strong>Офис Тихановской</strong>');

    var items = routes.map(function(r){
      var seatsLine = '';
      if (isAfter) {
        var f = findFaction(factions, r.faction_id);
        if (f) {
          seatsLine = '<div class="bt-kc-route-seats">' + f.seats + ' мест · ' + f.votes_pct.toFixed(2).replace('.', ',') + '% голосов</div>';
        }
      }
      return ''
        + '<div class="bt-kc-route" data-faction-id="' + r.faction_id + '">'
        +   '<div class="bt-kc-route-dept">' + escapeHtml(r.dept) + '</div>'
        +   '<div class="bt-kc-route-names">' + r.names.map(escapeHtml).join(' · ') + '</div>'
        +   '<div class="bt-kc-route-arrow">↓</div>'
        +   '<div class="bt-kc-route-frac"><strong>' + escapeHtml(r.faction) + '</strong></div>'
        +   seatsLine
        + '</div>';
    }).join('');

    return ''
      + '<div class="bt-kc-routes-section">'
      +   '<div class="bt-kc-section-title">' + titleHtml + '</div>'
      +   '<div class="bt-kc-routes-grid">' + items + '</div>'
      + '</div>';
  }

  function renderFactionsBars(factions, mode){
    var isAfter = state.mode === 'after';
    var sorted = factions.slice().sort(function(a, b){
      if (isAfter) return b.seats - a.seats || b.votes - a.votes;
      return b.candidates.length - a.candidates.length;
    });
    var maxVal = isAfter
      ? Math.max.apply(null, sorted.map(function(f){ return f.seats; }))
      : sorted[0].candidates.length;
    if (maxVal === 0) maxVal = 1;

    var header = '';
    if (isAfter) {
      header = ''
        + '<div class="bt-kc-bars-header">'
        +   '<span>Фракция</span>'
        +   '<span>Распределение мест</span>'
        +   '<span>% голосов</span>'
        +   '<span>На канд.</span>'
        +   '<span></span>'
        + '</div>';
    }

    var rows = sorted.map(function(f){
      return renderFactionRow(f, maxVal, isAfter);
    }).join('');

    var listClass = 'bt-kc-factions-list' + (isAfter ? ' bt-kc-factions-list-after' : '');
    return ''
      + '<div class="bt-kc-factions-section">'
      +   '<div class="bt-kc-section-title">' + escapeHtml(mode.bars_title) + ' — кликните, чтобы раскрыть состав</div>'
      +   header
      +   '<div class="' + listClass + '">' + rows + '</div>'
      + '</div>';
  }

  function renderFactionRow(f, maxVal, isAfter){
    var num = f.candidates.length;
    var affilCount = f.candidates.filter(function(c){ return c.affil; }).length;

    var barWidth, barText, rightText, perCandText;

    if (isAfter) {
      barWidth = Math.round((f.seats / maxVal) * 100);
      if (f.seats === 0) {
        barText = '0 мест · не прошли';
      } else {
        barText = String(f.seats);
      }
      rightText = f.votes_pct.toFixed(2).replace('.', ',') + '%';
      perCandText = (typeof f.per_cand === 'number') ? f.per_cand.toFixed(1).replace('.', ',') : '—';
    } else {
      barWidth = Math.round((num / maxVal) * 100);
      barText = String(num);
      var countLabel = num + ' канд.';
      if (affilCount > 0) countLabel += ' · ' + affilCount + ' офис.';
      rightText = countLabel;
    }

    var fillClass = 'bt-kc-faction-fill bt-kc-color-' + f.type;
    var isZeroSeats = isAfter && f.seats === 0;

    var trackInner;
    if (isZeroSeats) {
      trackInner = '<div class="bt-kc-faction-fill bt-kc-zero">' + barText + '</div>';
    } else {
      trackInner = '<div class="' + fillClass + '" style="width:' + barWidth + '%">' + barText + '</div>';
    }

    var perCandCell = isAfter
      ? '<div class="bt-kc-faction-percand">' + perCandText + '</div>'
      : '';

    return ''
      + '<div class="bt-kc-faction" data-faction-id="' + f.id + '">'
      +   '<button class="bt-kc-faction-head" type="button" aria-expanded="false">'
      +     '<div class="bt-kc-faction-label">'
      +       '<span class="bt-kc-faction-num">' + f.id + '.</span> '
      +       '<span class="bt-kc-faction-name">' + escapeHtml(f.name_ru) + '</span>'
      +     '</div>'
      +     '<div class="bt-kc-faction-track">' + trackInner + '</div>'
      +     '<div class="bt-kc-faction-count">' + escapeHtml(rightText) + '</div>'
      +     perCandCell
      +     '<div class="bt-kc-faction-chevron" aria-hidden="true">▾</div>'
      +   '</button>'
      +   '<div class="bt-kc-faction-body" hidden>'
      +     renderCandidates(f.candidates)
      +   '</div>'
      + '</div>';
  }

  function renderCandidates(candidates){
    var rows = candidates.map(function(c, i){
      var hasAffil = !!c.affil;
      var hasNote = !!c.note && !hasAffil;
      var initials = getInitials(c.ru);

      var marker = '';
      if (hasAffil){
        marker = '<span class="bt-kc-affil-icon" tabindex="0" data-tip="' + escapeHtml(c.affil) + '" aria-label="' + escapeHtml(c.affil) + '">'
              +    '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">'
              +      '<circle cx="8" cy="8" r="7" fill="currentColor" opacity="0.18"/>'
              +      '<path d="M8 4v5M8 11v1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" fill="none"/>'
              +    '</svg>'
              + '</span>';
      }

      var secondary = '';
      if (c.be) secondary += '<span class="bt-kc-cand-be">' + escapeHtml(c.be) + '</span>';
      if (hasNote) secondary += (c.be ? ' · ' : '') + '<span class="bt-kc-cand-note">' + escapeHtml(c.note) + '</span>';

      return ''
        + '<div class="bt-kc-cand' + (hasAffil ? ' bt-kc-cand-affil' : '') + '">'
        +   '<div class="bt-kc-cand-num">' + (i + 1) + '</div>'
        +   '<div class="bt-kc-cand-avatar">' + escapeHtml(initials) + '</div>'
        +   '<div class="bt-kc-cand-body">'
        +     '<div class="bt-kc-cand-name">' + escapeHtml(c.ru) + marker + '</div>'
        +     (secondary ? '<div class="bt-kc-cand-meta">' + secondary + '</div>' : '')
        +   '</div>'
        + '</div>';
    }).join('');

    return '<div class="bt-kc-cand-list">' + rows + '</div>';
  }

  function renderDisclaimer(text){
    return '<div class="bt-kc-disclaimer">' + escapeHtml(text) + '</div>';
  }

  function renderFooter(meta){
    return ''
      + '<div class="bt-kc-footer">'
      +   'Расследование: <strong>' + escapeHtml(meta.investigation_link) + '</strong>'
      + '</div>';
  }

  function bindModeToggle(){
    var btns = ROOT.querySelectorAll('.bt-kc-mode-btn');
    btns.forEach(function(btn){
      btn.addEventListener('click', function(){
        var mode = btn.getAttribute('data-mode');
        if (mode === state.mode) return;
        state.mode = mode;
        renderAll();
      });
    });
  }

  function bindFactionToggles(){
    var heads = ROOT.querySelectorAll('.bt-kc-faction-head');
    heads.forEach(function(head){
      head.addEventListener('click', function(){
        var faction = head.closest('.bt-kc-faction');
        var id = +faction.getAttribute('data-faction-id');
        toggleFaction(id);
      });
    });

    var icons = ROOT.querySelectorAll('.bt-kc-affil-icon');
    icons.forEach(function(icon){
      icon.addEventListener('click', function(e){
        e.stopPropagation();
        var tip = icon.getAttribute('data-tip');
        showTooltip(icon, tip);
      });
      icon.addEventListener('focus', function(){
        var tip = icon.getAttribute('data-tip');
        showTooltip(icon, tip);
      });
    });
  }

  function toggleFaction(id){
    var current = ROOT.querySelector('.bt-kc-faction[data-faction-id="' + id + '"]');
    if (!current) return;

    if (state.openFactionId === id){
      closeFaction(current);
      state.openFactionId = null;
      return;
    }

    if (state.openFactionId !== null){
      var prev = ROOT.querySelector('.bt-kc-faction[data-faction-id="' + state.openFactionId + '"]');
      if (prev) closeFaction(prev);
    }

    openFaction(current);
    state.openFactionId = id;
  }

  function openFaction(el){
    el.classList.add('is-open');
    var head = el.querySelector('.bt-kc-faction-head');
    var body = el.querySelector('.bt-kc-faction-body');
    head.setAttribute('aria-expanded', 'true');
    body.hidden = false;
  }

  function closeFaction(el){
    el.classList.remove('is-open');
    var head = el.querySelector('.bt-kc-faction-head');
    var body = el.querySelector('.bt-kc-faction-body');
    head.setAttribute('aria-expanded', 'false');
    body.hidden = true;
  }

  function showTooltip(target, text){
    var existing = document.querySelector('.bt-kc-tooltip-bubble');
    if (existing) existing.remove();
    if (!text) return;

    var bubble = document.createElement('div');
    bubble.className = 'bt-kc-tooltip-bubble';
    bubble.textContent = text;
    document.body.appendChild(bubble);

    var r = target.getBoundingClientRect();
    var top = window.scrollY + r.bottom + 6;
    var left = window.scrollX + r.left;
    bubble.style.top = top + 'px';
    bubble.style.left = left + 'px';

    setTimeout(function(){
      var dismiss = function(){
        bubble.remove();
        document.removeEventListener('click', dismiss);
      };
      document.addEventListener('click', dismiss);
    }, 0);
  }

  function drawDonutChart(canvasId, segments){
    var canvas = document.getElementById(canvasId);
    if (!canvas || !canvas.getContext) return;

    var ratio = window.devicePixelRatio || 1;
    var size = 200;
    canvas.width = size * ratio;
    canvas.height = size * ratio;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    var ctx = canvas.getContext('2d');
    ctx.scale(ratio, ratio);

    var total = segments.reduce(function(s, x){ return s + x.value; }, 0);
    if (total === 0) return;
    var cx = size / 2;
    var cy = size / 2;
    var outerR = size / 2 - 4;
    var innerR = outerR * 0.62;

    var colorMap = {
      affil: '#993C1D',
      split: '#BA7517',
      indep: '#888780',
      empty: '#3A3938'
    };

    var startAngle = -Math.PI / 2;
    segments.forEach(function(seg){
      var slice = (seg.value / total) * Math.PI * 2;
      var endAngle = startAngle + slice;

      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(startAngle) * innerR, cy + Math.sin(startAngle) * innerR);
      ctx.arc(cx, cy, outerR, startAngle, endAngle);
      ctx.arc(cx, cy, innerR, endAngle, startAngle, true);
      ctx.closePath();
      ctx.fillStyle = colorMap[seg.color] || '#888780';
      ctx.fill();

      startAngle = endAngle;
    });
  }

})();
