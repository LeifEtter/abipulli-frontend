import { JSX } from "react";

export const PageDescription = ({ children }: { children: string }) => (
  <p
    className="text-md text-gray-600"
    aria-label="Seitenbeschreibung"
    role="doc-subtitle"
  >
    {children}
  </p>
);
