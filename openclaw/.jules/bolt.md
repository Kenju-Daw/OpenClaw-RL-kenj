## 2025-03-01 - Avoid Array method chaining for large JSONL API parsing
**Learning:** Chaining `.split("\n").map(trim).filter(Boolean).map(JSON.parse)` over large API response strings creates significant garbage collection overhead and intermediate object allocation.
**Action:** Use a single-pass `while` loop (like `parseJsonlArray` in `src/memory/batch-utils.ts`) instead of array method chains when processing multi-line batch data or JSONL files.
