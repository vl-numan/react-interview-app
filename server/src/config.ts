function envInt(name: string, fallback: number): number {
  const raw = process.env[name]
  if (raw === undefined) return fallback
  const value = Number.parseInt(raw, 10)
  return Number.isFinite(value) ? value : fallback
}

function envFloat(name: string, fallback: number): number {
  const raw = process.env[name]
  if (raw === undefined) return fallback
  const value = Number.parseFloat(raw)
  return Number.isFinite(value) ? value : fallback
}

function envBool(name: string, fallback: boolean): boolean {
  const raw = process.env[name]
  if (raw === undefined) return fallback
  return raw.toLowerCase() !== 'false' && raw !== '0'
}

export const config = {
  port: envInt('PORT', 3001),
  simEnabled: envBool('SIM_ENABLED', true),
  latencyMinMs: envInt('SIM_LATENCY_MIN_MS', 200),
  latencyMaxMs: envInt('SIM_LATENCY_MAX_MS', 600),
  outlierChance: envFloat('SIM_LATENCY_OUTLIER_CHANCE', 0.05),
  outlierMinMs: envInt('SIM_LATENCY_OUTLIER_MIN_MS', 1500),
  outlierMaxMs: envInt('SIM_LATENCY_OUTLIER_MAX_MS', 3000),
  errorRate: envFloat('SIM_ERROR_RATE', 0.0),
}
