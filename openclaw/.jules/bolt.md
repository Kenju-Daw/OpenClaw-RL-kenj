## 2025-03-01 - Optimizing JSONL string parsing
**Learning:** Chaining `.split("\n").map(trim).filter(Boolean).map(JSON.parse)` on large batch API responses creates multiple large intermediate string arrays. This generates significant garbage collection overhead in Node.js/V8.
**Action:** When extracting multiple JSON objects from large JSONL strings, always use a single-pass while-loop with `indexOf("\n")` and `slice` to minimize memory allocations. Use `parseJsonlArray` from `batch-utils.ts` in `openclaw` for this purpose.
