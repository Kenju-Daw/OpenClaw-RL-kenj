## 2025-03-01 - Fast JSONL Parsing
**Learning:** Chaining `.split('\n').map().filter().map()` for large API batch output creates massive string allocation and garbage collection overhead. Node's V8 engine creates intermediate arrays for each string operation in the chain, causing slow processing and potentially running out of memory.
**Action:** Use a single-pass loop string slicer (`parseJsonlArray`) for parsing massive JSONL files to minimize intermediate garbage string and array allocation.
