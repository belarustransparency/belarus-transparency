"""
check_media_meta.py — Проверка и очистка метаданных PDF и изображений
Покрывает: PDF (стандартные поля + XMP), JPEG/JPG/PNG/WEBP/TIFF (EXIF + GPS)

Использование:
  python check_media_meta.py                  # сканирует docs/assets рекурсивно
  python check_media_meta.py docs/persons     # конкретная папка
"""

import os
import sys
import re

# ── Зависимости ────────────────────────────────────────────────────────────
try:
    from pypdf import PdfReader, PdfWriter
except ImportError:
    print("Установи зависимости: pip install pypdf pillow piexif")
    sys.exit(1)

try:
    from PIL import Image
    import piexif
except ImportError:
    print("Установи зависимости: pip install pillow piexif")
    sys.exit(1)

# ── Настройка ──────────────────────────────────────────────────────────────
DEFAULT_DIR = os.path.join("docs", "assets")

PDF_EXTENSIONS   = {".pdf"}
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".tiff", ".tif"}

PDF_FIELDS = [
    "/Title", "/Author", "/Subject", "/Keywords",
    "/Creator", "/Producer", "/CreationDate", "/ModDate",
]

# Поля EXIF, которые могут деанонимизировать источник
SENSITIVE_EXIF = {
    # (IFD, tag_id): "читаемое имя"
    ("0th",   271): "Make (производитель)",
    ("0th",   272): "Model (модель устройства)",
    ("0th",   305): "Software",
    ("0th",   306): "DateTime",
    ("0th",   315): "Artist",
    ("0th",   316): "HostComputer",
    ("0th", 33432): "Copyright",
    ("0th", 50735): "CameraSerialNumber",
    ("Exif", 36867): "DateTimeOriginal",
    ("Exif", 36868): "DateTimeDigitized",
    ("Exif", 37510): "UserComment",
    ("Exif", 42032): "CameraOwnerName",
    ("Exif", 42033): "BodySerialNumber",
    ("Exif", 42035): "LensMake",
    ("Exif", 42036): "LensModel",
    ("Exif", 42037): "LensSerialNumber",
}

# ── PDF: чтение ────────────────────────────────────────────────────────────

def get_pdf_standard_meta(path):
    try:
        reader = PdfReader(path)
        meta = reader.metadata
        if not meta:
            return {}
        return {k: str(v) for k, v in meta.items() if v and str(v).strip()}
    except Exception as e:
        return {"__error__": str(e)}


def get_pdf_xmp(path):
    try:
        reader = PdfReader(path)
        xmp = reader.xmp_metadata
        if xmp is None:
            return {}
        raw = xmp.stream.get_data()
        if isinstance(raw, bytes):
            raw = raw.decode("utf-8", errors="replace")
        patterns = [
            ("dc:title",        r"<dc:title[^>]*>.*?<rdf:li[^>]*>(.*?)</rdf:li>"),
            ("dc:creator",      r"<dc:creator[^>]*>.*?<rdf:li[^>]*>(.*?)</rdf:li>"),
            ("dc:description",  r"<dc:description[^>]*>.*?<rdf:li[^>]*>(.*?)</rdf:li>"),
            ("dc:subject",      r"<dc:subject[^>]*>.*?<rdf:li[^>]*>(.*?)</rdf:li>"),
            ("xmp:CreateDate",  r"<xmp:CreateDate>(.*?)</xmp:CreateDate>"),
            ("xmp:ModifyDate",  r"<xmp:ModifyDate>(.*?)</xmp:ModifyDate>"),
            ("xmp:CreatorTool", r"<xmp:CreatorTool>(.*?)</xmp:CreatorTool>"),
            ("pdf:Producer",    r"<pdf:Producer>(.*?)</pdf:Producer>"),
            ("pdf:Author",      r"<pdf:Author>(.*?)</pdf:Author>"),
        ]
        found = {}
        for label, pattern in patterns:
            m = re.search(pattern, raw, re.DOTALL)
            if m:
                val = m.group(1).strip()
                if val:
                    found[label] = val[:80] + ("..." if len(val) > 80 else "")
        if not found:
            found["__xmp_present__"] = "(пакет присутствует, известных полей не найдено)"
        return found
    except Exception as e:
        return {"__xmp_error__": str(e)}

# ── EXIF: чтение ───────────────────────────────────────────────────────────

def decode_exif_value(val):
    """Превращает bytes/tuple/int в читаемую строку."""
    if isinstance(val, bytes):
        try:
            return val.decode("utf-8", errors="replace").rstrip("\x00").strip()
        except Exception:
            return repr(val)
    if isinstance(val, tuple):
        # GPS-координата вида ((deg,1),(min,1),(sec,100))
        try:
            parts = [f"{a}/{b}" if b != 1 else str(a) for a, b in val]
            return ", ".join(parts)
        except Exception:
            return str(val)
    return str(val)


