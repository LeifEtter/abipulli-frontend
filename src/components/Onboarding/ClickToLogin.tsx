import { Link } from "@tanstack/react-router";

interface ClickToLoginProps {
  to: string;
  className?: string;
}

export const ClickToLogin = ({ to, className }: ClickToLoginProps) => (
  <span className={className}>
    <p>Du hast schon ein Account?</p>
    <Link className="text-blue-500 font-semibold" to={to}>
      Klicke Hier um dich Einzuloggen
    </Link>
  </span>
);
