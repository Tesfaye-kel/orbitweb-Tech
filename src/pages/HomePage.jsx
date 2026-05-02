import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { posts } from '../data/posts.js'
import PageWrap from '../components/PageWrap.jsx'
import { useData } from '../context/DataContext.jsx'

const topics = ['AI', 'Robotics', 'SpaceTech', 'Smart Cities']
const thoughtList = [
  'Intelligence amplifies when humans and machines collaborate.',
  'Every future breakthrough starts as a prototype today.',
  'Curiosity is still the most powerful tech stack.',
]
const roboticsHeroImage =
  'https://images.unsplash.com/photo-1581092921461-39b9d08a9b2a?auto=format&fit=crop&w=1600&q=80'
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}
const staggerItem = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

function HomePage() {
  const [time, setTime] = useState(new Date())
  const [thoughtIndex, setThoughtIndex] = useState(0)
  const [news, setNews] = useState([])
  const [loadingNews, setLoadingNews] = useState(true)
  const [parallax, setParallax] = useState({ x: 0, y: 0 })
  const { getNews } = useData()
  const bannerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ['start end', 'end start'],
  })
  const scrollParallaxY = useTransform(scrollYProgress, [0, 1], [-22, 22])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.55, 0.7, 0.55])

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    const thoughtTimer = setInterval(() => {
      setThoughtIndex((prev) => (prev + 1) % thoughtList.length)
    }, 5000)
    return () => {
      clearInterval(timer)
      clearInterval(thoughtTimer)
    }
  }, [])

  useEffect(() => {
    let mounted = true
    setLoadingNews(true)
    getNews()
      .then((items) => {
        if (mounted) setNews(items)
      })
      .finally(() => {
        if (mounted) setLoadingNews(false)
      })
    return () => {
      mounted = false
    }
  }, [getNews])

  const featured = useMemo(() => posts.filter((post) => post.featured).slice(0, 3), [])

  const handleBannerMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    setParallax({ x: x * 14, y: y * 14 })
  }

  return (
    <PageWrap>
      <section className="section-shell grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="glass-card">
          <h1 className="text-3xl font-black leading-tight text-white sm:text-5xl">
            OrbitWeb Tech - Exploring Tomorrow&apos;s Intelligence
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Futuristic insights on AI, future tech, practical guides, and tech news for students, creators, and builders.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/blog" className="orbit-btn-primary">
              Read Articles
            </Link>
            <Link to="/guides" className="orbit-btn-secondary">
              Start Learning
            </Link>
          </div>
        </div>

        <div className="glass-card space-y-3">
          <p className="text-sm font-semibold text-cyan-300">Live Clock</p>
          <p className="text-3xl font-bold text-white">{time.toLocaleTimeString()}</p>
          <p className="pt-4 text-sm font-semibold text-cyan-300">AI Thought of the Day</p>
          <p className="text-slate-200">{thoughtList[thoughtIndex]}</p>
        </div>
      </section>

      <section className="section-shell pt-0">
        <motion.div
          ref={bannerRef}
          className="relative overflow-hidden rounded-2xl border border-orbit-line"
          onMouseMove={handleBannerMove}
          onMouseLeave={() => setParallax({ x: 0, y: 0 })}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.img
            src={roboticsHeroImage}
            alt="Modern robotics lab"
            className="h-[300px] w-full object-cover sm:h-[360px]"
            style={{ y: scrollParallaxY }}
            animate={{ x: parallax.x, y: parallax.y, scale: 1.06 }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/65 to-transparent"
            style={{ opacity: overlayOpacity }}
          />
          <motion.div
            className="pointer-events-none absolute -left-10 top-10 h-28 w-28 rounded-full bg-cyan-400/25 blur-2xl"
            animate={{ y: [0, -12, 0], x: [0, 10, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="pointer-events-none absolute right-12 top-6 h-20 w-20 rounded-full bg-violet-400/25 blur-2xl"
            animate={{ y: [0, 8, 0], x: [0, -8, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 flex max-w-2xl flex-col justify-center p-6 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Robotics Frontier</p>
            <motion.h2
              className="mt-2 text-3xl font-black leading-tight text-white sm:text-4xl"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              viewport={{ once: true }}
            >
              Modern Robotics Is Rewriting Industry, Healthcare, and Daily Life
            </motion.h2>
            <motion.div
              className="mt-3 inline-flex w-fit items-center gap-2 rounded-full border border-cyan-300/40 bg-slate-900/50 px-3 py-1 text-xs text-cyan-100"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="inline-block h-2 w-2 rounded-full bg-cyan-300" />
              Live signal: robotics momentum rising
              <img
                src="https://images.pexels.com/photos/8566531/pexels-photo-8566531.jpeg?cs=srgb&dl=pexels-kindelmedia-8566531.jpg&fm=jpg"
                alt="Robot"
                className="h-4 w-4 rounded-sm object-cover"
              />
            </motion.div>
            <motion.p
              className="mt-3 text-sm text-slate-200 sm:text-base"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
              viewport={{ once: true }}
            >
              Explore autonomous systems, intelligent sensors, and real-world robots shaping tomorrow.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38 }}
              viewport={{ once: true }}
            >
              <Link to="/future-tech" className="orbit-btn-primary mt-5 w-fit">
                Explore Future Tech
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="section-shell pt-0">
        <h2 className="mb-4 text-2xl font-semibold text-white">Highlight Topics</h2>
        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {topics.map((topic, index) => (
            <motion.article
              key={topic}
              variants={staggerItem}
              transition={{ delay: index * 0.08 }}
              className="glass-card animate-pulseGlow text-center font-semibold text-cyan-200"
            >
              {topic}
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="section-shell pt-0">
        <h2 className="mb-4 text-2xl font-semibold text-white">Latest Featured Articles</h2>
        <motion.div
          className="grid gap-4 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {featured.map((post) => (
            <motion.article key={post.id} variants={staggerItem} className="glass-card">
              <p className="text-xs uppercase tracking-widest text-cyan-300">{post.category}</p>
              <h3 className="mt-2 text-lg font-semibold text-white">{post.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{post.summary}</p>
              <Link to={`/blog/${post.id}`} className="mt-4 inline-block text-sm font-semibold text-cyan-300">
                Read article
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="section-shell pt-0">
        <h2 className="mb-4 text-2xl font-semibold text-white">Trending Tech News</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {loadingNews
            ? Array.from({ length: 3 }, (_, idx) => (
                <article key={`skeleton-${idx}`} className="glass-card min-w-[300px]">
                  <div className="h-5 w-2/3 animate-pulse rounded bg-slate-700/70" />
                  <div className="mt-3 h-4 w-full animate-pulse rounded bg-slate-700/60" />
                  <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-slate-700/60" />
                </article>
              ))
            : news.map((item, idx) => (
                <article key={`${item.title}-${idx}`} className="glass-card min-w-[300px]">
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{item.summary}</p>
                </article>
              ))}
        </div>
      </section>
    </PageWrap>
  )
}

export default HomePage
