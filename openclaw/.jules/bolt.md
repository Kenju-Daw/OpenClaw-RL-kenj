## 2024-06-30 - Optimize JSONL Parsing
**Learning:** Using chained array methods like `.split("\n").map(...).filter(...).map(...)` for parsing large JSONL batch API responses creates significant garbage collection overhead and memory churn in V8.
**Action:** When parsing large multi-line JSONL content, use a single-pass loop utility to slice and parse lines manually, avoiding intermediate array allocations.
