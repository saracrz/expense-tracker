import { useState } from "react";
import "./styles/Tabs.css";
import { generateRandomKey } from "../helpers";

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
            key={generateRandomKey(tab.title)}
            className={index === activeTab ? "active" : "inactive"}
            onClick={() => handleTabClick(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <ul className="tab-content">
        {tabs[activeTab].items?.map((item) => (
          <li className="item" key={generateRandomKey(item.itemName)}>
            <span className="item-name">{item.itemName}</span>
            <span className="item-amount">{item.itemAmount}</span>
          </li>
        ))}
      </ul>
    </>
  );
};
