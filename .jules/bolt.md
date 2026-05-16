## 2024-05-16 - Garbage Collection overhead in chained JSONL parsing
**Learning:** Using chained array methods like `.split("\n").map().filter().map()` to parse multi-line API responses (JSONL) creates intermediate arrays and slices of strings, leading to significant garbage collection pressure on large payloads.
**Action:** Use a single-pass `while` loop over strings with `indexOf("\n")` to parse JSONL directly. We created `parseJsonlArray` in `openclaw/src/memory/batch-utils.ts` for this purpose. Use it whenever handling large multi-line text blocks.
