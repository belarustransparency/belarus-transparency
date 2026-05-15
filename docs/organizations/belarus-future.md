---
hide:
  - navigation
  - toc
title: Название организации
org_type: political-structure
status: active
single_person:
date_founded: 2020-08-19
date_dissolved:
date_added: 2026-05-15
date_updated: 2026-05-15
charter_public: false
reports_public: false
audit_public: false
oversight: unknown
cover: https://placehold.co/1200x500/3a3530/ffffff?text=Org
cover_caption: Место, дата · Источник
related_persons:
  - ivan-ivanov
related_orgs:
related_events:
  - novaja-belarus-2024
related_docs:
  - doc-0001
tags:
  - организация
  - политическая
status_note:
---

<div class="bt-org">

<div class="bt-cover">
  <div class="bt-cover-img" style="background-image: url('https://placehold.co/1200x500/3a3530/ffffff?text=Org');"></div>
  <div class="bt-cover-cap">Место, дата · Источник</div>
</div>

<header class="bt-org-head">
  <div class="bt-kicker">Организация · Политическая структура</div>
  <h1>Название организации</h1>
  <p class="bt-lede">Одно предложение про функцию и значение организации.</p>
  <div class="bt-org-status">
    <span class="bt-status bt-status-active">действует</span>
  </div>
</header>

<!-- ============================================================
     БЛОК ИНДИКАТОРОВ ПРОЗРАЧНОСТИ
     Полоска из 4 сегментов + подписи + детализация
     Значения сегментов берутся из frontmatter:
       charter_public, reports_public, audit_public, oversight
     ============================================================ -->

<section class="bt-org-transparency">
  <div class="bt-block-label">Прозрачность</div>

  <div class="bt-tp-bar">
    <span class="bt-tp-seg bt-tp-yes" title="Устав публичен"></span>
    <span class="bt-tp-seg bt-tp-no" title="Отчётность не публикуется"></span>
    <span class="bt-tp-seg bt-tp-unk" title="Аудит — нет данных"></span>
    <span class="bt-tp-seg bt-tp-part" title="Контрольный орган — формальный"></span>
  </div>
  <div class="bt-tp-legend">
    <span>устав</span>
    <span>отчёты</span>
    <span>аудит</span>
    <span>контроль</span>
  </div>

  <div class="bt-tp-details">
    <div class="bt-tp-row">
      <div class="bt-tp-label">Устав публичен</div>
      <div class="bt-tp-value bt-tp-value-yes">Да · опубликован на сайте организации</div>
    </div>
    <div class="bt-tp-row">
      <div class="bt-tp-label">Финансовая отчётность</div>
      <div class="bt-tp-value bt-tp-value-no">Нет · годовые отчёты не публикуются</div>
    </div>
    <div class="bt-tp-row">
      <div class="bt-tp-label">Внешний аудит</div>
      <div class="bt-tp-value bt-tp-value-unk">Нет данных · в публичных источниках не упоминается</div>
    </div>
    <div class="bt-tp-row">
      <div class="bt-tp-label">Контрольный орган</div>
      <div class="bt-tp-value bt-tp-value-part">Формальный · совет аффилирован с руководством</div>
    </div>
  </div>
</section>

<!-- ============================================================
     МЕТАДАННЫЕ ОРГАНИЗАЦИИ
     ============================================================ -->

<section class="bt-org-meta">
  <div class="bt-meta-grid">
    <div class="bt-meta-item">
      <div class="bt-meta-label">Тип</div>
      <div class="bt-meta-value">Политическая структура</div>
    </div>
    <div class="bt-meta-item">
      <div class="bt-meta-label">Основана</div>
      <div class="bt-meta-value">19 августа 2020</div>
    </div>
    <div class="bt-meta-item">
      <div class="bt-meta-label">Юрисдикция</div>
      <div class="bt-meta-value">Литва</div>
    </div>
    <div class="bt-meta-item">
      <div class="bt-meta-label">Руководитель</div>
      <div class="bt-meta-value"><a href="../persons/ivan-ivanov/">Иван Иванов</a></div>
    </div>
    <div class="bt-meta-item">
      <div class="bt-meta-label">Сотрудников</div>
      <div class="bt-meta-value">~25 (по открытым данным)</div>
    </div>
    <div class="bt-meta-item">
      <div class="bt-meta-label">Веб-сайт</div>
      <div class="bt-meta-value"><a href="https://example.com">example.com</a></div>
    </div>
  </div>
</section>

<!-- ============================================================
     ПРОЗА — основной описательный блок
     ============================================================ -->

<div class="bt-prose" markdown>

Первый абзац — суть организации, контекст создания, заявленная функция.

Второй абзац — фактическая роль, кто реально влияет, какие центры принятия решений.

Третий абзац — расхождения между заявленным и фактическим. Открытые вопросы.

