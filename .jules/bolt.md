## 2024-05-08 - Use Single-Pass Loop Utility for JSONL Parsing
**Learning:** Chaining `.split("\n").map(trim).filter(Boolean).map(JSON.parse)` creates significant GC overhead when processing multi-line text (e.g., in batch embedding responses).
**Action:** Use a single-pass loop utility to slice, parse, and accumulate the results without intermediate array allocations.
