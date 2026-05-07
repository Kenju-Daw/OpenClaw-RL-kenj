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
 * Optimizes the parsing of JSONL string blocks without allocating multiple intermediate arrays.
 * Replaces: text.split("\n").map(l => l.trim()).filter(Boolean).map(l => JSON.parse(l))
 */
export function parseJsonlArray<T>(text: string): T[] {
  const result: T[] = [];
  let startIndex = 0;

  while (startIndex < text.length) {
    let newlineIndex = text.indexOf('\n', startIndex);
    if (newlineIndex === -1) {
      newlineIndex = text.length;
    }

    const line = text.slice(startIndex, newlineIndex).trim();
    if (line.length > 0) {
      result.push(JSON.parse(line));
    }

    startIndex = newlineIndex + 1;
  }

  return result;
}