</div>

<!-- ============================================================
     БЛОК "ПЕРСОНАЛЬНАЯ ОРГАНИЗАЦИЯ"
     Показывается ТОЛЬКО если в frontmatter указан single_person.
     В остальных случаях — удалить эту секцию целиком.
     ============================================================ -->

<section class="bt-org-single">
  <div class="bt-block-label">Персональная организация</div>
  <div class="bt-org-single-body">
    <p>Учредитель, директор и единственный публично известный сотрудник — <a href="../persons/ivan-ivanov/">Иван Иванов</a>. Коллегиальные органы отсутствуют. Все решения и расходы — на одной персоне.</p>
  </div>
</section>

<!-- ============================================================
     СТРУКТУРА — Mermaid-граф
     ОПЦИОНАЛЬНЫЙ блок. Удалять если:
     - организация = одна персона (использовать вместо этого блок выше)
     - структура тривиальна (1-2 человека)
     ============================================================ -->

<section class="bt-org-structure">
  <div class="bt-block-label">Структура</div>

```mermaid
graph TD
    ORG["Организация"]
    LEAD["Руководство"]
    DEP1["Подразделение 1"]
    DEP2["Подразделение 2"]
    OVS["Наблюдательный совет"]

    ORG --> LEAD
    ORG --> OVS
    LEAD --> DEP1
    LEAD --> DEP2

    classDef org fill:#FFFFFF,stroke:#B8341E,stroke-width:1.5px,color:#0A0A0A;
    classDef unit fill:#EDEAE0,stroke:#888780,stroke-width:1px,color:#0A0A0A;
    classDef oversight fill:#F7F5F0,stroke:#888780,stroke-width:1px,color:#6B6B6B,stroke-dasharray: 3 3;

    class ORG,LEAD org;
    class DEP1,DEP2 unit;
    class OVS oversight;
```

</section>

<!-- ============================================================
     ФИНАНСОВЫЙ БЛОК — ТРИ РЕЖИМА
     Оставить ОДИН блок из трёх ниже, остальные удалить.

     РЕЖИМ А — "Полная отчётность"
       Условие: организация публикует годовые отчёты,
       известны бюджет, источники, расходы.

     РЕЖИМ Б — "Засветившиеся гранты"
       Условие: системной отчётности нет, но отдельные
       транши выплыли через документы или утечки.

     РЕЖИМ В — "Полная непрозрачность"
       Условие: ничего не известно о бюджете и источниках.
     ============================================================ -->

<!-- ============== РЕЖИМ А — ПОЛНАЯ ОТЧЁТНОСТЬ ============== -->

<section class="bt-org-money bt-org-money-full">
  <div class="bt-block-label">Финансы 2020–2025 · полная отчётность</div>

  <table class="bt-money-table">
    <thead>
      <tr>
        <th>Год</th>
        <th>Бюджет</th>
        <th>Источники</th>
        <th>Отчёт</th>
        <th>Документ</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>2020</td>
        <td>€80 000</td>
        <td>EED, частные доноры</td>
        <td>Опубликован</td>
        <td><a href="../archive/doc-0011/">doc-0011</a></td>
      </tr>
      <tr>
        <td>2021</td>
        <td>€150 000</td>
        <td>EED, NED</td>
        <td>Опубликован</td>
        <td><a href="../archive/doc-0012/">doc-0012</a></td>
      </tr>
      <tr>
        <td>2022</td>
        <td>€220 000</td>
        <td>EED, NED, Sida</td>
        <td>Опубликован</td>
        <td><a href="../archive/doc-0013/">doc-0013</a></td>
      </tr>
      <tr>
        <td>2023</td>
        <td>€310 000</td>
        <td>EED, NED, Sida, частные доноры</td>
        <td>Опубликован</td>
        <td><a href="../archive/doc-0014/">doc-0014</a></td>
      </tr>
      <tr>
        <td>2024</td>
        <td>€280 000</td>
        <td>EED, NED, Sida</td>
        <td>Опубликован</td>
        <td><a href="../archive/doc-0015/">doc-0015</a></td>
      </tr>
      <tr>
        <td>2025</td>
        <td>€240 000 (план)</td>
        <td>EED, NED</td>
        <td>Не опубликован</td>
        <td>—</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td>Итого 2020–2024</td>
        <td>~€1 040 000</td>
        <td colspan="3"></td>
      </tr>
    </tfoot>
  </table>
</section>

<!-- ============== РЕЖИМ Б — ЗАСВЕТИВШИЕСЯ ГРАНТЫ ============== -->

