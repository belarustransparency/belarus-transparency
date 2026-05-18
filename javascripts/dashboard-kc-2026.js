(function(){
  'use strict';

  var DATA_URL = './data.json';
  var ROOT = document.getElementById('bt-kc-dashboard');
  if (!ROOT) return;

  var openFactionId = null;

  fetch(DATA_URL)
    .then(function(r){ return r.json(); })
    .then(function(data){ render(data); })
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

  function render(data){
    var html = '';
    html += renderHeader(data.meta);
    html += renderStats(data.meta);
    html += renderDonut(data.meta);
    html += renderRoutes(data.routes);
    html += renderFactions(data.factions);
    html += renderFooter(data.meta);
    ROOT.innerHTML = html;

    drawDonutChart(data.meta.donut);
    bindFactionToggles();
  }

  function renderHeader(meta){
    return ''
      + '<div class="bt-kc-pdf-mobile">'
      +   '<a class="bt-kc-pdf-btn" href="./files/kc-2026-dashboard.pdf" download>Скачать дашборд в PDF</a>'
      + '</div>'
      + '<header class="bt-kc-header">'
      +   '<div class="bt-kc-header-main">'
      +     '<h1 class="bt-kc-h1">' + escapeHtml(meta.title) + '</h1>'
      +     '<p class="bt-kc-sub">' + escapeHtml(meta.subtitle) + '</p>'
      +   '</div>'
      +   '<div class="bt-kc-date-badge">'
      +     '<div class="bt-kc-date-label">' + escapeHtml(meta.election_label) + '</div>'
      +     '<div class="bt-kc-date-value">' + escapeHtml(meta.election_dates) + '</div>'
      +   '</div>'
      + '</header>';
  }

  function renderStats(meta){
    var t = meta.totals;
    return ''
      + '<div class="bt-kc-stats">'
      +   '<div class="bt-kc-stat">'
      +     '<div class="bt-kc-stat-label">Всего кандидатов</div>'
      +     '<div class="bt-kc-stat-val">' + t.candidates + '</div>'
      +     '<div class="bt-kc-stat-sub">в 9 фракциях</div>'
      +   '</div>'
      +   '<div class="bt-kc-stat bt-kc-stat-warn">'
      +     '<div class="bt-kc-stat-label">Аффилированы с Офисом</div>'
      +     '<div class="bt-kc-stat-val">' + t.affiliated + '</div>'
      +     '<div class="bt-kc-stat-sub">через ОПК и НАУ</div>'
      +   '</div>'
      +   '<div class="bt-kc-stat bt-kc-stat-warn">'
      +     '<div class="bt-kc-stat-label">Доля захвата</div>'
      +     '<div class="bt-kc-stat-val">' + t.share_percent + '%</div>'
      +     '<div class="bt-kc-stat-sub">три четверти КС</div>'
      +   '</div>'
      +   '<div class="bt-kc-stat bt-kc-stat-warn">'
      +     '<div class="bt-kc-stat-label">Фракций под Офисом</div>'
      +     '<div class="bt-kc-stat-val">' + t.factions_under + '</div>'
      +     '<div class="bt-kc-stat-sub">из девяти списков</div>'
      +   '</div>'
      + '</div>';
  }

  function renderDonut(meta){
    var legend = meta.donut.map(function(d){
      return ''
        + '<div class="bt-kc-leg-row">'
        +   '<span class="bt-kc-leg-dot bt-kc-color-' + escapeHtml(d.color) + '"></span>'
        +   '<span class="bt-kc-leg-text"><span class="bt-kc-leg-strong">' + d.value + '</span> — ' + escapeHtml(d.label) + '</span>'
        + '</div>';
    }).join('');

    return ''
      + '<div class="bt-kc-donut-section">'
      +   '<div class="bt-kc-section-title">Структура списков</div>'
      +   '<div class="bt-kc-donut-flex">'
      +     '<div class="bt-kc-donut-wrap"><canvas id="bt-kc-donut" width="200" height="200"></canvas></div>'
      +     '<div class="bt-kc-donut-legend">'
      +       legend
      +       '<p class="bt-kc-leg-note">' + escapeHtml(meta.note) + '</p>'
      +     '</div>'
      +   '</div>'
      + '</div>';
  }

  function renderRoutes(routes){
    var items = routes.map(function(r){
      return ''
        + '<div class="bt-kc-route" data-faction-id="' + r.faction_id + '">'
        +   '<div class="bt-kc-route-dept">' + escapeHtml(r.dept) + '</div>'
        +   '<div class="bt-kc-route-names">' + r.names.map(escapeHtml).join(' · ') + '</div>'
        +   '<div class="bt-kc-route-arrow">↓</div>'
        +   '<div class="bt-kc-route-frac"><strong>' + escapeHtml(r.faction) + '</strong></div>'
        + '</div>';
    }).join('');

    return ''
      + '<div class="bt-kc-routes-section">'
      +   '<div class="bt-kc-section-title">Как <strong>Офис Тихановской</strong> расставил людей по спискам</div>'
      +   '<div class="bt-kc-routes-grid">' + items + '</div>'
      + '</div>';
  }

  function renderFactions(factions){
    var sorted = factions.slice().sort(function(a, b){
      return b.candidates.length - a.candidates.length;
    });
    var max = sorted[0].candidates.length;

    var rows = sorted.map(function(f){
      var percent = Math.round((f.candidates.length / max) * 100);
      return renderFactionRow(f, percent);
    }).join('');

    return ''
      + '<div class="bt-kc-factions-section">'
      +   '<div class="bt-kc-section-title">Все 9 фракций — кликните, чтобы раскрыть состав</div>'
      +   '<div class="bt-kc-factions-list">' + rows + '</div>'
      + '</div>';
  }

  function renderFactionRow(f, percent){
    var affilCount = f.candidates.filter(function(c){ return c.affil; }).length;
    var countLabel = f.candidates.length + ' канд.';
    if (affilCount > 0) countLabel += ' · ' + affilCount + ' офис.';

    return ''
      + '<div class="bt-kc-faction" data-faction-id="' + f.id + '">'
      +   '<button class="bt-kc-faction-head" type="button" aria-expanded="false">'
      +     '<div class="bt-kc-faction-label">'
      +       '<span class="bt-kc-faction-num">' + f.id + '.</span> '
      +       '<span class="bt-kc-faction-name">' + escapeHtml(f.name_ru) + '</span>'
      +     '</div>'
      +     '<div class="bt-kc-faction-track">'
      +       '<div class="bt-kc-faction-fill bt-kc-color-' + f.type + '" style="width:' + percent + '%"></div>'
      +     '</div>'
      +     '<div class="bt-kc-faction-count">' + countLabel + '</div>'
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

  function renderFooter(meta){
    return ''
      + '<div class="bt-kc-footer">'
      +   'Расследование: <strong>' + escapeHtml(meta.investigation_link) + '</strong>'
      + '</div>';
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

    if (openFactionId === id){
      closeFaction(current);
      openFactionId = null;
      return;
    }

    if (openFactionId !== null){
      var prev = ROOT.querySelector('.bt-kc-faction[data-faction-id="' + openFactionId + '"]');
      if (prev) closeFaction(prev);
    }

    openFaction(current);
    openFactionId = id;
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

  function drawDonutChart(segments){
    var canvas = document.getElementById('bt-kc-donut');
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
    var cx = size / 2;
    var cy = size / 2;
    var outerR = size / 2 - 4;
    var innerR = outerR * 0.62;

    var colorMap = {
      affil: '#993C1D',
      split: '#BA7517',
      indep: '#888780'
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
