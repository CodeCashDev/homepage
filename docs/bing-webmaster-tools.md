# Bing Webmaster Tools 設定手順

## 1. サイト登録
- https://www.bing.com/webmasters/ にアクセス（Microsoft アカウントでログイン）
- 「サイトの追加」に `https://www.codetas.com/` を入力

## 2. 所有権確認
推奨方法: DNS の TXT レコードで確認（Google Search Console と同じ方法）
- DNS 管理画面で TXT レコードを追加
- または Bing 用の meta タグを head に追加

## 3. sitemap.xml 送信
- Bing Webmaster Tools > サイトマップ から `https://www.codetas.com/sitemap.xml` を送信
- Bing は robots.txt 経由でも sitemap を自動検出する

## 4. 確認項目
- インデックス状況
- クロールエラー
- 検索パフォーマンス（インプレッション・クリック）

## 補足
- Google Search Console と連携すると、所有権確認をスキップできる場合があります
- Bing は Google の sitemap と同じフォーマットを受け付けます
- 日本語サイトの場合、Bing のシェアは少ないため優先度は低めで問題ありません
