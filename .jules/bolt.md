## 2025-05-10 - JSONL Parsing Garbage Collection Pressure
**Learning:** In openclaw, parsing massive JSONL files (often from batch embedding APIs) via `.split('\n').map().filter()` causes excessive intermediate string arrays and massive GC pressure, slowing down the event loop.
**Action:** Always parse large JSONL strings using the single-pass `.indexOf('\n')` loop pattern now encapsulated in `parseJsonlArray` from `src/memory/batch-utils.ts` instead of chaining array operations.
