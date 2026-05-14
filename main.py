"""
MkDocs macros hook — загружает данные расследований из investigations.yml
в config.extra, откуда они доступны в шаблонах через {{ config.extra.investigations_data }}.

Подключается в mkdocs.yml:
    plugins:
      - macros:
          module_name: main

Файл main.py должен лежать в корне проекта рядом с mkdocs.yml.
"""

import os
import yaml


def define_env(env):
    """Hook называется macros-плагином при сборке сайта."""
    yml_path = os.path.join(os.path.dirname(__file__), "investigations.yml")
    try:
        with open(yml_path, "r", encoding="utf-8") as f:
            data = yaml.safe_load(f)
        env.conf["extra"]["investigations_data"] = data
    except FileNotFoundError:
        print(f"⚠ investigations.yml не найден по пути {yml_path}")
        env.conf["extra"]["investigations_data"] = {
            "investigations": [],
            "filters": {"all": "Все"},
        }
    except yaml.YAMLError as e:
        print(f"⚠ Ошибка чтения investigations.yml: {e}")
        env.conf["extra"]["investigations_data"] = {
            "investigations": [],
            "filters": {"all": "Все"},
        }
