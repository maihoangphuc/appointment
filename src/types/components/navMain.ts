import { LucideIcon } from "lucide-react";

export type NavItemProps = {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
};

export interface NavMainProps {
  items: NavItemProps[];
} 