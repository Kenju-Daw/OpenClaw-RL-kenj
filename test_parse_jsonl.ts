function parseJsonlArray<T>(text: string): T[] {
  const result: T[] = [];
  let start = 0;
  while (start < text.length) {
    let end = text.indexOf('\n', start);
    if (end === -1) {
      end = text.length;
    }
    const line = text.substring(start, end).trim();
    if (line) {
      result.push(JSON.parse(line) as T);
    }
    start = end + 1;
  }
  return result;
}

console.log(parseJsonlArray('{"a": 1}\n\n  {"b": 2} \n'));
