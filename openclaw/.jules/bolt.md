## 2025-07-05 - Avoid multiple passes on arrays in parsing logic
**Learning:** Using chained `.split().map().filter()` or similar approaches on large array logic creates unnecessary allocations and intermediate passes over memory.
**Action:** Replace with single-pass loops or utilize specialized parsers (e.g. `parseJsonlArray`) for intensive processing pipelines, specifically where split output drives map and filter directly.
