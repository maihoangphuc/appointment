export interface ConfirmProps {
  title: string;
  onClose: () => void;
  description?: string;
  onSubmit: () => void;
  isLoading?: boolean;
  footerProps?: {
    submitText?: string;
    cancelText?: string;
    isLoading?: boolean;
  };
} 