// Realistic Canadian CPA sample data — Toronto / GTA flavored.

export type Client = {
  id: string;
  slug: string;
  name: string;
  service: "bookkeeping" | "tax" | "both";
  contact: string;
  initials: string;
  color: "olive" | "moss" | "rust" | "slate";
  flags_red: number;
  flags_amber: number;
  period: string;
  progress: number;
};

export const FIRM = {
  name: "Eastlake & Cho CPA",
  tagline: "Chartered Professional Accountants",
  city: "Toronto, ON",
  year_end_default: "Dec 31",
};

export const STAFF = [
  { id: "u1", initials: "MC", name: "Maya Chen, CPA",  role: "Partner", avatar: "olive" },
  { id: "u2", initials: "DE", name: "Devon Eastlake",  role: "Partner", avatar: "moss"  },
  { id: "u3", initials: "PS", name: "Priya Shah",      role: "Senior",  avatar: "rust"  },
  { id: "u4", initials: "JN", name: "Jordan Nakamura", role: "Staff",   avatar: "slate" },
];

export const CATEGORIES = [
  "revenue", "cogs", "rent", "utilities", "telecommunications",
  "office_supplies", "software_subscriptions", "professional_services",
  "insurance", "vehicle_travel", "meals_entertainment", "wages_payroll",
  "bank_merchant_fees", "owner_distribution",
];

export const CLIENTS: Client[] = [
  { id:"c1",  slug:"larchmont",   name:"Larchmont Roastery Ltd.",    service:"both",        contact:"Hana Park",       initials:"LR", color:"olive", flags_red:3, flags_amber:5, period:"May 2026", progress:72 },
  { id:"c2",  slug:"bayview",     name:"Bayview Dental Group",       service:"bookkeeping", contact:"Dr. Anil Mehta",  initials:"BD", color:"moss",  flags_red:0, flags_amber:2, period:"May 2026", progress:94 },
  { id:"c3",  slug:"kewbeach",    name:"Kew Beach Bicycle Co.",      service:"bookkeeping", contact:"Ravi Singh",      initials:"KB", color:"rust",  flags_red:1, flags_amber:0, period:"Apr 2026", progress:100 },
  { id:"c4",  slug:"okonkwo",     name:"H. Okonkwo (T1 Personal)",   service:"tax",         contact:"Hannah Okonkwo",  initials:"HO", color:"slate", flags_red:2, flags_amber:1, period:"TY2025",   progress:60 },
  { id:"c5",  slug:"mistral",     name:"Mistral Studio Inc.",        service:"both",        contact:"Léa Tremblay",    initials:"MS", color:"olive", flags_red:0, flags_amber:7, period:"May 2026", progress:38 },
  { id:"c6",  slug:"riverdale",   name:"Riverdale Yoga Co-op",       service:"bookkeeping", contact:"Amelia Reyes",    initials:"RY", color:"moss",  flags_red:0, flags_amber:0, period:"May 2026", progress:100 },
  { id:"c7",  slug:"muller",      name:"P. Müller (T1 Personal)",    service:"tax",         contact:"Peter Müller",    initials:"PM", color:"rust",  flags_red:0, flags_amber:0, period:"TY2025",   progress:100 },
  { id:"c8",  slug:"trinity",     name:"Trinity HVAC Services Ltd.", service:"both",        contact:"Marcus Doyle",    initials:"TH", color:"slate", flags_red:4, flags_amber:8, period:"May 2026", progress:22 },
  { id:"c9",  slug:"casaloma",    name:"Casa Loma Florals Inc.",     service:"bookkeeping", contact:"Sienna Costa",    initials:"CL", color:"olive", flags_red:0, flags_amber:3, period:"May 2026", progress:81 },
  { id:"c10", slug:"bouchard",    name:"A. Bouchard (T1 Personal)",  service:"tax",         contact:"Amélie Bouchard", initials:"AB", color:"moss",  flags_red:1, flags_amber:2, period:"TY2025",   progress:45 },
  { id:"c11", slug:"northjct",    name:"North Junction Coffee Ltd.", service:"both",        contact:"Theo Almasi",     initials:"NJ", color:"rust",  flags_red:0, flags_amber:1, period:"May 2026", progress:91 },
  { id:"c12", slug:"donmillsvet", name:"Don Mills Veterinary Ltd.",  service:"bookkeeping", contact:"Dr. Jane Liu",    initials:"DV", color:"slate", flags_red:2, flags_amber:4, period:"May 2026", progress:55 },
];

export function getClientBySlug(slug: string) {
  return CLIENTS.find(c => c.slug === slug);
}

