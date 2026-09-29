// Initial content, sourced from the owner's GitHub profile/READMEs and dev.to
// account. Everything here is editable in /admin after seeding.
import { richText } from './lexical'

export const profile = {
  name: 'Richard Ochola',
  role: 'Full-Stack AI Engineer',
  location: 'Kisumu, Kenya',
  available: true,
  availabilityLabel: 'Available for work',
  headline: 'Engineering Intelligent\nSystems That Ship.',
  intro:
    "Hi, I'm Richard — a Full-Stack AI Engineer building RAG pipelines, autonomous agents and resilient microservices with Go, Python, Java and TypeScript.",
  marquee: [
    'Go',
    'Python',
    'TypeScript',
    'Java',
    'Next.js',
    'React',
    'FastAPI',
    'Spring Boot',
    'PostgreSQL',
    'Docker',
    'FAISS',
    'Bitcoin Lightning',
  ],
  story: richText(
    "**I'm Richard, a Full-Stack AI Engineer working where robust backend engineering, distributed microservices and autonomous AI systems meet.** I build end-to-end intelligent applications, from high-performance data pipelines to intuitive interfaces.",
    "**I care about systems that hold up in the real world:** retrieval pipelines that pair Go's concurrency with Python's ML ecosystem, payment flows over M-Pesa, Flutterwave and Bitcoin Lightning, and local-first apps that keep working on slow or offline connections.",
    'I sharpened my craft through ALX and Zone01 Kisumu, and I like building tools that help other developers learn — like JSLings and JavaLings, gamified practice environments inspired by Rustlings.',
  ),
  email: 'richardochola3@gmail.com',
  contactHeading: 'Your Vision, My Code\nLet’s Bring It To Life',
  contactBody:
    'Whether it is an AI assistant grounded in your own documents, a payments backend that has to keep working when a gateway goes down, or a web app your users will enjoy, I would love to hear about it.',
  socials: [
    { platform: 'github', url: 'https://github.com/ochola-rich' },
    { platform: 'linkedin', url: 'https://www.linkedin.com/in/richard-ochola/' },
    { platform: 'devto', url: 'https://dev.to/ochola' },
    { platform: 'x', url: 'https://x.com/ochola_rich' },
    { platform: 'youtube', url: 'https://www.youtube.com/@ochola-rich' },
  ],
} as const

export const siteSettings = {
  siteTitle: 'Richard Ochola — Full-Stack AI Engineer',
  description:
    'Portfolio of Richard Ochola, a Full-Stack AI Engineer building RAG pipelines, autonomous agents, payment systems and resilient microservices.',
}

const gh = (repo: string) => `https://github.com/ochola-rich/${repo}`

