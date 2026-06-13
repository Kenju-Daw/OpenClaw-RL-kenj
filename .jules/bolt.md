## 2024-06-13 - Optimize JSONL API Batch Parsing
**Learning:** Chaining string and array methods (`.split("\n").map().filter()`) to parse large multiline JSONL API batch responses causes significant garbage collection and memory overhead due to intermediate array allocation.
**Action:** Always prefer a single-pass traversal (e.g. `parseJsonlArray` using `indexOf` and a loop) when dealing with large structured text data in `openclaw` to minimize array allocations and garbage generation.
