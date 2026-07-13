export interface InputField {
  key: string
  label: string
  type: 'input' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  name: "OnboardPlan",
  slug: "onboardplan",
  tagline: "A 30/60/90 day plan for every new hire.",
  description: "Get a structured onboarding plan by role - what the new hire should learn, do, and own by day 30, 60, and 90.",
  toolTitle: "Build an onboarding plan",
  resultLabel: "Your onboarding plan",
  ctaLabel: "Build plan",
  features: [
  "30/60/90 milestones",
  "Role-tuned goals",
  "Check-ins and owners",
  "First-week checklist"
],
  inputs: [
  {
    "key": "role",
    "label": "Role",
    "type": "input",
    "placeholder": "e.g. Sales Development Rep"
  },
  {
    "key": "level",
    "label": "Seniority",
    "type": "select",
    "options": [
      "Junior",
      "Mid",
      "Senior",
      "Manager"
    ]
  },
  {
    "key": "remote",
    "label": "Work mode",
    "type": "select",
    "options": [
      "Remote",
      "Onsite",
      "Hybrid"
    ]
  }
] as InputField[],
  systemPrompt: "You are an HR onboarding specialist. Given a role, seniority, and work mode, produce a 30/60/90 day onboarding plan: concrete goals and expected outcomes for each window, 2-3 check-ins with suggested owners, and a short first-week checklist. Keep it actionable. In demo mode, return a realistic sample plan following this structure.",
  pricing: [
  {
    "tier": "Free",
    "price": "$0",
    "desc": "4 plans/mo"
  },
  {
    "tier": "Pro",
    "price": "$15/mo",
    "desc": "Unlimited, save history"
  }
],
  mock: (inputs: Record<string, string>): string => {
  const role = (inputs['role'] || 'your role').trim()
  const lvl = inputs['level'] || 'Mid'
  const wm = inputs['remote'] || 'Remote'
  if (!role) return 'Name the role to build an onboarding plan.'
  let out = 'ONBOARDING PLAN (' + lvl + ' ' + role + ' | ' + wm + ')\n\n'
  out += 'DAYS 0-30 (Learn)\n- Complete product and tooling training\n- Shadow one cycle with a peer\n- First small owned task shipped\n\n'
  out += 'DAYS 31-60 (Do)\n- Own a recurring deliverable end to end\n- Lead one internal review\n\n'
  out += 'DAYS 61-90 (Own)\n- Drive an initiative with light oversight\n- Share a written playbook\n\n'
  out += 'CHECK-INS: Week 1 (manager), Week 4 (manager + buddy), Week 12 (manager)\n'
  out += 'FIRST WEEK: laptop + access, intro meetings, read the handbook.\n\n'
  out += '\n--- (Mock demo. Add the role for a tailored plan.)'
  return out
}
}
