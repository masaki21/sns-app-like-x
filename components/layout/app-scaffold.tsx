import { ReactNode } from "react";
import { Sidebar } from "@/components/navigation/sidebar";
import { navItems } from "@/lib/navigation";

export type AppScaffoldProps = {
  children: ReactNode;
  aside?: ReactNode;
};

export function AppScaffold({ children, aside }: AppScaffoldProps) {
  return (
    <div className="min-h-screen bg-neutral-950 pb-20 text-neutral-100 md:pb-10">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 pb-10 pt-4 sm:px-6 lg:flex-row lg:px-8">
        <Sidebar brandLabel="sns-app" primaryActionLabel="投稿する" navItems={navItems} />
        <main className="min-h-screen flex-1 border-neutral-800 md:border-x">{children}</main>
        {aside ? (
          <aside className="hidden w-80 flex-shrink-0 flex-col gap-6 lg:flex">{aside}</aside>
        ) : null}
      </div>
    </div>
  );
}
