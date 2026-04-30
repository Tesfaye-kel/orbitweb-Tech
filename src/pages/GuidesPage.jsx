import { useState } from 'react'
import PageWrap from '../components/PageWrap.jsx'
import { guidesData } from '../data/guidesData.js'

function GuidesPage() {
  const [copied, setCopied] = useState('')

  const copyText = async (id, text) => {
    await navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(''), 1500)
  }

  return (
    <PageWrap>
      <section className="section-shell">
        <div className="glass-card">
          <h1 className="text-3xl font-bold text-white">Guides & Tutorials</h1>
          <p className="mt-2 text-slate-300">Step-by-step practical knowledge for beginners and growing tech professionals.</p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {guidesData.map((guide) => (
            <article key={guide.id} className="glass-card">
              <h2 className="text-xl font-semibold text-cyan-300">{guide.title}</h2>
              {guide.kind === 'code' && (
                <>
                  <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-950/80 p-3 text-xs text-slate-200">{guide.code}</pre>
                  <button type="button" className="orbit-btn-secondary mt-3" onClick={() => copyText(guide.id, guide.code)}>
                    {copied === guide.id ? 'Copied' : 'Copy code'}
                  </button>
                </>
              )}
              {guide.kind !== 'code' && (
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  {guide.content.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              )}
              <button type="button" className="orbit-btn-primary mt-4 w-full justify-center">
                Download as PDF
              </button>
            </article>
          ))}
        </div>
      </section>
    </PageWrap>
  )
}

export default GuidesPage
