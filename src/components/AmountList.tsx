import { AmountChip } from "./ui/AmountChip";

export interface Items {
  itemName: string;
  itemAmount: string;
}

export const AmountList = ({ items }: { items: Items[] }) => {
  return (
    <>
      {items.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">
          Nothing here yet.
        </p>
      ) : (
        <ul role="tabpanel">
          {items.map((item, index) => (
            <li
              className="flex items-center justify-between gap-4 border-b border-foreground/12 py-3 last:border-b-0"
              key={index}
            >
              <span className="truncate text-base font-bold">
                {item.itemName}
              </span>
              <AmountChip>{item.itemAmount}</AmountChip>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