<section class="bt-org-money bt-org-money-fragments">
  <div class="bt-block-label">Финансы 2020–2025 · засветившиеся гранты</div>
  <p class="bt-org-money-note">Системной финансовой отчётности нет. Ниже — гранты и поступления, ставшие известными через утечки, отчёты грантодателей или косвенные документы. Список не претендует на полноту.</p>

  <ul class="bt-money-fragments-list">
    <li>
      <span class="bt-mf-year">2021</span>
      <span class="bt-mf-amount">€40 000</span>
      <span class="bt-mf-source">National Endowment for Democracy</span>
      <span class="bt-mf-doc"><a href="../archive/doc-0017/">doc-0017</a></span>
      <span class="bt-mf-context">— упомянуто в годовом отчёте NED</span>
    </li>
    <li>
      <span class="bt-mf-year">2023</span>
      <span class="bt-mf-amount">€120 000</span>
      <span class="bt-mf-source">European Endowment for Democracy</span>
      <span class="bt-mf-doc"><a href="../archive/doc-0021/">doc-0021</a></span>
      <span class="bt-mf-context">— проектная заявка из утечки</span>
    </li>
    <li>
      <span class="bt-mf-year">2024</span>
      <span class="bt-mf-amount">сумма не раскрыта</span>
      <span class="bt-mf-source">Sida (Швеция)</span>
      <span class="bt-mf-doc"><a href="../archive/doc-0028/">doc-0028</a></span>
      <span class="bt-mf-context">— скриншот пресс-релиза Sida</span>
    </li>
  </ul>
</section>

<!-- ============== РЕЖИМ В — ПОЛНАЯ НЕПРОЗРАЧНОСТЬ ============== -->

<section class="bt-org-money bt-org-money-opaque">
  <div class="bt-block-label">Финансы 2020–2025 · непрозрачность</div>
  <div class="bt-org-money-opaque-body">
    <p>Финансовая отчётность организации в открытых источниках не обнаружена. Грантодатели публично не объявлены. Самостоятельных финансовых раскрытий организация не делала.</p>
    <p class="bt-org-money-checked">Последняя проверка открытых источников: 15 мая 2026.</p>
  </div>
</section>

<!-- ============================================================
     СВЯЗИ — Mermaid-граф (как у персоналий и событий)
     ============================================================ -->

<section class="bt-ties">
<div class="bt-block-label">Связи</div>

```mermaid
graph LR
    ORG["Организация"]
    P1["Иван Иванов"]
    P2["Пётр Петров"]
    O1["Связанная организация"]
    M1["Грант ЕС"]

    P1 --возглавляет--> ORG
    P2 --зам--> ORG
    M1 --финансирует--> ORG
    ORG -.партнёр.-> O1

    classDef org fill:#FFFFFF,stroke:#B8341E,stroke-width:1.5px,color:#0A0A0A;
    classDef person fill:#EDEAE0,stroke:#0A0A0A,stroke-width:1px,color:#0A0A0A;
    classDef partner fill:#FFFFFF,stroke:#888780,stroke-width:1px,color:#6B6B6B;
    classDef money fill:#F7F5F0,stroke:#888780,stroke-width:1px,color:#6B6B6B,stroke-dasharray: 3 3;

    class ORG org;
    class P1,P2 person;
    class O1 partner;
    class M1 money;
```

</section>

<!-- ============================================================
     КЛЮЧЕВЫЕ ЛЮДИ — список с ролями
     ============================================================ -->

<section class="bt-org-people">
  <div class="bt-block-label">Ключевые люди</div>
  <ul class="bt-org-people-list">
    <li><a href="../persons/ivan-ivanov/">Иван Иванов</a> — руководитель с 2020</li>
    <li><a href="../persons/petr-petrov/">Пётр Петров</a> — заместитель с 2021</li>
  </ul>
</section>

<!-- ============================================================
     СВЯЗАННЫЕ СОБЫТИЯ
     ============================================================ -->

<section class="bt-org-events">
  <div class="bt-block-label">Связанные события</div>
  <ul class="bt-org-events-list">
    <li><a href="../events/novaja-belarus-2024/">«Новая Беларусь 2024»</a> · 15–17 августа 2024</li>
  </ul>
</section>

<!-- ============================================================
     ПЕРВИЧНЫЕ ДОКУМЕНТЫ — ссылки на архив
     ============================================================ -->

<section class="bt-org-sources">
  <div class="bt-block-label">Первичные документы</div>
  <ul class="bt-sources-list">
    <li><a href="../archive/doc-0001/">doc-0001</a> · Устав организации (PDF)</li>
    <li><a href="../archive/doc-0011/">doc-0011</a> · Финотчёт 2020</li>
  </ul>
</section>

<footer class="bt-tags">
  <div class="bt-block-label">Теги</div>
  <div class="bt-tag-list">
    <span class="bt-tag">политическая структура</span>
    <span class="bt-tag">эмиграция</span>
    <span class="bt-tag">литва</span>
  </div>
</footer>

</div>
