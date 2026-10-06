## 2024-07-01 - JSONL Parsing Overhead
**Learning:** Chaining `.split('\n').map().filter()` for parsing large JSONL content (like API batch responses) introduces significant garbage collection overhead and intermediate arrays.
**Action:** When parsing large multi-line JSONL content, use a single-pass loop utility to reduce memory footprint and garbage collection pauses.
## 2024-07-02 - Array method chaining for large text parsing
**Learning:** Chaining `.split(/\r?\n/).map().filter()` when checking conditions on multi-line text (e.g. CLI output or query responses) allocates intermediate arrays and forces full string traversal. This creates unnecessary garbage collection overhead when the target condition (e.g., finding a marker line) might be near the beginning.
**Action:** When searching or filtering multi-line strings, replace chained string/array methods with a single-pass `while` loop using `indexOf('\n')`. This prevents intermediate array creation and allows for early returns once the condition is met.
