import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { InputField } from "src/components/Inputs/InputField";
import { useAuth } from "src/hooks/useAuth";
export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const [email, setEmail] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>();
  const [password, setPassword] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const { login, isLoading, user } = useAuth();
  const navigate = useNavigate();

  return (
    <main
      className="card w-11/12 sm:w-10/12 md:w-8/12 pb-8 max-w-140 flex flex-col items-center"
      aria-label="Login Bereich"
    >
      <h1
        className="mt-8 mb-12 text-2xl text-center font-semibold text-ap-new-black"
        aria-label="Login Titel"
        role="heading"
        aria-level={1}
      >
        Einloggen
      </h1>
      <form
        onClick={(e) => e.preventDefault()}
        className="w-full flex flex-col items-center"
        aria-label="Login Formular"
      >
        <InputField
          className="w-8/12 max-w-72"
          onChange={(e) => setEmail(e.target.value)}
          value={email ?? ""}
          label="Email"
          required
          error={emailError}
        />
        <InputField
          className="w-8/12 max-w-72 mt-4"
          onChange={(e) => setPassword(e.target.value)}
          value={password ?? ""}
          label="Passwort"
          required
          type="password"
          error={passwordError}
        />
        {/* <p className="text-blue-500 font-semibold mt-2">Passwort Vergessen</p> */}
        <button
          onClick={async () => {
            try {
              if (email && password) await login({ email, password });
              if (!isLoading && user) navigate({ to: "/account" });
            } catch (error) {
              setPasswordError("Email oder Password ist falsch");
            }
          }}
          className="w-8/12 max-w-72 mt-16 mb-4 cursor-pointer bg-abipulli-green shadow-abipulli-sm py-1.5 px-4 rounded-md border font-semibold text-md hover:translate-y-2 hover:shadow-none"
          aria-label="Einloggen"
          type="submit"
        >
          {`Einloggen`}
        </button>
      </form>
    </main>
  );
}