export const projects = [
  {
    title: 'Guidely',
    summary:
      'Internal Q&A assistant that searches company policies and guides, then answers in plain language with exact source citations.',
    year: 2026,
    category: 'AI, RAG & Web App',
    highlights: [
      {
        value: 'Cited answers',
        label: 'Every answer links back to the exact source passages it used.',
      },
      {
        value: 'Local embeddings',
        label: 'sentence-transformers + FAISS on disk — no embedding API key needed.',
      },
    ],
    stack: [
      'Python',
      'FastAPI',
      'FAISS',
      'sentence-transformers',
      'OpenRouter',
      'React',
      'Tailwind CSS',
      'shadcn/ui',
    ],
    description: richText(
      'Guidely ingests company policies, guides and FAQs, turns them into vector embeddings and answers questions through a **Retrieval-Augmented Generation** pipeline.',
      'Embeddings run locally with all-MiniLM-L6-v2 and are stored in a persistent FAISS index, so documents can be added, edited and removed by id. Answers are synthesised by an LLM through OpenRouter and always include the passages they came from.',
    ),
    repoUrl: gh('Guidely'),
    tint: 'blue',
    featured: true,
    order: 1,
  },
  {
    title: 'Loot',
    summary:
      'Tournament payments backend that collects entry fees and pays out prizes across mobile-money gateways with smart routing and fallback.',
    year: 2026,
    category: 'Payments & Backend',
    highlights: [
      {
        value: 'Multi-gateway',
        label: 'M-Pesa (Daraja) and Flutterwave with health-based routing and automatic fallback.',
      },
      {
        value: 'Virtual threads',
        label: 'Java 21 payout dispatcher built for bulk prize disbursals.',
      },
    ],
    stack: ['Java 21', 'Spring Boot', 'PostgreSQL', 'Flyway', 'Redis', 'Docker', 'Testcontainers'],
    description: richText(
      'Loot is a modular Spring Boot backend for gaming tournaments: **collect entry fees, then disburse prizes** over the payment rails players actually use.',
      'Gateways are orchestrated behind a common interface with health-based routing, retries and fallback. Integration tests run against real Postgres through Testcontainers.',
    ),
    repoUrl: gh('Loot'),
    tint: 'violet',
    featured: true,
    order: 2,
  },
  {
    title: 'Guardians of the Lake',
    summary:
      'Citizen-powered water quality monitoring for Lake Victoria, built for the Zone01 Kisumu GreenTech Hackathon 2026.',
    year: 2026,
    category: 'Hackathon · Civic Tech',
    highlights: [
      {
        value: 'Peer-verified',
        label: 'Reputation-weighted consensus and a SHA-256 hash ledger for every report.',
      },
      {
        value: 'Lightning rewards',
        label: 'Verified reporters earn sats instantly via LNbits, convertible to M-Pesa.',
      },
    ],
    stack: ['Go', 'Fiber', 'SQLite', 'WebSockets', 'Leaflet.js', 'LNbits'],
    description: richText(
      'Lakeside communities and fishermen capture **geo-tagged reports** of turbidity, algae blooms, spills and foul smells.',
      'Reports pass fraud checks and radius-based peer verification, are hashed into a verifiable ledger, appear on a live WebSocket map for institutions, and trigger Lightning micro-rewards.',
    ),
    repoUrl: gh('water-quality-solution'),
    tint: 'green',
    featured: true,
    order: 3,
  },
  {
    title: 'Intelligent Document Analyzer',
    summary:
      'Polyglot microservices platform for document ingestion, OCR and AI-driven document understanding — the foundation for a RAG pipeline.',
    year: 2026,
    category: 'AI & Microservices',
    highlights: [
      {
        value: 'Go · Java · Python',
        label: 'Go gateway, Spring Boot analytics and Python ML services.',
      },
      {
        value: 'OCR → vectors',
        label: 'Text extraction, embeddings and vector search behind one upload flow.',
      },
    ],
    stack: ['Go', 'Java', 'Spring Boot', 'Python', 'Docker'],
    description: richText(
      'A set of **independently deployable services**: a Go ingestion gateway that routes uploads, a Java service for metadata, statuses and analytics, and Python services for OCR, preprocessing and embeddings.',
    ),
    repoUrl: gh('Intelligent-Document-Analyzer'),
    tint: 'amber',
    featured: true,
    order: 4,
  },
  {
    title: 'SkillSats',
    summary:
      'Peer-to-peer skills platform where learners buy educational videos and earn rewards over Bitcoin Lightning.',
    year: 2026,
    category: 'Web App · Bitcoin',
    highlights: [
      {
        value: 'Lightning payments',
        label: 'Purchases and rewards settle through the LND REST API.',
      },
      {
        value: 'One-command dev',
        label: 'Bootstraps Postgres, migrations, seed data and a local regtest Lightning network.',
      },
    ],
    stack: ['TanStack Start', 'React', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'LND'],
    description: richText(
      'SkillSats is a **TanStack Start** application for selling educational videos with Bitcoin Lightning payments, developed against a headless Bitcoin Core regtest network with two LND nodes.',
    ),
    repoUrl: gh('SkillSats'),
    tint: 'rose',
    featured: true,
    order: 5,
  },
  {
    title: 'AgriSync',
    summary:
      'Mobile-first, offline-ready supply chain platform connecting smallholder farmers and collectors through a verifiable "Digital Handshake".',
    year: 2026,
    category: 'Local-first · AgriTech',
    stack: ['TypeScript', 'Go'],
    description: richText(
      'Built for **high-latency environments**, AgriSync lets field agents and farmers record secure, verifiable transactions even when connectivity is poor.',
    ),
    repoUrl: gh('Agri-sync'),
    tint: 'green',
    featured: false,
    order: 6,
  },
  {
    title: 'Editorial Pulse',
    summary:
      'Full-stack social network with real-time chat, notifications and group events in a bento-style layout.',
    year: 2026,
    category: 'Full-Stack Web App',
    stack: ['Go', 'SQLite', 'Gorilla WebSocket', 'Next.js', 'Tailwind CSS', 'Zustand'],
    description: richText(
      'A **Go** REST and WebSocket backend paired with a **Next.js** App Router frontend, orchestrated with Docker Compose.',
    ),
    repoUrl: gh('social-network'),
    tint: 'violet',
    featured: false,
    order: 7,
  },
  {
    title: 'JSLings',
    summary:
      'Rustlings-inspired, gamified JavaScript practice environment that runs locally and integrates with VS Code.',
    year: 2026,
    category: 'Developer Tooling',
    stack: ['JavaScript', 'Node.js', 'Shell'],
    description: richText(
      'Seven progressive exercise tracks — from primitives to async and multi-concept capstones — with a **watch mode** that re-runs checks as you edit.',
    ),
    repoUrl: gh('js-lings'),
    tint: 'amber',
    featured: false,
    order: 8,
  },
] as const

