import { test, expect } from "vitest";
import { parseJsonlArray } from "./batch-utils.js";

test("parseJsonlArray parses basic jsonl", () => {
  const jsonl = '{"a": 1}\n{"b": 2}\n{"c": 3}';
  expect(parseJsonlArray(jsonl)).toEqual([{ a: 1 }, { b: 2 }, { c: 3 }]);
});

test("parseJsonlArray handles trailing newline", () => {
  const jsonl = '{"a": 1}\n{"b": 2}\n';
  expect(parseJsonlArray(jsonl)).toEqual([{ a: 1 }, { b: 2 }]);
});

test("parseJsonlArray handles empty lines", () => {
  const jsonl = '{"a": 1}\n\n{"b": 2}';
  expect(parseJsonlArray(jsonl)).toEqual([{ a: 1 }, { b: 2 }]);
});

test("parseJsonlArray handles empty string", () => {
  expect(parseJsonlArray("")).toEqual([]);
});
