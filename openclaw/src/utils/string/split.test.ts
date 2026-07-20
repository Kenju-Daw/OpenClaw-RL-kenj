import { describe, expect, it } from "vitest";
import { extractHeadLines, extractTailLines } from "./split.js";

describe("split utils", () => {
  describe("extractHeadLines", () => {
    it("extracts lines correctly", () => {
      expect(extractHeadLines("a\nb\nc", 2)).toEqual(["a", "b"]);
      expect(extractHeadLines("a\r\nb\r\nc", 2)).toEqual(["a", "b"]);
      expect(extractHeadLines("a", 2)).toEqual(["a"]);
    });
  });

  describe("extractTailLines", () => {
    it("extracts lines correctly", () => {
      expect(extractTailLines("a\nb\nc", 2)).toEqual(["b", "c"]);
      expect(extractTailLines("a\r\nb\r\nc", 2)).toEqual(["b", "c"]);
      expect(extractTailLines("a", 2)).toEqual(["a"]);
      expect(extractTailLines("a\nb\nc\n", 2)).toEqual(["c", ""]);
      expect(extractTailLines("a\r\nb\r\nc\r\n", 2)).toEqual(["c", ""]);
    });

    it("skips empty lines when skipEmptyLines is true", () => {
      expect(extractTailLines("a\n\nb\n \n\nc", 3, { skipEmptyLines: true })).toEqual(["a", "b", "c"]);
      expect(extractTailLines("\n\na\n\nb\n\nc\n\n", 2, { skipEmptyLines: true })).toEqual(["b", "c"]);
    });
  });
});