export const services = [
  {
    category: 'AI & RAG',
    title: 'RAG *Knowledge* Assistant',
    description:
      'A question-answering assistant grounded in your own documents, with answers that cite their sources.',
    features: [
      'Document ingestion and chunking',
      'Vector search (FAISS or pgvector)',
      'Cited, source-grounded answers',
      'Admin tools to add and update documents',
    ],
    order: 1,
  },
  {
    category: 'AI & RAG',
    title: 'AI *Agent* Integration',
    description:
      'Autonomous agents that can safely call your APIs and tools, with clear schemas and guardrails.',
    features: [
      'Tool and API schema design',
      'Sandboxed execution',
      'LLM provider integration',
      'Logging and evaluation',
    ],
    order: 2,
  },
  {
    category: 'Backend & Payments',
    title: 'Payments *Integration*',
    description:
      'Collections and payouts over M-Pesa, Flutterwave and other gateways, built to survive provider outages.',
    features: [
      'M-Pesa Daraja and Flutterwave',
      'Routing, retries and fallback',
      'Webhooks and reconciliation',
      'Integration tests',
    ],
    order: 3,
  },
  {
    category: 'Backend & Payments',
    title: 'APIs & *Microservices*',
    description:
      'Fast, well-tested services in Go, Java or Python with clean boundaries between them.',
    features: [
      'REST and WebSocket APIs',
      'PostgreSQL / SQLite data layer',
      'Dockerised deployment',
      'Automated tests',
    ],
    order: 4,
  },
  {
    category: 'Web Apps',
    title: 'Full-Stack *Web App*',
    description:
      'A production-ready web application with a modern React/Next.js frontend and a solid backend.',
    features: [
      'Next.js or React frontend',
      'Responsive on every device',
      'Authentication and admin',
      'Deployment and handover',
    ],
    order: 5,
  },
  {
    category: 'Web Apps',
    title: 'Offline-First *Apps*',
    description: 'Apps that keep working on poor connections and sync reliably once back online.',
    features: [
      'Local-first data and caching',
      'Background sync',
      'Conflict handling',
      'Mobile-first UI',
    ],
    order: 6,
  },
] as const

// From https://dev.to/ochola — excerpts are the articles' own opening lines.
export const posts = [
  {
    title: 'The Death of the Front End',
    excerpt:
      'We spent thirty years building the web for human eyes. We may have gotten it wrong. We stopped searching and started asking — and that shift is the opening chapter of a much bigger story about what the internet is actually for.',
    externalUrl: 'https://dev.to/ochola/the-death-of-the-front-end-4eog',
    platform: 'devto',
    publishedAt: '2026-06-03T18:15:10.000Z',
    readingTime: 3,
    tags: ['ai', 'webdev', 'agents', 'career'],
    coverUrl:
      'https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F8ihuluwm5t7eampgrtmn.png',
  },
  {
    title: 'Mistakes every Go beginner makes. Part 1: Time Complexity Issues',
    excerpt:
      'When you start learning Go, the syntax feels clean and the speed feels amazing. But there is a trap: code that works perfectly for small inputs and crawls as the data grows. Here are the two silent performance killers I found in my own ASCII Art Generator.',
    externalUrl:
      'https://dev.to/ochola/mistakes-every-go-beginner-makes-part-1-time-complexity-issues-4ao5',
    platform: 'devto',
    publishedAt: '2026-02-03T11:43:15.000Z',
    readingTime: 3,
    tags: ['go', 'programming', 'beginners', 'devops'],
    coverUrl:
      'https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fx4qkp9he4sng4yt7jegr.png',
  },
] as const
