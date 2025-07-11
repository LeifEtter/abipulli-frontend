interface DividerProps {
  className?: string;
}

export const Divider = ({ className }: DividerProps) => (
  <div className={`h-0.5 bg-gray-200 w-full ${className ?? "my-10"}`} />
);