def get_image_exif(path):
    """
    Возвращает dict с найденными чувствительными полями и флагом GPS.
    Ключи: "sensitive" (dict), "gps" (bool), "has_any_exif" (bool), "error" (str|None)
    """
    result = {"sensitive": {}, "gps": False, "has_any_exif": False, "error": None}
    ext = os.path.splitext(path)[1].lower()

    try:
        img = Image.open(path)

        # PNG и WEBP — EXIF через getexif() / info
        if ext == ".png":
            info = img.info
            if "exif" in info or "XML:com.adobe.xmp" in info:
                result["has_any_exif"] = True
                if "XML:com.adobe.xmp" in info:
                    result["sensitive"]["XMP"] = "(XMP-пакет присутствует)"
            return result

        if ext == ".webp":
            exif_bytes = img.info.get("exif", None)
            if not exif_bytes:
                return result
        else:
            exif_bytes = img.info.get("exif", None)
            if not exif_bytes:
                # попробуем через getexif (Pillow >= 6)
                try:
                    raw = img.getexif()
                    if raw:
                        exif_bytes = raw.tobytes()
                except Exception:
                    pass

        if not exif_bytes:
            return result

        result["has_any_exif"] = True
        exif_dict = piexif.load(exif_bytes)

        # GPS
        gps_ifd = exif_dict.get("GPS", {})
        if gps_ifd:
            result["gps"] = True

        # Чувствительные поля
        for (ifd, tag_id), label in SENSITIVE_EXIF.items():
            val = exif_dict.get(ifd, {}).get(tag_id)
            if val is not None:
                decoded = decode_exif_value(val)
                if decoded and decoded not in ("0", "", "b''"):
                    result["sensitive"][label] = decoded[:80]

    except Exception as e:
        result["error"] = str(e)

    return result

# ── Сканирование ───────────────────────────────────────────────────────────

def collect_files(directory):
    """Рекурсивно собирает все PDF и изображения."""
    pdfs   = []
    images = []
    for root, dirs, files in os.walk(directory):
        # Пропускаем скрытые папки
        dirs[:] = [d for d in dirs if not d.startswith(".")]
        for fname in sorted(files):
            ext = os.path.splitext(fname)[1].lower()
            full = os.path.join(root, fname)
            if ext in PDF_EXTENSIONS:
                pdfs.append(full)
            elif ext in IMAGE_EXTENSIONS:
                images.append(full)
    return pdfs, images


def scan_all(directory):
    pdfs, images = collect_files(directory)
    total = len(pdfs) + len(images)

    print(f"\n{'═' * 64}")
    print(f"  СКАНИРОВАНИЕ: {directory}")
    print(f"  PDF: {len(pdfs)}  |  Изображения: {len(images)}  |  Всего: {total}")
    print(f"{'═' * 64}")

    dirty_pdfs   = []
    dirty_images = []

    # ── PDF ──
    if pdfs:
        print(f"\n── PDF {'─' * 55}")
        for path in pdfs:
            fname = os.path.relpath(path, directory)
            std = get_pdf_standard_meta(path)
            xmp = get_pdf_xmp(path)

            if "__error__" in std:
                print(f"\n⛔  {fname}\n    Ошибка: {std['__error__']}")
                continue

            relevant = {k: v for k, v in std.items() if k in PDF_FIELDS}
            other    = {k: v for k, v in std.items() if k not in PDF_FIELDS}

            if relevant or other or xmp:
                dirty_pdfs.append(path)
                print(f"\n⚠   {fname}")
                if relevant or other:
                    print(f"    {'─'*8} Стандартные поля {'─'*8}")
                    for k, v in relevant.items():
                        print(f"    {k.lstrip('/'):<16} {v}")
                    for k, v in other.items():
                        print(f"    {k.lstrip('/'):<16} {v}  (нестандартное)")
                if xmp:
                    print(f"    {'─'*8} XMP {'─'*8}")
                    for k, v in xmp.items():
                        print(f"    {k:<22} {v}")
            else:
                print(f"✅  {fname}  — чисто")

    # ── Изображения ──
    if images:
        print(f"\n── Изображения {'─' * 48}")
        for path in images:
            fname = os.path.relpath(path, directory)
            info  = get_image_exif(path)

            if info["error"]:
                print(f"\n⛔  {fname}\n    Ошибка: {info['error']}")
                continue

            if not info["has_any_exif"] and not info["gps"] and not info["sensitive"]:
                print(f"✅  {fname}  — чисто")
                continue

            dirty_images.append(path)
            print(f"\n⚠   {fname}")
            if info["gps"]:
                print(f"    🌍 GPS-координаты присутствуют!")
            for label, val in info["sensitive"].items():
                print(f"    {label:<28} {val}")
            if info["has_any_exif"] and not info["gps"] and not info["sensitive"]:
                print(f"    (EXIF-блок присутствует, чувствительных полей не найдено)")

    # ── Итог ──
    print(f"\n{'─' * 64}")
    print(f"  PDF с метаданными:        {len(dirty_pdfs)}")
    print(f"  Изображений с метаданными: {len(dirty_images)}")
    total_dirty = len(dirty_pdfs) + len(dirty_images)
    print(f"  Итого требуют очистки:    {total_dirty}")
    print(f"{'─' * 64}\n")

    return dirty_pdfs, dirty_images

