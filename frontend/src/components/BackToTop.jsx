import { useEffect, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa'

function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 280)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!show) return null

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-5 z-30 rounded-full bg-cyan-400 p-3 text-slate-900 shadow-lg shadow-cyan-500/40 transition hover:-translate-y-0.5"
    >
      <FaArrowUp />
    </button>
  )
}

export default BackToTop
