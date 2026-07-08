## 2024-05-18 - Avoid multi-pass array methods for large JSONL API payloads
**Learning:** Using chained `.split('\n').map().filter().map()` to parse large, multi-line JSONL content from API batch responses causes a significant hidden performance bottleneck via garbage collection overhead because each step creates a new intermediate array.
**Action:** When parsing large JSONL content in memory batch operations, always extract and use a single-pass loop utility like `parseJsonlArray` from `src/memory/batch-utils.ts` to minimize heap pressure and GC cycles.
