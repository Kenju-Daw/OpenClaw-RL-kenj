/**
 * ⚡ Bolt: Performance Optimization
 * Replaces chaining string `.split(/\r?\n/).filter(l => l.trim()).slice(-maxLines)`
 * to prevent significant memory allocation overhead.
 */
export function extractTailLines(text: string, maxLines: number): string[] {
  if (!text || maxLines <= 0) {
    return [];
  }

  const lines: string[] = [];
  let end = text.length;

  while (end > 0 && lines.length < maxLines) {
    let start = text.lastIndexOf("\n", end - 1);

    const startIndex = start === -1 ? 0 : start + 1;
    let endIndex = end;

    // `.split(/\r?\n/)` behavior
    if (endIndex > startIndex && text[endIndex - 1] === "\r") {
      endIndex--;
    }

    const lineStr = text.slice(startIndex, endIndex);
    if (lineStr.trim() !== "") {
      lines.unshift(lineStr);
    }

    end = start === -1 ? 0 : start;
  }

  return lines;
}

export function extractHeadLines(text: string, maxLines: number): string[] {
  if (!text || maxLines <= 0) {
    return [];
  }

  const lines: string[] = [];
  let start = 0;

  while (start < text.length && lines.length < maxLines) {
    let end = text.indexOf("\n", start);
    if (end === -1) {
      end = text.length;
    }

    let sliceEnd = end;
    if (sliceEnd > start && text[sliceEnd - 1] === "\r") {
      sliceEnd--;
    }

    const lineStr = text.slice(start, sliceEnd);
    lines.push(lineStr);

    start = end + 1;
  }

  return lines;
}
