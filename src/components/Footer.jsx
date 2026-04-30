import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="border-t border-orbit-line bg-slate-950/80">
      <div className="section-shell grid gap-6 md:grid-cols-3">
        <div>
          <h4 className="text-lg font-semibold text-cyan-300">OrbitWeb Tech</h4>
          <p className="mt-2 text-sm text-slate-300">Exploring tomorrow&apos;s intelligence through guides, news, and practical insights.</p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-semibold text-slate-100">Quick links</p>
          <div className="flex flex-wrap gap-3 text-slate-300">
            <Link to="/ai">AI</Link>
            <Link to="/future-tech">Future Tech</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/guides">Guides</Link>
          </div>
        </div>
        <form className="glass-card p-4">
          <p className="mb-2 text-sm font-semibold text-slate-100">Newsletter signup</p>
          <input className="mb-2 w-full rounded-md border border-slate-600 bg-slate-900/50 px-3 py-2 text-sm" placeholder="Email address" />
          <button type="button" className="orbit-btn-primary w-full justify-center">
            Subscribe
          </button>
        </form>
      </div>
    </footer>
  )
}

export default Footer
