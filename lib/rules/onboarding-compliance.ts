export const RULESET_ID = 'onboarding-compliance'
export const RULESET_VERSION = '1.0.0'

export type RuleHit = {
  id: string
  title: string
  severity: 'low' | 'medium' | 'high'
  passed: boolean
  remediation?: string
  ref?: string
}

export function runAllRules(blob: string): Array<Record<string, unknown>> {
  const text = String(blob || '')
  return [
    {
      id: 'OB-A01',
      name: 'Role specified',
      severity: 'medium',
      passed: text.trim().length >= 8,
      message: 'Name the role so 30/60/90 goals stay relevant.',
      ref: 'https://www.shrm.org/',
    },
    {
      id: 'OB-A02',
      name: 'No legal-advice claim',
      severity: 'high',
      passed: !/legal advice|guaranteed compliance/i.test(text),
      message: 'Keep the plan as a template, not legal advice.',
      ref: 'https://www.eeoc.gov/',
    },
  ]
}

export function runDeterministicChecks(inputs: Record<string, string>): RuleHit[] {
  const blob = Object.values(inputs || {}).join('\n')
  return runAllRules(blob).map((r) => ({
    id: String(r.id || 'R'),
    title: String(r.name || 'check'),
    severity: (r.severity as 'low' | 'medium' | 'high') || 'medium',
    passed: !!r.passed,
    remediation: String(r.message || ''),
    ref: r.ref ? String(r.ref) : undefined,
  }))
}
