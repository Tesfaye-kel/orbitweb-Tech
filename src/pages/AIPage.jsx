import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

// ─── DATA ───────────────────────────────────────────────────────────────────

const AI_TOOLS = [
  {
    name: "ChatGPT",
    category: "Language Model",
    tag: "CONVERSATIONAL",
    description: "OpenAI's flagship conversational model. Handles reasoning, coding, writing, and multi-turn dialogue with exceptional context retention.",
    icon: "💬",
    color: "#10b981",
    accent: "from-emerald-500/20 to-teal-500/10",
    border: "border-emerald-500/30",
    glow: "shadow-emerald-500/20",
  },
  {
    name: "Claude",
    category: "Language Model",
    tag: "ANALYTICAL",
    description: "Anthropic's safety-focused AI. Excels at nuanced analysis, long-document comprehension, and thoughtful, grounded reasoning.",
    icon: "🔮",
    color: "#8b5cf6",
    accent: "from-violet-500/20 to-purple-500/10",
    border: "border-violet-500/30",
    glow: "shadow-violet-500/20",
  },
  {
    name: "Midjourney",
    category: "Image Generation",
    tag: "VISUAL",
    description: "State-of-the-art image synthesis. Transforms text prompts into photorealistic and artistic visuals with stunning aesthetic quality.",
    icon: "🎨",
    color: "#f59e0b",
    accent: "from-amber-500/20 to-orange-500/10",
    border: "border-amber-500/30",
    glow: "shadow-amber-500/20",
  },
  {
    name: "GitHub Copilot",
    category: "Code Assistant",
    tag: "DEVELOPER",
    description: "AI pair programmer trained on billions of code lines. Autocompletes functions, generates tests, and explains unfamiliar codebases.",
    icon: "⚡",
    color: "#3b82f6",
    accent: "from-blue-500/20 to-cyan-500/10",
    border: "border-blue-500/30",
    glow: "shadow-blue-500/20",
  },
  {
    name: "Perplexity AI",
    category: "Search & Research",
    tag: "RESEARCH",
    description: "AI-powered search with real-time web access. Synthesizes citations into concise, sourced answers faster than traditional search.",
    icon: "🔍",
    color: "#06b6d4",
    accent: "from-cyan-500/20 to-sky-500/10",
    border: "border-cyan-500/30",
    glow: "shadow-cyan-500/20",
  },
  {
    name: "Runway ML",
    category: "Video Generation",
    tag: "CREATIVE",
    description: "Professional-grade AI video creation. Generate, edit, and transform video content with cinematic quality from simple prompts.",
    icon: "🎬",
    color: "#ec4899",
    accent: "from-pink-500/20 to-rose-500/10",
    border: "border-pink-500/30",
    glow: "shadow-pink-500/20",
  },
];

const AI_NEWS = [
  { title: "GPT-5 sets new reasoning benchmarks across all categories", source: "OpenAI Blog", date: "May 2026", dot: "#10b981" },
  { title: "Anthropic releases constitutional AI v3 with enhanced alignment", source: "Anthropic Research", date: "Apr 2026", dot: "#8b5cf6" },
  { title: "Google DeepMind's Gemini Ultra 2 achieves AGI-level math proofs", source: "DeepMind", date: "Mar 2026", dot: "#3b82f6" },
  { title: "Multimodal AI now powers 40% of enterprise software globally", source: "McKinsey AI Report", date: "Feb 2026", dot: "#f59e0b" },
];

const GUIDE_STEPS = [
  { n: "01", title: "Token Prediction", body: "The model predicts the next token using probability distributions over its vocabulary, conditioned on all prior context." },
  { n: "02", title: "Pattern Learning", body: "Trained on massive text corpora, it learns grammar, facts, reasoning, and cultural knowledge through self-supervised objectives." },
  { n: "03", title: "Alignment Tuning", body: "RLHF and constitutional methods shape responses to be helpful, harmless, and honest—aligned with human values." },
  { n: "04", title: "Prompt Engineering", body: "Your input directly steers output style, depth, and format. Clear role, context, and constraints yield far better results." },
];

