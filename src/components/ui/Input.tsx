import { useId, type HTMLAttributes } from "react";

export const Input = ({
  onChangeValue,
  placeholder,
  type = "text",
  value,
  label,
  inputMode,
  autoComplete,
  autoFocus,
}: {
  onChangeValue: (value: string) => void;
  placeholder?: string;
  type?: string;
  value: string;
  label?: string;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
  autoFocus?: boolean;
}) => {
  const id = useId();

  return (
    <div className="grid gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        onChange={(e) => onChangeValue(e.target.value)}
        className="h-12 w-full rounded-xl border border-input bg-card px-4 text-base text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/20"
      />
    </div>
  );
};
