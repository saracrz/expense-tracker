import { useState } from "react";
import { generateRandomKey } from "../../helpers";
import { cn } from "@/lib/utils";

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
    <div className="mt-8">
      <div role="tablist" className="flex gap-6 border-b border-border">
        {tabs.map((tab, index) => (
          <button
            key={generateRandomKey(tab.title)}
            role="tab"
            aria-selected={index === activeTab}
            className={cn(
              "-mb-px border-b-2 pb-3 text-sm font-semibold transition-colors outline-none focus-visible:text-primary",
              index === activeTab
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
            onClick={() => handleTabClick(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      {items.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">
          Nothing here yet.
        </p>
      ) : (
        <ul role="tabpanel">
          {items.map((item) => (
            <li
              className="flex items-baseline justify-between gap-4 border-b border-border py-4 last:border-b-0"
              key={generateRandomKey(item.itemName)}
            >
              <span className="truncate">{item.itemName}</span>
              <span className="shrink-0 font-medium tabular-nums">
                {item.itemAmount}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
