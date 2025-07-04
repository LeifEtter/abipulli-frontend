import { faker } from "@faker-js/faker";
import { render, waitFor } from "@testing-library/react";
import { useEffect } from "react";
import { UserApi } from "src/api/endpoints/user";
import { useAuth } from "src/hooks/useAuth";
import { AuthProvider } from "src/providers/authProvider";
import { describe, expect, it, vi } from "vitest";
import { delayedResolve } from "vitest/helpers/helpers";

vi.mock("src/api/endpoints/user", () => ({
  UserApi: {
    login: vi.fn(),
    retrieveUserId: vi.fn(),
  },
}));

function TestComponent() {
  const { user, error, isLoading, login, logout } = useAuth();

  useEffect(() => {
    login({
      email: "Gandalf.The.Grey@hotmail.com",
      password: "BilbosGotTheRing123",
    });
  }, []);

  return (
    <div data-testid="result">
      {isLoading ? "Loading" : (error ?? user!.id)}
    </div>
  );
}

describe("useAuth", () => {
  it("should test useAuth", async () => {
    const mockUserId = 42;

    vi.mocked(UserApi.login).mockImplementation(
      delayedResolve({ id: mockUserId, token: faker.internet.jwt() }, 10)
    );

    vi.mocked(UserApi.retrieveUserId).mockImplementation(
      delayedResolve({ id: mockUserId }, 10)
    );

    const testComponent = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    const textWrapper = await testComponent.findByTestId("result");
    expect(textWrapper.textContent).toBe("Loading");
    await waitFor(() => {
      expect(testComponent.getByTestId("result").textContent).toBe(
        mockUserId.toString()
      );
    });
  });
});
