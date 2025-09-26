import type {
  TimelinePost,
  TrendTopic,
  SuggestedUser,
  NotificationItem,
  MessageThread,
  MessagePreview,
  ListCollection,
  BookmarkItem,
  ProfileSummary,
  SearchResult,
  SettingSection,
} from "@/types/social";

const wait = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

const users = {
  sora: { id: "u1", name: "Sora Ito", handle: "sora_dev" },
  mina: { id: "u2", name: "Mina Studio", handle: "mina_ui" },
  kenji: { id: "u3", name: "Kenji Analytics", handle: "kenji_data" },
  haru: { id: "u4", name: "Haru Product", handle: "haru_pm" },
  nao: { id: "u5", name: "Nao Frontend", handle: "nao_codes" },
  datawave: { id: "u6", name: "DataWave", handle: "data_wave" },
  yui: { id: "u7", name: "Yui UX", handle: "yui_ux" },
  riku: { id: "u8", name: "Riku Backend", handle: "riku_backend" },
};

const timelinePosts: TimelinePost[] = [
  {
    id: "1",
    author: users.sora,
    time: "2h",
    content:
      "Appの初期セットアップが完了。次は認証まわりを整える予定。MVPのタイムラインが楽しみ。",
    stats: { replies: 12, reposts: 4, likes: 87, impressions: "5.2K" },
  },
  {
    id: "2",
    author: users.mina,
    time: "4h",
    content:
      "新しいカードコンポーネントを作成。Tailwind v4 の @theme inline が便利すぎる。",
    stats: { replies: 7, reposts: 15, likes: 142, impressions: "8.1K" },
  },
  {
    id: "3",
    author: users.kenji,
    time: "6h",
    content:
      "週次 KPI を整理中。DAU と投稿数をダッシュボードで可視化できるようにする予定です。",
    stats: { replies: 3, reposts: 6, likes: 58, impressions: "3.4K" },
  },
  {
    id: "4",
    author: users.haru,
    time: "8h",
    content: "βテスター向けアンケートの設計完了。オンボーディング体験の改善案をまとめました。",
    stats: { replies: 9, reposts: 2, likes: 64, impressions: "2.1K" },
  },
  {
    id: "5",
    author: users.nao,
    time: "12h",
    content: "ダークテーマのアクセシビリティレビュー実施。コントラスト比の調整を進めています。",
    stats: { replies: 5, reposts: 3, likes: 92, impressions: "4.8K" },
  },
  {
    id: "6",
    author: users.riku,
    time: "14h",
    content: "通知キューをRedisに差し替えたところ、遅延が40%改善されました。",
    stats: { replies: 11, reposts: 7, likes: 120, impressions: "9.6K" },
  },
  {
    id: "7",
    author: users.yui,
    time: "16h",
    content: "モバイル向けのジェスチャー操作プロトタイプをFigmaで作成。来週ユーザーテスト予定。",
    stats: { replies: 6, reposts: 4, likes: 78, impressions: "3.9K" },
  },
  {
    id: "8",
    author: users.sora,
    time: "1d",
    content: "OpenAPI スキーマを整理して tRPC と同期。フロント側の型安全性が上がりました。",
    stats: { replies: 10, reposts: 5, likes: 133, impressions: "11.2K" },
  },
  {
    id: "9",
    author: users.mina,
    time: "1d",
    content: "投稿カードにアニメーションを追加してマイクロインタラクションを改善。小さな喜びを届けたい。",
    stats: { replies: 4, reposts: 6, likes: 101, impressions: "7.4K" },
  },
  {
    id: "10",
    author: users.datawave,
    time: "2d",
    content: "エンゲージメントレポートを自動生成するクエリを準備。来月のOKR レビューに間に合わせます。",
    stats: { replies: 8, reposts: 3, likes: 89, impressions: "6.1K" },
  },
];

const mockReplies: Record<string, TimelinePost[]> = {
  "1": [
    {
      id: "1-r1",
      author: users.mina,
      time: "1h",
      content: "セットアップ完了おめでとうございます！ベータテスト楽しみです 👏",
      stats: { replies: 0, reposts: 1, likes: 42, impressions: "2.4K" },
    },
    {
      id: "1-r2",
      author: users.riku,
      time: "55m",
      content: "APIゲートウェイ周り、何かあれば声かけてください！",
      stats: { replies: 0, reposts: 0, likes: 15, impressions: "1.1K" },
    },
  ],
  "2": [
    {
      id: "2-r1",
      author: users.sora,
      time: "3h",
      content: "Tailwind v4 のテーマ機能、ちょうど試してました！",
      stats: { replies: 1, reposts: 0, likes: 58, impressions: "3.0K" },
    },
  ],
};

const trendTopics: TrendTopic[] = [
  { category: "Product", title: "MVPローンチ", posts: "12.7K" },
  { category: "Tech", title: "Tailwind v4", posts: "37.2K" },
  { category: "Design", title: "UXリサーチ", posts: "9,803" },
];

const suggestedUsers: SuggestedUser[] = [
  { ...users.haru, bio: "プロダクトマネージャー / SaaS 推進" },
  { ...users.nao, bio: "フロントエンド開発とUI改善が得意" },
  { ...users.datawave, bio: "データ分析で意思決定を支援" },
];

