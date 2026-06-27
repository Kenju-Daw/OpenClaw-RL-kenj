## 2024-05-14 - Optimize large multi-line JSONL parsing in batch responses
**Learning:** Using chained array methods `.split("\n").map(...).filter(...)` for parsing large JSONL text buffers creates excessive intermediate arrays and strings, resulting in significant garbage collection overhead and blocking the main thread.
**Action:** Replace `.split().map().filter()` with a single-pass `while` loop that uses `indexOf('\n')` and parses each slice directly, avoiding unnecessary array allocations, especially for batch APIs handling large amounts of records. Use the `parseJsonlArray` utility.
