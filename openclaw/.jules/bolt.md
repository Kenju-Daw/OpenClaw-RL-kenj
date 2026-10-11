## 2024-07-01 - JSONL Parsing Overhead
**Learning:** Chaining `.split('\n').map().filter()` for parsing large JSONL content (like API batch responses) introduces significant garbage collection overhead and intermediate arrays.
**Action:** When parsing large multi-line JSONL content, use a single-pass loop utility to reduce memory footprint and garbage collection pauses.

## 2024-07-02 - Transcript File Parsing Overhead
**Learning:** Parsing large JSONL transcript files backwards using `fs.readFileSync().split('\n')` introduces significant garbage collection overhead, especially when we only need the last few lines. Chaining `.split(/\r?\n/).filter().slice(-MAX)` allocates massive intermediate string arrays.
**Action:** Replace `split(/\r?\n/)` with single-pass `lastIndexOf('\n')` backward scanning or `indexOf('\n')` forward scanning, using early termination to drastically reduce memory allocation and string copying overhead.
