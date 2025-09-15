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
  <div className="flex flex-col relative">
    <div className="w-full flex [&>button]:w-1/2 [&>button]:h-10">
      {tabs.map((tab) => (
        <button
          key={`tab-${tab.id}`}
          onClick={() => setTabSelected(tab)}
          className={
            tabSelected.id == tab.id ? "cursor-default" : "cursor-pointer"
          }
        >
          <p className="text-left font-semibold">{tab.label}</p>
        </button>
      ))}
    </div>
    <div className="absolute w-11/12 h-0.5 bg-gray-200 bottom-0" />
    <div
      className={`${tabSelected.id == 0 ? "left-0" : "left-1/2"} duration-75 absolute w-5/12 h-0.5 bg-gray-600 bottom-0`}
    />
  </div>
);
