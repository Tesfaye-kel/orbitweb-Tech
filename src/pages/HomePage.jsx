import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
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

function HomePage() {
  const [time, setTime] = useState(new Date())
  const [thoughtIndex, setThoughtIndex] = useState(0)
  const [news, setNews] = useState([])
  const { getNews } = useData()

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
    getNews().then(setNews)
  }, [getNews])

  const featured = useMemo(() => posts.filter((post) => post.featured).slice(0, 3), [])

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
        <h2 className="mb-4 text-2xl font-semibold text-white">Highlight Topics</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {topics.map((topic, index) => (
            <motion.article
              key={topic}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="glass-card animate-pulseGlow text-center font-semibold text-cyan-200"
            >
              {topic}
            </motion.article>
          ))}
        </div>
      </section>

      <section className="section-shell pt-0">
        <h2 className="mb-4 text-2xl font-semibold text-white">Latest Featured Articles</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((post) => (
            <article key={post.id} className="glass-card">
              <p className="text-xs uppercase tracking-widest text-cyan-300">{post.category}</p>
              <h3 className="mt-2 text-lg font-semibold text-white">{post.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{post.summary}</p>
              <Link to={`/blog/${post.id}`} className="mt-4 inline-block text-sm font-semibold text-cyan-300">
                Read article
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell pt-0">
        <h2 className="mb-4 text-2xl font-semibold text-white">Trending Tech News</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {news.map((item, idx) => (
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
