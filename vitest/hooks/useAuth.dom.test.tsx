import { faker } from "@faker-js/faker";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { UserApi } from "src/api/endpoints/user";
import { useAuth } from "src/hooks/useAuth";
import { AuthProvider } from "src/providers/authProvider";
import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.resetAllMocks();
});

vi.mock("src/api/endpoints/user", () => ({
  UserApi: {
    login: vi.fn(),
    retrieveUserId: vi.fn(),
    logout: vi.fn(),
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
  it("should throw an error when it's not used inside <AuthProvider>", async () => {
    expect(() => render(<TestComponent />)).toThrowError(
      "useAuth must be used within an AuthProvider"
    );
  });

  it("should render initial values", async () => {
    const testComponent = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    await waitFor(() => {
      expect(testComponent.getByTestId("userData").textContent).toBe("null");
      expect(testComponent.getByTestId("error").textContent).toBe("null");
    });
  });
      );
    });
  });
});
