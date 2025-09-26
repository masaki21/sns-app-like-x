export type BasicUser = {
  id: string;
  name: string;
  handle: string;
};

export type TimelineStats = {
  replies: number;
  reposts: number;
  likes: number;
  impressions: string;
};

export type TimelinePost = {
  id: string;
  author: BasicUser;
  time: string;
  content: string;
  stats: TimelineStats;
};

export type TrendTopic = {
  category: string;
  title: string;
  posts: string;
};

export type SuggestedUser = BasicUser & {
  bio?: string;
};

export type NotificationItem = {
  id: string;
  type: "follow" | "like" | "reply" | "mention";
  message: string;
  time: string;
  actor: BasicUser;
};

export type MessagePreview = {
  id: string;
  participants: BasicUser[];
  lastMessage: {
    author: BasicUser;
    content: string;
    time: string;
  };
};

export type MessageThread = MessagePreview & {
  messages: Array<{
    id: string;
    author: BasicUser;
    content: string;
    time: string;
  }>;
};

export type ListCollection = {
  id: string;
  title: string;
  description: string;
  membersCount: number;
  creator: BasicUser;
};

export type BookmarkItem = {
  id: string;
  savedAt: string;
  post: TimelinePost;
};

export type ProfileSummary = BasicUser & {
  bio: string;
  location: string;
  website: string;
  joinedAt: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
};

export type SearchResult = {
  id: string;
  type: "post" | "user" | "topic";
  title: string;
  description: string;
  badge?: string;
};

export type SettingField = {
  id: string;
  label: string;
  description?: string;
  placeholder?: string;
  type: "text" | "email" | "password" | "switch";
  value?: string;
};

export type SettingSection = {
  id: string;
  title: string;
  description: string;
  fields: SettingField[];
};
