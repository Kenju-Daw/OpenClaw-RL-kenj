## 2026-05-26 - oxlint(curly) rule in OpenClaw
**Learning:** The openclaw codebase uses oxlint and strictly enforces the `eslint(curly)` rule, which requires curly braces for all control statements (including `if`, `while`, `for`), even single-line statements.
**Action:** When creating fast inline loops for performance optimizations, always use curly braces instead of shorthand syntax (e.g. `while(true) { i++; }` instead of `while(true) i++;`).
