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
 * Parses a JSONL string into an array of objects.
 *
 * Performance optimization: This function uses a single-pass loop over the text
 * to avoid the heavy memory and garbage collection overhead of creating intermediate
 * arrays and strings associated with `text.split("\n").map(...).filter(...)`.
 * This is crucial for handling very large multi-line string payloads from batch APIs.
 */
export function parseJsonlArray<T>(text: string): T[] {
  if (!text) {
    return [];
  }
  const results: T[] = [];
  let start = 0;
  for (let i = 0; i <= text.length; i++) {
    if (i === text.length || text.charCodeAt(i) === 10) {
      let s = start;
      let e = i;
      while (s < e && text.charCodeAt(s) <= 32) {
        s++;
      }
      while (e > s && text.charCodeAt(e - 1) <= 32) {
        e--;
      }
      if (s < e) {
        results.push(JSON.parse(text.slice(s, e)));
      }
      start = i + 1;
    }
  }
  return results;
}
