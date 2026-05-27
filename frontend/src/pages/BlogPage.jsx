import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageWrap from '../components/PageWrap.jsx'
import { useData } from '../context/DataContext.jsx'

const categories = ['All', 'AI', 'Future', 'Reviews']

function BlogPage() {
  const [view, setView] = useState('list')
  const [category, setCategory] = useState('All')
  const { filteredPosts } = useData()

  const visiblePosts = useMemo(() => {
    if (category === 'All') return filteredPosts
    return filteredPosts.filter((post) => post.category === category)
  }, [category, filteredPosts])

  return (
    <PageWrap>
      <section className="section-shell">
        <div className="glass-card">
          <h1 className="text-3xl font-bold text-white">Blog & Articles</h1>
          <p className="mt-2 text-slate-300">Fresh analysis, explainers, and reviews across the future tech ecosystem.</p>
        </div>

        <div className="mt-6 rounded-xl border border-cyan-400/30 bg-cyan-500/10 p-4 text-sm text-cyan-100">
          Weekly updates: New deep dives every Thursday on AI tools and future technology trends.
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-full px-4 py-2 text-sm ${category === item ? 'bg-cyan-400 text-slate-900' : 'bg-slate-900/50 text-slate-200'}`}
            >
              {item}
            </button>
          ))}
          <button type="button" className="orbit-btn-secondary ml-auto" onClick={() => setView((prev) => (prev === 'list' ? 'grid' : 'list'))}>
            Toggle {view === 'list' ? 'Grid' : 'List'} View
          </button>
        </div>

        <div className={`mt-6 ${view === 'grid' ? 'grid gap-4 md:grid-cols-2' : 'space-y-4'}`}>
          {visiblePosts.map((post) => (
            <article key={post.id} className="glass-card">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span>{post.date}</span>
                <span>-</span>
                <span>{post.readTime}</span>
                <span>-</span>
                <span className="text-cyan-300">{post.category}</span>
              </div>
              <h3 className="mt-2 text-xl font-semibold text-white">{post.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{post.summary}</p>
              <Link to={`/blog/${post.id}`} className="mt-4 inline-block text-sm font-semibold text-cyan-300">
                Open article
              </Link>
            </article>
          ))}
          {visiblePosts.length === 0 && <p className="glass-card text-sm text-slate-300">No posts match your current search/filter.</p>}
        </div>
      </section>
    </PageWrap>
  )
}

export default BlogPage
