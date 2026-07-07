import { describe, expect, it } from "vitest";
import { parseJsonlArray, splitBatchRequests } from "./batch-utils.js";

describe("batch-utils", () => {
  it("splitBatchRequests splits requests", () => {
    const requests = [1, 2, 3, 4, 5];
    const maxRequests = 2;
    expect(splitBatchRequests(requests, maxRequests)).toEqual([[1, 2], [3, 4], [5]]);
  });

  describe("parseJsonlArray", () => {
    it("parses empty string to empty array", () => {
      expect(parseJsonlArray("")).toEqual([]);
      expect(parseJsonlArray("   \n  ")).toEqual([]);
    });

    it("parses valid JSONL into an array of objects without intermediate arrays", () => {
      const input = `{"id": 1, "value": "A"}
{"id": 2, "value": "B"}

{"id": 3, "value": "C"}
`;
      const result = parseJsonlArray(input);
      expect(result).toEqual([
        { id: 1, value: "A" },
        { id: 2, value: "B" },
        { id: 3, value: "C" },
      ]);
    });
  });
});
