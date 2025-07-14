import { Link } from "@tanstack/react-router";

interface ClickToLoginProps {
  to: string;
  className?: string;
}

export const ClickToLogin = ({ to, className }: ClickToLoginProps) => (
  <div className={className} aria-label="Login Hinweis">
    <p>Du hast schon ein Account?</p>
    <Link
      className="text-blue-500 font-semibold"
      to={to}
      aria-label="Hier klicken um sich einzuloggen"
    >
      Klicke Hier um dich Einzuloggen
    </Link>
  </div>
);
