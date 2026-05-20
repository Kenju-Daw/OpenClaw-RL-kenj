
## 2024-06-25 - Garbage Collection Overhead of string chains
**Learning:** Using chained array methods (`.split("\n").map(...).filter(...)`) on large multi-line strings, such as those returned from API batch file responses, causes significant garbage collection overhead. This happens because each method step allocates a large array and drops it after the next iteration completes.
**Action:** Replace `.split("\n").map(...).filter(...)` operations on large batch files with single-pass loops that process string portions directly. For `.jsonl` parsing in particular, `parseJsonlArray` should be used to avoid array method allocations.
