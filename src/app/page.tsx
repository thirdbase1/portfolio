"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";

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

function FrameDecor() {
  return (
    <div className="frame-decor" aria-hidden="true">
      <div className="frame-corner frame-corner--tl">
        <svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" fill="none">
          <ellipse cx="35" cy="45" rx="195" ry="170" fill="rgba(0,255,135,0.05)"/>
          <ellipse cx="60" cy="75" rx="125" ry="108" fill="rgba(0,200,255,0.028)"/>
          <path d="M 8 312 Q 28 230 72 165 Q 108 108 162 72" stroke="rgba(0,255,135,0.2)" strokeWidth="0.85" strokeLinecap="round"/>
          <path d="M 58 205 Q 95 178 118 148 Q 88 175 58 205" fill="rgba(0,255,135,0.055)" stroke="rgba(0,255,135,0.2)" strokeWidth="0.65"/>
          <path d="M 98 138 Q 128 118 155 95" stroke="rgba(0,200,255,0.16)" strokeWidth="0.65" strokeLinecap="round"/>
          <ellipse cx="108" cy="125" rx="16" ry="7" transform="rotate(-42 108 125)" fill="rgba(0,255,135,0.06)" stroke="rgba(0,255,135,0.19)" strokeWidth="0.65"/>
          <g transform="translate(138,62)">
            <ellipse cx="0" cy="-18" rx="12" ry="21" fill="rgba(0,255,135,0.07)" stroke="rgba(0,255,135,0.22)" strokeWidth="0.7" transform="rotate(0)"/>
            <ellipse cx="0" cy="-18" rx="12" ry="21" fill="rgba(0,255,135,0.07)" stroke="rgba(0,255,135,0.22)" strokeWidth="0.7" transform="rotate(60)"/>
            <ellipse cx="0" cy="-18" rx="12" ry="21" fill="rgba(0,255,135,0.07)" stroke="rgba(0,255,135,0.22)" strokeWidth="0.7" transform="rotate(120)"/>
            <ellipse cx="0" cy="-18" rx="12" ry="21" fill="rgba(0,255,135,0.06)" stroke="rgba(0,255,135,0.2)" strokeWidth="0.7" transform="rotate(180)"/>
            <ellipse cx="0" cy="-18" rx="12" ry="21" fill="rgba(0,255,135,0.06)" stroke="rgba(0,255,135,0.2)" strokeWidth="0.7" transform="rotate(240)"/>
            <ellipse cx="0" cy="-18" rx="12" ry="21" fill="rgba(0,255,135,0.06)" stroke="rgba(0,255,135,0.2)" strokeWidth="0.7" transform="rotate(300)"/>
            <circle cx="0" cy="0" r="6" fill="rgba(0,200,255,0.12)" stroke="rgba(0,255,135,0.35)" strokeWidth="0.5"/>
            <circle cx="-2.5" cy="-2" r="1.5" fill="rgba(0,255,135,0.45)"/>
            <circle cx="2.5" cy="1" r="1.2" fill="rgba(0,255,135,0.35)"/>
            <circle cx="0" cy="2.5" r="1.2" fill="rgba(0,255,135,0.3)"/>
          </g>
          <circle cx="72" cy="168" r="2" fill="rgba(0,255,135,0.35)"/>
        </svg>
      </div>
      <div className="frame-corner frame-corner--bl">
        <svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" fill="none">
          <ellipse cx="48" cy="282" rx="188" ry="158" fill="rgba(0,255,135,0.058)"/>
          <ellipse cx="72" cy="262" rx="118" ry="102" fill="rgba(0,200,255,0.034)"/>
          <path d="M 14 308 C 48 252 98 218 148 198" stroke="rgba(0,255,135,0.19)" strokeWidth="0.82" strokeLinecap="round"/>
          <path d="M 92 288 Q 135 265 168 240 Q 130 275 92 288" fill="rgba(0,200,255,0.048)" stroke="rgba(0,200,255,0.17)" strokeWidth="0.65"/>
          <path d="M 42 298 Q 22 268 32 238" stroke="rgba(0,255,135,0.16)" strokeWidth="0.58" strokeLinecap="round"/>
          <ellipse cx="62" cy="256" rx="19" ry="8" transform="rotate(-32 62 256)" fill="rgba(0,255,135,0.052)" stroke="rgba(0,255,135,0.19)" strokeWidth="0.65"/>
          <ellipse cx="132" cy="222" rx="20" ry="7" transform="rotate(24 132 222)" fill="none" stroke="rgba(0,255,135,0.16)" strokeWidth="0.65"/>
          <path d="M 178 268 Q 198 288 188 312" stroke="rgba(0,200,255,0.12)" strokeWidth="0.55" strokeLinecap="round"/>
          <g transform="translate(92,256)">
            <ellipse cx="0" cy="-24" rx="15" ry="26" fill="rgba(0,255,135,0.078)" stroke="rgba(0,255,135,0.24)" strokeWidth="0.72" transform="rotate(0)"/>
            <ellipse cx="0" cy="-24" rx="15" ry="26" fill="rgba(0,255,135,0.072)" stroke="rgba(0,255,135,0.22)" strokeWidth="0.72" transform="rotate(60)"/>
            <ellipse cx="0" cy="-24" rx="15" ry="26" fill="rgba(0,255,135,0.072)" stroke="rgba(0,255,135,0.22)" strokeWidth="0.72" transform="rotate(120)"/>
            <ellipse cx="0" cy="-24" rx="15" ry="26" fill="rgba(0,255,135,0.068)" stroke="rgba(0,255,135,0.2)" strokeWidth="0.72" transform="rotate(180)"/>
            <ellipse cx="0" cy="-24" rx="15" ry="26" fill="rgba(0,255,135,0.068)" stroke="rgba(0,255,135,0.2)" strokeWidth="0.72" transform="rotate(240)"/>
            <ellipse cx="0" cy="-24" rx="15" ry="26" fill="rgba(0,255,135,0.068)" stroke="rgba(0,255,135,0.2)" strokeWidth="0.72" transform="rotate(300)"/>
            <circle cx="0" cy="0" r="8" fill="rgba(0,200,255,0.11)" stroke="rgba(0,255,135,0.33)" strokeWidth="0.55"/>
          </g>
          <circle cx="148" cy="200" r="2.2" fill="rgba(0,255,135,0.33)"/>
        </svg>
      </div>
    </div>
  );
}