const notifications: NotificationItem[] = [
  {
    id: "n1",
    type: "follow",
    message: "Haru Product があなたをフォローしました",
    time: "1h",
    actor: users.haru,
  },
  {
    id: "n2",
    type: "like",
    message: "Nao Frontend があなたの投稿をいいねしました",
    time: "3h",
    actor: users.nao,
  },
  {
    id: "n3",
    type: "reply",
    message: "Kenji Analytics がコメントを追加しました",
    time: "5h",
    actor: users.kenji,
  },
];

const conversations: MessageThread[] = [
  {
    id: "c1",
    participants: [users.sora, users.mina],
    lastMessage: {
      author: users.mina,
      content: "コンポーネントのレビューありがとう！",
      time: "10m",
    },
    messages: [
      {
        id: "m1",
        author: users.mina,
        content: "コンポーネントのレビューありがとう！",
        time: "10m",
      },
      {
        id: "m2",
        author: users.sora,
        content: "こちらこそ！細かいところも直ってたよ",
        time: "14m",
      },
      {
        id: "m3",
        author: users.mina,
        content: "じゃあ明日のリリースに乗せますね",
        time: "20m",
      },
    ],
  },
  {
    id: "c2",
    participants: [users.kenji, users.sora, users.riku],
    lastMessage: {
      author: users.riku,
      content: "データストリームのモック出せました",
      time: "1h",
    },
    messages: [
      {
        id: "m4",
        author: users.riku,
        content: "データストリームのモック出せました",
        time: "1h",
      },
      {
        id: "m5",
        author: users.kenji,
        content: "確認します！",
        time: "1h",
      },
      {
        id: "m6",
        author: users.sora,
        content: "助かります",
        time: "2h",
      },
    ],
  },
];

const messagePreviews: MessagePreview[] = conversations.map(({ id, participants, lastMessage }) => ({
  id,
  participants,
  lastMessage,
}));

const listCollections: ListCollection[] = [
  {
    id: "l1",
    title: "デザインのヒント",
    description: "日々のUI改善に役立つアカウントをまとめています",
    membersCount: 18,
    creator: users.mina,
  },
  {
    id: "l2",
    title: "データ監視チーム",
    description: "プロダクト分析に携わるメンバーのタイムライン",
    membersCount: 12,
    creator: users.kenji,
  },
];

const bookmarkItems: BookmarkItem[] = timelinePosts.slice(0, 2).map((post, index) => ({
  id: `b${index + 1}`,
  savedAt: index === 0 ? "2025-09-20" : "2025-09-18",
  post,
}));

const profileSummary: ProfileSummary = {
  ...users.sora,
  bio: "SNSアプリMVPを開発中。TypeScript / Next.js / Prisma",
  location: "Tokyo, Japan",
  website: "https://example.dev",
  joinedAt: "2022年4月",
  stats: {
    posts: 345,
    followers: 1820,
    following: 310,
  },
};

const searchResults: SearchResult[] = [
  {
    id: "s1",
    type: "topic",
    title: "#MVPローンチ",
    description: "今週のローンチに関する最新の投稿が続々と集まっています",
    badge: "トレンド",
  },
  {
    id: "s2",
    type: "post",
    title: "Tailwind v4 の@theme inlineを試した話",
    description: "Mina Studio · 4時間前",
  },
  {
    id: "s3",
    type: "user",
    title: "DataWave",
    description: "データ分析とモニタリングの知見を共有",
    badge: "フォローおすすめ",
  },
];

const settingSections: SettingSection[] = [
  {
    id: "account",
    title: "アカウント",
    description: "ログイン情報とセキュリティを管理",
    fields: [
      {
        id: "displayName",
        label: "表示名",
        type: "text",
        placeholder: "例: Sora Ito",
        value: profileSummary.name,
      },
      {
        id: "email",
        label: "メールアドレス",
        type: "email",
        placeholder: "example@mail.com",
        value: "sora@example.com",
      },
      {
        id: "password",
        label: "パスワード",
        type: "password",
        placeholder: "••••••••",
      },
    ],
  },
  {
    id: "notifications",
    title: "通知",
    description: "受け取りたい通知を選択",
    fields: [
      {
        id: "notifyLikes",
        label: "いいね通知",
        type: "switch",
        description: "自分の投稿にいいねが付いたときに通知",
      },
      {
        id: "notifyMentions",
        label: "メンション",
        type: "switch",
        description: "@メンションされた投稿を通知",
      },
    ],
  },
];

export async function getTimelineData() {
  await wait();
  return {
    posts: timelinePosts,
    trends: trendTopics,
    suggestedUsers,
  };
}

export async function getPostWithRepliesFromMock(id: string) {
  await wait();
  const post = timelinePosts.find((p) => p.id === id);
  if (!post) {
    return null;
  }

  return {
    post,
    replies: mockReplies[id] ?? [],
  };
}

export async function getSearchData() {
  await wait();
  return {
    results: searchResults,
    trends: trendTopics,
    suggestions: suggestedUsers,
  };
}

export async function getNotifications() {
  await wait();
  return notifications;
}

export async function getMessageOverview() {
  await wait();
  return {
    previews: messagePreviews,
    threads: conversations,
  };
}

export async function getLists() {
  await wait();
  return listCollections;
}

export async function getBookmarks() {
  await wait();
  return bookmarkItems;
}

export async function getProfileSummary() {
  await wait();
  return {
    profile: profileSummary,
    posts: timelinePosts,
  };
}

export async function getSettings() {
  await wait();
  return settingSections;
}
