import fs from "node:fs/promises";
import { resolveGatewayLogPaths } from "./launchd.js";

const GATEWAY_LOG_ERROR_PATTERNS = [
  /refusing to bind gateway/i,
  /gateway auth mode/i,
  /gateway start blocked/i,
  /failed to bind gateway socket/i,
  /tailscale .* requires/i,
];

/**
 * ⚡ Bolt: Performance Optimization
 * Replaced memory-heavy `.split(/\r?\n/).map()` on large text files with single-pass
 * backward-scanning to find the last matched log line without array allocations.
 */
function findLastLineMatch(raw: string, matchFn?: (line: string) => boolean): string | null {
  let end = raw.length;
  while (end > 0) {
    let start = raw.lastIndexOf("\n", end - 1);
    if (start === -1) {
      start = 0;
    } else {
      start += 1;
    }
    let sliceEnd = end;
    if (sliceEnd > start && raw[sliceEnd - 1] === "\r") {
      sliceEnd -= 1;
    }
    const line = raw.slice(start, sliceEnd).trim();
    if (line && (!matchFn || matchFn(line))) {
      return line;
    }
    end = start > 0 ? start - 1 : 0;
  }
  return null;
}

export async function readLastGatewayErrorLine(env: NodeJS.ProcessEnv): Promise<string | null> {
  const { stdoutPath, stderrPath } = resolveGatewayLogPaths(env);
  const stderrRaw = await fs.readFile(stderrPath, "utf8").catch(() => "");
  const stdoutRaw = await fs.readFile(stdoutPath, "utf8").catch(() => "");

  const isErrorLine = (line: string) =>
    GATEWAY_LOG_ERROR_PATTERNS.some((pattern) => pattern.test(line));

  const stdoutErr = findLastLineMatch(stdoutRaw, isErrorLine);
  if (stdoutErr) {
    return stdoutErr;
  }

  const stderrErr = findLastLineMatch(stderrRaw, isErrorLine);
  if (stderrErr) {
    return stderrErr;
  }

  return findLastLineMatch(stderrRaw) ?? findLastLineMatch(stdoutRaw);
}
