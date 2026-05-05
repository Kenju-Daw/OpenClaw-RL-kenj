## 2026-05-05 - Optimizing Multi-line JSONL Parsing Memory Overhead
**Learning:** When parsing large multi-line JSONL strings from API batch responses in Node, chaining methods like `.split("\n").map(l => l.trim()).filter(Boolean).map(l => JSON.parse(l))` creates massive intermediate arrays in memory. This causes significant garbage collection overhead.
**Action:** Use a single-pass loop utility (`parseJsonlArray`) that slices strings and parses directly to avoid creating these intermediate structures, especially for batch processing.
