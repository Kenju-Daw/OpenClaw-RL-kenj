import { describe, expect, it } from "vitest";
import { parseJsonlArray } from "./batch-utils.js";

describe("parseJsonlArray", () => {
  it("should parse valid jsonl array", () => {
    const text = '{"a": 1}\n{"b": 2}\n';
    const result = parseJsonlArray(text);
    expect(result).toEqual([{ a: 1 }, { b: 2 }]);
  });
});
