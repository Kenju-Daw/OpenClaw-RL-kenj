export function extractHeadLines(text: string, maxLines: number): string[] {
  if (text.length === 0) {
      return [];
  }
  const lines: string[] = [];
  let startIndex = 0;
  for (let i = 0; i < maxLines; i++) {
    const newlineIndex = text.indexOf("\n", startIndex);
    if (newlineIndex === -1) {
      if (startIndex <= text.length) {
         lines.push(text.slice(startIndex));
      }
      break;
    }
    const endIndex = newlineIndex > 0 && text[newlineIndex - 1] === "\r" ? newlineIndex - 1 : newlineIndex;
    lines.push(text.slice(startIndex, endIndex));
    startIndex = newlineIndex + 1;
  }
  return lines;
}

export function extractTailLines(text: string, maxLines: number, opts?: { skipEmptyLines?: boolean }): string[] {
  const lines: string[] = [];
  let searchIndex = text.length - 1;

  if (text.length === 0) {
      return [];
  }

  while (searchIndex >= -1 && lines.length < maxLines) {
    const newlineIndex = searchIndex >= 0 ? text.lastIndexOf("\n", searchIndex) : -1;

    const startIndex = newlineIndex + 1;
    let endIndex = searchIndex + 1;
    if (endIndex > startIndex && text[endIndex - 1] === "\r") {
      endIndex--;
    }

    const line = text.slice(startIndex, endIndex);
    if (!opts?.skipEmptyLines || line.trim().length > 0) {
      if (searchIndex !== -1 || startIndex !== endIndex) {
          lines.unshift(line);
      }
    }

    if (newlineIndex === -1) {
        break;
    }
    searchIndex = newlineIndex - 1;
  }

  return lines;
}
