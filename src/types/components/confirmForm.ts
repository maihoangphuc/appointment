import { FormFields } from "@/types/lib/form";
import { ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";

export interface ConfirmFormProps {
  title: string;
  onClose: () => void;
  description?: string;
  onSubmit: (value: any) => void;
  formProps?: {
    fields: FormFields[];
    formId: string;
    form: UseFormReturn<any>;
  };
  footer?: ReactNode
} 