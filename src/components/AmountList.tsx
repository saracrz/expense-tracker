import { AmountChip } from "@/components/ui";
import { formatAmount } from "@/lib/format";
import { cn } from "@/lib/utils";

export interface AmountItem {
  id: string;
  name: string;
  amount: number;
  share?: number;
  chipClassName?: string;
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
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  {item.chipClassName && (
                    <span
                      aria-hidden="true"
                      className={cn(
                        "size-3 shrink-0 rounded-full border-2 border-foreground",
                        item.chipClassName,
                      )}
                    />
                  )}
                  <p className="min-w-0 truncate text-base font-bold">{item.name}</p>
                </div>
                {item.share !== undefined && (
                  <p
                    className={cn(
                      "text-sm font-medium text-muted-foreground",
                      item.chipClassName && "pl-5",
                    )}
                  >
                    {item.share}%
                  </p>
                )}
              </div>
              <AmountChip className={item.chipClassName}>
                {formatAmount(item.amount)}
              </AmountChip>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
