## 2025-01-20 - Optimize JSONL Parsing
**Learning:** Parsing large JSONL payloads via API calls with `.split('\n').map().filter()` causes massive intermediate arrays to be created and discarded, leading to significant garbage collection overhead.
**Action:** When parsing large multi-line string contents, always use a single-pass loop (like `parseJsonlArray` relying on `indexOf('\n')` and `slice()`) instead of chained string/array methods to reduce memory pressure.
