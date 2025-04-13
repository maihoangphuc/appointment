"use client";

import { useSidebar } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { NavItemProps, NavMainProps } from "@/types/components/navMain";
import Link from "next/link";

export function NavMain({ items }: NavMainProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <nav className="space-y-0.5 py-2 overflow-x-hidden">
      {items.map((item) => (
        <NavItem key={item.url} isCollapsed={isCollapsed} {...item} />
      ))}
    </nav>
  );
}

function NavItem({
  title,
  url,
  icon: Icon,
  isActive,
  isCollapsed,
}: NavItemProps & { isCollapsed: boolean }) {
  const itemClasses = cn(
    "flex items-center relative py-2 text-sm font-medium transition-colors",
    isActive
      ? "bg-blue-500/10 dark:text-dark-text text-light-text"
      : "dark:text-slate-300 text-slate-600 hover:text-slate-900 dark:hover:text-white hover:bg-blue-500/5",
    isCollapsed ? "justify-center mx-2 rounded-md px-2" : "px-4"
  );

  if (isCollapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Link href={url} className={itemClasses}>
            {isActive && (
              <span className="absolute right-0 top-0 bottom-0 w-1 bg-blue-500 rounded-none" />
            )}
            <Icon className="h-5 w-5" />
          </Link>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className="dark:bg-dark-bg bg-light-bg dark:text-dark-text text-light-text dark:border-dark-border border-light-border"
        >
          {title}
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Link href={url} className={itemClasses}>
      {isActive && (
        <span className="absolute right-0 top-0 bottom-0 w-1 bg-blue-500 rounded-none" />
      )}
      <Icon className="mr-3 h-5 w-5" />
      <span>{title}</span>
    </Link>
  );
}
