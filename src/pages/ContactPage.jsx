import { useState } from 'react'
import { FaGithub, FaLinkedin, FaStar, FaTwitter } from 'react-icons/fa'
import PageWrap from '../components/PageWrap.jsx'

const initialState = { name: '', email: '', message: '' }

function ContactPage() {
  const [form, setForm] = useState(initialState)
  const [error, setError] = useState('')
  const [rating, setRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.name || !form.email.includes('@') || form.message.length < 10) {
      setError('Please provide a valid name, email, and message (10+ chars).')
      return
    }
    setError('')
    setSubmitted(true)
    setForm(initialState)
  }

  return (
    <PageWrap>
      <section className="section-shell grid gap-6 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="glass-card space-y-3">
          <h1 className="text-3xl font-bold text-white">Contact OrbitWeb Tech</h1>
          <p className="text-sm text-slate-300">Email: hello@orbitweb.tech</p>
          <input
            className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-3 py-2"
            placeholder="Name"
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          />
          <input
            className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-3 py-2"
            placeholder="Email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          />
          <textarea
            rows={5}
            className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-3 py-2"
            placeholder="Message"
            value={form.message}
            onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
          />
          {error && <p className="text-sm text-rose-300">{error}</p>}
          {submitted && <p className="text-sm text-emerald-300">Thanks! We received your message.</p>}
          <button className="orbit-btn-primary" type="submit">
            Send Message
          </button>
        </form>

        <aside className="glass-card">
          <h2 className="text-xl font-semibold text-cyan-300">Connect & Feedback</h2>
          <div className="mt-4 flex gap-4 text-2xl text-slate-200">
            <a href="#" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>

          <div className="mt-6">
            <p className="text-sm text-slate-300">Optional feedback rating</p>
            <div className="mt-2 flex gap-2">
              {Array.from({ length: 5 }, (_, index) => {
                const value = index + 1
                return (
                  <button
                    key={value}
                    type="button"
                    aria-label={`Rate ${value}`}
                    onClick={() => setRating(value)}
                    className={value <= rating ? 'text-amber-300' : 'text-slate-500'}
                  >
                    <FaStar />
                  </button>
                )
              })}
            </div>
          </div>
        </aside>
      </section>
    </PageWrap>
  )
}

export default ContactPage