export type Txn = {
  id: string;
  date: string;
  vendor: string;
  memo: string;
  amount: number;
  hst: number;
  category: string;
  confidence: number;
  flag: "red" | "amber" | null;
};

export const LARCHMONT_TXNS: Txn[] = [
  { id:"t1",  date:"2026-05-02", vendor:"Stumptown Coffee Importers",   memo:"Green bean import — Ethiopia", amount: 4280.00, hst: 556.40, category:"cogs",                  confidence:0.991, flag:null },
  { id:"t2",  date:"2026-05-02", vendor:"Toronto Hydro",                memo:"Electricity — Apr 2026",        amount:  412.18, hst:  53.58, category:"utilities",             confidence:0.998, flag:null },
  { id:"t3",  date:"2026-05-03", vendor:"Bell Canada",                  memo:"POS & internet line",            amount:  189.95, hst:  24.69, category:"telecommunications",    confidence:0.997, flag:null },
  { id:"t4",  date:"2026-05-04", vendor:"Square Canada",                memo:"Card processing — wk 18",        amount:  238.42, hst:  31.00, category:"bank_merchant_fees",    confidence:0.995, flag:null },
  { id:"t5",  date:"2026-05-05", vendor:"De Mello Palheta",             memo:"Espresso blend, 24kg",           amount:  928.00, hst: 120.64, category:"cogs",                  confidence:0.972, flag:"red"  },
  { id:"t6",  date:"2026-05-06", vendor:"Greg's Auto Detail",           memo:"Owner vehicle — receipt unclear",amount:  185.00, hst:  24.05, category:"vehicle_travel",        confidence:0.961, flag:"red"  },
  { id:"t7",  date:"2026-05-07", vendor:"Allstate Insurance",           memo:"Liability policy renewal",       amount:  742.00, hst:    0.00, category:"insurance",             confidence:0.999, flag:null },
  { id:"t8",  date:"2026-05-08", vendor:"Indigo Books",                 memo:"Reading material — for café",    amount:   82.40, hst:  10.71, category:"office_supplies",       confidence:0.978, flag:"amber"},
  { id:"t9",  date:"2026-05-10", vendor:"Sysco Toronto",                memo:"Pastry & dairy delivery",        amount: 1142.65, hst: 148.54, category:"cogs",                  confidence:0.994, flag:null },
  { id:"t10", date:"2026-05-12", vendor:"Liberty Village Property Mgmt",memo:"Rent — May 2026",                amount: 6800.00, hst: 884.00, category:"rent",                  confidence:1.000, flag:null },
  { id:"t11", date:"2026-05-12", vendor:"Notion Labs",                  memo:"Team subscription",              amount:  128.00, hst:  16.64, category:"software_subscriptions",confidence:0.989, flag:null },
  { id:"t12", date:"2026-05-13", vendor:"The Coffee Equipment Co.",     memo:"Grinder burr replacement",       amount:  314.50, hst:  40.89, category:"cogs",                  confidence:0.967, flag:"red"  },
  { id:"t13", date:"2026-05-14", vendor:"PayWorks Payroll Inc.",        memo:"Bi-weekly payroll run",          amount: 9842.10, hst:    0.00, category:"wages_payroll",         confidence:1.000, flag:null },
  { id:"t14", date:"2026-05-15", vendor:"Tim Hortons #2841",            memo:"Staff meeting coffee",           amount:   27.65, hst:   3.59, category:"meals_entertainment",   confidence:0.983, flag:"amber"},
  { id:"t15", date:"2026-05-16", vendor:"Staples Business Depot",       memo:"Receipt rolls + sleeves",        amount:   86.20, hst:  11.21, category:"office_supplies",       confidence:0.996, flag:null },
];

export type FlagInbox = {
  id: string;
  client: string;
  slug: string;
  initials: string;
  color: string;
  kind: "low_confidence" | "hst_mismatch" | "slip_missing_field" | "intake_answer";
  target: string;
  note: string;
  color_flag: "red" | "amber";
  age: string;
  assignee: string;
};

