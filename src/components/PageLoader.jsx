import { FaCircleNotch } from 'react-icons/fa'

function PageLoader({ label = 'Loading...' }) {
  return (
    <div className="section-shell flex min-h-[60vh] items-center justify-center">
      <div className="glass-card flex items-center gap-3">
        <FaCircleNotch className="animate-spin text-cyan-300" />
        <p className="text-sm text-slate-200">{label}</p>
      </div>
    </div>
  )
}

export default PageLoader
