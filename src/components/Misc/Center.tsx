import { JSX } from "react";

export const Center = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => (
  <div
    className="flex justify-center items-center w-full h-full"
    role="group"
    aria-label="Zentrierter Inhalt"
  >
    {children}
  </div>
);
