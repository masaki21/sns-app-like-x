import { PrismaClient, PostVisibility } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database with sample SNS data...");

  await prisma.postLike.deleteMany();
  await prisma.post.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  const usersSeed = [
    {
      handle: "sora_dev",
      displayName: "Sora Ito",
      isVerified: true,
      profile: {
        bio: "SNSアプリMVPを開発中。TypeScript / Next.js / Prisma",
        location: "Tokyo, Japan",
        websiteUrl: "https://example.dev",
      },
    },
    {
      handle: "mina_ui",
      displayName: "Mina Studio",
      isVerified: true,
      profile: {
        bio: "UIデザインとフロントエンドが好き。Tailwind v4を布教中",
        location: "Kyoto, Japan",
        websiteUrl: "https://ui-lab.example",
      },
    },
    {
      handle: "kenji_data",
      displayName: "Kenji Analytics",
      profile: {
        bio: "データ分析とKPI設計を担当。Metabaseを毎日眺めてます",
        location: "Osaka, Japan",
      },
    },
    {
      handle: "haru_pm",
      displayName: "Haru Product",
      profile: {
        bio: "B2B SaaSのPM。オンボーディング改善が最近のテーマ",
        location: "Remote",
      },
    },
    {
      handle: "nao_codes",
      displayName: "Nao Frontend",
      profile: {
        bio: "Reactとアクセシビリティに情熱を注ぐフロントエンドエンジニア",
        location: "Tokyo, Japan",
      },
    },
    {
      handle: "riku_backend",
      displayName: "Riku Backend",
      profile: {
        bio: "Rust/Go/TypeScript。分散通知システムを構築中",
        location: "Sapporo, Japan",
      },
    },
    {
      handle: "yui_ux",
      displayName: "Yui UX",
      profile: {
        bio: "UXリサーチャー。ユーザーテストとインタビューが好き",
        location: "Fukuoka, Japan",
      },
    },
    {
      handle: "data_wave",
      displayName: "DataWave",
      profile: {
        bio: "データドリブンな意思決定を支えるアナリティクスチーム",
        location: "Nagoya, Japan",
      },
    },
  ];

  const userRecords: Record<string, { id: string }> = {};

  for (const user of usersSeed) {
    const created = await prisma.user.create({
      data: {
        handle: user.handle,
        displayName: user.displayName,
        isVerified: user.isVerified ?? false,
        profile: user.profile
          ? {
              create: {
                bio: user.profile.bio,
                location: user.profile.location,
                websiteUrl: user.profile.websiteUrl,
              },
            }
          : undefined,
      },
    });

    userRecords[user.handle] = { id: created.id };
  }

  const postsSeed = [
    {
      handle: "sora_dev",
      body: "Appの初期セットアップが完了。次は認証まわりを整える予定。MVPのタイムラインが楽しみ。",
      stats: { likes: 87, replies: 12, reposts: 4, impressions: "5200" },
      visibility: PostVisibility.PUBLIC,
    },
    {
      handle: "mina_ui",
      body: "新しいカードコンポーネントを作成。Tailwind v4 の @theme inline が便利すぎる。",
      stats: { likes: 142, replies: 7, reposts: 15, impressions: "8100" },
      visibility: PostVisibility.PUBLIC,
    },
    {
      handle: "kenji_data",
      body: "週次 KPI を整理中。DAU と投稿数をダッシュボードで可視化できるようにする予定です。",
      stats: { likes: 58, replies: 3, reposts: 6, impressions: "3400" },
      visibility: PostVisibility.PUBLIC,
    },
    {
      handle: "haru_pm",
      body: "βテスター向けアンケートの設計完了。オンボーディング体験の改善案をまとめました。",
      stats: { likes: 64, replies: 9, reposts: 2, impressions: "2100" },
      visibility: PostVisibility.PUBLIC,
    },
    {
      handle: "nao_codes",
      body: "ダークテーマのアクセシビリティレビュー実施。コントラスト比の調整を進めています。",
      stats: { likes: 92, replies: 5, reposts: 3, impressions: "4800" },
      visibility: PostVisibility.PUBLIC,
    },
    {
      handle: "riku_backend",
      body: "通知キューをRedisに差し替えたところ、遅延が40%改善されました。",
      stats: { likes: 120, replies: 11, reposts: 7, impressions: "9600" },
      visibility: PostVisibility.PUBLIC,
    },
    {
      handle: "yui_ux",
      body: "モバイル向けのジェスチャー操作プロトタイプをFigmaで作成。来週ユーザーテスト予定。",
      stats: { likes: 78, replies: 6, reposts: 4, impressions: "3900" },
      visibility: PostVisibility.PUBLIC,
    },
    {
      handle: "sora_dev",
      body: "OpenAPI スキーマを整理して tRPC と同期。フロント側の型安全性が上がりました。",
      stats: { likes: 133, replies: 10, reposts: 5, impressions: "11200" },
      visibility: PostVisibility.PUBLIC,
    },
    {
      handle: "mina_ui",
      body: "投稿カードにアニメーションを追加してマイクロインタラクションを改善。小さな喜びを届けたい。",
      stats: { likes: 101, replies: 4, reposts: 6, impressions: "7400" },
      visibility: PostVisibility.PUBLIC,
    },
    {
      handle: "data_wave",
      body: "エンゲージメントレポートを自動生成するクエリを準備。来月のOKR レビューに間に合わせます。",
      stats: { likes: 89, replies: 8, reposts: 3, impressions: "6100" },
      visibility: PostVisibility.PUBLIC,
    },
  ];

  const posts = [] as Array<{ id: string; handle: string }>;
  for (const post of postsSeed) {
    const created = await prisma.post.create({
      data: {
        body: post.body,
        visibility: post.visibility,
        author: {
          connect: { id: userRecords[post.handle].id },
        },
      },
    });
    posts.push({ id: created.id, handle: post.handle });
  }

  const followPairs: Array<[string, string]> = [
    ["sora_dev", "mina_ui"],
    ["sora_dev", "kenji_data"],
    ["mina_ui", "sora_dev"],
    ["kenji_data", "sora_dev"],
    ["nao_codes", "sora_dev"],
    ["haru_pm", "sora_dev"],
  ];

  await prisma.follow.createMany({
    data: followPairs.map(([follower, followee]) => ({
      followerId: userRecords[follower].id,
      followeeId: userRecords[followee].id,
    })),
    skipDuplicates: true,
  });

  const likes = [
    { user: "sora_dev", postHandle: "mina_ui" },
    { user: "mina_ui", postHandle: "sora_dev" },
    { user: "kenji_data", postHandle: "data_wave" },
    { user: "nao_codes", postHandle: "sora_dev" },
    { user: "haru_pm", postHandle: "riku_backend" },
  ];

  for (const like of likes) {
    const post = posts.find((p) => p.handle === like.postHandle);
    if (!post) continue;

    await prisma.postLike.create({
      data: {
        userId: userRecords[like.user].id,
        postId: post.id,
      },
    });
  }

  console.log("✅ Seed completed");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
