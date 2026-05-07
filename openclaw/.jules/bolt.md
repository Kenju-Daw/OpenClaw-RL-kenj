## 2025-03-01 - JSONL Parsing Garbage Collection Bottleneck
**Learning:** Chaining array methods like `text.split("\n").map(l => l.trim()).filter(Boolean).map(l => JSON.parse(l))` to process batch output strings allocates multiple intermediate arrays equal to the number of lines, creating massive GC pressure on large payload batches.
**Action:** Use the single-pass loop utility `parseJsonlArray` from `src/memory/batch-utils.ts` when parsing multi-line JSONL responses to minimize memory allocations.
