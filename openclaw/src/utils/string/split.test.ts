import { describe, expect, it } from "vitest";
import { extractHeadLines, extractTailLines } from "./split.js";

describe("split", () => {
  describe("extractHeadLines", () => {
    it("should extract correct head lines", () => {
      expect(extractHeadLines("a\nb\r\nc\n", 2)).toEqual(["a", "b"]);
      expect(extractHeadLines("a\nb\nc", 5)).toEqual(["a", "b", "c"]);
      expect(extractHeadLines("", 1)).toEqual([]);
    });
  });

  describe("extractTailLines", () => {
    it("should extract correct tail lines", () => {
      expect(extractTailLines("a\nb\r\nc\n", 2)).toEqual(["c", ""]);
      expect(extractTailLines("a\nb\r\nc\n", 2, { skipEmptyLines: true })).toEqual(["b", "c"]);
      expect(extractTailLines("a\nb\nc", 5)).toEqual(["a", "b", "c"]);
      expect(extractTailLines("", 1)).toEqual([]);
    });
  });
});
