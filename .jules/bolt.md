## 2025-03-01 - Avoid Chain Methods for Large Strings
**Learning:** Chaining `.split('\n').map(...).filter(...)` on large strings (like batch API responses from Voyage/Gemini/OpenAI) allocates multiple large, short-lived intermediate arrays. This significantly increases memory usage and garbage collection overhead in Node.js.
**Action:** When parsing large multi-line JSONL responses or reading large files, use a custom single-pass loop (like `parseJsonlArray` using `indexOf('\n')`) or a stream instead of array functional chains.
