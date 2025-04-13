"use client";

import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  type ToastPlacement,
} from "@/components/ui/toast";

interface ToasterProps {
  placement?: ToastPlacement;
  className?: string;
}

export function Toaster({
  placement = "topRight",
  className,
}: ToasterProps = {}) {
  const { toasts } = useToast();

  const toastsByPlacement = toasts.reduce((acc, toast) => {
    const toastPlacement = toast.placement || placement;
    if (!acc[toastPlacement]) {
      acc[toastPlacement] = [];
    }
    acc[toastPlacement].push(toast);
    return acc;
  }, {} as Record<ToastPlacement, typeof toasts>);

  const placements = Object.keys(toastsByPlacement) as ToastPlacement[];

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        className: toastClassName,
        ...props
      }) {
        return (
          <Toast key={id} className={toastClassName} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      {placements.map((p) => (
        <ToastViewport key={p} placement={p} className={className} />
      ))}
    </ToastProvider>
  );
}
