export interface InputField {
  key: string
  label: string
  type: 'input' | 'text' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  name: "OnboardPlan",
  slug: "onboardplan",
  productId: "PROD_38NMx23XHaPtWJW7A0Hewt",
  priceMonthly: 15,
  yearlyProductId: "PROD_6uM3xDyiPFEs5I0OmJ4eQ2",
  priceYearly: 150,

  checkoutUrl: "https://pancake.waffo.ai/store/lixingliang-ai-tools-6cilbw8v/checkout/cs_94e46c4e-af73-61a8-fe5b-1cb8355915cb",
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
  definitionLead: "OnboardPlan builds a 30/60/90 day onboarding plan by role — what the new hire should learn, do, and own, with check-ins and a first-week checklist.",
  geoFaq: [
    { q: "What is OnboardPlan?", a: "OnboardPlan builds a 30/60/90 day onboarding plan by role with check-ins and a first-week checklist." },
    { q: "What inputs does it need?", a: "The role and a little context about the team or product." },
    { q: "Does it include owners?", a: "Yes. Check-ins list suggested owners so accountability is clear." },
    { q: "Who should use it?", a: "Managers and People Ops who need a structured ramp without a full L&D team." },
    { q: "Can I edit the plan?", a: "Yes. Treat it as a draft you tailor to your company." },
    { q: "Does it replace HR policy?", a: "No. It is decision-support for onboarding plans, not legal or HR policy." },
  ],
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
