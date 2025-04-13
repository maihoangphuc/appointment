import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DrawerProps } from "@/types/components/drawer";
import { cn } from "@/lib/utils";

export default function Drawer({
  trigger,
  title,
  children,
  footer,
  isLoading,
  onSubmit,
  onClose,
  isOpen,
  className,
}: DrawerProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent
        className={cn(
          "bg-light-bg dark:bg-black border-light-border dark:border-dark-border flex flex-col p-0 max-w-none sm:max-w-none w-full sm:w-[450px] md:w-[500px]",
          className
        )}
      >
        <SheetHeader className="h-16 border-b border-light-border dark:border-dark-border flex flex-row items-center justify-between px-6">
          <SheetTitle className="text-light-text dark:text-white">
            {title}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>

        <div className="border-t border-light-border dark:border-dark-border p-4 mt-auto">
          {footer || (
            <Button
              onClick={onSubmit}
              disabled={isLoading}
              className="bg-light-primary hover:bg-light-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 text-white"
            >
              {isLoading ? "Đang xử lý..." : "Xác minh"}
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
