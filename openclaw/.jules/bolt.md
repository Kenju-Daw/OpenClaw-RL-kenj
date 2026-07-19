## 2024-07-01 - JSONL Parsing Overhead
**Learning:** Chaining `.split('\n').map().filter()` for parsing large JSONL content (like API batch responses) introduces significant garbage collection overhead and intermediate arrays.
**Action:** When parsing large multi-line JSONL content, use a single-pass loop utility to reduce memory footprint and garbage collection pauses.

## 2024-07-19 - Transcript Parsing Performance Bottleneck
**Learning:** Chaining `.split(/\r?\n/).filter(l => l.trim()).slice(-MAX_LINES)` on entire file chunks (like logs or transcript streams) forces V8 to allocate huge arrays of intermediate strings, only to immediately throw away 99% of them in garbage collection. This severely impacts memory and CPU during heavy I/O polling paths.
**Action:** Created `extractHeadLines` and `extractTailLines` in `src/utils/string/split.ts` to replace array-method chaining. Next time I encounter a log/chunk parsing loop, I should use index-based slicing rather than full string splitting.
