import { JSX } from "react";

export interface TabOption {
  id: number;
  label: string;
}

interface TabSwitcherProps {
  tabs: TabOption[];
  tabSelected: TabOption;
  setTabSelected: (tab: TabOption) => void;
}

export const TabSwitcher = ({
  tabs,
  tabSelected,
  setTabSelected,
}: TabSwitcherProps): JSX.Element => (
  <div className="w-full px-6 py-6">
    <div className="flex flex-row">
      {tabs.map((tab) => (
        <button
          key={`tab-${tab.id}`}
          className="w-1/2 cursor-pointer"
          onClick={() => setTabSelected(tab)}
        >
          <p className="text-left font-semibold">{tab.label}</p>
        </button>
      ))}
    </div>
    <div
      className={`relative h-0.5 w-full top-1 flex flex-row ${tabSelected.id == 0 ? "justify-start" : "justify-end"} duration-100 mt-2`}
    >
      <div className={`w-5/12 bg-gray-600 duration-100 z-20`} />
      <div className="bg-gray-200 w-full absolute h-0.5" />
    </div>
  </div>
);
