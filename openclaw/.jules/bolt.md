## 2024-07-01 - JSONL Parsing Overhead
**Learning:** Chaining `.split('\n').map().filter()` for parsing large JSONL content (like API batch responses) introduces significant garbage collection overhead and intermediate arrays.
**Action:** When parsing large multi-line JSONL content, use a single-pass loop utility to reduce memory footprint and garbage collection pauses.
## 2025-03-01 - Avoid allocating large arrays of lines with split

**Learning:** Parsing large multi-line string contents using `.split(/\r?\n/)` coupled with array methods like `.filter()` and `.slice()` causes massive memory allocations and garbage collection pauses, which gets amplified when iterating across many chunks or files (like in session transcripts).
**Action:** Replace `text.split(/\r?\n/)` with zero-allocation utility functions like `extractHeadLines` and `extractTailLines` that use `String.prototype.indexOf` and `String.prototype.lastIndexOf` to slice out only the requested number of lines.
