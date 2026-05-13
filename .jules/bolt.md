## 2024-05-24 - Single-pass loop parsing for multi-line JSONL strings
**Learning:** Chaining array methods like `.split("\n").map().filter().map()` to parse multi-line JSONL content from API batch responses generates significant intermediate arrays in memory, causing unnecessary garbage collection overhead when handling large batch outputs.
**Action:** When parsing large multi-line string content (like JSONL from an API or file), use a single-pass `while` loop with `indexOf` and string slicing to process entries without creating temporary arrays.
