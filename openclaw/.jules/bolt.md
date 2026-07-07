## 2025-02-18 - Avoid `.split().map().filter()` for JSONL Parsing
**Learning:** Parsing large multi-line JSONL responses using string `.split().map().filter()` creates intermediate arrays, causing significant garbage collection overhead, which is a performance bottleneck.
**Action:** Use a single-pass loop utility to slice and parse lines without creating intermediate arrays.
