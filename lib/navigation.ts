import type { NavItem } from "@/components/navigation/sidebar";

export const navItems: NavItem[] = [
  { label: "ホーム", icon: "🏠", href: "/" },
  { label: "話題を検索", icon: "🔍", href: "/search" },
  { label: "通知", icon: "🔔", href: "/notifications" },
  { label: "メッセージ", icon: "✉️", href: "/messages" },
  { label: "リスト", icon: "📋", href: "/lists" },
  { label: "ブックマーク", icon: "🔖", href: "/bookmarks" },
  { label: "プロフィール", icon: "👤", href: "/profile" },
  { label: "設定", icon: "⚙️", href: "/settings" },
];
