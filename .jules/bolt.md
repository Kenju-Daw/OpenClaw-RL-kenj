## 2024-05-24 - Single-pass JSONL parsing
**Learning:** Using chained array methods (`.split("\n").map().filter().map()`) on large strings creates significant intermediate arrays and garbage collection overhead in V8.
**Action:** Use a single-pass loop for parsing JSONL strings in hot paths (like batch parsing) instead of chained array functions.
