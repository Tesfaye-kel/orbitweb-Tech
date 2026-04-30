import { motion } from 'framer-motion'
import PageWrap from '../components/PageWrap.jsx'

const team = [
  { name: 'Nova Reid', role: 'AI Editor' },
  { name: 'Kai Mercer', role: 'Future Tech Analyst' },
  { name: 'Luna Park', role: 'Community Lead' },
]

const stats = [
  { label: 'Articles', value: 150 },
  { label: 'Readers', value: 10000 },
  { label: 'Guides Published', value: 48 },
]

function AboutPage() {
  return (
    <PageWrap>
      <section className="section-shell">
        <div className="glass-card">
          <h1 className="text-3xl font-bold text-white">About OrbitWeb Tech</h1>
          <p className="mt-2 text-slate-200">Democratizing AI & future tech education.</p>
          <p className="mt-3 text-sm text-slate-300">
            Built for students, professionals, and curious minds who want clear, practical, and inspiring technology knowledge.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {team.map((member) => (
            <article key={member.name} className="glass-card text-center">
              <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(member.name)}`} alt={member.name} className="mx-auto h-20 w-20 rounded-full bg-slate-900/50 p-2" />
              <h2 className="mt-3 text-lg font-semibold text-white">{member.name}</h2>
              <p className="text-sm text-cyan-300">{member.role}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <motion.article
              key={stat.label}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 14 }}
              viewport={{ once: true }}
              className="glass-card text-center"
            >
              <p className="text-3xl font-black text-cyan-300">{stat.value.toLocaleString()}+</p>
              <p className="mt-1 text-sm text-slate-300">{stat.label}</p>
            </motion.article>
          ))}
        </div>
      </section>
    </PageWrap>
  )
}

export default AboutPage
