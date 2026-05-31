"""
check_pdf_meta.py — Проверка и очистка метаданных PDF-файлов
Использование: python check_pdf_meta.py [папка с PDF]
По умолчанию ищет в: docs/assets/archive
"""

import os
import sys
from pypdf import PdfReader, PdfWriter

# ── Настройка ──────────────────────────────────────────────────────────────
DEFAULT_DIR = os.path.join("docs", "assets", "archive")

FIELDS_TO_CHECK = [
    "/Title", "/Author", "/Subject", "/Keywords",
    "/Creator", "/Producer", "/CreationDate", "/ModDate",
]

# ── Вспомогательные функции ────────────────────────────────────────────────

def get_meta(path):
    """Возвращает словарь непустых метаданных PDF."""
    try:
        reader = PdfReader(path)
        meta = reader.metadata
        if not meta:
            return {}
        return {k: str(v) for k, v in meta.items() if v and str(v).strip()}
    except Exception as e:
        return {"__error__": str(e)}


def scan_directory(directory):
    """Сканирует папку и выводит отчёт по каждому PDF."""
    pdfs = sorted(f for f in os.listdir(directory) if f.lower().endswith(".pdf"))

    if not pdfs:
        print(f"PDF-файлы не найдены в: {directory}")
        return []

    dirty = []   # файлы с метаданными
    clean = []   # файлы без метаданных

    print(f"\n{'═' * 60}")
    print(f"  СКАНИРОВАНИЕ: {directory}  ({len(pdfs)} файлов)")
    print(f"{'═' * 60}")

    for fname in pdfs:
        path = os.path.join(directory, fname)
        meta = get_meta(path)

        if "__error__" in meta:
            print(f"\n⛔  {fname}")
            print(f"    Ошибка чтения: {meta['__error__']}")
            continue

        relevant = {k: v for k, v in meta.items() if k in FIELDS_TO_CHECK}
        other    = {k: v for k, v in meta.items() if k not in FIELDS_TO_CHECK}

        if relevant or other:
            dirty.append(fname)
            print(f"\n⚠   {fname}")
            for k, v in relevant.items():
                label = k.lstrip("/")
                # Обрезаем длинные значения для читаемости
                display = v if len(v) <= 80 else v[:77] + "..."
                print(f"    {label:<14} {display}")
            for k, v in other.items():
                label = k.lstrip("/")
                display = v if len(v) <= 80 else v[:77] + "..."
                print(f"    {label:<14} {display}  (нестандартное поле)")
        else:
            clean.append(fname)
            print(f"✅  {fname}  — метаданных нет")

    print(f"\n{'─' * 60}")
    print(f"  Итого: {len(dirty)} с метаданными, {len(clean)} чистых")
    print(f"{'─' * 60}\n")

    return dirty


def clean_files(directory, files):
    """Перезаписывает PDF, зачищая все метаданные."""
    print(f"Очищаем {len(files)} файл(ов)...\n")
    errors = []

    for fname in files:
        path = os.path.join(directory, fname)
        try:
            reader = PdfReader(path)
            writer = PdfWriter()
            writer.append(reader)

            # Затираем все известные поля
            writer.add_metadata({k: "" for k in FIELDS_TO_CHECK})

            # Записываем обратно в тот же файл
            tmp_path = path + ".tmp"
            with open(tmp_path, "wb") as f:
                writer.write(f)
            os.replace(tmp_path, path)

            print(f"  ✅  {fname}")
        except Exception as e:
            print(f"  ⛔  {fname}  — ошибка: {e}")
            errors.append(fname)
            if os.path.exists(path + ".tmp"):
                os.remove(path + ".tmp")

    print()
    if errors:
        print(f"Не удалось очистить {len(errors)} файл(ов): {', '.join(errors)}")
    else:
        print("Все файлы успешно очищены.")


# ── Главная логика ─────────────────────────────────────────────────────────

def main():
    directory = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_DIR

    if not os.path.isdir(directory):
        print(f"Папка не найдена: {directory}")
        print(f"Укажи путь явно: python check_pdf_meta.py <путь>")
        sys.exit(1)

    dirty = scan_directory(directory)

    if not dirty:
        print("Все PDF уже чистые. Ничего делать не нужно.")
        return

    answer = input(f"Очистить метаданные в {len(dirty)} файл(ах)? [y/N] ").strip().lower()
    if answer == "y":
        clean_files(directory, dirty)
        print("\nГотово. Запусти скрипт ещё раз для проверки.")
    else:
        print("Отменено. Файлы не изменены.")


if __name__ == "__main__":
    main()
