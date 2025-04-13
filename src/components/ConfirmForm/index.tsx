import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ConfirmFormProps } from "@/types/components/confirmForm";
import BaseForm from "../BaseForm";

export default function ConfirmForm(props: ConfirmFormProps) {
  const { title, description, onSubmit, onClose, formProps, footer } = props;

  return (
    <Dialog defaultOpen onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-light-bg dark:bg-dark-bg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {formProps && (
          <BaseForm
            form={formProps.form}
            id={formProps.formId}
            fields={formProps.fields || []}
            onSubmit={onSubmit}
          />
        )}

        <DialogFooter>{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
