## 2024-05-11 - Single-pass JSONL Parsing
**Learning:** Chaining `.split("\n").map().filter().map()` to parse multi-line JSONL strings from API responses allocates multiple large intermediate arrays, causing unnecessary memory spikes and garbage collection pauses.
**Action:** Use a single-pass `while` loop (like `parseJsonlArray`) for string parsing to avoid creating intermediate arrays.
