import { AmountList, AmountItem } from "@/components/AmountList";
import { Card } from "@/components/ui";
import { calculateShares } from "@/lib/shares";
import { CHIP_COLORS } from "@/constants/chips";
import { cn } from "@/lib/utils";

export const ExpenseBreakdown = ({ items }: { items: AmountItem[] }) => {
  const itemsWithChips = calculateShares(items).map((item, index) => ({
    ...item,
    chipClassName: CHIP_COLORS[index % CHIP_COLORS.length],
  }));

  return (
    <Card>
      <h2 className="text-xl font-bold py-4">Breakdown</h2>
      {itemsWithChips.length > 0 && (
        <div
          aria-hidden="true"
          className="flex overflow-hidden h-5.5 bg-card border-foreground border-2 rounded-full p-0.5 mb-4"
        >
          {itemsWithChips
            .filter((item) => item.share > 0)
            .map((item) => (
              <div
                key={item.id}
                className={cn(
                  "border-2 border-foreground min-w-3",
                  item.chipClassName,
                )}
                style={{ flex: item.share }}
              />
            ))}
        </div>
      )}

      <AmountList items={itemsWithChips} />
    </Card>
  );
};
