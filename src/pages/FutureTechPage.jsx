/**
 * FutureTechPage — Redesigned 2026 Premium AI Experience
 * Stack: React + Tailwind CSS + Framer Motion + Lucide React
 *
 * Drop-in replacement. Preserves all data imports and PageWrap wrapper.
 * Install deps if needed:
 *   npm install framer-motion lucide-react
 */

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import {
  Cpu, Rocket, Building2, Brain, Zap, ArrowRight,
  ChevronRight, Orbit, Globe, Layers, Sparkles,
  Clock, ChevronLeft, ExternalLink,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { futureTechSections, predictionTimeline } from '../data/futureTechData.js'
import PageWrap from '../components/PageWrap.jsx'

/* ─────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────── */
const SECTION_ICONS = [Brain, Cpu, Rocket, Building2, Globe, Layers, Orbit, Zap]

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
}

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
}

const glowPulse = {
  animate: {
    opacity: [0.35, 0.65, 0.35],
    scale: [1, 1.08, 1],
    transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
  },
}

/* ─────────────────────────────────────────────
   SECTION WRAPPER — scroll-triggered reveal
───────────────────────────────────────────── */
function RevealSection({ children, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   ANIMATED GRADIENT BORDER CARD
───────────────────────────────────────────── */
function GlowCard({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })
  return (
    <motion.article
      ref={ref}
      custom={delay}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={cardVariants}
      whileHover={{ y: -6, transition: { duration: 0.3, ease: 'easeOut' } }}
      className={`relative rounded-2xl overflow-hidden group ${className}`}
    >
      {/* Animated gradient border */}
      <div
        className="absolute inset-0 rounded-2xl p-px pointer-events-none z-10"
        style={{
          background: 'linear-gradient(135deg, rgba(6,182,212,0.6) 0%, rgba(139,92,246,0.4) 50%, rgba(6,182,212,0.15) 100%)',
        }}
      >
        <div className="w-full h-full rounded-2xl bg-transparent" />
      </div>

      {/* Inner glass surface */}
      <div className="relative z-20 h-full rounded-2xl bg-slate-900/70 backdrop-blur-xl border border-white/5">
        {children}
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(6,182,212,0.12) 0%, transparent 70%)' }}
      />
    </motion.article>
  )
}

/* ─────────────────────────────────────────────
   TECH CARD (inside each section grid)
───────────────────────────────────────────── */
function TechCard({ card, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <GlowCard delay={index} className="flex flex-col h-full cursor-pointer">
      {/* Image */}
      <div className="relative h-44 overflow-hidden rounded-t-2xl">
        <motion.img
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        {/* Image overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase
            bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 backdrop-blur-md">
            <Sparkles size={9} />
            AI Technology
          </span>
        </div>
      </div>

      {/* Content */}
      <div
        className="flex flex-col flex-1 p-5"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <h3 className="font-semibold text-white text-base leading-snug mb-2 font-['Syne',sans-serif]">
          {card.title}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed flex-1">{card.description}</p>

        {/* CTA */}
        <motion.div
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400"
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <Link to="/guides" className="flex items-center gap-1.5 group/link">
            <span>Explore</span>
            <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </GlowCard>
  )
}

/* ─────────────────────────────────────────────
   TECHNOLOGY SECTION GROUP
───────────────────────────────────────────── */
function TechSection({ section, sectionIndex }) {
  const Icon = SECTION_ICONS[sectionIndex % SECTION_ICONS.length]
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <div ref={ref} className="mb-20">
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-3 mb-6 justify-center mx-auto"
      >
        <span className="flex items-center justify-center w-9 h-9 rounded-xl
          bg-gradient-to-br from-cyan-500/30 to-violet-500/20 border border-cyan-500/30">
          <Icon size={16} className="text-cyan-400" />
        </span>
        <h2 className="text-xl font-bold text-white font-['Syne',sans-serif] tracking-tight text-center">
          {section.title}
        </h2>
        <div className="hidden sm:block flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent ml-2" />
      </motion.div>

      {/* Cards grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {section.cards.map((card, i) => (
          <TechCard key={card.title} card={card} index={i} />
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   PREDICTION TIMELINE
───────────────────────────────────────────── */
function PredictionTimeline() {
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const scroll = (dir) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' })
  }

  const onScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }

  return (
    <RevealSection className="mt-8">
      <div className="relative rounded-3xl overflow-hidden border border-white/5
        bg-gradient-to-b from-slate-900/80 to-slate-950/80 backdrop-blur-xl p-8">

        {/* Header */}
        <div className="relative mb-8">
          <div className="flex items-center justify-center gap-3 mx-auto">
            <span className="flex items-center justify-center w-9 h-9 rounded-xl
              bg-gradient-to-br from-violet-500/30 to-cyan-500/20 border border-violet-500/30">
              <Clock size={16} className="text-violet-400" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-white font-['Syne',sans-serif] tracking-tight">
                Prediction Timeline
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">AI-forecasted technological milestones</p>
            </div>
          </div>

          {/* Scroll controls */}
          <div className="hidden sm:flex items-center gap-2 absolute right-0 top-1/2 -translate-y-1/2">\n            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="w-8 h-8 rounded-xl flex items-center justify-center
                border border-white/10 bg-white/5 text-slate-400
                hover:border-cyan-500/40 hover:text-cyan-400 disabled:opacity-30 transition-all"
            >
              <ChevronLeft size={15} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="w-8 h-8 rounded-xl flex items-center justify-center
                border border-white/10 bg-white/5 text-slate-400
                hover:border-cyan-500/40 hover:text-cyan-400 disabled:opacity-30 transition-all"
            >
              <ChevronRight size={15} />
            </motion.button>
          </div>
        </div>

        {/* Timeline track */}
        <div className="relative">
          {/* Track line */}
          <div className="absolute top-[26px] left-0 right-0 h-px
            bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent pointer-events-none z-10" />

          {/* Cards */}
          <div
            ref={scrollRef}
            onScroll={onScroll}
            className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide px-1 pr-6"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {predictionTimeline.map((item, i) => (
              <TimelineCard key={item.year} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </RevealSection>
  )
}

