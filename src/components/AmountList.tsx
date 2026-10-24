import { AmountChip } from "@/components/ui";
import { formatAmount } from "@/lib/format";

export interface AmountItem {
  id: string;
  name: string;
  amount: number;
}

export const AmountList = ({ items }: { items: AmountItem[] }) => {
  return (
    <>
      {items.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">
          Nothing here yet.
        </p>
      ) : (
        <ul>
          {items.map((item) => (
            <li
              className="flex items-center justify-between gap-4 border-b border-foreground/12 py-3 last:border-b-0"
              key={item.id}
            >
              <span className="truncate text-base font-bold">{item.name}</span>
              <AmountChip>{formatAmount(item.amount)}</AmountChip>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
