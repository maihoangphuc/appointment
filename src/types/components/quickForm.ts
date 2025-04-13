import { Actions, Forms } from "@/enums";

export type QuickFormProps = {
  type: Forms;
  initialValues?: any;
  status: Actions;
  onClose: () => void;
}; 