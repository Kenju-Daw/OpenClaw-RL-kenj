## 2024-05-27 - Garbage Collection Overhead in Batch JSONL Parsing
**Learning:** Using chained `.split("\n").map().filter().map()` array methods for parsing large multi-line JSONL content from API batch responses generates significant garbage collection overhead due to creating multiple intermediate arrays.
**Action:** Use a single-pass loop utility like `parseJsonlArray` from `src/memory/batch-utils.ts` instead when handling large payload data parsing.
