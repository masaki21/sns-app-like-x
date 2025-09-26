# Prisma セットアップメモ

1. `.env` に Supabase の接続情報を設定します。
2. Prisma Client を生成: `npx prisma generate`
3. マイグレーションを作成: `npm run prisma:migrate -- --name init`
4. シードデータ投入（任意）: `npm run prisma:seed`

`npm run prisma:studio` でブラウザ上からデータを確認できます。
