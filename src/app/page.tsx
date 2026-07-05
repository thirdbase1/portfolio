"use client";

import { useState, useRef, KeyboardEvent } from "react";

const projects = [
  { title: "Open-Agent Vercel", badge: "Live", repo: "thirdbase1/open-agent_vercel", href: "https://github.com/thirdbase1/open-agent_vercel", desc: "Multi-agent coding platform on Vercel Sandbox — three-layer architecture: web UI → durable agent workflow → isolated microVM, with snapshot-based resume and hibernate. ~3.1M LOC TypeScript.", tags: ["TypeScript", "Vercel Sandbox", "Multi-Agent", "Docker"] },
  { title: "oneshotsx", badge: "3★", repo: "thirdbase1/Something-good-and-problem-solving-", href: "https://github.com/thirdbase1/Something-good-and-problem-solving-", desc: "The Agentic Standard Library — a typed, npm-installable SDK. Composable One-Shot primitives: self-healing execution core, captured shell, intelligent file ops, deep-research orchestrator, and an LLM tool-definitions connector.", tags: ["TypeScript", "Agent SDK", "Node.js", "OpenRouter"] },
  { title: "Gitcode", badge: "Repo", repo: "thirdbase1/Gitcode", href: "https://github.com/thirdbase1/Gitcode", desc: "A realtime AI software-engineering OS where code, repos, terminals, and AI reasoning live in one surface. Next.js + Monaco + xterm.js frontend; FastAPI + Go PTY bridge; Vercel Sandbox microVMs.", tags: ["TypeScript", "Python", "Go", "FastAPI"] },
  { title: "Veilsdk — Open Brainy", badge: "Live", repo: "thirdbase1/Veilsdk", href: "https://github.com/thirdbase1/Veilsdk", desc: "Dual-agent AI platform generating multi-file full-stack apps with persistent codebase awareness on Vercel Sandbox Beta. Lead Engineer + Architectural Reviewer governance pattern.", tags: ["TypeScript", "Vercel Sandbox", "Dual-Agent"] },
  { title: "Telegram Cleanup API", badge: "2★", repo: "thirdbase1/tg-cleanup-api", href: "https://github.com/thirdbase1/tg-cleanup-api", desc: "Privacy-first REST API — 14 typed endpoints across auth, analysis, cleanup, and export. Auto-generated Swagger docs, Pydantic validation, per-user session isolation.", tags: ["Python", "FastAPI", "Pydantic"] },
  { title: "0G Pulse", badge: "Live", repo: "thirdbase1/0g-pulse", href: "https://github.com/thirdbase1/0g-pulse", desc: "Full-stack wallet tracker & explorer for the 0G-Testnet-Galileo network. Wallet search, token holdings, transaction history, achievements, and a public leaderboard.", tags: ["TypeScript", "Next.js", "Web3"] },
  { title: "CloaxPay", badge: "Repo", repo: "thirdbase1/cloaxpay", href: "https://github.com/thirdbase1/cloaxpay", desc: "Decentralized crypto payment gateway: 200+ coins across 40+ chains, non-custodial. SideShift.ai cross-chain swaps, webhook signature verification.", tags: ["TypeScript", "Web3", "Payments"] },
  { title: "Mira AI", badge: "Repo", repo: "thirdbase1/Mira_AI", href: "https://github.com/thirdbase1/Mira_AI", desc: "Lightweight WhatsApp AI chatbot on web.js + OpenRouter (Claude / GPT). Session-based auth, per-user conversation memory.", tags: ["JavaScript", "WhatsApp", "OpenRouter"] },
];

