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
 * Parses a newline-separated string of JSON objects into an array.
 * This single-pass loop implementation avoids the significant memory allocation
 * and garbage collection overhead that chaining `.split().map().filter().map()`
 * would cause on large multi-line JSONL payloads.
 */
export function parseJsonlArray<T>(text: string): T[] {
  const result: T[] = [];
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (trimmed) {
      result.push(JSON.parse(trimmed) as T);
    }
  }
  return result;
}
