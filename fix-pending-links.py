#!/usr/bin/env python3
"""
fix-pending-links.py — Belarus Transparency

Заменяет ссылки на несуществующие карточки в указанном .md-файле
на текст-обёртку с классом .bt-pending и атрибутом data-slug.

Запуск:
    python fix-pending-links.py docs/ru/investigations/abba.md

Логика:
- Находит все markdown-ссылки вида [Текст](../folder/slug.md) и
  [Текст](../folder/slug.md#anchor).
- Для каждой проверяет существование целевого файла на диске
  (отсчитывая относительно положения исходного .md).
- Если файла НЕТ — заменяет на:
    **Текст**{:.bt-pending data-slug="slug"}
- Если файл ЕСТЬ — оставляет как есть.
- Выводит список замен.

После замены: когда карточка появится, обратное превращение —
точечной sed-командой по data-slug. Пример (для карточки yauheni-bury):

    sed -i \
      's|\\*\\*\\([^*]*\\)\\*\\*{:\\.bt-pending data-slug="yauheni-bury"}|[\\1](../persons/yauheni-bury.md)|g' \
      docs/ru/investigations/*.md
"""

import re
import sys
from pathlib import Path


# Паттерн markdown-ссылки: [текст](относительный-путь.md) или с #якорем
LINK_RE = re.compile(r'\[([^\]]+)\]\((\.\.[/\w\-./]*?\.md)(#[\w\-]+)?\)')


def fix_file(filepath: Path) -> None:
    if not filepath.exists():
        print(f"ERROR: file not found: {filepath}", file=sys.stderr)
        sys.exit(1)

    base_dir = filepath.parent  # для разрешения относительных путей
    content = filepath.read_text(encoding='utf-8')

    replaced_count = 0
    kept_count = 0
    replacements_log = []

    def replace_link(match: re.Match) -> str:
        nonlocal replaced_count, kept_count

        text = match.group(1)
        rel_path = match.group(2)
        # якорь (group 3) при замене теряем — для несуществующего файла он не нужен

        # Разрешаем относительный путь относительно файла, в котором ссылка
        target = (base_dir / rel_path).resolve()

        # Извлекаем slug — имя файла без расширения
        slug = Path(rel_path).stem

        if target.exists():
            kept_count += 1
            return match.group(0)  # не меняем
        else:
            replaced_count += 1
            replacements_log.append((text, slug))
            return f'**{text}**{{:.bt-pending data-slug="{slug}"}}'

    new_content = LINK_RE.sub(replace_link, content)

    if new_content == content:
        print(f"Нечего менять в {filepath}")
        return

    filepath.write_text(new_content, encoding='utf-8')

    print(f"\n=== {filepath} ===")
    print(f"Заменено битых ссылок: {replaced_count}")
    print(f"Оставлено рабочих ссылок: {kept_count}")
    print()
    print("Список замен (text → slug):")
    for text, slug in replacements_log:
        print(f"  {text!r:<60} → {slug}")


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    for arg in sys.argv[1:]:
        fix_file(Path(arg))
