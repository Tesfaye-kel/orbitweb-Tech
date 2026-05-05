import { futureTechSections, predictionTimeline } from '../data/futureTechData.js'
import { Link } from 'react-router-dom'
import PageWrap from '../components/PageWrap.jsx'

function FutureTechPage() {
  return (
    <PageWrap>
      <section className="section-shell">
        <div className="glass-card">
          <h1 className="text-3xl font-bold text-white">Future Technology</h1>
          <p className="mt-2 text-slate-300">Robotics, space innovation, urban intelligence, and what comes next.</p>
        </div>

        <div className="mt-6 space-y-8">
          {futureTechSections.map((section) => (
            <div key={section.id}>
              <h2 className="mb-3 text-2xl font-semibold text-cyan-300">{section.title}</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {section.cards.map((card) => (
                  <article key={card.title} className="glass-card overflow-hidden p-0">
                    <img src={card.image} alt={card.title} className="h-40 w-full object-cover" />
                    <div className="p-4">
                      <h3 className="font-semibold text-white">{card.title}</h3>
                      <p className="mt-2 text-sm text-slate-300">{card.description}</p>
                      <Link to="/guides" className="mt-3 inline-block text-sm font-semibold text-cyan-300">
                        Read more
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 glass-card">
          <h2 className="text-2xl font-semibold text-cyan-300">Prediction Timeline</h2>
          <div className="mt-4 flex snap-x gap-4 overflow-x-auto pb-2">
            {predictionTimeline.map((item) => (
              <article key={item.year} className="min-w-[260px] snap-start rounded-xl border border-orbit-line bg-slate-900/40 p-4">
                <p className="text-lg font-bold text-white">{item.year}</p>
                <p className="mt-2 text-sm text-slate-300">{item.forecast}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageWrap>
  )
}

export default FutureTechPage
