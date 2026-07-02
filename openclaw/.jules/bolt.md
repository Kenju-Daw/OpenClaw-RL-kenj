## 2024-07-02 - Parsing large JSONL payloads
**Learning:** Using chained array methods (`.split("\n").map().filter().map()`) to parse large multi-line JSONL responses creates significant garbage collection overhead due to intermediate array creations.
**Action:** Replace chained `.split().map().filter()` calls with a single-pass loop utility like `parseJsonlArray` when processing multi-line batch API outputs.