const openSourceRepos = [
  { org: "thirdbase1/open-agent", label: "Open-Agent", desc: "Open-source alternative to Claude Agent SDK, ChatGPT Agents, and Manus.", tags: ["TypeScript", "Agent SDK", "OpenSource"] },
  { org: "thirdbase1/open-codesign", label: "Open CoDesign", desc: "Open-source Claude Design alternative. Prompt → prototype / slides / PDF. Multi-model, BYOK, local-first, MIT.", tags: ["TypeScript", "Design", "OpenSource"] },
  { org: "thirdbase1/OpenWA", label: "OpenWA", desc: "Free, Open Source, Self-Hosted WhatsApp API Gateway.", tags: ["TypeScript", "WhatsApp", "OpenSource"] },
  { org: "thirdbase1/microsanbox-cloud", label: "Microsandbox Cloud", desc: "Spin up Microsandbox VMs on a remote machine with APIs and proxy support.", tags: ["TypeScript", "VMs", "OpenSource"] },
  { org: "thirdbase1/wu-cli", label: "wu-cli", desc: "WhatsApp CLI tool — like gh is to GitHub, wu is to WhatsApp.", tags: ["TypeScript", "CLI", "OpenSource"] },
  { org: "thirdbase1/workflow-sandbox-ffmpeg-example", label: "Vercel Workflow Sandbox", desc: "Workflow sandbox FFmpeg example from Vercel Labs.", tags: ["TypeScript", "Vercel", "OpenSource"] },
  { org: "thirdbase1/CL4R1T4S", label: "CL4R1T4S", desc: "Leaked system prompts for ChatGPT, Claude, Gemini, Grok, Perplexity, Cursor, Lovable, Replit — AI systems transparency.", tags: ["AI", "Transparency", "OpenSource"] },
  { org: "thirdbase1/princejs", label: "princejs", desc: "The fastest backend framework ever made.", tags: ["TypeScript", "Backend", "OpenSource"] },
  { org: "thirdbase1/GitDaddy", label: "GitDaddy", desc: "A Git-related tooling project.", tags: ["Go", "OpenSource"] },
  { org: "thirdbase1/Pxxl-Proxy-System", label: "Pxxl Proxy System", desc: "A proxy system project.", tags: ["Rust", "OpenSource"] },
  { org: "thirdbase1/Keyboardy", label: "Keyboardy", desc: "Easy keyboard for inserting all kinds of texts, special characters and numbers.", tags: ["Kotlin", "OpenSource"] },
  { org: "thirdbase1/Gravity-Pulse", label: "Gravity Pulse", desc: "A web project fork.", tags: ["HTML", "OpenSource"] },
];

const SKILLS = {
  languages: ["TypeScript", "Python", "Go", "Rust", "JavaScript", "Shell"],
  frontend: ["React", "Next.js", "SvelteKit", "Tailwind CSS", "Monaco Editor", "xterm.js"],
  backend: ["FastAPI", "Node.js", "REST APIs", "WebSockets", "Pydantic"],
  cloud: ["Vercel Sandbox", "Docker", "Neon Postgres", "Redis"],
  ai: ["OpenRouter", "OpenAI", "Anthropic", "Multi-Agent Orchestration", "Agentic SDK Design"],
};

const HELP_TEXT = `Available commands:
  help          show this help message
  skills        list all technical skills
  languages     list programming languages
  ai            list AI / agent tooling
  projects      list featured projects
  whoami        about me
  contact       contact info
  clear         clear the terminal`;

type TabId = "oss" | "projects" | "ctf" | "skills" | "about";

