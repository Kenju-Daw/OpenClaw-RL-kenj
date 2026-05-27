import { describe, expect, it } from "vitest";
import { parseJsonlArray } from "./batch-utils.js";

describe("parseJsonlArray", () => {
  it("parses valid JSONL correctly", () => {
    const input = '{"a": 1}\n{"b": 2}\n{"c": 3}';
    const output = parseJsonlArray<{ a?: number; b?: number; c?: number }>(input);
    expect(output).toEqual([{ a: 1 }, { b: 2 }, { c: 3 }]);
  });

  it("handles empty strings", () => {
    const input = "";
    const output = parseJsonlArray(input);
    expect(output).toEqual([]);
  });

  it("handles trailing newlines", () => {
    const input = '{"a": 1}\n{"b": 2}\n';
    const output = parseJsonlArray<{ a?: number; b?: number }>(input);
    expect(output).toEqual([{ a: 1 }, { b: 2 }]);
  });

  it("handles windows style newlines", () => {
    const input = '{"a": 1}\r\n{"b": 2}';
    const output = parseJsonlArray<{ a?: number; b?: number }>(input);
    expect(output).toEqual([{ a: 1 }, { b: 2 }]);
  });
});
