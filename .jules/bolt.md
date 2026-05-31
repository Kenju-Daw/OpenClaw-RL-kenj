## 2025-05-31 - JSONL Parsing Garbage Collection Overhead
**Learning:** Chaining array methods like `text.split("\n").map(trim).filter(Boolean).map(JSON.parse)` on large JSONL batch response files creates multiple huge intermediate arrays in memory, causing massive garbage collection pauses and CPU overhead.
**Action:** Always use a single-pass `while` loop parser (like `parseJsonlArray`) for large streaming/batch text payloads instead of chained array functional methods.
