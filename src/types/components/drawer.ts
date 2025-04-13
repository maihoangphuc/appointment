import { ReactNode } from "react";

export interface DrawerProps {
  trigger?: ReactNode;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  isLoading?: boolean;
  onSubmit?: () => void;
  defaultOpen?: boolean;
  onClose: () => void;
  isOpen: boolean;
  className?: string;
}