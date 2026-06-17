## 2025-03-05 - Optimize JSONL Batch Response Parsing
**Learning:** Using chained `.split('\n').map().filter()` to parse large JSONL API batch responses introduces significant garbage collection overhead and memory spikes.
**Action:** Always use a single-pass while-loop implementation (`parseJsonlArray`) for extracting JSON objects from multi-line strings in high-volume batch processing to drastically improve parsing efficiency and reduce peak memory footprint.
