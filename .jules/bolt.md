## 2024-05-19 - Batch GC Spike Anti-pattern
**Learning:** Found widespread use of `text.split("\n").map(trim).filter(Boolean).map(JSON.parse)` for parsing huge JSONL files from batch APIs. This creates 3+ intermediate arrays per file, causing massive GC spikes.
**Action:** Always watch for chaining array methods on huge text blobs. Replace with single-pass manual loop utilities like `parseJsonlArray`.
