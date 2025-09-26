const tabs = [
  { id: "posts", label: "投稿" },
  { id: "media", label: "メディア" },
  { id: "likes", label: "いいね" },
];

export function ProfileTabs() {
  return (
    <nav className="flex gap-6 overflow-x-auto border-b border-neutral-800 px-4 sm:gap-8 sm:px-6">
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          className={`relative py-4 text-sm font-semibold transition ${
            index === 0
              ? "text-neutral-100 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:bg-sky-500"
              : "text-neutral-500 hover:text-neutral-200"
          }`}
          disabled
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
