"""
MkDocs macros hook — загружает данные для витрин в config.extra.

Грузит:
- investigations.yml → config.extra.investigations_data
- persons.yml → config.extra.persons_data
- organizations.yml → config.extra.organizations_data
- events.yml → config.extra.events_data

В шаблонах данные доступны как:
    {{ config.extra.investigations_data }}
    {{ config.extra.persons_data }}
    {{ config.extra.organizations_data }}
    {{ config.extra.events_data }}

Подключается в mkdocs.yml:
    plugins:
      - macros:
          module_name: main

Файл main.py должен лежать в корне проекта рядом с mkdocs.yml.
"""

import os
import yaml


def _load_yaml(path, fallback):
    """Безопасно загрузить YAML-файл. При любых ошибках вернуть fallback."""
    try:
        with open(path, "r", encoding="utf-8") as f:
            return yaml.safe_load(f)
    except FileNotFoundError:
        print(f"⚠ {os.path.basename(path)} не найден по пути {path}")
        return fallback
    except yaml.YAMLError as e:
        print(f"⚠ Ошибка чтения {os.path.basename(path)}: {e}")
        return fallback


def define_env(env):
    """Hook называется macros-плагином при сборке сайта."""
    base = os.path.dirname(__file__)

    env.conf["extra"]["investigations_data"] = _load_yaml(
        os.path.join(base, "investigations.yml"),
        {"investigations": [], "filters": {"all": {"ru": "Все", "en": "All"}}, "ui": {}},
    )

    env.conf["extra"]["persons_data"] = _load_yaml(
        os.path.join(base, "persons.yml"),
        {"persons": [], "filters": {"all": {"ru": "Все", "en": "All"}}, "badges": {"role": {}, "position": {}}, "ui": {}},
    )

    env.conf["extra"]["organizations_data"] = _load_yaml(
        os.path.join(base, "organizations.yml"),
        {"organizations": [], "filters": {"all": {"ru": "Все", "en": "All"}}, "statuses": {}, "ui": {}},
    )

    env.conf["extra"]["events_data"] = _load_yaml(
        os.path.join(base, "events.yml"),
        {"events": [], "filters": {"all": {"ru": "Все", "en": "All"}}, "types": {}, "months": {}, "ui": {}},
    )
