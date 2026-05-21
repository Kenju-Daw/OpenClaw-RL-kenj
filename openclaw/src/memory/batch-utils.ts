import type { SsrFPolicy } from "../infra/net/ssrf.js";

export type BatchHttpClientConfig = {
  baseUrl?: string;
  headers?: Record<string, string>;
  ssrfPolicy?: SsrFPolicy;
};

export function normalizeBatchBaseUrl(client: BatchHttpClientConfig): string {
  return client.baseUrl?.replace(/\/$/, "") ?? "";
}

export function buildBatchHeaders(
  client: Pick<BatchHttpClientConfig, "headers">,
  params: { json: boolean },
): Record<string, string> {
  const headers = client.headers ? { ...client.headers } : {};
  if (params.json) {
    if (!headers["Content-Type"] && !headers["content-type"]) {
      headers["Content-Type"] = "application/json";
    }
  } else {
    delete headers["Content-Type"];
    delete headers["content-type"];
  }
  return headers;
}

export function splitBatchRequests<T>(requests: T[], maxRequests: number): T[][] {
  if (requests.length <= maxRequests) {
    return [requests];
  }
  const groups: T[][] = [];
  for (let i = 0; i < requests.length; i += maxRequests) {
    groups.push(requests.slice(i, i + maxRequests));
  }
  return groups;
}

/**
 * Single-pass JSONL parser to prevent significant garbage collection overhead
 * compared to chaining string `.split().map().filter()` array methods on large strings.
 */
export function parseJsonlArray<T>(text: string): T[] {
  if (!text) return [];
  const result: T[] = [];
  let lastIndex = 0;
  while (lastIndex < text.length) {
    let nextIndex = text.indexOf('\n', lastIndex);
    if (nextIndex === -1) {
      nextIndex = text.length;
    }
    const line = text.slice(lastIndex, nextIndex).trim();
    if (line) {
      result.push(JSON.parse(line) as T);
    }
    lastIndex = nextIndex + 1;
  }
  return result;
}
