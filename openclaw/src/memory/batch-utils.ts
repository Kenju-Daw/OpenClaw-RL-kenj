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
 * Parses large JSONL strings using single-pass index slices to avoid string allocation
 * and garbage collection (GC) overhead compared to `.split('\n').map().filter()`.
 *
 * ⚡ Bolt Optimization:
 * - Reduces memory spikes for large batch embedding results.
 */
export function parseJsonlArray<T>(text: string): T[] {
  if (!text) {
    return [];
  }
  const results: T[] = [];
  let start = 0;
  while (start < text.length) {
    let end = text.indexOf("\n", start);
    if (end === -1) {
      end = text.length;
    }
    let line = text.slice(start, end);
    if (line.endsWith("\r")) {
      line = line.slice(0, -1);
    }
    line = line.trim();
    if (line) {
      results.push(JSON.parse(line) as T);
    }
    start = end + 1;
  }
  return results;
}
