"use client";

import NextBreadcrumb from "@/components/Breadcrumb";
import { ModeToggle } from "@/components/ModeToggle";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
  return (
    <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 transition-[width] ease-linear border-b border-light-border dark:border-dark-border bg-light-sidebar-bg dark:bg-dark-sidebar-bg z-40">
      <div className="flex items-center justify-between w-full px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <NextBreadcrumb />
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}
