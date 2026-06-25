## 2025-06-25 - Avoid array chaining for large JSONL text
**Learning:** Chaining `.split("\n").map(...).filter(...).map(...)` on large string payloads (like batch API responses) creates massive intermediate arrays, leading to high memory overhead and garbage collection pauses.
**Action:** Use a single-pass `while` loop with `indexOf("\n")` and `.slice()` (like `parseJsonlArray`) to process large string payloads in place, avoiding intermediate array allocations.
