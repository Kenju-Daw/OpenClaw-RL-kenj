## 2024-05-27 - JSONL Parsing Garbage Collection Overhead
**Learning:** Chaining `.split("\n").map().filter().map()` to parse large JSONL API payloads (e.g. Batch API outputs) causes severe, unexpected garbage collection pauses and memory bloat because of intermediate array allocations.
**Action:** Use a single-pass `for` loop that iterates through string characters to find newlines and extracts lines directly for parsing, avoiding intermediate array creation.
