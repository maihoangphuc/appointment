import { FormFields } from "@/types/lib/form";
import { UseFormReturn } from "react-hook-form";

export interface BaseFormProps {
  id?: string;
  form: UseFormReturn<any>;
  fields: FormFields[];
  onSubmit: (values: any) => void;
  className?: string;
  storeUpdates?: {
    [fieldName: string]: (value: any) => void;
  };
} 