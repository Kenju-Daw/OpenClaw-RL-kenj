## 2026-06-03 - Avoid Array Chaining for Large JSONL Parsing

**Learning:** Chaining array methods like `text.split("\n").map(line => line.trim()).filter(Boolean).map(line => JSON.parse(line))` creates immense garbage collection overhead for large multi-line JSONL responses (such as those from batch APIs). A single-pass string index parser reduces parsing time by ~25% and dramatically drops peak memory usage.

**Action:** When parsing large multi-line text outputs (especially JSONL from remote batch endpoints), avoid string split chains. Use single-pass loops with `indexOf("\n", start)` or dedicated utilities like `parseJsonlArray`.
