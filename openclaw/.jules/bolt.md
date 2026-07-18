## 2024-07-01 - JSONL Parsing Overhead
**Learning:** Chaining `.split('\n').map().filter()` for parsing large JSONL content (like API batch responses) introduces significant garbage collection overhead and intermediate arrays.
**Action:** When parsing large multi-line JSONL content, use a single-pass loop utility to reduce memory footprint and garbage collection pauses.
## 2024-03-24 - File reading optimization for transcript parsing
**Learning:** Found an opportunity to replace `fs.readFileSync().split(/\r?\n/)` with a single-pass `while` loop over the string content for finding idempotency keys. Parsing large multi-line text by splitting it creates significant intermediate arrays and memory allocation overhead.
**Action:** Used `indexOf('\n')` inside a `while` loop to iterate through the text without allocating a large array of lines, avoiding unnecessary object creation and reducing garbage collection pauses.
