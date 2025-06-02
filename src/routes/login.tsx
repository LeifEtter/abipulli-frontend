import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { UsersApi } from "../services/endpoints/user";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { UserLoginParams } from "abipulli-types";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(import.meta.env.VITE_TEST_EMAIL ?? "");
  const [password, setPassword] = useState(
    import.meta.env.VITE_TEST_PASS ?? ""
  );

  const login = async () => {
    const newUser: Omit<UserLoginParams, "id"> = {
      email: email,
      password: password,
    };
    const authResult = await UsersApi.login(newUser);
    console.log(authResult);
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
        defaultValue={import.meta.env.VITE_TEST_EMAIL}
      />
      <input
        type="text"
        onChange={(e) => setPassword(e.target.value)}
        className="border"
        defaultValue={import.meta.env.VITE_TEST_PASS}
      />
      <button onClick={() => login()}>Login</button>
    </div>
  );
}
