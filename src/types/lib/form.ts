import { ReactNode } from "react";
import { UseFormProps } from "react-hook-form";

export interface ValidationRules {
  required?: boolean;
  min?: number;
  max?: number;
  integer?: boolean;
  url?: boolean;
  regex?: RegExp;
}

export interface ValidationMessages {
  required?: string;
  invalid?: string;
  min?: string;
  max?: string;
  url?: string;
  regex?: string;
  integer?: string;
}

export type FormFields = {
  notField: true;
  rootClassNames?: string;
  label?: string | ReactNode;
} | {
  name: string;
  label?: string | ReactNode;
  type: "number" | "string" | "email" | "multiSelect";
  component: React.ReactElement<any>;
  renderExtra?: (component: React.ReactElement) => React.ReactElement;
  rootClassNames?: string;
  validation?: ValidationRules;
  messages?: ValidationMessages;
  notField?: false;
} | {
  groupFields: true;
  components?: FormFields[];
  rootClassNames?: string;
  label?: string | ReactNode;
  required?: true;
};

export type InferFormType<T extends FormFields[]> = {
  [K in Extract<T[number], { name: string }>["name"]]: Extract<T[number], { type: string }>["type"] extends "number"
  ? number
  : Extract<T[number], { type: string }>["type"] extends "string"
  ? string
  : Extract<T[number], { type: string }>["type"] extends "multiSelect"
  ? any[]
  : any;
};

export interface UseZodFormOptions<T extends FormFields[]> {
  initialValues?: Partial<InferFormType<T>>;
  customRefinement?: {
    refine: (data: any) => boolean;
    message: string;
    path?: string[];
  };
  formOptions?: Omit<UseFormProps<InferFormType<T>>, 'resolver' | 'defaultValues' | 'values'>;
}