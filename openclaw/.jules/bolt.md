## 2024-05-14 - Single-pass JSONL Parsing Reduces GC Overhead

**Learning:** When parsing large multi-line JSONL content from API batch responses (e.g., in memory embeddings), chaining string `.split('\n').map().filter()` array methods causes significant garbage collection (GC) overhead by creating multiple intermediate arrays of strings before producing the final array of parsed objects. This is especially problematic for large files where V8 heap limits can be reached.

**Action:** Replace array method chains with a single-pass loop utility like `parseJsonlArray` that iterates over the string using `indexOf('\n', start)` and only allocates memory for the final parsed JSON objects, avoiding intermediate string arrays entirely.
