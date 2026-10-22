import { useState } from "react";
import { generateRandomKey } from "../../helpers";
import { cn } from "@/lib/utils";
import { AmountChip } from "./AmountChip";

interface Tab {
  title: string;
  items: Items[];
}

interface Items {
  itemName: string;
  itemAmount: string;
}

type TabsProps = { tabs: Tab[] };

export const Tabs = ({ tabs }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const items = tabs[activeTab].items ?? [];

  return (
    <div className="mt-5 grid gap-5">
      <div
        role="tablist"
        className="flex gap-1 rounded-full border-2 border-foreground bg-card p-1"
      >
        {tabs.map((tab, index) => (
          <button
            key={generateRandomKey(tab.title)}
            role="tab"
            aria-selected={index === activeTab}
            className={cn(
              "flex-1 rounded-full py-2.5 text-base font-bold transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none",
              index === activeTab
                ? "bg-foreground text-card"
                : "text-foreground hover:bg-accent",
            )}
            onClick={() => handleTabClick(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="rounded-card border-2 border-foreground bg-card px-4 shadow-hard">
        {items.length === 0 ? (
          <p className="py-12 text-center text-muted-foreground">
            Nothing here yet.
          </p>
        ) : (
          <ul role="tabpanel">
            {items.map((item) => (
              <li
                className="flex items-center justify-between gap-4 border-b border-foreground/12 py-3 last:border-b-0"
                key={generateRandomKey(item.itemName)}
              >
                <span className="truncate text-base font-bold">
                  {item.itemName}
                </span>
                <AmountChip>{item.itemAmount}</AmountChip>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
