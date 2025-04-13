import { Button } from "@/components/ui/button";
import { FooterActionPlacement } from "@/enums";
import { cn } from "@/lib/utils";
import { FooterActionProps } from "@/types/components/footerAction";

export default function FooterAction({
  formId,
  leftButton = false,
  rightButton = false,
  placement = FooterActionPlacement.END,
}: FooterActionProps) {
  return (
    <div
      className={cn(
        "w-full flex gap-2",
        placement === FooterActionPlacement.START && "justify-start",
        placement === FooterActionPlacement.END && "justify-end",
        placement === FooterActionPlacement.JUSTIFY && "justify-between"
      )}
    >
      {leftButton && typeof leftButton === "object" && (
        <Button
          type="button"
          variant="outline"
          className="w-fit"
          onClick={leftButton.onClick}
          isLoading={leftButton.isLoading}
          disabled={leftButton.disabled || leftButton.isLoading}
        >
          {leftButton.title}
        </Button>
      )}

      {rightButton && typeof rightButton === "object" && (
        <Button
          form={formId}
          type="submit"
          onClick={rightButton.onClick}
          isLoading={rightButton.isLoading}
          disabled={rightButton.disabled || rightButton.isLoading}
          className="w-fit bg-light-primary hover:bg-light-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 text-white"
        >
          {rightButton.title}
        </Button>
      )}
    </div>
  );
}