# ── Очистка ────────────────────────────────────────────────────────────────

def clean_pdfs(files):
    print(f"Очищаем {len(files)} PDF...\n")
    errors = []
    for path in files:
        tmp = path + ".tmp"
        try:
            reader = PdfReader(path)
            writer = PdfWriter()
            writer.append(reader)
            writer.add_metadata({k: "" for k in PDF_FIELDS})
            writer.xmp_metadata = None
            with open(tmp, "wb") as f:
                writer.write(f)
            os.replace(tmp, path)
            print(f"  ✅  {path}")
        except Exception as e:
            print(f"  ⛔  {path} — {e}")
            errors.append(path)
            if os.path.exists(tmp):
                os.remove(tmp)
    return errors


def clean_images(files):
    print(f"Очищаем {len(files)} изображений...\n")
    errors = []
    for path in files:
        ext = os.path.splitext(path)[1].lower()
        tmp = path + ".tmp"
        try:
            img = Image.open(path)

            if ext == ".png":
                # PNG: пересохраняем без метаданных
                data = list(img.getdata())
                clean_img = Image.new(img.mode, img.size)
                clean_img.putdata(data)
                clean_img.save(tmp, format="PNG")

            elif ext in {".jpg", ".jpeg"}:
                # JPEG: вставляем пустой EXIF
                exif_bytes = img.info.get("exif", None)
                if exif_bytes:
                    try:
                        exif_dict = piexif.load(exif_bytes)
                        # Удаляем все IFD целиком
                        empty = {"0th": {}, "Exif": {}, "GPS": {}, "1st": {}, "Interop": {}}
                        new_exif = piexif.dump(empty)
                        img.save(tmp, format="JPEG", exif=new_exif, quality=95, subsampling=0)
                    except Exception:
                        img.save(tmp, format="JPEG", quality=95, subsampling=0)
                else:
                    img.save(tmp, format="JPEG", quality=95, subsampling=0)

            elif ext == ".webp":
                img.save(tmp, format="WEBP", exif=b"")

            elif ext in {".tiff", ".tif"}:
                # TIFF: пересохраняем без тегов
                img.save(tmp, format="TIFF")

            else:
                img.save(tmp)

            os.replace(tmp, path)
            print(f"  ✅  {path}")

        except Exception as e:
            print(f"  ⛔  {path} — {e}")
            errors.append(path)
            if os.path.exists(tmp):
                os.remove(tmp)

    return errors

# ── Главная логика ─────────────────────────────────────────────────────────

def main():
    directory = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_DIR

    if not os.path.isdir(directory):
        print(f"Папка не найдена: {directory}")
        print(f"Укажи путь явно: python check_media_meta.py <путь>")
        sys.exit(1)

    dirty_pdfs, dirty_images = scan_all(directory)

    total_dirty = len(dirty_pdfs) + len(dirty_images)
    if total_dirty == 0:
        print("Все файлы чистые. Ничего делать не нужно.")
        return

    answer = input(
        f"Очистить метаданные ({len(dirty_pdfs)} PDF + {len(dirty_images)} изображений)? [y/N] "
    ).strip().lower()

    if answer != "y":
        print("Отменено. Файлы не изменены.")
        return

    all_errors = []
    if dirty_pdfs:
        all_errors += clean_pdfs(dirty_pdfs)
    if dirty_images:
        all_errors += clean_images(dirty_images)

    print()
    if all_errors:
        print(f"Не удалось обработать {len(all_errors)} файл(ов):")
        for e in all_errors:
            print(f"  {e}")
    else:
        print("Всё очищено успешно.")

    print("\nЗапусти скрипт ещё раз для проверки.")


if __name__ == "__main__":
    main()