const DEMO_RESPONSES = [
  "AI systems excel at summarizing long content into concise, actionable insights—try giving it a dense paper.",
  "Combine retrieval-augmented generation with chain-of-thought reasoning for dramatically better factual accuracy.",
  "A great prompt includes: a clear role, rich context, explicit constraints, and a defined output format.",
];

// ─── SUBCOMPONENTS ────────────────────────────────────────────────────────────

function ThemeToggle({ dark, toggle }) {
  return (
    <button
      onClick={toggle}
      className={`relative h-8 w-14 rounded-full border transition-all duration-300 ${
        dark ? "border-slate-600 bg-slate-800" : "border-slate-200 bg-white"
      }`}
      aria-label="Toggle theme"
    >
      <motion.div
        animate={{ x: dark ? 26 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        className={`absolute top-1 h-6 w-6 rounded-full flex items-center justify-center text-xs ${
          dark ? "bg-violet-500" : "bg-amber-400"
        }`}
      >
        {dark ? "🌙" : "☀️"}
      </motion.div>
    </button>
  );
}

function StatCard({ label, value, suffix = "", delay }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    const duration = 1200;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm cursor-default"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <p className="text-3xl font-black text-white tracking-tight">{count}{suffix}</p>
      <p className="mt-1 text-xs font-semibold tracking-widest text-slate-400 uppercase">{label}</p>
    </motion.div>
  );
}

function ToolCard({ tool, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6 }}
      className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br p-6 cursor-pointer transition-shadow duration-300 ${tool.accent} ${tool.border} ${hovered ? `shadow-xl ${tool.glow}` : ""}`}
    >
      {/* Glow orb */}
      <div
        className="absolute -top-8 -right-8 h-24 w-24 rounded-full blur-2xl opacity-30 transition-opacity duration-500 group-hover:opacity-60"
        style={{ backgroundColor: tool.color }}
      />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl text-xl border border-white/10 bg-white/5 backdrop-blur-sm"
          >
            {tool.icon}
          </div>
          <span
            className="rounded-full px-2.5 py-1 text-[10px] font-black tracking-widest border"
            style={{ color: tool.color, borderColor: tool.color + "40", backgroundColor: tool.color + "15" }}
          >
            {tool.tag}
          </span>
        </div>

        <h3 className="mt-4 text-lg font-bold text-white">{tool.name}</h3>
        <p className="text-xs font-semibold tracking-wider text-slate-400 mt-0.5">{tool.category}</p>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">{tool.description}</p>

        <motion.button
          whileTap={{ scale: 0.97 }}
          className="mt-5 flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold tracking-wider border transition-all duration-200"
          style={{
            color: tool.color,
            borderColor: tool.color + "50",
            backgroundColor: hovered ? tool.color + "20" : "transparent",
          }}
        >
          EXPLORE TOOL
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </motion.button>
      </div>
    </motion.article>
  );
}

function NewsItem({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 + index * 0.1 }}
      whileHover={{ x: 4 }}
      className="group flex items-start gap-4 rounded-xl border border-white/5 bg-white/3 p-4 cursor-pointer transition-colors duration-200 hover:bg-white/8 hover:border-white/10"
    >
      <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full" style={{ backgroundColor: item.dot }} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white leading-snug group-hover:text-violet-300 transition-colors">{item.title}</p>
        <p className="mt-1 text-xs text-slate-500">{item.source} · {item.date}</p>
      </div>
      <svg className="h-4 w-4 text-slate-600 group-hover:text-slate-400 transition-colors flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </motion.div>
  );
}

function GuideStep({ step, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 + index * 0.1 }}
      className="group flex gap-5 rounded-2xl border border-white/8 bg-white/3 p-5 hover:bg-white/6 hover:border-white/12 transition-all duration-300"
    >
      <span className="font-black text-2xl text-white/10 group-hover:text-violet-500/40 transition-colors duration-300 select-none leading-none mt-0.5 flex-shrink-0">
        {step.n}
      </span>
      <div>
        <p className="font-bold text-white text-sm">{step.title}</p>
        <p className="mt-1.5 text-sm text-slate-400 leading-relaxed">{step.body}</p>
      </div>
    </motion.div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function AIPage() {
  const [dark, setDark] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [guideOpen, setGuideOpen] = useState(true);
  const [demoText, setDemoText] = useState("");
  const [demoResult, setDemoResult] = useState("");
  const [generating, setGenerating] = useState(false);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const handleGenerate = () => {
    if (!demoText.trim()) return;
    setGenerating(true);
    setDemoResult("");
    setTimeout(() => {
      const seed = demoText.length % DEMO_RESPONSES.length;
      setDemoResult(DEMO_RESPONSES[seed] + ` (Topic: "${demoText}")`);
      setGenerating(false);
    }, 1100);
  };

  const bg = dark
    ? "bg-[#080810] text-white"
    : "bg-[#f4f4f8] text-slate-900";

  return (
    <div className={`min-h-screen ${bg} transition-colors duration-500`} style={{ fontFamily: "'DM Sans', 'Syne', sans-serif" }}>

      {/* ── NAV ── */}
      <nav className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-500 ${dark ? "border-white/8 bg-[#080810]/80" : "border-black/8 bg-white/80"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 text-sm">
              ✦
            </div>
            <span className={`font-black tracking-tight text-lg ${dark ? "text-white" : "text-slate-900"}`}>
              AI<span className="text-violet-500">OS</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {["Tools", "News", "Guide", "Demo"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`text-sm font-semibold tracking-wide transition-colors duration-200 ${
                  dark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle dark={dark} toggle={() => setDark((d) => !d)} />
            <button className="hidden sm:flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 px-4 py-2 text-sm font-bold text-white transition-colors duration-200">
              Get Started
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative overflow-hidden px-6 pt-20 pb-24"
      >
        {/* Background mesh */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-600/12 blur-[100px]" />
          <div className="absolute right-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-cyan-500/8 blur-[80px]" />
          <div className="absolute left-1/2 bottom-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-pink-500/6 blur-[80px]" />
          {/* Grid lines */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(${dark ? "white" : "black"} 1px, transparent 1px), linear-gradient(90deg, ${dark ? "white" : "black"} 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold tracking-widest text-violet-300 uppercase">AI Dashboard 2026</span>
            </div>

            <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] ${dark ? "text-white" : "text-slate-900"}`}>
              The Future of{" "}
  
            <span className="relative">
                <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent bg-[length:200%] animate-[shimmer_3s_linear_infinite]">
                  Intelligence
                </span>
              </span>
              <br />is Already Here.
            </h1>
<p className={`mt-6 max-w-2xl mx-auto text-lg leading-relaxed ${dark ? "text-slate-400" : "text-slate-500"}`}>
              Explore premium AI tools, real-time updates, and expert guidance — curated for builders, researchers, and curious minds.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition-colors duration-200"
              >
                Explore AI Tools
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-2 rounded-xl border px-6 py-3 text-sm font-bold transition-colors duration-200 ${
                  dark ? "border-white/15 text-white hover:border-white/30 hover:bg-white/5" : "border-black/15 text-slate-800 hover:border-black/30 hover:bg-black/5"
                }`}
              >
                Watch Demo
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                </svg>
              </motion.button>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            <StatCard label="AI Tools" value="6" suffix="+" delay={0.3} />
            <StatCard label="Updates" value="4" delay={0.4} />
            <StatCard label="Guides" value="4" delay={0.5} />
          </div>
        </div>
      </motion.section>

      {/* ── WHAT IS AI ── */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className={`rounded-3xl border p-8 md:p-10 relative overflow-hidden ${dark ? "border-white/8 bg-white/3" : "border-black/8 bg-black/3"}`}>
            <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-violet-500/8 blur-[60px] pointer-events-none" />
            <div className="relative grid md:grid-cols-2 gap-8 items-start">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 mb-4">
                  <span className="text-[10px] font-black tracking-widest text-cyan-400">OVERVIEW</span>
                </div>
                <h2 className={`text-3xl font-black tracking-tight ${dark ? "text-white" : "text-slate-900"}`}>What is AI?</h2>
                <p className={`mt-4 text-base leading-relaxed ${dark ? "text-slate-400" : "text-slate-500"}`}>
                  Artificial Intelligence is software that performs tasks typically requiring human intelligence — language understanding, pattern recognition, and adaptive decision-making.
                </p>
                <motion.button
                  onClick={() => setExpanded((p) => !p)}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 flex items-center gap-2 text-sm font-bold text-violet-400 hover:text-violet-300 transition-colors"
                >
                  <motion.span animate={{ rotate: expanded ? 90 : 0 }} className="inline-block">▶</motion.span>
                  {expanded ? "Collapse explanation" : "Deeper explanation"}
                </motion.button>
                <AnimatePresence>
                  {expanded && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`mt-4 text-sm leading-relaxed overflow-hidden ${dark ? "text-slate-300" : "text-slate-600"}`}
                    >
                      Modern AI systems learn from massive datasets through self-supervised training, then undergo fine-tuning via reinforcement learning with human feedback (RLHF) and constitutional methods to enhance accuracy, reliability, and safety in real-world deployment scenarios.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Language", icon: "💬", desc: "Natural language understanding and generation" },
                  { label: "Vision", icon: "👁️", desc: "Image recognition, generation, and analysis" },
                  { label: "Reasoning", icon: "🧠", desc: "Multi-step logic and problem decomposition" },
                  { label: "Code", icon: "⚡", desc: "Automated software engineering and review" },
                ].map((cap) => (
                  <motion.div
                    key={cap.label}
                    whileHover={{ scale: 1.03 }}
                    className={`rounded-xl border p-4 cursor-default ${dark ? "border-white/8 bg-white/4 hover:bg-white/7" : "border-black/8 bg-black/3 hover:bg-black/6"} transition-colors duration-200`}
                  >
                    <span className="text-2xl">{cap.icon}</span>
                    <p className={`mt-2 text-sm font-bold ${dark ? "text-white" : "text-slate-800"}`}>{cap.label}</p>
                    <p className={`mt-1 text-xs leading-snug ${dark ? "text-slate-500" : "text-slate-400"}`}>{cap.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI TOOLS ── */}
      <section id="tools" className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 mb-3">
                <span className="text-[10px] font-black tracking-widest text-violet-400">AI TOOLS</span>
              </div>
              <h2 className={`text-3xl font-black tracking-tight ${dark ? "text-white" : "text-slate-900"}`}>Premium AI Stack</h2>
              <p className={`mt-2 text-sm ${dark ? "text-slate-400" : "text-slate-500"}`}>Hand-picked tools redefining how we create, reason, and build.</p>
            </div>
            <span className={`text-xs font-semibold tracking-widest ${dark ? "text-slate-600" : "text-slate-400"}`}>{AI_TOOLS.length} TOOLS</span>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {AI_TOOLS.map((tool, i) => (
              <ToolCard key={tool.name} tool={tool} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── GUIDE + NEWS ── */}
      <section id="guide" className="px-6 py-12">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-8">

          {/* Guide */}
          <div className={`rounded-3xl border p-7 ${dark ? "border-white/8 bg-white/3" : "border-black/8 bg-black/3"}`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 mb-3">
                  <span className="text-[10px] font-black tracking-widest text-amber-400">GUIDE</span>
                </div>
                <h2 className={`text-xl font-black tracking-tight ${dark ? "text-white" : "text-slate-900"}`}>How ChatGPT Works</h2>
              </div>
              <motion.button
                onClick={() => setGuideOpen((p) => !p)}
                whileTap={{ scale: 0.95 }}
                className={`rounded-xl border px-3 py-2 text-xs font-bold transition-colors duration-200 ${
                  dark ? "border-white/10 text-slate-400 hover:text-white hover:border-white/20" : "border-black/10 text-slate-500 hover:text-slate-900 hover:border-black/20"
                }`}
              >
                {guideOpen ? "Collapse" : "Expand"}
              </motion.button>
            </div>

            <AnimatePresence>
              {guideOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3 overflow-hidden"
                >
                  {GUIDE_STEPS.map((step, i) => (
                    <GuideStep key={step.n} step={step} index={i} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* News */}
          <div id="news" className={`rounded-3xl border p-7 ${dark ? "border-white/8 bg-white/3" : "border-black/8 bg-black/3"}`}>
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[10px] font-black tracking-widest text-cyan-400">LIVE NEWS</span>
              </div>
              <h2 className={`text-xl font-black tracking-tight ${dark ? "text-white" : "text-slate-900"}`}>AI News Feed</h2>
            </div>

            <div className="space-y-3">
              {AI_NEWS.map((item, i) => (
                <NewsItem key={item.title} item={item} index={i} />
              ))}
            </div>

            <button className={`mt-6 w-full rounded-xl border py-2.5 text-xs font-bold tracking-wider transition-colors duration-200 ${
              dark ? "border-white/10 text-slate-400 hover:border-white/20 hover:text-white" : "border-black/10 text-slate-500 hover:border-black/20 hover:text-slate-900"
            }`}>
              VIEW ALL UPDATES →
            </button>
          </div>
        </div>
      </section>

      {/* ── DEMO ── */}
      <section id="demo" className="px-6 py-12 pb-24">
        <div className="mx-auto max-w-3xl">
          <div className={`relative overflow-hidden rounded-3xl border p-8 md:p-10 ${dark ? "border-white/8 bg-white/3" : "border-black/8 bg-black/3"}`}>
            <div className="absolute top-0 left-0 h-64 w-64 rounded-full bg-cyan-500/8 blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-violet-500/8 blur-[80px] pointer-events-none" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 mb-4">
                <span className="text-[10px] font-black tracking-widest text-pink-400">LIVE DEMO</span>
              </div>
              <h2 className={`text-2xl font-black tracking-tight ${dark ? "text-white" : "text-slate-900"}`}>AI Text Generator</h2>
              <p className={`mt-2 text-sm ${dark ? "text-slate-400" : "text-slate-500"}`}>
                Type any topic and watch AI synthesize an insight in real time.
              </p>

              <textarea
                rows={4}
                value={demoText}
                onChange={(e) => setDemoText(e.target.value)}
                placeholder="e.g. robot assistants, climate AI, code generation..."
                className={`mt-6 w-full rounded-2xl border p-4 text-sm leading-relaxed outline-none resize-none transition-colors duration-200 focus:border-violet-500/50 ${
                  dark
                    ? "border-white/10 bg-white/5 text-white placeholder-slate-600 focus:bg-white/7"
                    : "border-black/10 bg-black/5 text-slate-900 placeholder-slate-400 focus:bg-black/7"
                }`}
              />

              <motion.button
                onClick={handleGenerate}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={generating || !demoText.trim()}
                className="mt-4 flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/20 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {generating ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    ✦ Generate Insight
                  </>
                )}
              </motion.button>

              <AnimatePresence>
                {demoResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    className={`mt-6 rounded-2xl border p-5 ${dark ? "border-violet-500/20 bg-violet-500/8" : "border-violet-500/20 bg-violet-500/5"}`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="h-2 w-2 rounded-full bg-violet-400" />
                      <span className="text-xs font-black tracking-widest text-violet-400">AI RESPONSE</span>
                    </div>
                    <p className={`text-sm leading-relaxed ${dark ? "text-slate-200" : "text-slate-700"}`}>{demoResult}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={`border-t px-6 py-8 ${dark ? "border-white/8" : "border-black/8"}`}>
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-cyan-500 text-xs">✦</div>
            <span className={`text-sm font-black ${dark ? "text-white" : "text-slate-900"}`}>AI<span className="text-violet-500">OS</span></span>
          </div>
          <p className={`text-xs ${dark ? "text-slate-600" : "text-slate-400"}`}>
            © 2026 AIOS · Built for the future of intelligence.
          </p>
        </div>
      </footer>

      {/* Shimmer keyframe via style tag */}
      <style>{`
        @keyframes shimmer { 0%,100% { background-position: 0% 50% } 50% { background-position: 100% 50% } }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}