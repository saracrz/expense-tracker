import { useState } from "react";

import { cn } from "@/lib/utils";

interface Tab {
  title: string;
  content: React.ReactNode;
}

type TabsProps = { tabs: Tab[] };

export const Tabs = ({ tabs }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

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
        {tabs.length > 0 && tabs[activeTab].content}
      </div>
    </div>
  );
};
