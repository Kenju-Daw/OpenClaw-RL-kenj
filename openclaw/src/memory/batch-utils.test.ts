import { describe, expect, it } from "vitest";
import { parseJsonlArray } from "./batch-utils.js";

describe("parseJsonlArray", () => {
  it("parses empty string", () => {
    expect(parseJsonlArray("")).toEqual([]);
  });

  it("parses single json line", () => {
    expect(parseJsonlArray('{"a": 1}')).toEqual([{ a: 1 }]);
  });

  it("parses multiple json lines", () => {
    expect(parseJsonlArray('{"a": 1}\n{"b": 2}')).toEqual([{ a: 1 }, { b: 2 }]);
  });

  it("ignores empty lines", () => {
    expect(parseJsonlArray('\n{"a": 1}\n\n{"b": 2}\n')).toEqual([{ a: 1 }, { b: 2 }]);
  });

  it("handles whitespace correctly", () => {
    expect(parseJsonlArray('  {"a": 1}  \n  {"b": 2}  ')).toEqual([{ a: 1 }, { b: 2 }]);
  });
});
