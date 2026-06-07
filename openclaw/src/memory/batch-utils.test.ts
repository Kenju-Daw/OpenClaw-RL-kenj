import { describe, expect, it } from "vitest";
import { parseJsonlArray } from "./batch-utils.js";

describe("parseJsonlArray", () => {
  it("parses valid JSONL with newline characters", () => {
    const input = '{"id": 1}\n{"id": 2}\n{"id": 3}';
    const result = parseJsonlArray<{ id: number }>(input);
    expect(result).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
  });

  it("handles trailing newlines properly", () => {
    const input = '{"name": "Alice"}\n{"name": "Bob"}\n';
    const result = parseJsonlArray<{ name: string }>(input);
    expect(result).toEqual([{ name: "Alice" }, { name: "Bob" }]);
  });

  it("ignores empty lines", () => {
    const input = '\n{"value": "a"}\n\n{"value": "b"}\n';
    const result = parseJsonlArray<{ value: string }>(input);
    expect(result).toEqual([{ value: "a" }, { value: "b" }]);
  });

  it("handles carriage returns in newlines", () => {
    const input = '{"type": "A"}\r\n{"type": "B"}\r\n';
    const result = parseJsonlArray<{ type: string }>(input);
    expect(result).toEqual([{ type: "A" }, { type: "B" }]);
  });

  it("returns an empty array for empty or whitespace-only strings", () => {
    expect(parseJsonlArray("")).toEqual([]);
    expect(parseJsonlArray("   \n  \r\n ")).toEqual([]);
  });
});
