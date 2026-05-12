## 2025-03-01 - JSONL Parsing Garbage Collection Bottleneck
**Learning:** Chaining `.split("\n").map(...).filter(...)` to parse large JSONL API batch responses allocates multiple intermediate arrays, leading to high garbage collection overhead and excessive memory usage.
**Action:** When parsing large JSONL content, use the single-pass loop utility `parseJsonlArray` from `src/memory/batch-utils.ts` to reduce multiple memory allocations.
