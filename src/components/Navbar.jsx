import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaBars, FaMoon, FaSearch, FaSun, FaTimes } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext.jsx'
import { useData } from '../context/DataContext.jsx'

const navItemClass = ({ isActive }) =>
  `rounded-full px-3 py-2 text-sm transition ${isActive ? 'bg-cyan-400/20 text-cyan-300' : 'text-slate-200 hover:bg-white/10'}`

function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const { searchTerm, setSearchTerm } = useData()
  const [open, setOpen] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-orbit-line bg-[#070912]/90 backdrop-blur-md">
      <nav className="section-shell !py-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link to="/" className="text-lg font-bold tracking-wide text-cyan-300">
            OrbitWeb Tech
          </Link>

          <button
            className="rounded-md border border-slate-600 p-2 text-slate-100 md:hidden"
            onClick={() => setOpen((prev) => !prev)}
            type="button"
            aria-label="Toggle menu"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>

          <div className={`${open ? 'flex' : 'hidden'} w-full flex-col gap-3 md:flex md:w-auto md:flex-row md:items-center`}>
            <div className="relative">
              <button
                className="rounded-full px-3 py-2 text-sm text-slate-200 hover:bg-white/10"
                type="button"
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                Explore
              </button>
              {showDropdown && (
                <div className="absolute left-0 top-11 min-w-44 rounded-xl border border-orbit-line bg-slate-900/95 p-2 shadow-glass">
                  <NavLink to="/ai" className={navItemClass} onClick={() => setShowDropdown(false)}>
                    AI
                  </NavLink>
                  <NavLink to="/future-tech" className={navItemClass} onClick={() => setShowDropdown(false)}>
                    Future Tech
                  </NavLink>
                  <NavLink to="/blog" className={navItemClass} onClick={() => setShowDropdown(false)}>
                    Blog
                  </NavLink>
                  <NavLink to="/guides" className={navItemClass} onClick={() => setShowDropdown(false)}>
                    Guides
                  </NavLink>
                </div>
              )}
            </div>

            <NavLink to="/" className={navItemClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={navItemClass}>
              About
            </NavLink>
            <NavLink to="/contact" className={navItemClass}>
              Contact
            </NavLink>

            <label className="flex items-center gap-2 rounded-full border border-slate-600 px-3 py-2 text-sm text-slate-200">
              <FaSearch className="text-cyan-300" />
              <input
                className="w-36 bg-transparent outline-none placeholder:text-slate-400"
                placeholder="Search blog..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </label>

            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-full border border-slate-600 p-2 text-cyan-300"
              aria-label="Toggle theme"
            >
              {isDark ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
