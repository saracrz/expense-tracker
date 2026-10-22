import { cn } from "@/lib/utils";
import { InputHTMLAttributes, useId } from "react";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  label?: string;
  onChangeValue?: (value: string) => void;
};

export const Input = ({
  id,
  label,
  onChangeValue,
  className,
  type = "text",
  ...rest
}: InputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="grid gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}
      <input
        {...rest}
        id={inputId}
        type={type}
        onChange={(e) => onChangeValue?.(e.target.value)}
        className={cn(
          "h-12 w-full rounded-xl border border-input bg-card px-4 text-base text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/20",
          className,
        )}
      />
    </div>
  );
};
