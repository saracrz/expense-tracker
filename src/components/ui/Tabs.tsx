import { useState, useId, type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface Tab {
  title: string;
  content: ReactNode;
}

type TabsProps = { tabs: Tab[] };

export const Tabs = ({ tabs }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const baseId = useId();
  const tabId = (i: number) => `${baseId}-tab-${i}`;
  const panelId = (i: number) => `${baseId}-panel-${i}`;

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="mt-5 grid gap-5">
      <div
        role="tablist"
        className="flex gap-1 rounded-full border-2 border-foreground bg-card p-1"
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={index === activeTab}
            id={tabId(index)}
            aria-controls={panelId(index)}
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
      <div
        role="tabpanel"
        id={panelId(activeTab)}
        aria-labelledby={tabId(activeTab)}
      >
        {tabs.length > 0 && tabs[activeTab].content}
      </div>
    </div>
  );
};
