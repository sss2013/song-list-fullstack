# SongList（ソングリスト）

## プロジェクト概要

**SongList**は、データベースはMongoDB、バックエンドサーバーはNode.js、React（TypeScript, Next.js）をフロントエンドとして構築された音楽リスト管理Webアプリケーションです。  
お気に入りの楽曲を登録・一覧表示し、詳細ページの閲覧や「いいね」機能などを提供します。

---

## 使用技術

- **フロントエンド**: React (TypeScript, Next.js)
- **バックエンド**: Node.js (Express)
- **データベース**: MongoDB

---

## 主な機能

- 楽曲情報の一覧表示
- 楽曲の詳細ページ閲覧
- 楽曲の新規登録・編集・削除
- 「いいね」機能
- 検索・ソート機能  
- レスポンシブデザイン対応

---

## セットアップ方法

### 1. リポジトリをクローン

```bash
git clone https://github.com/sss2013/song-list-fullstack.git
cd song-list-full
```

### 2. バックエンドのセットアップ

```bash
cd songlist-back
npm install
# .envファイルを作成し、MongoDBの接続情報などを設定
npm run dev
```

### 3. フロントエンドのセットアップ

```bash
cd ../songlist-front
npm install
npm run dev
```

### 4. アクセス

ブラウザで `http://localhost:3000` にアクセスしてください。

---

## ディレクトリ構成（例）

```
song-list-full/
├── songlist-back/     # Node.js + Express バックエンド
├── songlist-front/    # Next.js + React フロントエンド
└── README.md
```

---

## ライセンス

本プロジェクトはMITライセンスで公開されています。

---

## 作者

- sss2013
