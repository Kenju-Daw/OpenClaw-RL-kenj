export function extractHeadLines(text: string, maxLines: number): string[] {
  if (!text || maxLines <= 0) { return []; }
  const lines: string[] = [];
  let start = 0;
  while (start < text.length && lines.length < maxLines) {
    let end = text.indexOf("\n", start);
    let sliceEnd = end;
    if (end === -1) {
      end = text.length;
      sliceEnd = end;
    } else if (end > start && text[end - 1] === "\r") {
      sliceEnd = end - 1;
    }
    lines.push(text.slice(start, sliceEnd));
    start = end + 1;
  }
  return lines;
}

export function extractTailLines(
  text: string,
  maxLines: number,
  options?: { skipEmptyLines?: boolean },
): string[] {
  if (!text || maxLines <= 0) { return []; }
  const lines: string[] = [];
  let end = text.length;

  while (end > 0 && lines.length < maxLines) {
    let start = text.lastIndexOf("\n", end - 1);
    let sliceStart = start === -1 ? 0 : start + 1;
    let sliceEnd = end;

    if (sliceEnd > sliceStart && sliceEnd < text.length && text[sliceEnd - 1] === "\r") {
      sliceEnd--;
    }

    const line = text.slice(sliceStart, sliceEnd);
    if (!options?.skipEmptyLines || line.trim().length > 0) {
      lines.unshift(line);
    }

    end = start;
    if (start === -1) {
      break;
    }
  }
  return lines;
}