function Splash({ show }: { show: boolean }) {
  const [lineGrow, setLineGrow] = useState(false);
  const [roleShow, setRoleShow] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setLineGrow(true), 150);
    const t2 = setTimeout(() => setRoleShow(true), 500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  return (
    <div className={`splash${show ? "" : " out"}`}>
      <div className="splash-name">Igangan <span>Godspower</span></div>
      <div className={`splash-line${lineGrow ? " grow" : ""}`} />
      <div className={`splash-role${roleShow ? " show" : ""}`}>Software Engineer</div>
    </div>
  );
}

function Avatar() {
  return (
    <button type="button" className="avatar-btn" aria-label="Igangan Godspower">
      <span className="avatar-dot" style={{ top: -5, left: -5 }} />
      <span className="avatar-dot" style={{ bottom: -5, right: -5 }} />
      <span className="avatar-flip-wrap">
        <span className="avatar-flip">
          <span className="avatar-face avatar-face--front">
            <img src="/avatar.jpg" alt="Igangan Godspower" width={72} height={72} />
          </span>
          <span className="avatar-face avatar-face--back">IG</span>
        </span>
      </span>
    </button>
  );
}

export default function Home() {
  const [tab, setTab] = useState<TabId>("oss");
  const [splashShow, setSplashShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setSplashShow(false), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <FrameDecor />
      <Splash show={splashShow} />
      <main className="page-main" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <section style={{ paddingTop: 56, paddingBottom: 24 }}>
        <div className="wrap">
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 10 }}>
            <Avatar />
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
            <div className="social-icons" aria-label="Social links">
              <a href="https://github.com/thirdbase1" target="_blank" rel="noreferrer" className="social-icon" aria-label="GitHub">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2C6.48 2 2 6.58 2 12.26c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.38-3.37-1.38-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.35 9.35 0 0 1 12 6.98c.85 0 1.7.12 2.5.35 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.59.69.49A10.08 10.08 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"/></svg>
              </a>
              <a href="mailto:ighanghangodspower@gmail.com" className="social-icon" aria-label="Gmail">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm-.4 4.25-7.07 5.3a.88.88 0 0 1-1.06 0L4.4 8.25V6.7l7.6 5.7 7.6-5.7v1.55Z"/></svg>
              </a>
              <a href="https://x.com/one_shot_sx" target="_blank" rel="noreferrer" className="social-icon" aria-label="X / Twitter">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.9 2.25h3.07l-6.7 7.66 7.88 10.42h-6.17l-4.83-6.32-5.53 6.32H3.55l7.17-8.2L3.16 2.25h6.32l4.37 5.78 5.05-5.78Zm-1.08 16.24h1.7L8.55 3.99H6.72l11.1 14.5Z"/></svg>
              </a>
            </div>
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
    </>
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
