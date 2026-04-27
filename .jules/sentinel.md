## 2024-04-27 - Enhance Skill Scanner to detect SQL injection

**Vulnerability:** The application currently scans user-provided "skills" (which seem to be JS/TS plugins) for certain malicious patterns like crypto-mining or process.env exfiltration, but fails to check for SQL injections in those skills or generic string concatenation in SQL queries.
**Learning:** Extending the existing static analysis in `src/security/skill-scanner.ts` is an easy way to provide defense-in-depth and catch potentially unsafe patterns in loaded skills.
**Prevention:** Add a new `LineRule` to `LINE_RULES` detecting common SQL query formats that use string concatenation or template literals without parameterization.
