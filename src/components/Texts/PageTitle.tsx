export const PageTitle = ({ children }: { children: string }) => (
  <h1
    className="text-3xl font-medium text-ap-new-black"
    aria-label="Seitentitel"
    role="heading"
  >
    {children}
  </h1>
);
