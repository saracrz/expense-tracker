import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

// Defaults to the "other" category color; pass e.g. `bg-category-food` to recolor
export const AmountChip = ({ className, ...rest }: ComponentProps<"span">) => (
  <span
    className={cn(
      "inline-flex shrink-0 items-center rounded-full border-2 border-foreground bg-category-other px-3 py-1 text-sm font-extrabold tabular-nums",
      className,
    )}
    {...rest}
  />
);
