## 2024-07-01 - JSONL Parsing Overhead
**Learning:** Chaining `.split('\n').map().filter()` for parsing large JSONL content (like API batch responses) introduces significant garbage collection overhead and intermediate arrays.
**Action:** When parsing large multi-line JSONL content, use a single-pass loop utility to reduce memory footprint and garbage collection pauses.
## 2026-10-09 - Log File Parsing Overhead
**Learning:** Chaining `.split('\n').map()` on large text files like logs creates massive garbage collection overhead by reading the entire file into hundreds or thousands of intermediate arrays before iterating them.
**Action:** When extracting specific recent entries (like the last line or the last error line) from large logs or files, avoid splitting into arrays. Instead, read the raw string and use a backward-scanning while loop with `lastIndexOf('\n')` to find the relevant lines without massive memory allocations.
