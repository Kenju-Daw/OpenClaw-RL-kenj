## 2024-05-24 - Single-pass JSONL Parsing for Batch Responses
**Learning:** Chaining `.split('\n').map().filter()` on large multi-line JSONL strings from API batch responses causes significant garbage collection overhead due to intermediate arrays and string allocations.
**Action:** Use a single-pass loop utility like `parseJsonlArray` to parse large JSONL content directly, avoiding intermediate array creation and reducing GC pressure.
