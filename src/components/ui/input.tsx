import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { InputProps } from "@/types/ui/input";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      allowClear,
      prefixIcon,
      suffixIcon,
      onChange,
      value,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = React.useState(value || "");

    React.useEffect(() => {
      setInputValue(value || "");
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      onChange?.(e);
    };

    const handleClear = () => {
      setInputValue("");
      onChange?.({
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
      <div className="relative flex items-center w-full group">
        {prefixIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {prefixIcon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "!bg-light-bg dark:!bg-dark-card-bg border-light-border dark:border-dark-border flex h-8 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            allowClear && inputValue ? "pr-8" : "",
            prefixIcon ? "pl-10" : "",
            suffixIcon ? "pr-10" : "",
            className
          )}
          ref={ref}
          value={inputValue}
          onChange={handleChange}
          {...props}
        />
        {allowClear && inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-gray-200 dark:bg-gray-700 p-0.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-opacity duration-200 opacity-0 group-hover:opacity-100"
            aria-label="Clear input"
          >
            <X className="h-2.5 w-2.5" />
          </button>
        )}
        {suffixIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {suffixIcon}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
