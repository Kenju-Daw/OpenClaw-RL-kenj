## 2024-06-22 - Optimizing JSONL Parsing Overheads
**Learning:** Chaining `.split("\n").map(...).filter(...).map(JSON.parse)` creates multiple intermediate arrays and closures, which adds significant garbage collection overhead, especially when parsing large multi-line JSONL content from API batch responses.
**Action:** Use a single-pass while loop approach (like `parseJsonlArray` in `src/memory/batch-utils.ts`) instead of chaining string/array methods to reduce memory allocations and improve execution speed for large data processing.
