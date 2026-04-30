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

export function RouteSkeleton({ title = 'Loading section...' }) {
  return (
    <div className="section-shell space-y-4">
      <div className="glass-card h-28 animate-pulse" />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="glass-card h-40 animate-pulse" />
        <div className="glass-card h-40 animate-pulse" />
      </div>
      <p className="text-sm text-cyan-300">{title}</p>
    </div>
  )
}

export default PageLoader
