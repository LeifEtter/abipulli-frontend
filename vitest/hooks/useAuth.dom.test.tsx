import { faker } from "@faker-js/faker";
import { render, waitFor } from "@testing-library/react";
import { useEffect } from "react";
import { UserApi } from "src/api/endpoints/user";
import { useAuth } from "src/hooks/useAuth";
import { AuthProvider } from "src/providers/authProvider";
import { describe, expect, it, vi } from "vitest";

vi.mock("src/api/endpoints/user", () => ({
  UserApi: {
    login: vi.fn(),
    retrieveUserId: vi.fn(),
  },
}));

function TestComponent() {
  const { user, error, isLoading, login, logout } = useAuth();

  return (
    <div>
      <div data-testid="isLoading">{JSON.stringify(isLoading)}</div>
      <div data-testid="userData">{JSON.stringify(user)}</div>
      <div data-testid="error">{JSON.stringify(error)}</div>
      <button
        data-testid="login-button"
        onClick={() => {
          login({
            email: "Gandalf.The.Grey@hotmail.com",
            password: "BilbosGotTheRing123",
          });
        }}
      >
        Login
      </button>
      <button data-testid="logout-button" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

describe("useAuth", () => {
    );

    const testComponent = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    await waitFor(() => {
      expect(testComponent.getByTestId("result").textContent).toBe(
        mockUserId.toString()
      );
    });
  });
});