function TimelineCard({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px 0px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      custom={index}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={cardVariants}
      className="min-w-[240px] max-w-[260px] snap-start shrink-0 relative pt-12"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Timeline dot */}
      <div className="absolute top-[18px] left-6 z-20">
        <motion.div
          animate={{ scale: hovered ? 1.4 : 1 }}
          transition={{ duration: 0.25 }}
          className="w-[17px] h-[17px] rounded-full border-2 border-cyan-400 bg-slate-900 relative"
        >
          <div className="absolute inset-[3px] rounded-full bg-cyan-400" />
        </motion.div>
      </div>

      {/* Card */}
      <motion.div
        animate={{ y: hovered ? -4 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="rounded-2xl border border-white/8 bg-slate-800/50 backdrop-blur-sm p-4
          hover:border-cyan-500/30 transition-colors duration-300"
      >
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-2xl font-black text-white font-['Syne',sans-serif] tracking-tight">
            {item.year}
          </span>
          <div className="w-2 h-2 rounded-full bg-cyan-400/60 animate-pulse" />
        </div>
        <p className="text-sm text-slate-400 leading-relaxed">{item.forecast}</p>
        <div className="mt-3 flex items-center gap-1 text-xs text-cyan-500/70">
          <ExternalLink size={10} />
          <span>Forecast</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────── */
function HeroSection() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 400], [0, -60])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.4])

  return (
    <motion.div style={{ y, opacity }} className="relative mb-20">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          variants={glowPulse}
          animate="animate"
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.18) 0%, transparent 70%)' }}
        />
        <motion.div
          variants={glowPulse}
          animate="animate"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
            animationDelay: '2.5s',
          }}
          className="absolute -top-20 right-0 w-80 h-80 rounded-full"
        />
        {/* Grid texture */}
        <div className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* Glass hero card */}
      <div className="relative rounded-3xl overflow-hidden border border-white/8
        bg-gradient-to-b from-slate-900/60 to-slate-950/80 backdrop-blur-2xl p-10 sm:p-14">

        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6
            border border-cyan-500/30 bg-cyan-500/10 text-xs font-semibold text-cyan-400 tracking-widest uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          AI Research & Intelligence
          <Sparkles size={10} />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight
            font-['Syne',sans-serif] mb-5"
        >
          <span className="text-white">Future </span>
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(135deg, #22d3ee 0%, #a78bfa 50%, #22d3ee 100%)' }}
          >
            Technology
          </span>
          <br />
          <span className="text-white">Horizons</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.35 }}
          className="text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed mb-8"
        >
          Robotics, space innovation, urban intelligence, and what comes next — the convergence
          of AI systems shaping civilization's next chapter.
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap gap-6"
        >
          {[
            { label: 'Domains', value: `${futureTechSections.length}` },
            { label: 'Technologies', value: `${futureTechSections.reduce((a, s) => a + s.cards.length, 0)}` },
            { label: 'Forecasts', value: `${predictionTimeline.length}` },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white font-['Syne',sans-serif]">{value}</span>
              <span className="text-xs text-slate-500 uppercase tracking-widest">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Decorative corner element */}
        <div className="absolute top-6 right-6 opacity-20 pointer-events-none hidden sm:block">
          <div className="w-24 h-24 rounded-2xl border border-cyan-500/50 rotate-12" />
          <div className="absolute top-3 right-3 w-16 h-16 rounded-xl border border-violet-500/50 rotate-6" />
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   MAIN PAGE COMPONENT
───────────────────────────────────────────── */
function FutureTechPage() {
  return (
    <PageWrap>
      {/* Google Fonts — Syne for display */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&display=swap');
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>

      <section className="relative px-4 py-8 max-w-7xl mx-auto">
        {/* Hero */}
        <HeroSection />

        {/* Technology Sections */}
        <div>
          {futureTechSections.map((section, i) => (
            <TechSection key={section.id} section={section} sectionIndex={i} />
          ))}
        </div>

        {/* Prediction Timeline */}
        <PredictionTimeline />

        {/* Bottom CTA strip */}
        <RevealSection className="mt-16">
          <div className="rounded-3xl border border-white/8 bg-gradient-to-r
            from-cyan-500/10 via-slate-900/60 to-violet-500/10 p-8 sm:p-10
            backdrop-blur-xl text-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(6,182,212,0.08) 0%, transparent 70%)' }}
            />
            <p className="text-xs font-semibold text-cyan-500 uppercase tracking-widest mb-3">Continue Exploring</p>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-['Syne',sans-serif] mb-4">
              Dive deeper into tomorrow
            </h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
              Explore our full collection of AI research, technology guides, and forecasts.
            </p>
            <Link to="/guides">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm
                  bg-gradient-to-r from-cyan-500 to-violet-600 text-white
                  hover:from-cyan-400 hover:to-violet-500 transition-all duration-300
                  shadow-lg shadow-cyan-500/20"
              >
                View All Guides
                <ChevronRight size={15} />
              </motion.button>
            </Link>
          </div>
        </RevealSection>
      </section>
    </PageWrap>
  )
}

export default FutureTechPage