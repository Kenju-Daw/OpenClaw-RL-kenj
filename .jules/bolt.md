## 2026-07-21 - [Multi-line string parsing using single-pass while loop]
**Learning:** Using chained array methods like `.split(/\r?\n/)` followed by loops to parse large multi-line text files causes high memory allocation and garbage collection overhead.
**Action:** When extracting or scanning multi-line strings, use a single-pass `while` loop with `indexOf('\n')` to iterate through lines and explicitly handle potential carriage returns (e.g., check `text[end - 1] === '\r'`). This allows early short-circuiting and minimizes memory footprint.
