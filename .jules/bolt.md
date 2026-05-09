## 2024-05-09 - Parse JSONL batch responses in a single pass
**Learning:** Chaining string `.split().map().filter()` array methods on large multi-line JSONL content from API batch responses creates significant garbage collection overhead due to creating multiple intermediate arrays in memory.
**Action:** When parsing large multi-line strings, use a single-pass loop utility like `parseJsonlArray` instead. It can be made even faster by using `indexOf('\n', start)` instead of a per-character `for` loop to scan for newlines.
