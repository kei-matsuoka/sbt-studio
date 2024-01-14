# SBT Studio
SBT（ソウルバウンドトークン）を発行・管理できるシステムです。   
ブロックチェーン上に誰でも簡単に会員証やクーポン等を発行できます。   
当リポジトリはシステムのフロントエンド部分で、コントラクト部分のリポジトリは[こちら](https://github.com/kei-matsuoka/sbt-studio-contract)です。

URL：[https://mono-walet-for-business.vercel.app/](https://mono-walet-for-business.vercel.app/)

<img width="922" alt="画像②" src="https://github.com/kei-matsuoka/sbt-studio/assets/46675472/dcb89947-fecb-4cd9-9fe0-0e19da998021">

## 主な使用技術
- 言語
  - TypeScript
- フレームワーク
  - Next.js
- 主なライブラリ
  - tailwindcss
  - @rainbow-me/rainbowkit
  - wagmi
  - viem
  - axios
  - graphql
  - apollo/client
  - react-hook-form
- ホスティング
  - Vercel

## システム構成図
![SBTStudioシステム構成図](https://github.com/kei-matsuoka/sbt-studio/assets/46675472/6bff3fac-b5b2-463b-9ee3-23f8e27d1d23)

## 機能一覧
- ウォレット接続
- サマリー表示
- SBT一覧表示（部分一致検索）
- SBT詳細表示
- SBTホルダー一覧表示（部分一致検索）
- SBT作成
- SBT編集
- SBTミント
- SBTバーン
- ERC20 Airdrop
- ERC721 Airdrop
- ERC1155 Airdrop（開発中）
- メッセージ閲覧・送信（開発中）
- ホルダーのTx分析（開発中）
