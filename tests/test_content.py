import re
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
HTML = (ROOT / "index.html").read_text(encoding="utf-8")
SCRIPT = (ROOT / "script.js").read_text(encoding="utf-8")


class ValuePropositionContentTests(unittest.TestCase):
    def test_hero_explains_scope_delivery_and_early_stage_consultation(self):
        hero = re.search(r'<div class="hero-copy reveal">(.*?)</div>\s*<div class="terminal', HTML, re.S)
        if hero is None:
            self.fail("hero copy section was not found")
        content = hero.group(1)
        for phrase in ("Webサービス", "業務システム", "AIツール", "要件整理", "設計", "実装", "運用", "仕様や予算が固まっていない"):
            with self.subTest(phrase=phrase):
                self.assertIn(phrase, content)

    def test_services_lists_all_preferred_project_types(self):
        preferred = re.search(r'<section class="project-fit[^>]*>(.*?)</section>', HTML, re.S)
        if preferred is None:
            self.fail("preferred project section was not found")
        content = preferred.group(1)
        expected = (
            "新規Webサービス・MVP開発",
            "既存サービスの機能追加・改善",
            "業務システムの設計・開発",
            "AI機能や外部APIの組み込み",
            "技術選定、クラウド設計、リリース後の運用支援",
        )
        for phrase in expected:
            with self.subTest(phrase=phrase):
                self.assertIn(phrase, content)

    def test_new_copy_has_english_translations(self):
        for key in ("heroSub", "projectFitTitle", "projectFitSub", "projectFitCta", "fit1", "fit2", "fit3", "fit4", "fit5"):
            with self.subTest(key=key):
                self.assertRegex(SCRIPT, rf"\b{key}\s*:")


if __name__ == "__main__":
    unittest.main()
