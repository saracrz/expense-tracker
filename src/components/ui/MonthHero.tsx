import { getMonthTheme } from "@/lib/month";

type MonthHeroProps = {
  total: string;
  expenseCount: number;
};

// Scalloped "stamp" outline: a circle whose radius waves 16 times around it
const STAMP_SIZE = 170;
const stampPoints = Array.from({ length: 160 }, (_, i) => {
  const angle = (i / 160) * Math.PI * 2;
  const radius = 78 + 5 * Math.cos(16 * angle);
  const center = STAMP_SIZE / 2;

  return `${(center + radius * Math.cos(angle)).toFixed(2)},${(center + radius * Math.sin(angle)).toFixed(2)}`;
}).join(" ");

export const MonthHero = ({ total, expenseCount }: MonthHeroProps) => {
  const { name } = getMonthTheme();

  return (
    <section className="relative min-h-62 overflow-hidden rounded-card border-2 border-foreground bg-primary p-5 text-primary-foreground shadow-hard">
      <p className="text-xs font-bold uppercase tracking-[0.12em]">
        This month
      </p>
      <h1 className="mt-1 font-display text-[clamp(3rem,15vw,var(--text-display))] font-black leading-none tracking-[-0.04em]">
        {name}
      </h1>
      <p className="absolute bottom-5 left-5 text-sm font-bold">
        {expenseCount} {expenseCount === 1 ? "expense" : "expenses"}
      </p>

      <div className="absolute -right-1.5 -bottom-7 grid size-42.5 -rotate-8 place-items-center">
        <svg
          aria-hidden="true"
          viewBox={`0 0 ${STAMP_SIZE} ${STAMP_SIZE}`}
          className="absolute inset-0 size-full"
        >
          <polygon
            points={stampPoints}
            className="fill-card stroke-foreground"
            strokeWidth={2}
          />
        </svg>
        <p className="relative text-center">
          <span className="block font-display text-2xl font-extrabold tabular-nums tracking-[-0.04em]">
            {total}
          </span>
          <span className="block text-xs font-bold text-muted-foreground">
            spent this month
          </span>
        </p>
      </div>
    </section>
  );
};
