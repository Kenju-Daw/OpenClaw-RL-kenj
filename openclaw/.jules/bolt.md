## 2024-07-01 - JSONL Parsing Overhead
**Learning:** Chaining `.split('\n').map().filter()` for parsing large JSONL content (like API batch responses) introduces significant garbage collection overhead and intermediate arrays.
**Action:** When parsing large multi-line JSONL content, use a single-pass loop utility to reduce memory footprint and garbage collection pauses.
## 2024-07-24 - Avoid Array Method Chaining on Large Multi-line Strings
**Learning:** Using chained array methods like `.split(/\r?\n/).filter(Boolean).slice(-N)` on large text blocks (e.g. log chunks, transcripts) is highly inefficient due to allocating an array for every split line, intermediate arrays for `.filter()` and `.slice()`, leading to high memory pressure and garbage collection overhead.
**Action:** Replace `string.split().filter().slice()` logic for multi-line extraction with single-pass iterative searches like `indexOf('\n')` or `lastIndexOf('\n')` from custom utility functions `extractHeadLines` and `extractTailLines` which extract strictly what is needed, avoiding creation of intermediate string arrays.
