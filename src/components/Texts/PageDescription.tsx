import { JSX } from "react";

export const PageDescription = ({ children }: { children: string }) => (
  <p className="text-md text-gray-600">{children}</p>
);
