"use client";

import { Header } from "@/components/Header";
import { AppSidebar } from "@/components/Sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="w-full h-full bg-gradient-light-bg dark:bg-gradient-dark-bg">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
export default DefaultLayout;
