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
  if (!text.trim()) {
    return [];
  }
  const result: T[] = [];
  let start = 0;
  let newlineIdx = text.indexOf('\n');
  while (newlineIdx !== -1) {
    const line = text.slice(start, newlineIdx).trim();
    if (line) {
      result.push(JSON.parse(line));
    }
    start = newlineIdx + 1;
    newlineIdx = text.indexOf('\n', start);
  }
  if (start < text.length) {
    const line = text.slice(start).trim();
    if (line) {
      result.push(JSON.parse(line));
    }
  }
  return result;
}
