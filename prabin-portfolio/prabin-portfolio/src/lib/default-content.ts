import { SiteContent } from "@/types/content";

export const DEFAULT_CONTENT: SiteContent = {
  siteSettings: {
    name: "Prabin Pandey",
    domain: "www.prabin.com",
    tagline: "Finance x Data x AI",
  },
  seo: {
    metaTitle: "Prabin Pandey - Finance, Data & AI Portfolio",
    metaDescription:
      "MS Financial Analysis candidate at Temple University.",
    keywords: "financial analysis, data science, AI",
  },
  hero: {
    greeting: "Hi, I'm",
    name: "Prabin Pandey",
    roles: ["Financial Analyst", "Data Scientist", "AI Enthusiast"],
    description:
      "MS Financial Analysis candidate at Temple University's Fox School of Business. I build financial models, data dashboards, and AI-powered tools that turn complex data into clear decisions.",
    ctaPrimary: "View Projects",
    ctaSecondary: "Download Resume",
    stats: [
      { label: "GPA", value: "3.98" },
      { label: "Projects", value: "12+" },
      { label: "Tools", value: "10+" },
      { label: "CFA", value: "L1" },
    ],
  },
  about: {
    bio: "I'm a finance professional pursuing my MS in Financial Analysis at Temple University's Fox School of Business. With a strong foundation in corporate valuation, derivative pricing, and machine learning, I bridge the gap between traditional finance and cutting-edge technology.",
    education: [
      {
        school: "Temple University, Fox School of Business",
        degree: "MS Financial Analysis",
        period: "Expected May 2026",
        gpa: "3.98",
        details:
          "Corporate Value Management, Asset Pricing, ML in Finance, Financial Time Series, Data Science in Finance, Derivative Valuation, AI in Portfolio Management",
        highlight: "CFA Level I Candidate",
      },
      {
        school: "Tribhuvan University",
        degree: "BBA",
        period: "Dec 2023",
        gpa: "3.81",
        details: "Business Administration with focus on Finance",
        highlight: "Valedictorian",
      },
    ],
    experience: [
      {
        company: "Sethi Clarity Advisers",
        role: "Associate Financial Consultant",
        period: "Sep 2025 - Present",
        bullets: [
          "Built financial projection tools (retirement income, net worth) using Bubble and Outgrow",
          "Produced personalized recommendations using inflation/tax/income assumptions",
          "Improved UX of interactive tools and data collection accuracy",
        ],
      },
      {
        company: "Temple University, Ambler Campus",
        role: "IT Consultant",
        period: "Jan 2025 - Present",
        bullets: [
          "Designed Power BI dashboard analyzing visitor traffic trends for budget allocation",
          "Provided technical support and troubleshooting across campus",
        ],
      },
      {
        company: "Global IME Bank",
        role: "Customer Relations Intern",
        period: "Mar - May 2023",
        bullets: [
          "Client guidance on banking/insurance products and risk profiles",
          "Transactions & audit documentation with Finacle CRM",
          "Collateral evaluations for lending decisions",
        ],
      },
    ],
    skills: [
      { name: "Excel", category: "Tools", level: 95 },
      { name: "Python", category: "Code", level: 85 },
      { name: "Power BI", category: "Viz", level: 90 },
      { name: "Tableau", category: "Viz", level: 85 },
      { name: "MySQL", category: "Code", level: 75 },
      { name: "R", category: "Code", level: 70 },
      { name: "Bloomberg", category: "Finance", level: 80 },
      { name: "FactSet", category: "Finance", level: 75 },
      { name: "Capital IQ", category: "Finance", level: 75 },
    ],
    certifications: ["CFA Level I Candidate"],
    now: "Deep-diving into AI applications in portfolio management at Temple. Building financial projection tools at Sethi Clarity Advisers. Preparing for CFA Level I.",
  },
  projects: [
    {
      id: "pe-model",
      title: "Private Equity Transaction & Debt Covenant Model",
      category: "Excel",
      year: "2024",
      summary:
        "Full 3-statement financial model with LBO analysis, debt covenant testing, and sensitivity scenarios.",
      tags: ["Financial Modeling", "LBO", "Debt Covenants"],
      tools: ["Excel"],
      metrics: ["3-statement model", "5+ scenarios", "Debt/EBITDA covenants"],
      featured: true,
      caseStudy: {
        problem:
          "Evaluate an LBO opportunity requiring comprehensive financial modeling with debt covenant compliance.",
        approach:
          "Built integrated 3-statement model with dynamic assumptions, multiple debt tranches, and scenario frameworks.",
        data: "Historical financials, comparable transactions, market rates, industry benchmarks.",
        methods:
          "IS/BS/CF integration; Debt waterfall; 2-way sensitivity tables; Covenant compliance dashboards.",
        results:
          "Fully dynamic model enabling rapid scenario testing. Identified optimal leverage ratios under stress.",
        learnings:
          "PE deal structuring, operational performance vs debt service interplay, covenant threshold dynamics.",
      },
      links: {},
      embed: null,
    },
    {
      id: "pbi-dash",
      title: "Visitor Traffic Dashboard - Temple University",
      category: "Power BI",
      year: "2025",
      summary:
        "Interactive Power BI dashboard analyzing campus visitor patterns for budget allocation and resource planning.",
      tags: ["Data Viz", "BI", "Analytics"],
      tools: ["Power BI", "Excel", "SQL"],
      metrics: ["Real-time insights", "Budget optimization", "Trend analysis"],
      featured: true,
      caseStudy: {
        problem:
          "Campus leadership needed data-driven insights into visitor patterns for resource allocation.",
        approach:
          "Interactive dashboards with drill-downs, time-series analysis, and comparative views.",
        data: "Visitor logs, scheduling data, historical traffic records.",
        methods:
          "DAX for YoY comparisons, rolling averages, peak detection. Interactive slicers.",
        results:
          "Enabled data-driven budget discussions. Identified peak periods and underutilized slots.",
        learnings:
          "Power BI analytics and translating operational data into executive insights.",
      },
      links: {},
      embed: {
        type: "powerbi",
        url: "",
        fallbackText:
          "Paste your Publish-to-web embed URL in Admin > Projects",
      },
    },
    {
      id: "tab-sector",
      title: "S&P 500 Sector Performance Tracker",
      category: "Tableau",
      year: "2025",
      summary:
        "Interactive Tableau dashboard tracking sector rotation, relative performance, and correlation across market cycles.",
      tags: ["Market Analysis", "Sector Rotation", "Visualization"],
      tools: ["Tableau", "Python"],
      metrics: ["11 sectors", "5-year analysis", "Correlation matrix"],
      featured: true,
      caseStudy: {
        problem:
          "Investors need visual tools to understand sector rotation and make allocation decisions.",
        approach:
          "Multi-layer interactive visualizations with drill-down capabilities.",
        data: "S&P 500 data, daily prices via Yahoo Finance API, sector classifications.",
        methods:
          "Rolling returns, Sharpe ratios, cross-sector correlations, parameter controls.",
        results:
          "Comprehensive sector analysis tool for identifying rotation trends.",
        learnings:
          "Advanced Tableau: parameter actions, LOD expressions, dashboard design.",
      },
      links: {},
      embed: {
        type: "tableau",
        url: "",
        fallbackText:
          "Paste your Tableau Public embed URL in Admin > Projects",
      },
    },
    {
      id: "tab-risk",
      title: "Portfolio Risk & Return Analyzer",
      category: "Tableau",
      year: "2025",
      summary:
        "Risk-return visualization with efficient frontier, VaR, and Monte Carlo simulation results.",
      tags: ["Portfolio Theory", "Risk Management", "Monte Carlo"],
      tools: ["Tableau", "Python", "NumPy"],
      metrics: ["Efficient frontier", "VaR 95%/99%", "10K simulations"],
      featured: false,
      caseStudy: {
        problem:
          "Portfolio managers need intuitive visualization of risk-return tradeoffs.",
        approach:
          "Combined Python quantitative analysis with Tableau visualization.",
        data: "Historical returns for 50+ assets, correlation matrices, simulated outcomes.",
        methods:
          "Mean-Variance Optimization, Monte Carlo, VaR (parametric & historical), CVaR.",
        results:
          "Interactive tool for exploring allocation impacts on risk-return profiles.",
        learnings:
          "Integrating quant finance theory with practical visualization.",
      },
      links: {},
      embed: {
        type: "tableau",
        url: "",
        fallbackText: "Paste Tableau Public embed URL in Admin",
      },
    },
    {
      id: "cfa-ch",
      title: "CFA Research Challenge - Amazon Analysis",
      category: "Python",
      year: "2024",
      summary:
        "Equity research on Amazon using Python + Bloomberg/Capital IQ. DCF, comps, real options with ESG integration.",
      tags: ["Equity Research", "DCF", "ESG", "Real Options"],
      tools: ["Python", "Bloomberg", "Capital IQ"],
      metrics: [
        "3 valuation methods",
        "5-year FCF forecast",
        "Full ESG/SWOT/Porter",
      ],
      featured: true,
      caseStudy: {
        problem:
          "Institutional-quality equity research and valuation of Amazon for CFA Research Challenge.",
        approach:
          "Multi-methodology valuation: DCF, trading comps, real options + qualitative analysis.",
        data: "Bloomberg financials, Capital IQ comps, SEC filings, industry reports, ESG ratings.",
        methods:
          "3-stage DCF; EV/EBITDA & P/E comps; Black-Scholes real options; DuPont; Porter's.",
        results:
          "Comprehensive equity research report with clear buy/sell recommendation.",
        learnings:
          "Institutional research workflows, multi-source analysis, professional presentation.",
      },
      links: {},
      embed: null,
    },
    {
      id: "genai",
      title: "Generative AI in Finance - Copilot Prototype",
      category: "GenAI Finance",
      year: "2025",
      summary:
        "Architecture, safety guardrails, and applications of generative AI in financial analysis workflows.",
      tags: ["GenAI", "LLM", "RAG", "Safety"],
      tools: ["Python", "LangChain", "OpenAI API"],
      metrics: ["RAG pipeline", "Safety framework", "Interactive demo"],
      featured: true,
      caseStudy: {
        problem:
          "Analysts spend time on repetitive tasks; deploying LLMs in finance needs accuracy and compliance.",
        approach:
          "RAG architecture for financial docs with multi-layer safety guardrails and human-in-the-loop.",
        data: "10-K/10-Q filings, earnings transcripts, market data, regulatory filings.",
        methods:
          "RAG with domain embeddings; prompt engineering; output validation; confidence scoring; audit trails.",
        results:
          "Working prototype analyzing earnings, extracting metrics, generating summaries with citations.",
        learnings:
          "AI in finance must prioritize accuracy. Guardrails and human oversight are non-negotiable.",
      },
      links: {},
      embed: null,
      isGenAI: true,
    },
  ],
  blog: [
    {
      id: "b1",
      title: "Why Financial Analysts Should Learn Python",
      date: "2025-01-15",
      excerpt:
        "The financial industry is adopting Python for risk modeling to algorithmic trading. Here's why.",
      content:
        "Python has become the lingua franca of quantitative finance...",
      published: true,
      tags: ["Python", "Finance"],
    },
  ],
  testimonials: [
    {
      name: "Professor Name",
      role: "Faculty, Fox School of Business",
      quote:
        "Prabin consistently demonstrates exceptional analytical skills and deep understanding of financial modeling.",
    },
    {
      name: "Colleague Name",
      role: "Sethi Clarity Advisers",
      quote:
        "Prabin's ability to translate complex financial concepts into intuitive tools is remarkable.",
    },
  ],
  contact: {
    email: "prabin.pandey@temple.edu",
    phone: "835-207-9312",
    location: "Philadelphia, PA",
    social: {
      linkedin: "https://linkedin.com/in/prabinpandey",
      github: "https://github.com/prabinpandey",
    },
    formMessage:
      "I'd love to hear from you. Drop me a message about opportunities or collaborations.",
  },
  resume: {
    buttonLabel: "Download Resume",
    filePath: "/resume/Prabin_Pandey_Resume.pdf",
  },
};
