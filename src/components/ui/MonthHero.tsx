import type { ReactNode } from "react";
import { getMonthTheme } from "@/lib/month";

export const MonthHero = ({ children }: { children?: ReactNode }) => {
  const { name } = getMonthTheme();

  return (
    <section className="overflow-hidden rounded-[2rem] bg-primary px-6 pb-7 pt-20 text-primary-foreground">
      <h1 className="font-display text-[clamp(3rem,15vw,5.25rem)] font-bold leading-[0.9] tracking-[-0.045em]">
        {name}
      </h1>
      {children}
    </section>
  );
};
