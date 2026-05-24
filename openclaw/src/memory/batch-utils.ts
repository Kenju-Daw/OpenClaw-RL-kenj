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

/**
 * Parses a string containing multi-line JSONL content into an array in a single pass.
 * This prevents significant garbage collection overhead compared to using `.split('\n').map(...).filter(...)`
 * on very large string outputs.
 */
export function parseJsonlArray<T>(text: string): T[] {
  const results: T[] = [];
  let currentPos = 0;

  while (currentPos < text.length) {
    const nextNewline = text.indexOf('\n', currentPos);
    const lineEnd = nextNewline === -1 ? text.length : nextNewline;

    // Skip empty lines or just \r
    if (lineEnd > currentPos) {
      let line = text.slice(currentPos, lineEnd);
      if (line.endsWith('\r')) {
        line = line.slice(0, -1);
      }

      const trimmed = line.trim();
      if (trimmed.length > 0) {
        results.push(JSON.parse(trimmed) as T);
      }
    }

    if (nextNewline === -1) {
      break;
    }
    currentPos = nextNewline + 1;
  }

  return results;
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
