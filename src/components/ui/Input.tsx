import { cn } from "@/lib/utils";
import { InputHTMLAttributes, ReactNode, useId } from "react";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  label?: string;
  suffix?: ReactNode;
  onChangeValue?: (value: string) => void;
};

export const Input = ({
  id,
  label,
  suffix,
  onChangeValue,
  className,
  type = "text",
  ...rest
}: InputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  // Error styles key off aria-invalid, so callers only set that attribute
  return (
    <div className="group grid gap-2">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-bold text-foreground group-has-[[aria-invalid=true]]:text-destructive"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          {...rest}
          id={inputId}
          type={type}
          onChange={(e) => onChangeValue?.(e.target.value)}
          className={cn(
            "h-12 w-full rounded-control border-2 border-foreground bg-card px-4 text-base font-bold text-foreground outline-none transition-shadow placeholder:font-medium placeholder:text-muted-foreground focus-visible:shadow-hard aria-invalid:border-destructive aria-invalid:shadow-hard-danger disabled:opacity-55 motion-reduce:transition-none",
            suffix && "pr-10",
            className,
          )}
        />
        {suffix && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-4 flex items-center font-bold text-muted-foreground"
          >
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
};
