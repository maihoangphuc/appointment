"use client";

import { images } from "@/themes/images";
import {
  CalendarRange,
  FileText,
  PackageOpen,
  Receipt,
  ShieldCheck,
  ShoppingCart,
  Users,
  Wrench,
} from "lucide-react";
import * as React from "react";
import { useMemo, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { NavMain } from "../NavMain";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { state, setOpen, isMobile } = useSidebar();
  const isCollapsed = state === "collapsed";

  useEffect(() => {
    if (isMobile) setOpen(true);
  }, [isMobile, setOpen]);

  const menuLists = useMemo(
    () => [
      {
        title: "Proposals",
        url: ROUTES.PROPOSALS,
        icon: FileText,
        isActive: (pathname || "").startsWith(ROUTES.PROPOSALS),
      },
      {
        title: "Services",
        url: ROUTES.SERVICES,
        icon: Wrench,
        isActive: (pathname || "").startsWith(ROUTES.SERVICES),
      },
      {
        title: "Vehicle Rules",
        url: ROUTES.VEHICLE_RULES,
        icon: ShieldCheck,
        isActive: (pathname || "").startsWith(ROUTES.VEHICLE_RULES),
      },
      {
        title: "Appointments",
        url: ROUTES.APPOINTMENTS,
        icon: CalendarRange,
        isActive: (pathname || "").startsWith(ROUTES.APPOINTMENTS),
      },
      {
        title: "Inventory",
        url: ROUTES.INVENTORY,
        icon: PackageOpen,
        isActive: (pathname || "").startsWith(ROUTES.INVENTORY),
      },
      {
        title: "Contacts",
        url: ROUTES.CONTACTS,
        icon: Users,
        isActive: (pathname || "").startsWith(ROUTES.CONTACTS),
      },
      {
        title: "Transactions",
        url: ROUTES.TRANSACTIONS,
        icon: ShoppingCart,
        isActive: (pathname || "").startsWith(ROUTES.TRANSACTIONS),
      },
      {
        title: "Invoices",
        url: ROUTES.INVOICES,
        icon: Receipt,
        isActive: (pathname || "").startsWith(ROUTES.INVOICES),
      },
    ],
    [pathname]
  );

  return (
    <Sidebar
      collapsible="icon"
      className="bg-light-sidebar-bg text-light-sidebar-text border-light-sidebar-border dark:bg-dark-sidebar-bg dark:text-dark-sidebar-text dark:border-dark-sidebar-border"
      {...props}
    >
      <SidebarHeader
        className={cn(
          "flex items-center justify-center border-b border-light-border dark:border-dark-border p-3 h-16",
          isCollapsed && "px-2"
        )}
      >
        {isCollapsed ? (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-light-primary dark:bg-dark-primary text-white font-bold text-sm">
            CT
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Image
              src={images.logo}
              alt="CEN CAL TINTING"
              width={160}
              height={32}
              className="h-8 w-full object-cover"
              priority
            />
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="px-0 py-0">
        <NavMain items={menuLists} />
      </SidebarContent>

      <SidebarFooter className="mt-auto border-t border-light-border dark:border-dark-border p-3">
        <div
          className={cn(
            "flex items-center",
            isCollapsed ? "justify-center" : "gap-3"
          )}
        >
          <Avatar className="h-8 w-8 border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-card-bg">
            <AvatarImage src="/avatar.png" alt="User avatar" />
            <AvatarFallback className="bg-light-primary dark:bg-dark-primary text-white text-xs">
              MA
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-medium text-light-text dark:text-dark-text">
                Micheal A.
              </span>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
