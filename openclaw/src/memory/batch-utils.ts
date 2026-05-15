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

export function parseJsonlArray<T>(text: string): T[] {
  if (!text || !text.trim()) {
    return [];
  }
  const results: T[] = [];
  let startIndex = 0;

  while (startIndex < text.length) {
    let nextNewline = text.indexOf("\n", startIndex);
    if (nextNewline === -1) {
      nextNewline = text.length;
    }

    const line = text.slice(startIndex, nextNewline).trim();
    if (line) {
      results.push(JSON.parse(line) as T);
    }

    startIndex = nextNewline + 1;
  }

  return results;
}