export const FLAGS_INBOX: FlagInbox[] = [
  { id:"f1",  client:"Larchmont Roastery Ltd.",  slug:"larchmont",   initials:"LR", color:"olive", kind:"low_confidence",     target:"De Mello Palheta — $928.00",      note:"Vendor name partially OCR'd; category inferred from history.", color_flag:"red",   age:"2h", assignee:"MC" },
  { id:"f2",  client:"Trinity HVAC Services",    slug:"trinity",     initials:"TH", color:"slate", kind:"hst_mismatch",       target:"Acklands-Grainger — $1,284.20",   note:"Extracted HST $158.95 vs computed $166.94. Δ $7.99.",         color_flag:"red",   age:"3h", assignee:"DE" },
  { id:"f3",  client:"H. Okonkwo (T1)",          slug:"okonkwo",     initials:"HO", color:"slate", kind:"slip_missing_field", target:"T4 — Stardust Theatre Inc.",       note:"Box 14 reads $0.00 but Box 22 (tax) is $4,128.40.",           color_flag:"red",   age:"5h", assignee:"PS" },
  { id:"f4",  client:"Larchmont Roastery Ltd.",  slug:"larchmont",   initials:"LR", color:"olive", kind:"low_confidence",     target:"Greg's Auto Detail — $185.00",     note:"Personal vs business use ambiguous.",                          color_flag:"red",   age:"5h", assignee:"MC" },
  { id:"f5",  client:"Mistral Studio Inc.",      slug:"mistral",     initials:"MS", color:"olive", kind:"low_confidence",     target:"Air Canada — $1,847.32",            note:"Travel — needs client purpose note.",                          color_flag:"amber", age:"1d", assignee:"JN" },
  { id:"f6",  client:"Trinity HVAC Services",    slug:"trinity",     initials:"TH", color:"slate", kind:"low_confidence",     target:"Petro-Canada (8x)",                 note:"Frequent fuel-up; verify vehicle assignment.",                  color_flag:"amber", age:"1d", assignee:"PS" },
  { id:"f7",  client:"Casa Loma Florals",        slug:"casaloma",    initials:"CL", color:"olive", kind:"low_confidence",     target:"Loblaws #1124 — $214.80",           note:"Mixed personal + business groceries?",                          color_flag:"amber", age:"2d", assignee:"JN" },
  { id:"f8",  client:"Larchmont Roastery Ltd.",  slug:"larchmont",   initials:"LR", color:"olive", kind:"low_confidence",     target:"The Coffee Equipment Co. — $314.50",note:"Capital vs expense — confirm <$500 threshold.",                color_flag:"red",   age:"2d", assignee:"MC" },
  { id:"f9",  client:"Don Mills Veterinary",     slug:"donmillsvet", initials:"DV", color:"slate", kind:"hst_mismatch",       target:"Henry Schein Canada — $4,210.55",   note:"Mixed zero-rated + taxable supply line.",                       color_flag:"red",   age:"3d", assignee:"DE" },
  { id:"f10", client:"A. Bouchard (T1)",         slug:"bouchard",    initials:"AB", color:"moss",  kind:"intake_answer",      target:"Q6 — Medical expenses",             note:"Client uploaded receipt; needs verification vs $2,635 claim.", color_flag:"amber", age:"3d", assignee:"PS" },
];

export const TAX_INTAKE = [
  { id:"q1",  q:"What was your marital status on Dec 31, 2025?",                       a:"Married (spouse — Daniel Okonkwo)",                                       status:"accepted", doc:null },
  { id:"q2",  q:"List dependents claimed in 2025.",                                     a:"2 — Esi (age 8), Kojo (age 11)",                                          status:"accepted", doc:null },
  { id:"q3",  q:"Did you change residency in 2025?",                                    a:"No.",                                                                      status:"accepted", doc:null },
  { id:"q4",  q:"Employment income — list all employers.",                              a:"Stardust Theatre Inc. (primary), King St West Catering (secondary).",    status:"accepted", doc:"2 T4s attached" },
  { id:"q5",  q:"RRSP contributions made in 2025 + first 60 days 2026.",                a:"$11,200 total across 6 deposits.",                                         status:"flagged",  doc:"RRSP receipt — TD" },
  { id:"q6",  q:"Eligible medical expenses (self + family).",                           a:"$2,635 — prescription glasses, dental, physio.",                           status:"flagged",  doc:"Compiled PDF (4 pages)" },
  { id:"q7",  q:"Charitable donations.",                                                a:"$840 — UNICEF Canada, Daily Bread Food Bank.",                            status:"accepted", doc:"2 receipts" },
  { id:"q8",  q:"Tuition (self or transferred from dependent).",                        a:"None this year.",                                                          status:"accepted", doc:null },
  { id:"q9",  q:"Did you sell a principal residence in 2025?",                          a:"No.",                                                                      status:"accepted", doc:null },
  { id:"q10", q:"Did you hold foreign property > CAD $100k?",                           a:"No.",                                                                      status:"pending",  doc:null },
];

export type Slip = {
  id: string;
  kind: string;
  issuer: string;
  amount: string;
  flag: "red" | "amber" | null;
  reason: string;
};

