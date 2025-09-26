import Link from "next/link";

export type NavItem = {
  label: string;
  icon: string;
  href: string;
};

export type SidebarProps = {
  brandLabel: string;
  primaryActionLabel: string;
  navItems: NavItem[];
};

export function Sidebar({ brandLabel, primaryActionLabel, navItems }: SidebarProps) {
  return (
    <>
      <aside className="hidden w-60 flex-shrink-0 flex-col gap-2 md:flex">
        <div className="text-2xl font-semibold text-sky-400">{brandLabel}</div>
        <nav className="mt-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 rounded-full px-4 py-3 text-base font-medium text-neutral-200 transition hover:bg-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <span className="text-xl" aria-hidden>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <button className="mt-6 rounded-full bg-sky-500 px-6 py-3 text-center text-base font-semibold text-white transition hover:bg-sky-400">
          {primaryActionLabel}
        </button>
      </aside>

      <nav
        className="fixed bottom-4 left-1/2 z-30 flex w-[calc(100%-2.5rem)] -translate-x-1/2 items-center justify-between overflow-x-auto rounded-full border border-neutral-800 bg-neutral-900/90 px-4 py-3 shadow-lg backdrop-blur md:hidden"
        aria-label="モバイルナビゲーション"
      >
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex min-w-[48px] flex-col items-center text-xs font-medium text-neutral-300 transition hover:text-sky-400"
          >
            <span className="text-lg" aria-hidden>
              {item.icon}
            </span>
            <span className="sr-only">{item.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
