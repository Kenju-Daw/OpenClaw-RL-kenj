## 2024-03-24 - JSONL Parsing Garbage Collection Bottleneck
**Learning:** Chaining `.split('\n').map().filter()` array methods to parse large multi-line JSONL content from API batch responses causes significant garbage collection overhead, allocating redundant intermediate string and array objects.
**Action:** Use a single-pass while loop over the string with `indexOf('\n')` and `slice()` to minimize allocations, which was implemented as `parseJsonlArray` in `src/memory/batch-utils.ts`.
