export function extractHeadLines(text: string, maxLines: number): string[] {
  if (!text) {
    return [];
  }
  if (maxLines <= 0) {
    return [];
  }
  const result: string[] = [];
  let start = 0;
  for (let i = 0; i < maxLines && start < text.length; i++) {
    let end = text.indexOf("\n", start);
    if (end === -1) {
      end = text.length;
    }
    let sliceEnd = end;
    if (sliceEnd > start && text[sliceEnd - 1] === "\r") {
      sliceEnd--;
    }
    result.push(text.slice(start, sliceEnd));
    start = end + 1;
  }
  return result;
}

export function extractTailLines(
  text: string,
  maxLines: number,
  options?: { skipEmptyLines?: boolean },
): string[] {
  if (!text) {
    return [];
  }
  if (maxLines <= 0) {
    return [];
  }
  const result: string[] = [];
  let end = text.length - 1;

  while (end >= 0 && result.length < maxLines) {
    let start = text.lastIndexOf("\n", end);
    let sliceStart = start + 1;
    let sliceEnd = end + 1;
    if (sliceEnd > sliceStart && text[sliceEnd - 1] === "\r") {
      sliceEnd--;
    }

    const line = text.slice(sliceStart, sliceEnd);
    if (!options?.skipEmptyLines || line.trim().length > 0) {
      result.push(line);
    }

    end = start - 1;
  }
  return result.toReversed(); // oxlint strictly enforces unicorn/no-array-reverse, use toReversed
}
