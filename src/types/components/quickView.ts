import { Views } from "@/enums";

export type QuickViewProps = {
  type: Views;
  initialValues?: any;
  onClose: () => void;
}; 