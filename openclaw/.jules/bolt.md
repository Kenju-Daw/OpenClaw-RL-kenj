## 2024-07-01 - JSONL Parsing Overhead
**Learning:** Chaining `.split('\n').map().filter()` for parsing large JSONL content (like API batch responses) introduces significant garbage collection overhead and intermediate arrays.
**Action:** When parsing large multi-line JSONL content, use a single-pass loop utility to reduce memory footprint and garbage collection pauses.

## 2025-01-24 - Optimize readTailLines memory allocation
**Learning:** When extracting the tail ends of large files or logs where only a small number of lines is needed (like reading the last `N` lines), allocating `.split("\n")` on the entire read block causes unnecessary garbage collection and memory bloat, especially on files with thousands of lines.
**Action:** Use a backward-scanning `while` loop utilizing `lastIndexOf('\n')` on large log chunk string processing. This allows short-circuiting as soon as the desired line limit is reached, avoiding huge array allocations entirely.
