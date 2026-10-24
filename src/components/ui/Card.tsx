import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export const Card = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn(
      "rounded-card border-2 border-foreground bg-card px-4 shadow-hard",
      className,
    )}
    {...props}
  />
);
