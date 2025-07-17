// src/ai/utils/langsmith.ts
// LangSmith client setup for tracing and observability
import { RunTree, type RunTreeConfig } from "langsmith";

const LANGSMITH_PROJECT = process.env.LANGSMITH_PROJECT || "Qlab-SYS";
const LANGSMITH_API_KEY = process.env.LANGSMITH_API_KEY;

if (!LANGSMITH_API_KEY) {
  console.warn("[LangSmith] LANGSMITH_API_KEY not set. Tracing will be disabled.");
}

export async function traceRunTree(config: RunTreeConfig, cb: (run: RunTree) => Promise<void>) {
  if (!LANGSMITH_API_KEY) return;
  const run = new RunTree({ ...config, project_name: LANGSMITH_PROJECT });
  await cb(run);
  await run.end();
  await run.postRun();
}

/**
 * Helper to trace a single agent loop turn in WhatsApp flow.
 */
export async function traceAgentLoop({
  name,
  inputs,
  outputs,
  metadata,
  tags = [],
}: {
  name: string;
  inputs: Record<string, any>;
  outputs: Record<string, any>;
  metadata?: Record<string, any>;
  tags?: string[];
}) {
  if (!LANGSMITH_API_KEY) return;
  // Flatten token/latency info for dashboard visibility
  const flatMeta = { ...(metadata || {}) };
  // Promote aiLatencyMs and aiTokenUsage fields to top-level for dashboard
  if (flatMeta.aiLatencyMs !== undefined) flatMeta.latencyMs = flatMeta.aiLatencyMs;
  if (flatMeta.aiTokenUsage) {
    const usage = flatMeta.aiTokenUsage;
    if (usage.prompt_tokens !== undefined) flatMeta.prompt_tokens = usage.prompt_tokens;
    if (usage.completion_tokens !== undefined) flatMeta.completion_tokens = usage.completion_tokens;
    if (usage.total_tokens !== undefined) flatMeta.total_tokens = usage.total_tokens;
  }
  // Also send to .extra for LangSmith UI
  const run = new RunTree({
    name,
    run_type: "chain",
    project_name: LANGSMITH_PROJECT,
    inputs: { ...inputs, ...flatMeta },
    tags,
    metadata: flatMeta,
    extra: flatMeta,
    start_time: Date.now(),
  });
  await run.end(outputs, undefined, Date.now());
  await run.postRun();
}
