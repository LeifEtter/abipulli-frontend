import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useUserImages } from "src/hooks/useUserImages";
import { setTestUserId } from "vitest/testState";
import { ImageFactory } from "vitest/mocks/data/factory.image";
import { MockImageApi } from "../mocks/api/mock.image";
import { ImageApi } from "src/api/endpoints/image";
import { ApiError } from "src/api/ApiError";

vi.mock("src/api/endpoints/image", () => ({
  ImageApi: {
    upload: vi.fn(),
    fetchUsersImages: vi.fn(),
    improveDescription: vi.fn(),
    generateImages: vi.fn(),
  },
}));

beforeEach(() => {
  setTestUserId(5);
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("useUserImages", () => {
  it("should test start state of images", async () => {
    const imageResult = await MockImageApi.fetchUsersImages();
    vi.mocked(ImageApi).fetchUsersImages.mockResolvedValue(imageResult);

    const { result } = renderHook(() => useUserImages());
    expect(result.current.userImagesAreLoading).toBe(true);
    expect(result.current.userImagesError).toBe(null);
    expect(result.current.userImages).toEqual([]);
    await waitFor(() => {
      expect(result.current.userImagesAreLoading).toBe(false);
      expect(result.current.userImagesError).toBe(null);
      expect(result.current.userImages).toEqual(imageResult);
    });
  });

  it("should test failed api request", async () => {
    vi.mocked(ImageApi).fetchUsersImages.mockRejectedValue(
      new ApiError({ code: 400, info: "Some error during image retrieval" })
    );

    const { result } = renderHook(() => useUserImages());
    expect(result.current.userImagesError).toBe(null);
    expect(result.current.userImages.length).toBe(0);
    expect(result.current.userImagesAreLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.userImagesError).toBe("Couldn't fetch User Images");
      expect(result.current.userImages.length).toBe(0);
      expect(result.current.userImagesAreLoading).toBe(false);
    });
  });
});
