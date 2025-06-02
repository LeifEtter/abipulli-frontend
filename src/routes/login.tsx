import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState(import.meta.env.VITE_TEST_EMAIL ?? "");
  const [password, setPassword] = useState(
    import.meta.env.VITE_TEST_PASS ?? ""
  );

  const submitLogin = async (isAdmin?: boolean) => {
    await login({ email, password });
    if (error) {
      console.log("Ooops:", error);
    }
    return navigate({ to: isAdmin ? "/orders" : "/designer" });
  };

  return (
    <div>
      <p>Login</p>
      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        className="border"
        defaultValue={import.meta.env.VITE_TEST_EMAIL}
      />
      <input
        type="text"
        onChange={(e) => setPassword(e.target.value)}
        className="border"
        defaultValue={import.meta.env.VITE_TEST_PASS}
      />
      <button onClick={() => submitLogin()}>Login</button>
      <button onClick={() => submitLogin(true)}>AdminLogin</button>
    </div>
  );
}
