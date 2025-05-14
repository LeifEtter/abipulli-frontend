import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { User } from "../services/endpoints/user";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const newUser: Partial<User> = {
      email: email,
      password: password,
    };
    await auth!.login(newUser);
    return navigate({ to: "/orders" });
  };

  return (
    <div>
      <p>Login</p>
      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        className="border"
      />
      <input
        type="text"
        onChange={(e) => setPassword(e.target.value)}
        className="border"
      />
      <button onClick={() => login()}>Login</button>
    </div>
  );
}
