import { useState } from 'react'
import { aiNews, aiTools } from '../data/aiTools.js'
import PageWrap from '../components/PageWrap.jsx'

const demoResponses = [
  'AI can summarize long content into concise points.',
  'Try combining retrieval with reasoning for better factual answers.',
  'A great prompt includes role, context, constraints, and desired output.',
]

function AIPage() {
  const [expanded, setExpanded] = useState(false)
  const [stepOpen, setStepOpen] = useState(true)
  const [demoText, setDemoText] = useState('')
  const [demoResult, setDemoResult] = useState('')

  return (
    <PageWrap>
      <section className="section-shell">
        <div className="glass-card">
          <h1 className="text-3xl font-bold text-white">Artificial Intelligence Hub</h1>
          <p className="mt-2 text-slate-300">Learn fundamentals, discover tools, and explore the latest AI updates.</p>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <article className="glass-card">
            <h2 className="text-xl font-semibold text-cyan-300">What is AI?</h2>
            <p className="mt-2 text-sm text-slate-300">
              AI is software that performs tasks usually requiring human intelligence, such as language understanding, pattern recognition, and decision support.
            </p>
            <button className="orbit-btn-secondary mt-4" type="button" onClick={() => setExpanded((prev) => !prev)}>
              {expanded ? 'Hide deeper explanation' : 'Show deeper explanation'}
            </button>
            {expanded && (
              <p className="mt-3 text-sm text-slate-200">
                Modern AI systems are trained on large datasets, then fine-tuned for accuracy, reliability, and safety in real-world tasks.
              </p>
            )}
          </article>

          <article className="glass-card">
            <h2 className="text-xl font-semibold text-cyan-300">Popular AI Tools</h2>
            <ul className="mt-3 space-y-3">
              {aiTools.map((tool) => (
                <li key={tool.name}>
                  <p className="font-semibold text-white">{tool.name}</p>
                  <p className="text-sm text-slate-300">{tool.description}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-6 glass-card">
          <h2 className="text-xl font-semibold text-cyan-300">Beginner Guide: How ChatGPT Works</h2>
          <button className="orbit-btn-secondary mt-3" type="button" onClick={() => setStepOpen((prev) => !prev)}>
            {stepOpen ? 'Collapse steps' : 'Expand steps'}
          </button>
          {stepOpen && (
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-200">
              <li>It predicts the next token based on your input and context.</li>
              <li>It has learned language patterns from massive text corpora.</li>
              <li>Alignment tuning helps shape more helpful and safe responses.</li>
              <li>Your prompts guide output style, format, and depth.</li>
            </ol>
          )}
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <article className="glass-card">
            <h2 className="text-xl font-semibold text-cyan-300">AI News</h2>
            <div className="mt-3 space-y-3">
              {aiNews.map((item) => (
                <div key={item.title} className="rounded-xl border border-orbit-line p-3">
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="text-xs text-slate-400">
                    {item.source} - {item.date}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="glass-card">
            <h2 className="text-xl font-semibold text-cyan-300">Fun AI Demo (Mock Text Generator)</h2>
            <textarea
              rows={4}
              className="mt-3 w-full rounded-lg border border-slate-600 bg-slate-900/60 p-3 text-sm outline-none focus:border-cyan-400"
              placeholder="Type a topic like 'robot assistants'"
              value={demoText}
              onChange={(event) => setDemoText(event.target.value)}
            />
            <button
              className="orbit-btn-primary mt-3"
              type="button"
              onClick={() => {
                const seed = demoText.length % demoResponses.length
                setDemoResult(`${demoResponses[seed]} Topic: ${demoText || 'general AI'}.`)
              }}
            >
              Generate
            </button>
            {demoResult && <p className="mt-3 text-sm text-slate-200">{demoResult}</p>}
          </article>
        </div>
      </section>
    </PageWrap>
  )
}

export default AIPage
