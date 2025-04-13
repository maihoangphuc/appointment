import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  allowClear?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement> | null) => void;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, allowClear, onChange, value, ...props }, ref) => {
    const [textareaValue, setTextareaValue] = React.useState(value || "");

    React.useEffect(() => {
      setTextareaValue(value || "");
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTextareaValue(e.target.value);
      onChange?.(e);
    };

    const handleClear = () => {
      setTextareaValue("");
      const syntheticEvent = {
        target: { value: "" },
      } as React.ChangeEvent<HTMLTextAreaElement>;
      onChange?.(syntheticEvent);
    };

    return (
      <div className="relative w-full group">
        <textarea
          className={cn(
            "flex min-h-20 w-full rounded-md border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-card-bg px-3 py-2 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            allowClear && textareaValue ? "pr-8" : "",
            className
          )}
          ref={ref}
          value={textareaValue}
          onChange={handleChange}
          {...props}
        />
        {allowClear && textareaValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-2 right-2 rounded-full bg-gray-200 dark:bg-gray-700 p-0.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-opacity duration-200 opacity-0 group-hover:opacity-100"
            aria-label="Clear textarea"
          >
            <X className="h-2.5 w-2.5" />
          </button>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
