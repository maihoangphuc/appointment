import * as SelectPrimitive from "@radix-ui/react-select";

export interface SelectProps extends Omit<SelectPrimitive.SelectProps, 'onValueChange'> {
  options: Option[];
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  allowClear?: boolean;
}

export interface Option {
  id: string;
  label: string;
  value: string;
  [key: string]: any;
} 