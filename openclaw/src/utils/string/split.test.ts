import { describe, it, expect } from "vitest";
import { extractHeadLines, extractTailLines } from "./split.js";

describe("split", () => {
  it("extractHeadLines", () => {
    expect(extractHeadLines("A\nB\nC", 2)).toEqual(["A", "B"]);
    expect(extractHeadLines("A\r\nB\r\nC", 2)).toEqual(["A", "B"]);
    expect(extractHeadLines("A", 2)).toEqual(["A"]);
    expect(extractHeadLines("", 2)).toEqual([]);
  });

  it("extractTailLines", () => {
    expect(extractTailLines("A\nB\nC", 2)).toEqual(["B", "C"]);
    expect(extractTailLines("A\r\nB\r\nC", 2)).toEqual(["B", "C"]);
    expect(extractTailLines("A\n\nB\n\nC\n\n", 2, { skipEmptyLines: true })).toEqual(["B", "C"]);
    expect(extractTailLines("A", 2)).toEqual(["A"]);
    expect(extractTailLines("", 2)).toEqual([]);
  });
});
