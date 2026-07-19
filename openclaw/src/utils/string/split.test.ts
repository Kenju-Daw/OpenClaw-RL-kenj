import { describe, it, expect } from "vitest";
import { extractTailLines, extractHeadLines } from "./split.js";

describe("split utils", () => {
  it("extractTailLines matches regex split", () => {
    const text = "1\r\n2\n \n3\r\n4\n\n5\n";
    expect(extractTailLines(text, 3)).toEqual(["3", "4", "5"]);
  });

  it("extractHeadLines matches regex split", () => {
    const text = "1\r\n2\n \n3\r\n4\n\n5\n";
    expect(extractHeadLines(text, 3)).toEqual(["1", "2", " "]);
  });
});
