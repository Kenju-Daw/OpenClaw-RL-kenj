## 2024-05-18 - JSONL Parsing Overhead
**Learning:** Using chained `.split().map().filter()` array methods to parse large multi-line JSONL content from API batch responses causes significant garbage collection overhead and memory usage due to creating multiple intermediate arrays and closures for large strings.
**Action:** Use a single-pass loop utility like `parseJsonlArray` from `src/memory/batch-utils.ts` instead to parse multi-line JSONL content efficiently.
