## 2026-06-19 - Single-pass parsing over chained higher-order array functions
**Learning:** Chaining `.split().map().filter().map()` over large strings allocates multiple intermediate array arrays that must then be garbage collected, introducing unnecessary performance overhead and memory pressure. This is particularly problematic for JSONL file processing.
**Action:** Replace functional array method chains with imperative `for...of` loops using single passes, especially when processing bulk textual payload representations. Include comments describing the optimization and its intent.
