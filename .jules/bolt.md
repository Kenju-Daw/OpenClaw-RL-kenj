## 2024-05-17 - JSONL Parsing Optimization
**Learning:** Chaining `.split('\n').map().filter()` for parsing massive JSONL files (like LLM batch API outputs) allocates enormous temporary string arrays, causing significant garbage collection overhead.
**Action:** Always use the zero-allocation `indexOf('\n')` loop utility (`parseJsonlArray` in `src/memory/batch-utils.ts`) for processing multi-line batch API responses instead of functional array chains.
