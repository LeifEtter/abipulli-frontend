import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const { login, error, isLoading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: import.meta.env.VITE_TEST_EMAIL ?? "",
    password: import.meta.env.VITE_TEST_PASS ?? "",
  });

  const handleSubmit = async (isAdmin: boolean = false) => {
    const success = await login(formData);
    if (success) {
      navigate({ to: isAdmin ? "/admin/orders" : "/orders" });
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Login</h1>

      {error && <div className="text-red-500">{error}</div>}

      <div className="flex flex-col gap-2">
        <input
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          className="border p-2 rounded"
          placeholder="Email"
        />
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
          className="border p-2 rounded"
          placeholder="Password"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => handleSubmit(false)}
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <button
          onClick={() => handleSubmit(true)}
          disabled={isLoading}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isLoading ? "Logging in..." : "Admin Login"}
        </button>
      </div>
    </div>
  );
}
