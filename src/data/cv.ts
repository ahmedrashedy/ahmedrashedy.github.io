export const site = {
  name: 'Ahmed Rashedy Mohammed',
  initials: 'AR',
  role: 'Odoo Project Manager & ERP Delivery Consultant',
  tagline: 'I help businesses implement Odoo end-to-end — from discovery to go-live and beyond.',
  location: 'Cairo, Egypt',
  email: 'ahmedrashedy001@gmail.com',
  phone: '+201122079077',
  phoneDisplay: '+20 112 207 9077',
  whatsapp: 'https://wa.me/201122079077',
  linkedin: 'https://www.linkedin.com/in/ahmed-rashedy-mohammed',
  github: 'https://github.com/ahmedrashedy',
  calendly: '#contact',
  ctaLabel: 'Book a Discovery Call',

  hero: {
    promise: 'Odoo projects, delivered.',
    sub: 'Discovery, scoping, and end-to-end implementation for Manufacturing, Retail, and eCommerce — led by a senior PM with 6+ years and 20+ implementations across 3M EGP budgets.',
    primaryCta: 'Book a Discovery Call',
    secondaryCta: 'See Services',
  },

  stats: [
    { value: '6+', label: 'Years delivering Odoo' },
    { value: '20+', label: 'Implementations shipped' },
    { value: '6', label: 'Industries covered' },
    { value: '100%', label: 'On-time delivery track record' },
  ],

  services: [
    {
      key: 'presales',
      title: 'Pre-Sales & Scoping',
      summary: 'Win the deal with confidence — and the right foundation.',
      deliverables: [
        'Stakeholder discovery workshops',
        'Business process mapping (As-Is / To-Be)',
        'Tailored product demos & proof of concepts',
        'Solution architecture & module selection',
        'Effort estimation & phased budget plan',
        'Executive-ready proposal & risk register',
      ],
      idealFor: 'Sales teams, solution architects, and founders preparing an Odoo rollout.',
      engagement: '2–4 weeks · Fixed scope',
    },
    {
      key: 'implementation',
      title: 'End-to-End Implementation',
      summary: 'Full-cycle delivery from kickoff to go-live.',
      deliverables: [
        'Project plan, governance & RAID logs',
        'Functional specifications & data model design',
        'Module configuration & custom development oversight',
        'Integration with third-party platforms (payments, shipping, eCommerce)',
        'User acceptance testing & training programs',
        'Go-live cutover plan & hypercare support',
      ],
      idealFor: 'Companies committing to a multi-month Odoo rollout.',
      engagement: '3–18 months · Phased delivery',
      featured: true,
    },
    {
      key: 'optimization',
      title: 'Post-Go-Live Optimization',
      summary: 'Stabilize, optimize, and scale what you already have.',
      deliverables: [
        'Health audit of existing Odoo instance',
        'Performance & workflow bottleneck analysis',
        'Module upgrades (v14 → v17 migrations)',
        'Process re-engineering & automation',
        'Team enablement & best-practice workshops',
        'Ongoing fractional PM advisory',
      ],
      idealFor: 'Businesses live on Odoo that need a senior review of what is working — and what is not.',
      engagement: 'Monthly retainer or scoped sprints',
    },
    {
      key: 'consulting',
      title: 'Fractional ERP Leadership',
      summary: 'Senior delivery expertise without the full-time cost.',
      deliverables: [
        'Acting PM/PDM for in-flight implementations',
        'Vendor evaluation & Odoo partner selection',
        'Executive steering committee representation',
        'Delivery rescue & escalation management',
        'Internal team coaching & PMP-aligned practices',
      ],
      idealFor: 'Startups and SMEs that need senior ERP leadership on demand.',
      engagement: 'Days per month · Flexible',
    },
  ],

  process: [
    {
      step: '01',
      title: 'Discovery',
      description: 'We align on vision, scope, constraints, and success criteria in a structured kickoff.',
      outputs: ['Charter', 'Stakeholder map', 'Success metrics'],
    },
    {
      step: '02',
      title: 'Design',
      description: 'Process mapping, architecture, and module selection — sealed before a single ticket is built.',
      outputs: ['Functional spec', 'Solution design', 'Risk register'],
    },
    {
      step: '03',
      title: 'Build',
      description: 'Phased sprints with continuous demos, UAT, and quality gates.',
      outputs: ['Sprint reviews', 'UAT sign-off', 'Training plan'],
    },
    {
      step: '04',
      title: 'Go-Live',
      description: 'Cutover, hypercare, and a measured handover to your internal team.',
      outputs: ['Cutover plan', 'Hypercare report', 'Knowledge transfer'],
    },
  ],

  industries: [
    {
      name: 'Manufacturing',
      icon: 'factory',
      highlights: ['Bill of Materials & MRP', 'Multi-company consolidation', 'Shop floor work orders', 'Cost accounting'],
    },
    {
      name: 'Retail & POS',
      icon: 'store',
      highlights: ['Multi-store POS', 'Loyalty & promotions', 'Centralized accounting', 'Inventory replenishment'],
    },
    {
      name: 'eCommerce',
      icon: 'shopping-cart',
      highlights: ['Storefront integrations', 'Shipping APIs (custom)', 'Order fulfillment pipelines', 'Returns & RMA'],
    },
    {
      name: 'Distribution',
      icon: 'truck',
      highlights: ['Multi-warehouse routing', 'Purchase & sales workflows', 'Landed cost', 'Vendor management'],
    },
    {
      name: 'Professional Services',
      icon: 'briefcase',
      highlights: ['Project billing', 'Timesheets', 'Subscription management', 'Resource planning'],
    },
    {
      name: 'F&B / Hospitality',
      icon: 'utensils',
      highlights: ['Table management', 'Kitchen display', 'Recipe & costing', 'Multi-branch central kitchen'],
    },
  ],

  caseStudies: [
    {
      client: 'E-Boutiques Group',
      industry: 'eCommerce · Multi-store',
      duration: '18 months',
      scope: 'Multi-website Odoo rollout + custom shipping API integration',
      challenge:
        'A growing eCommerce group with disconnected online stores and manual shipment tracking that crippled operations visibility.',
      solution:
        'Led a multi-stream implementation across web, warehouse, and POS — culminating in a custom API integration with local shipping providers to replace the manual workflow.',
      result:
        '100% automated real-time shipment tracking delivered in 2 months. Centralized multi-store operations under one Odoo instance.',
      metrics: [
        { value: '100%', label: 'Tracking automated' },
        { value: '2 mo.', label: 'API delivery' },
        { value: '18 mo.', label: 'Project scope' },
      ],
      featured: true,
    },
    {
      client: 'Gromaan & Keem',
      industry: 'Manufacturing · MRP',
      duration: '12 months',
      scope: 'Multi-company MRP, production planning, inventory optimization',
      challenge:
        'Two manufacturing entities with fragmented production data, manual planning, and disconnected stock movements.',
      solution:
        'Designed and rolled out a multi-company Odoo MRP environment with consolidated procurement, planning, and cost accounting.',
      result:
        'Optimized production planning, real-time inventory tracking, and unified reporting across both entities.',
      metrics: [
        { value: '2', label: 'Companies unified' },
        { value: 'Real-time', label: 'Planning' },
        { value: '12 mo.', label: 'Delivery' },
      ],
    },
    {
      client: 'Hatem & Charcoal',
      industry: 'Restaurant Group · Kuwait',
      duration: '9 months',
      scope: 'Multi-branch POS + centralized accounting + inventory',
      challenge:
        'A regional restaurant group operating branches in Kuwait with no central visibility over sales, stock, or finance.',
      solution:
        'Deployed a centralized Odoo architecture with branch-level POS, automated inter-warehouse replenishment, and consolidated accounting.',
      result:
        'Single source of truth across all branches, with live P&L visibility for the executive team.',
      metrics: [
        { value: 'Multi', label: 'Branch chain' },
        { value: 'Live', label: 'P&L visibility' },
        { value: '9 mo.', label: 'Delivery' },
      ],
    },
  ],

  about: {
    intro:
      "I'm Ahmed — a Senior Odoo Project Manager based in Cairo, working with clients across MENA and beyond. For the last 6+ years I've led end-to-end ERP rollouts for manufacturers, retailers, and online merchants — translating C-level goals into shipped systems.",
    differentiators: [
      'Odoo Certified Functional Professional (v16)',
      'PMP-aligned delivery practices across every engagement',
      'Bridge between business stakeholders, functional teams, and developers',
      'Hands-on with complex integrations and multi-company set-ups',
      'AI-augmented delivery — using modern AI tools to accelerate discovery, sharpen specifications, and ship higher-quality outcomes on tighter timelines',
    ],
  },

  testimonials: [
    {
      quote:
        "Ahmed runs a project the way you'd want your own team to run it — with crystal-clear scope, honest trade-offs, and zero surprises at go-live.",
      name: 'Operations Director',
      company: 'eCommerce Group (MENA)',
    },
    {
      quote:
        'He took over a half-built implementation and turned it into a delivered system. His ability to align stakeholders is rare.',
      name: 'CTO',
      company: 'Manufacturing Holding',
    },
    {
      quote:
        'Practical, calm, and uncompromising on quality. We trust him with multi-branch rollouts we would not trust anyone else with.',
      name: 'Founder',
      company: 'Restaurant Group (KW)',
    },
  ],

  faq: [
    {
      q: 'What size of projects do you take on?',
      a: 'I work best with implementations in the EGP 250K to EGP 3M range, but I also take scoped sprints (Discovery, Optimization, Health Audit) for smaller engagements.',
    },
    {
      q: 'Do you work with in-house teams or replace them?',
      a: 'I always augment, never replace. My engagement model is to lead delivery while upskilling your internal team so you own the system long after go-live.',
    },
    {
      q: 'Which Odoo versions do you support?',
      a: 'I have shipped implementations on Odoo v14 through v17 and stay current with each release cycle. Migrations between versions are a core part of my Optimization service.',
    },
    {
      q: 'Are you an Odoo partner?',
      a: 'I work as an independent consultant. For partner-grade certified development resources, I bring in trusted collaborators I have shipped with repeatedly.',
    },
    {
      q: 'How do you charge for engagements?',
      a: 'Pre-Sales sprints and Discovery are fixed-scope. Implementation is structured as a phased monthly retainer tied to deliverables. Optimization is a flexible monthly pool of days.',
    },
    {
      q: 'What is your typical response time?',
      a: 'Within 24 hours on business days. Active engagements get same-day response on blockers.',
    },
  ],
};

export type Site = typeof site;