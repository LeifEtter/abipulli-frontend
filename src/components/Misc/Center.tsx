import { JSX } from "react";

export const Center = ({ children }: { children: JSX.Element }) => (
  <div className="flex justify-center items-center w-full h-full ">
    {children}
  </div>
);
