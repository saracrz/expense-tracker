import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Neobrutalist "press": the button moves into its hard shadow and the shadow
// disappears. Disabled buttons (e.g. while saving) stay pressed.
const pressed =
  "active:translate-x-[3px] active:translate-y-[3px] active:shadow-none disabled:translate-x-[3px] disabled:translate-y-[3px] disabled:shadow-none";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold transition-[translate,box-shadow] disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none",
  {
    variants: {
      variant: {
        default: cn(
          "border-2 border-foreground bg-primary text-primary-foreground font-extrabold shadow-hard",
          pressed,
        ),
        destructive: cn(
          "border-2 border-foreground bg-destructive text-white shadow-hard",
          pressed,
        ),
        outline: cn(
          "border-2 border-foreground bg-card text-foreground hover:bg-accent",
          "active:bg-accent",
        ),
        secondary: cn(
          "border-2 border-foreground bg-secondary text-secondary-foreground shadow-hard",
          pressed,
        ),
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-foreground underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 has-[>svg]:px-4",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-12 px-7 text-base has-[>svg]:px-6",
        icon: "size-10 [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button };
