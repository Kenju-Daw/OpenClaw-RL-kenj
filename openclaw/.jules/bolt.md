## 2024-06-26 - Avoid chaining array methods on large multi-line JSONL strings
**Learning:** Parsing large JSONL payloads using chained array methods (`.split("\n").map().filter().map()`) in a hot path causes significant garbage collection overhead, allocating multiple intermediate arrays.
**Action:** Replace these chains with a single-pass loop parser like `parseJsonlArray` to minimize memory allocations and improve speed, especially when dealing with large API batch responses.
