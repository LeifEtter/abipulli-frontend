import { JSX } from "react";

interface ActionPanelProps {
  children: JSX.Element[] | JSX.Element;
}

export const ActionPanel = ({ children }: ActionPanelProps) => (
  <div className="rounded-xl bg-white border-10 w-50 h-50 duration-100 shadow-ap-special-shadow p-2">
    <h3>Text Styling</h3>
    <div className="w-full h-0.5 bg-gray-200 mt-2" />
    {children}
  </div>
);
