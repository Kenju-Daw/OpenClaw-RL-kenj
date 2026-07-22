import { describe, expect, it } from "vitest";
import { extractHeadLines, extractTailLines } from "./split.js";

describe("split", () => {
  it("extracts head lines correctly", () => {
    const text = "one\ntwo\nthree\nfour\nfive";
    expect(extractHeadLines(text, 2)).toEqual(["one", "two"]);
  });

  it("handles carriage returns in head lines", () => {
    const text = "one\r\ntwo\r\nthree";
    expect(extractHeadLines(text, 2)).toEqual(["one", "two"]);
  });

  it("extracts tail lines correctly", () => {
    const text = "one\ntwo\nthree\nfour\nfive";
    expect(extractTailLines(text, 2)).toEqual(["four", "five"]);
  });

  it("extracts tail lines with skipEmptyLines", () => {
    const text = "one\ntwo\n\nfour\n\n";
    expect(extractTailLines(text, 2, { skipEmptyLines: true })).toEqual(["two", "four"]);
  });

  it("handles carriage returns in tail lines", () => {
    const text = "one\r\ntwo\r\nthree\r\n";
    expect(extractTailLines(text, 2, { skipEmptyLines: true })).toEqual(["two", "three"]);
  });
});