export default function Home() {
  const [tab, setTab] = useState<TabId>("oss");

  return (
    <main style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <section style={{ paddingTop: 56, paddingBottom: 24 }}>
        <div className="wrap">
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 10 }}>
            <div style={{ width: 72, height: 72, borderRadius: 14, background: "var(--bg3)", border: "1px solid var(--border2)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 26, color: "var(--accent)", boxShadow: "0 0 24px var(--glow)", position: "relative" }}>
              IG
              <span style={{ position: "absolute", top: -5, left: -5, width: 4, height: 4, borderRadius: "50%", background: "var(--accent)", opacity: 0.5 }} />
              <span style={{ position: "absolute", bottom: -5, right: -5, width: 4, height: 4, borderRadius: "50%", background: "var(--accent)", opacity: 0.5 }} />
            </div>
            <div>
              <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 22, fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                Hey, I&apos;m Igangan Godspower
              </h1>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 4, padding: "3px 8px", border: "1px solid rgba(0,255,135,0.2)", borderRadius: 999, background: "rgba(0,255,135,0.06)", fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--accent)", letterSpacing: "0.05em" }}>
                <span style={{ width: 5, height: 5, background: "var(--accent)", borderRadius: "50%", animation: "blink 2s ease-in-out infinite" }} />
                Open to work
              </span>
            </div>
          </div>

          <p style={{ fontSize: 13, color: "var(--soft)", maxWidth: 520, lineHeight: 1.7, marginBottom: 14 }}>
            Software engineer building agentic AI products — multi-agent coding platforms,
            autonomous tool SDKs, and serverless AI infrastructure. I ship.
          </p>

          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
            {["AI/ML", "Full Stack", "Web3", "Agentic Tooling"].map((c) => (
              <span key={c} style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", padding: "4px 10px", border: "1px solid var(--border)", borderRadius: 4, letterSpacing: "0.08em", textTransform: "uppercase", background: "var(--surface)" }}>
                {c}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", paddingTop: 14, borderTop: "1px solid var(--border)" }}>
            <a href="/resume" style={{ display: "inline-flex", alignItems: "center", gap: 6, minHeight: 32, padding: "5px 12px", border: "1px solid rgba(0,255,135,0.25)", borderRadius: 999, background: "rgba(0,255,135,0.07)", color: "var(--accent)", fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.06em" }}>
              ↓ Resume
            </a>
            <a href="https://github.com/thirdbase1" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, minHeight: 32, padding: "5px 12px", border: "1px solid rgba(255,255,255,0.16)", borderRadius: 999, background: "rgba(255,255,255,0.08)", color: "var(--text)", fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.06em" }}>
              GitHub
            </a>
            <a href="https://x.com/one_shot_sx" target="_blank" rel="noreferrer" style={{ color: "var(--muted)", fontFamily: "'DM Mono', monospace", fontSize: 11 }}>
              @one_shot_sx
            </a>
          </div>
        </div>
      </section>

      <section style={{ flex: 1, paddingBottom: 60 }}>
        <div className="wrap">
          <div style={{ display: "flex", borderBottom: "1px solid var(--border)", marginBottom: 20, flexWrap: "wrap" }}>
            {([["oss", "OPEN-SOURCE"], ["projects", "PROJECTS"], ["ctf", "CTF"], ["skills", "SKILLS"], ["about", "ABOUT"]] as [TabId, string][]).map(([id, label]) => (
              <button key={id} onClick={() => setTab(id)} style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: tab === id ? "var(--accent)" : "var(--muted)", background: "transparent", border: "none", padding: "10px 12px 11px", cursor: "pointer", position: "relative", flex: "1 1 auto", minWidth: 0, textAlign: "center" }}>
                {label}
                {tab === id && <span style={{ position: "absolute", bottom: -1, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,var(--accent),rgba(0,255,135,0.35))" }} />}
              </button>
            ))}
          </div>

          {tab === "oss" && <OSSPanel />}
          {tab === "projects" && <ProjectsPanel />}
          {tab === "ctf" && <CTFPanel />}
          {tab === "skills" && <SkillsTerminal />}
          {tab === "about" && <AboutPanel />}
        </div>
      </section>

      <footer style={{ paddingBottom: 40 }}>
        <div className="wrap">
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16, display: "flex", justifyContent: "space-between", fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)" }}>
            <span>© {new Date().getFullYear()} Igangan Godspower</span>
            <span>Lagos, Nigeria 🇳🇬</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

function CardRow({ animDelay, href, onClick, children }: { animDelay: string; href?: string; onClick?: () => void; children: React.ReactNode }) {
  const style: React.CSSProperties = {
    animationDelay: animDelay,
    display: "grid",
    gridTemplateColumns: "minmax(0,1fr) auto",
    gap: "4px 12px",
    alignItems: "start",
    padding: "14px 16px",
    borderRadius: 8,
    border: "1px solid transparent",
    cursor: href ? "pointer" : "default",
    textDecoration: "none",
    transition: "background .3s, border-color .3s",
  };
  const hover = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.background = "var(--surface)";
    e.currentTarget.style.borderColor = "var(--border)";
  };
  const leave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.background = "";
    e.currentTarget.style.borderColor = "transparent";
  };
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="project-card" style={style} onMouseEnter={hover} onMouseLeave={leave} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <div className="project-card" style={style} onMouseEnter={hover} onMouseLeave={leave}>
      {children}
    </div>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <div style={{ gridColumn: "1 / -1", display: "flex", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
      {tags.map((t) => (
        <span key={t} style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", padding: "2px 7px", border: "1px solid var(--border)", borderRadius: 3, background: "var(--surface)" }}>
          {t}
        </span>
      ))}
    </div>
  );
}

function OSSPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {openSourceRepos.map((r, i) => (
        <CardRow key={r.org} animDelay={`${i * 0.04}s`} href={`https://github.com/${r.org}`}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", minWidth: 0 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: "var(--text)" }}>{r.label}</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)" }}>{r.org}</span>
          </div>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", alignSelf: "center", whiteSpace: "nowrap" }}>Merged PRs</span>
          <p style={{ gridColumn: "1 / -1", fontSize: "12.5px", color: "var(--muted)", lineHeight: 1.55, marginTop: 2 }}>{r.desc}</p>
          <Tags tags={r.tags} />
        </CardRow>
      ))}
    </div>
  );
}

function ProjectsPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {projects.map((p, i) => (
        <CardRow key={p.title} animDelay={`${i * 0.04}s`} href={p.href}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", minWidth: 0 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: "var(--text)" }}>{p.title}</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)" }}>{p.repo}</span>
          </div>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", alignSelf: "center", whiteSpace: "nowrap" }}>{p.badge}</span>
          <p style={{ gridColumn: "1 / -1", fontSize: "12.5px", color: "var(--muted)", lineHeight: 1.55, marginTop: 2 }}>{p.desc}</p>
          <Tags tags={p.tags} />
        </CardRow>
      ))}
    </div>
  );
}

function CTFPanel() {
  const items = [
    { title: "Building in Public", year: "2025", desc: "Shipped 8+ production projects in the open, building agentic AI tools and SDKs for developers." },
    { title: "Agent SDK Published", year: "2025", desc: "Published oneshotsx — a typed, npm-installable agent SDK with 3★ on GitHub." },
    { title: "Vercel Sandbox Mastery", year: "2026", desc: "Deployed multiple full-stack AI platforms on Vercel Sandbox with microVM orchestration." },
    { title: "Multi-Agent Architecture", year: "2026", desc: "Built and shipped dual-agent governance patterns with persistent codebase awareness." },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {items.map((c, i) => (
        <CardRow key={c.title} animDelay={`${i * 0.04}s`}>
          <div style={{ gridColumn: "1 / -1", display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--accent)", fontWeight: 500, flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: "var(--text)", marginBottom: 2 }}>{c.title}</div>
              <div style={{ fontSize: "12.5px", color: "var(--muted)", lineHeight: 1.55 }}>{c.desc}</div>
            </div>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", whiteSpace: "nowrap" }}>{c.year}</span>
          </div>
        </CardRow>
      ))}
    </div>
  );
}

function SkillsTerminal() {
  const [lines, setLines] = useState<string[]>(["Welcome to the Skills Terminal. Type 'help' to see available commands."]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function run(cmd: string) {
    const c = cmd.trim().toLowerCase();
    let out = "";
    if (c === "help" || c === "") out = HELP_TEXT;
    else if (c === "skills") out = Object.entries(SKILLS).map(([k, v]) => `${k}: ${v.join(", ")}`).join("\n");
    else if (c === "languages") out = SKILLS.languages.join(", ");
    else if (c === "ai") out = SKILLS.ai.join(", ");
    else if (c === "projects") out = projects.map((p) => `• ${p.title} — ${p.repo}`).join("\n");
    else if (c === "whoami") out = "Igangan Godspower — AI-native full-stack engineer & agentic tooling builder.\nLagos, Nigeria. Building multi-agent coding platforms and agent SDKs.";
    else if (c === "contact") out = "Email: ighanghangodspower@gmail.com\nX: @one_shot_sx\nGitHub: github.com/thirdbase1";
    else if (c === "clear") { setLines([]); return; }
    else out = `command not found: ${c}\ntype 'help' for a list of commands`;
    setLines((prev) => [...prev, `igangan@portfolio:~$ ${cmd}`, out]);
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") { run(input); setInput(""); }
  }

  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden", background: "var(--bg2)" }} onClick={() => inputRef.current?.focus()}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 12px", borderBottom: "1px solid var(--border)", background: "var(--bg3)" }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
        <span style={{ marginLeft: 8, fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)" }}>skills — bash</span>
      </div>
      <div style={{ padding: 16, minHeight: 220, fontFamily: "'DM Mono', monospace", fontSize: 12.5, color: "var(--soft)" }}>
        {lines.map((l, i) => (
          <div key={i} className="terminal-line" style={{ whiteSpace: "pre-wrap", marginBottom: 8 }}>{l}</div>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "var(--accent)" }}>igangan@portfolio:~$</span>
          <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={onKeyDown} spellCheck={false} autoComplete="off" style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "var(--text)", fontFamily: "'DM Mono', monospace", fontSize: 12.5 }} />
        </div>
      </div>
    </div>
  );
}

function AboutPanel() {
  return (
    <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.75 }}>
      <p style={{ marginBottom: 12 }}>
        I stopped being a user of AI tools and started being a builder of them. Over the last
        couple of years, almost everything I&apos;ve shipped has been about making AI more useful
        for other developers — agent SDKs, multi-agent coding environments, and the
        infrastructure that runs them.
      </p>
      <p style={{ marginBottom: 12 }}>
        I don&apos;t come from a traditional software-engineering background. I taught myself by
        building in public, breaking things, and shipping. My GitHub is my résumé — every project
        there is something I chose to build, not something I was assigned.
      </p>
      <p style={{ color: "var(--soft)" }}>The harness matters more than the model.</p>
    </div>
  );
}
