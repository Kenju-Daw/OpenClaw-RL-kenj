import fs from "node:fs/promises";
import { listChannelPlugins } from "../../channels/plugins/index.js";
import { getResolvedLoggerSettings } from "../../logging.js";
import { parseLogLine } from "../../logging/parse-log-line.js";
import { defaultRuntime, type RuntimeEnv } from "../../runtime.js";
import { theme } from "../../terminal/theme.js";

export type ChannelsLogsOptions = {
  channel?: string;
  lines?: string | number;
  json?: boolean;
};

type LogLine = ReturnType<typeof parseLogLine>;

const DEFAULT_LIMIT = 200;
const MAX_BYTES = 1_000_000;

const getChannelSet = () =>
  new Set<string>([...listChannelPlugins().map((plugin) => plugin.id), "all"]);

function parseChannelFilter(raw?: string) {
  const trimmed = raw?.trim().toLowerCase();
  if (!trimmed) {
    return "all";
  }
  return getChannelSet().has(trimmed) ? trimmed : "all";
}

function matchesChannel(line: NonNullable<LogLine>, channel: string) {
  if (channel === "all") {
    return true;
  }
  const needle = `gateway/channels/${channel}`;
  if (line.subsystem?.includes(needle)) {
    return true;
  }
  if (line.module?.includes(channel)) {
    return true;
  }
  return false;
}

async function readTailLines(file: string, limit: number): Promise<string[]> {
  const stat = await fs.stat(file).catch(() => null);
  if (!stat) {
    return [];
  }
  const size = stat.size;
  const start = Math.max(0, size - MAX_BYTES);
  const handle = await fs.open(file, "r");
  try {
    const length = Math.max(0, size - start);
    if (length === 0) {
      return [];
    }
    const buffer = Buffer.alloc(length);
    const readResult = await handle.read(buffer, 0, length, start);
    const text = buffer.toString("utf8", 0, readResult.bytesRead);

    const lines: string[] = [];
    let searchIndex = text.length;

    if (searchIndex > 0 && text[searchIndex - 1] === "\n") {
      searchIndex--;
      if (searchIndex > 0 && text[searchIndex - 1] === "\r") {
        searchIndex--;
      }
    }

    while (searchIndex >= 0 && lines.length < limit) {
      const startOfLine = searchIndex > 0 ? text.lastIndexOf("\n", searchIndex - 1) : -1;

      if (startOfLine === -1 && start > 0) {
        break;
      }

      let sliceEnd = searchIndex;
      if (sliceEnd > 0 && text[sliceEnd - 1] === "\r") {
        sliceEnd--;
      }

      const lineStart = startOfLine + 1;
      lines.unshift(text.slice(lineStart, sliceEnd));
      searchIndex = startOfLine;
    }

    return lines;
  } finally {
    await handle.close();
  }
}

export async function channelsLogsCommand(
  opts: ChannelsLogsOptions,
  runtime: RuntimeEnv = defaultRuntime,
) {
  const channel = parseChannelFilter(opts.channel);
  const limitRaw = typeof opts.lines === "string" ? Number(opts.lines) : opts.lines;
  const limit =
    typeof limitRaw === "number" && Number.isFinite(limitRaw) && limitRaw > 0
      ? Math.floor(limitRaw)
      : DEFAULT_LIMIT;

  const file = getResolvedLoggerSettings().file;
  const rawLines = await readTailLines(file, limit * 4);
  const parsed = rawLines
    .map(parseLogLine)
    .filter((line): line is NonNullable<LogLine> => Boolean(line));
  const filtered = parsed.filter((line) => matchesChannel(line, channel));
  const lines = filtered.slice(Math.max(0, filtered.length - limit));

  if (opts.json) {
    runtime.log(JSON.stringify({ file, channel, lines }, null, 2));
    return;
  }

  runtime.log(theme.info(`Log file: ${file}`));
  if (channel !== "all") {
    runtime.log(theme.info(`Channel: ${channel}`));
  }
  if (lines.length === 0) {
    runtime.log(theme.muted("No matching log lines."));
    return;
  }
  for (const line of lines) {
    const ts = line.time ? `${line.time} ` : "";
    const level = line.level ? `${line.level.toLowerCase()} ` : "";
    runtime.log(`${ts}${level}${line.message}`.trim());
  }
}
