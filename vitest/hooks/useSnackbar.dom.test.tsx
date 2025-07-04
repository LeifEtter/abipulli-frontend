import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useSnackbar } from "src/hooks/useSnackbar";
import { SnackbarProvider } from "src/providers/snackbarProvider";
import { afterEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";
import { act } from "react";

afterEach(() => {
  vi.resetAllMocks();
  vi.useRealTimers();
  vi.clearAllMocks();
});

function TestComponent() {
  const showSnackbar = useSnackbar();

  return (
    <div>
      <button
        data-testid="snackbar-success"
        onClick={() => {
          showSnackbar({
            message: "Everything went right! :D",
            type: "success",
          });
        }}
      />
      <button
        data-testid="snackbar-error"
        onClick={() => {
          showSnackbar({
            message: "Oh no, Something went wrong! :(",
            type: "error",
          });
        }}
      />
      <button
        data-testid="snackbar-warn"
        onClick={() => {
          showSnackbar({
            message: "FYI, it doesn't always have to go completely",
            type: "info",
          });
        }}
      />
    </div>
  );
}

describe("useSnackbar", () => {
  it("should throw an error when it's not used inside <SnackbarProvider>", async () => {
    expect(() => render(<TestComponent />)).toThrowError(
      "useSnackbar must be used within a SnackbarProvider"
    );
  });

  it("should test successful snackbar show and hide process", async () => {
    vi.useFakeTimers();
    render(
      <SnackbarProvider>
        <TestComponent />
      </SnackbarProvider>
    );
    const successButton = screen.getByTestId("snackbar-success");
    fireEvent.click(successButton);
    expect(screen.getByTestId("snackbar-popup")).not.toBeNull();
    expect(screen.getByTestId("snackbar-popup").textContent).toBe(
      "Everything went right! :D"
    );
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.queryByTestId("snackbar-popup")).not.toBeInTheDocument();
  });
});
