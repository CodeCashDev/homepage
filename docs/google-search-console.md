# Google Search Console 設定手順

## 1. プロパティ登録
- https://search.google.com/search-console にアクセス
- 「URL プレフィックス」に `https://www.codetas.com/` を入力して登録

## 2. 所有権確認
推奨方法: DNS レコード（TXT レコード）を追加する
- DNS 管理画面で TXT レコード `google-site-verification=...` を追加
- または、HTML ファイル `/googleXXXXXX.html` を設置

## 3. sitemap.xml 送信
- Search Console > サイトマップ から `https://www.codetas.com/sitemap.xml` を送信
（sitemap.xml は本PRで作成済み、robots.txt からも参照）

## 4. 確認項目
- インデックス状況
- クロールエラー
- 検索パフォーマンス（インプレッション・クリック）
- Core Web Vitals レポート
