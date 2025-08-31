import { JSX } from "react";

interface ActionPanelProps {
  children: JSX.Element[] | JSX.Element;
  title: string;
  description: string;
}

export const ActionPanel = ({
  children,
  title,
  description,
}: ActionPanelProps) => (
  <div className="rounded-xl bg-white border-10 w-50 h-50 duration-100 shadow-ap-special-shadow p-2">
    <h3>{title}</h3>
    <p>{description}</p>
    <div className="w-full h-0.5 bg-gray-200 mt-2" />
    {children}
  </div>
);
