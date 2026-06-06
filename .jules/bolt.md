## 2024-06-06 - Avoid chaining array methods for large JSONL strings

**Learning:** When parsing large multi-line JSONL content from API batch responses, using a `.split("\n").map().filter().map()` chain creates multiple intermediate arrays, leading to significant garbage collection overhead.
**Action:** Use a custom single-pass loop utility like `parseJsonlArray` from `src/memory/batch-utils.ts` instead.
