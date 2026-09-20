import type { KbEntry } from "../support-kit/types";
export type { KbEntry };

export const KB: KbEntry[] = [
  {
    id: "what",
    title: "What OnboardPlan does",
    keywords: ["OnboardPlan", "onboardplan", "what", "product", "about", "A 30/60/90 day plan for every new hire."],
    body: "A 30/60/90 day plan for every new hire.. OnboardPlan builds a 30/60/90 day onboarding plan by role — what the new hire should learn, do, and own, with check-ins and a first-week checklist.",
    source: "OnboardPlan product definition",
    tags: [],
  },
  {
    id: "features",
    title: "OnboardPlan features",
    keywords: ["features", "feature", "can", "does", "30/60/90 milestones", "Role-tuned goals", "Check-ins and owners", "First-week checklist"],
    body: "OnboardPlan includes: 30/60/90 milestones; Role-tuned goals; Check-ins and owners; First-week checklist. It does not add capabilities that are not listed here.",
    source: "OnboardPlan feature list",
    tags: [],
  },
  {
    id: "pricing",
    title: "OnboardPlan pricing",
    keywords: ["price", "pricing", "plan", "cost", "billing", "subscription", "monthly", "yearly"],
    body: "Listed prices for OnboardPlan: $15/month and $150/year. Checkout uses the in-app checkout route. This assistant cannot change a subscription or issue a refund.",
    source: "OnboardPlan pricing fields",
    tags: [],
  },
  {
    id: "howto",
    title: "How to use OnboardPlan",
    keywords: ["how", "start", "use", "tool", "run", "Build an onboarding plan"],
    body: "Open OnboardPlan and use Build an onboarding plan. The form asks for: Role; Seniority; Work mode.",
    source: "OnboardPlan tool fields",
    tags: [],
  },
  {
    id: "faq-1",
    title: "What is OnboardPlan?",
    keywords: ["What", "is", "OnboardPlan?"],
    body: "OnboardPlan builds a 30/60/90 day onboarding plan by role with check-ins and a first-week checklist.",
    source: "OnboardPlan FAQ",
    tags: [],
  },
  {
    id: "faq-2",
    title: "What inputs does it need?",
    keywords: ["What", "inputs", "does", "it", "need?"],
    body: "The role and a little context about the team or product.",
    source: "OnboardPlan FAQ",
    tags: [],
  },
  {
    id: "faq-3",
    title: "Does it include owners?",
    keywords: ["Does", "it", "include", "owners?"],
    body: "Yes. Check-ins list suggested owners so accountability is clear.",
    source: "OnboardPlan FAQ",
    tags: [],
  },
  {
    id: "honesty",
    title: "What this assistant will not claim",
    keywords: ["legal", "advice", "guarantee", "demo", "human", "refund", "support"],
    body: "Answers about OnboardPlan are decision support only, not legal, tax, accessibility-certification, or compliance sign-off. This assistant does not invent integrations, SSO, CSV export, or Slack connections unless they are already in the product description. If live AI is unavailable, the product must not pretend a demo result is live. Say you want a human and leave an email if you need a person.",
    source: "OnboardPlan support policy",
    tags: ["compliance"],
  },
];

function normalize(s: string): string {
  return (s || "").toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ");
}
function toWords(s: string): string[] {
  return normalize(s).split(/\s+/).map((w) => w.trim()).filter(Boolean);
}
function cjkBigrams(s: string): string[] {
  const grams: string[] = [];
  const han = /[\u4e00-\u9fff]/;
  for (const w of toWords(s)) {
    if (han.test(w) && w.length >= 2) {
      for (let i = 0; i < w.length - 1; i++) grams.push(w.slice(i, i + 2));
    }
  }
  return grams;
}
function scoreEntry(entry: KbEntry, query: string): number {
  const q = normalize(query);
  const qWords = new Set(toWords(q));
  const qGrams = new Set(cjkBigrams(q));
  let s = 0;
  for (const kw of entry.keywords) {
    const k = kw.toLowerCase();
    if (q.includes(k)) s += 3;
  }
  for (const tw of toWords(entry.title)) {
    if (qWords.has(tw)) s += 2;
  }
  const idx = normalize(entry.keywords.join(" ") + " " + entry.title + " " + entry.body.slice(0, 400));
  for (const g of qGrams) if (idx.includes(g)) s += 0.5;
  return s;
}

export interface RetrieveResult {
  entries: KbEntry[];
  topScore: number;
}

export function retrieve(query: string, topK = 4, entries: KbEntry[] = KB): RetrieveResult {
  const scored = entries
    .map((e) => ({ e, s: scoreEntry(e, query) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, topK);
  return { entries: scored.map((x) => x.e), topScore: scored.length ? scored[0].s : 0 };
}

export function isComplianceRelated(entries: KbEntry[]): boolean {
  return entries.some((e) => e.tags.includes("compliance"));
}
