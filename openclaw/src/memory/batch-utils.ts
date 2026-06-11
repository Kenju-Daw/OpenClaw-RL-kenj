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
 * Parses a JSONL string in a single pass to avoid creating intermediary
 * arrays and strings (as string.split().map().filter() does), reducing
 * garbage collection overhead for large payload responses.
 */
export function parseJsonlArray<T>(text: string): T[] {
  if (!text) {
    return [];
  }
  const results: T[] = [];
  let startIndex = 0;
  for (let i = 0; i <= text.length; i++) {
    if (i === text.length || text[i] === "\n") {
      const line = text.slice(startIndex, i).trim();
      if (line) {
        results.push(JSON.parse(line) as T);
      }
      startIndex = i + 1;
    }
  }
  return results;
}
