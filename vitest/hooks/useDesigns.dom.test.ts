import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useUserImages } from "src/hooks/useUserImages";
import { setTestUserId } from "vitest/testState";
import { ApiError } from "src/api/ApiError";
import { DesignApi } from "src/api/endpoints/design";
import { MockDesignApi } from "vitest/mocks/api/mock.design";
import { useDesigns } from "src/hooks/useDesigns";

vi.mock("src/api/endpoints/design", () => ({
  DesignApi: {
    retrieveOrderDesigns: vi.fn(),
    retrieveSingleDesign: vi.fn(),
    retrieveAllImagesForDesign: vi.fn(),
    addImageToDesign: vi.fn(),
    manipulateImageInDesign: vi.fn(),
  },
}));

beforeEach(() => {
  setTestUserId(5);
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("useDesigns", () => {
  it("should test start state of designs hook", async () => {
    const orderNumber = 10;

    const designsResult = await MockDesignApi.retrieveOrderDesigns(orderNumber);

    vi.mocked(DesignApi).retrieveOrderDesigns.mockResolvedValue(designsResult);

    const { result } = renderHook(() => useDesigns(orderNumber));
    expect(result.current.designsAreLoading).toBe(true);
    expect(result.current.designs).toEqual([]);
    expect(result.current.designsError).toBe(null);
    await waitFor(() => {
      expect(result.current.designsAreLoading).toBe(false);
      expect(result.current.designsError).toBe(null);
      expect(result.current.designs).toEqual(designsResult);
    });
  });

  it("should test failed api request", async () => {
    const orderNumber = 10;
    vi.mocked(DesignApi).retrieveOrderDesigns.mockRejectedValue(
      new ApiError({ code: 400, info: "Some error during design retrieval" })
    );

    const { result } = renderHook(() => useDesigns(orderNumber));
    expect(result.current.designsError).toBe(null);
    expect(result.current.designs.length).toBe(0);
    expect(result.current.designsAreLoading).toBe(true);
    await waitFor(() => {
      expect(result.current.designsError).toBe("Couldn't fetch designs");
      expect(result.current.designs.length).toBe(0);
      expect(result.current.designsAreLoading).toBe(false);
    });
  });
});
