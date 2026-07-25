/**
 * ⚡ Bolt: Performance Optimization
 * Single-pass string utilities for parsing large multi-line text without allocating massive arrays.
 * Replaces chaining string `.split(/\r?\n/).filter(...).slice(...)` array methods to prevent significant
 * memory allocation overhead and reduce garbage collection pauses.
 */

export function extractHeadLines(text: string, maxLines: number): string[] {
  const lines: string[] = [];
  let start = 0;
  while (start < text.length && lines.length < maxLines) {
    let end = text.indexOf("\n", start);
    if (end === -1) {
      end = text.length;
    }

    let actualEnd = end;
    if (actualEnd > start && text[actualEnd - 1] === "\r") {
      actualEnd--;
    }

    lines.push(text.slice(start, actualEnd));
    start = end + 1;
  }
  return lines;
}

export function extractTailLines(
  text: string,
  maxLines: number,
  options?: { skipEmptyLines?: boolean },
): string[] {
  const skipEmpty = options?.skipEmptyLines ?? false;
  const lines: string[] = [];
  let end = text.length;

  if (end > 0 && text[end - 1] === "\n") {
    end--;
    if (end > 0 && text[end - 1] === "\r") {
      end--;
    }
    if (!skipEmpty) {
      lines.push("");
    }
  }

  while (end > 0 && lines.length < maxLines) {
    const start = text.lastIndexOf("\n", end - 1);

    const lineStart = start === -1 ? 0 : start + 1;
    let actualEnd = end;

    if (actualEnd > lineStart && text[actualEnd - 1] === "\r") {
      actualEnd--;
    }

    const line = text.slice(lineStart, actualEnd);
    if (!skipEmpty || line.trim().length > 0) {
      lines.push(line);
    }
    end = start;
  }

  const reversed: string[] = [];
  for (let i = lines.length - 1; i >= 0; i--) {
    reversed.push(lines[i]);
  }
  return reversed;
}
