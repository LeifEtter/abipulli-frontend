import { describe, expect, it } from "vitest";
import * as fs from "fs";
import * as path from "path";
import { getTotalFileSizeFromArray } from "src/utilities/Files/getTotalFileSizeFromArray";
import { createMockFile } from "vitest/testUtils";

const TOTAL_EXAMPLE_FILES: number = 9641 + 48878;

describe("getTotalFileSizeFromArray", () => {
  it("should return the correct total file size", async () => {
    const file1Buffer = fs.readFileSync(
      path.join(__dirname, "/exampleFiles/file1.png")
    );
    const file2Buffer = fs.readFileSync(
      path.join(__dirname, "/exampleFiles/file2.png")
    );

    const file1 = createMockFile(file1Buffer) as File;
    const file2 = createMockFile(file2Buffer) as File;

    const fileSize = getTotalFileSizeFromArray([file1, file2]);
    expect(fileSize).toEqual(TOTAL_EXAMPLE_FILES);
  });
});
