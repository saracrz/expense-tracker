import { useState } from "react";
import "./styles/Tabs.css";

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

  return (
    <>
      <div className="tab-buttons">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={index === activeTab ? "active" : "inactive"}
            onClick={() => handleTabClick(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {tabs[activeTab].items?.map((item) => (
          <div className="item">
            <span className="item-name">{item.itemName}</span>
            <span className="item-amount">{item.itemAmount}</span>
          </div>
        ))}
      </div>
    </>
  );
};
