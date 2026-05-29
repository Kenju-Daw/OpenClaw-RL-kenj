## $(date +%Y-%m-%d) - Optimize JSONL Parsing for Large Payloads
**Learning:** Chaining array methods (`.split('\n').map().filter().map()`) on large multi-line strings (like batch API responses) creates substantial memory allocation and garbage collection overhead because each method creates an intermediate array.
**Action:** Replace array method chaining with a single-pass `while` loop when parsing large text payloads, specifically using the `parseJsonlArray` utility for JSONL processing, to improve efficiency and reduce memory pressure.
