## 2024-07-06 - Single-pass JSONL Parsing for Batch Responses
**Learning:** Chaining `.split().map().filter()` on large multi-line API responses creates massive intermediate arrays, leading to high garbage collection overhead and memory spikes.
**Action:** Use single-pass string iteration loops (e.g., `parseJsonlArray`) when parsing large JSONL content to minimize memory footprint.
