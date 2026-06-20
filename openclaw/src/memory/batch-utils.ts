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
 * Optimised single-pass parser for multi-line JSONL responses.
 * Avoids `.split('\n').map().filter()` which causes significant GC overhead on huge files.
 */
export function parseJsonlArray<T>(text: string): T[] {
  if (!text) {
    return [];
  }
  const results: T[] = [];
  let start = 0;
  let end = text.indexOf("\n");

  while (end !== -1) {
    let i = start;
    let j = end - 1;
    while (i <= j && text.charCodeAt(i) <= 32) {
      i++;
    }
    while (j >= i && text.charCodeAt(j) <= 32) {
      j--;
    }

    if (i <= j) {
      results.push(JSON.parse(text.substring(i, j + 1)) as T);
    }

    start = end + 1;
    end = text.indexOf("\n", start);
  }

  if (start < text.length) {
    let i = start;
    let j = text.length - 1;
    while (i <= j && text.charCodeAt(i) <= 32) {
      i++;
    }
    while (j >= i && text.charCodeAt(j) <= 32) {
      j--;
    }

    if (i <= j) {
      results.push(JSON.parse(text.substring(i, j + 1)) as T);
    }
  }

  return results;
}
