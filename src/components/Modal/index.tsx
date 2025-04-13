import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ModalProps } from "@/types/components/modal";

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  formId,
  submitLabel = "Xác nhận",
  cancelLabel = "Hủy",
  isLoading = false,
  showFooter = true,
}: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-light-bg dark:bg-black border-light-border dark:border-dark-border">
        <DialogHeader>
          <DialogTitle className="text-light-text dark:text-white">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">{children}</div>
        {showFooter && (
          <DialogFooter className="flex gap-[2px]">
            <Button
              variant="outline"
              onClick={onClose}
              className="bg-light-bg dark:bg-black text-light-text dark:text-white border-light-border dark:border-dark-border"
            >
              {cancelLabel}
            </Button>
            {onSubmit || formId ? (
              <Button
                isLoading={isLoading}
                onClick={onSubmit}
                form={formId}
                className="bg-light-primary hover:bg-light-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 text-white"
              >
                {submitLabel}
              </Button>
            ) : null}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
