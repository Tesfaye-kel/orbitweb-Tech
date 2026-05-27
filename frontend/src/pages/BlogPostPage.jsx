import { Link, useParams } from 'react-router-dom'
import PageWrap from '../components/PageWrap.jsx'
import { posts } from '../data/posts.js'

function BlogPostPage() {
  const { id } = useParams()
  const post = posts.find((item) => item.id === id)

  if (!post) {
    return (
      <PageWrap>
        <section className="section-shell">
          <div className="glass-card">
            <p className="text-slate-200">Article not found.</p>
            <Link to="/blog" className="mt-3 inline-block text-cyan-300">
              Back to blog
            </Link>
          </div>
        </section>
      </PageWrap>
    )
  }

  return (
    <PageWrap>
      <article className="section-shell">
        <div className="glass-card">
          <p className="text-sm text-cyan-300">{post.category}</p>
          <h1 className="mt-2 text-3xl font-bold text-white">{post.title}</h1>
          <p className="mt-2 text-sm text-slate-400">
            {post.date} - {post.readTime}
          </p>
          <p className="mt-6 text-slate-200">{post.content}</p>
          <p className="mt-4 text-slate-300">
            OrbitWeb editorial note: This mock article represents long-form content delivery with dynamic routing, category indexing, and reusable metadata cards for production workflows.
          </p>
          <Link to="/blog" className="mt-6 inline-block text-sm font-semibold text-cyan-300">
            Back to all posts
          </Link>
        </div>
      </article>
    </PageWrap>
  )
}

export default BlogPostPage
