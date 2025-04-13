import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ConfirmProps } from "@/types/components/confirm";

export default function Confirm(props: ConfirmProps) {
  const {
    title,
    description,
    footerProps,
    onSubmit,
    onClose,
    isLoading = false,
  } = props;

  return (
    <AlertDialog defaultOpen onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {footerProps?.cancelText || "Hủy"}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit} isLoading={isLoading}>
            {footerProps?.submitText || "Xác nhận"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
