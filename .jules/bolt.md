## 2024-05-30 - Prevent Garbage Collection Overhead with large text parsing
**Learning:** Chaining array methods like `.split().map().filter().map()` over very large text blocks (e.g. JSONL batch API responses) creates multiple massive temporary arrays, putting significant pressure on the Garbage Collector and freezing the event loop.
**Action:** Use the `parseJsonlArray` single-pass loop utility added to `src/memory/batch-utils.ts` instead when handling multiline API responses or large files.
