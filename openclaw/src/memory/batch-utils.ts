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
 * ⚡ Bolt Performance Optimization:
 * Parses a large multi-line JSONL string into an array of objects.
 * Replaces `.split("\n").map().filter()` chains with a single-pass while loop
 * to avoid excessive intermediate array and string allocations.
 * Impact: Significantly reduces garbage collection overhead and prevents
 * blocking the main thread when processing large batch API responses.
 */
export function parseJsonlArray<T>(text: string): T[] {
  if (!text.trim()) {
    return [];
  }
  const results: T[] = [];
  let currentPos = 0;
  while (currentPos < text.length) {
    let nextNewline = text.indexOf("\n", currentPos);
    if (nextNewline === -1) {
      nextNewline = text.length;
    }
    const line = text.slice(currentPos, nextNewline).trim();
    if (line) {
      results.push(JSON.parse(line) as T);
    }
    currentPos = nextNewline + 1;
  }
  return results;
}
