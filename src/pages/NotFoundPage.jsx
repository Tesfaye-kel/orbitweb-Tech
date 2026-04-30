import { Link } from 'react-router-dom'
import PageWrap from '../components/PageWrap.jsx'

function NotFoundPage() {
  return (
    <PageWrap>
      <section className="section-shell">
        <div className="glass-card text-center">
          <h1 className="text-4xl font-black text-white">404</h1>
          <p className="mt-2 text-slate-300">This route drifted outside orbit.</p>
          <Link to="/" className="orbit-btn-primary mt-4">
            Return home
          </Link>
        </div>
      </section>
    </PageWrap>
  )
}

export default NotFoundPage