export const SLIPS: Slip[] = [
  { id:"s1", kind:"T4",    issuer:"Stardust Theatre Inc.", amount:"Box 14: $58,420.00", flag:"red",   reason:"Box 14 == 0 but Box 22 > 0; ambiguous." },
  { id:"s2", kind:"T4",    issuer:"King St West Catering", amount:"Box 14: $14,228.50", flag:null,    reason:"" },
  { id:"s3", kind:"T5",    issuer:"TD Direct Investing",   amount:"Box 24: $612.80",    flag:null,    reason:"" },
  { id:"s4", kind:"T3",    issuer:"Vanguard Canada",       amount:"Box 26: $1,148.20",  flag:null,    reason:"" },
  { id:"s5", kind:"RRSP",  issuer:"TD Canada Trust",       amount:"$11,200.00",         flag:"amber", reason:"Receipt split across 6 deposits — verify total." },
  { id:"s6", kind:"T2202", issuer:"University of Toronto", amount:"Months: 0",          flag:null,    reason:"Not applicable in TY2025." },
];

export type AuditKind = "period" | "flag" | "link" | "system" | "tax" | "upload";
export const AUDIT_ENTRIES: { at: string; who: string; what: string; target: string; kind: AuditKind }[] = [
  { at:"14:42", who:"Maya Chen",       what:"approved period",     target:"Bayview Dental Group · Apr 2026", kind:"period" },
  { at:"14:39", who:"Maya Chen",       what:"resolved 2 flags",    target:"Bayview Dental Group · Apr 2026", kind:"flag"   },
  { at:"14:21", who:"Devon Eastlake",  what:"sent magic link",     target:"Larchmont Roastery — Hana Park",  kind:"link"   },
  { at:"13:58", who:"system",          what:"extracted document",  target:"Trinity HVAC · ACK-Grainger.pdf", kind:"system" },
  { at:"13:42", who:"Priya Shah",      what:"accepted T4 slip",    target:"H. Okonkwo · Stardust Theatre",   kind:"tax"    },
  { at:"13:17", who:"Hana Park (cli)", what:"uploaded 3 documents",target:"Larchmont Roastery · May 2026",   kind:"upload" },
  { at:"12:55", who:"Maya Chen",       what:"reassigned flag",     target:"Mistral Studio · Air Canada",     kind:"flag"   },
  { at:"12:31", who:"Jordan Nakamura", what:"created period",      target:"Casa Loma Florals · May 2026",    kind:"period" },
  { at:"11:48", who:"system",          what:"retention purge",     target:"3 raw PDFs · A. Bouchard TY2024", kind:"system" },
  { at:"11:02", who:"Devon Eastlake",  what:"approved period",     target:"Kew Beach Bicycle · Apr 2026",    kind:"period" },
  { at:"10:44", who:"Priya Shah",      what:"opened tax intake",   target:"A. Bouchard · TY2025",            kind:"tax"    },
  { at:"09:30", who:"system",          what:"flag reminder sent",  target:"Trinity HVAC · 2 open flags",     kind:"system" },
];

export const SHEETS = [
  { name:"P&L Summary",           rows:38 },
  { name:"HST Summary",           rows:14 },
  { name:"Balance Sheet Support", rows:22 },
  { name:"Transactions",          rows:147 },
  { name:"Flags & Notes",         rows:8  },
  { name:"Source Documents Idx",  rows:64 },
];

export const PAST_REPORTS = [
  { period: "Apr 2026", hash: "e9c1a4f7b8d2c531a9e6b3d8f2a1c4e9b7d2a8c1", approved: "Maya Chen · May 06" },
  { period: "Mar 2026", hash: "a8c1e4f2b9d7c531a4e8b3d1f9a7c2e6b8d3a1c2", approved: "Maya Chen · Apr 04" },
  { period: "Feb 2026", hash: "b3c7e9f1a4d2c531e8a6b9d7f3a2c1e4b7d8a3c5", approved: "Devon Eastlake · Mar 05" },
  { period: "Jan 2026", hash: "c1d4e7a3b9f2c531a8e6b2d4f7a1c3e9b5d8a2c6", approved: "Maya Chen · Feb 06" },
];

export function avatarBg(color: string) {
  switch (color) {
    case "olive": return "oklch(88% 0.04 130)";
    case "moss":  return "oklch(88% 0.04 155)";
    case "rust":  return "oklch(88% 0.05 50)";
    case "slate": return "oklch(88% 0.02 250)";
    default:      return "oklch(90% 0.005 100)";
  }
}

export function fmtMoney(n: number) {
  return n.toLocaleString("en-CA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
