import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout.jsx'
import PageLoader, { RouteSkeleton } from './components/PageLoader.jsx'

const HomePage = lazy(() => import('./pages/HomePage.jsx'))
const AIPage = lazy(() => import('./pages/AIPage.jsx'))
const FutureTechPage = lazy(() => import('./pages/FutureTechPage.jsx'))
const BlogPage = lazy(() => import('./pages/BlogPage.jsx'))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage.jsx'))
const GuidesPage = lazy(() => import('./pages/GuidesPage.jsx'))
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'))
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'))

function App() {
  const location = useLocation()

  return (
    <Layout>
      <Suspense fallback={<PageLoader label="Loading OrbitWeb experience..." />}>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <Suspense fallback={<RouteSkeleton title="Loading home dashboard..." />}>
                  <HomePage />
                </Suspense>
              }
            />
            <Route
              path="/ai"
              element={
                <Suspense fallback={<RouteSkeleton title="Loading AI hub..." />}>
                  <AIPage />
                </Suspense>
              }
            />
            <Route
              path="/future-tech"
              element={
                <Suspense fallback={<RouteSkeleton title="Loading future technology..." />}>
                  <FutureTechPage />
                </Suspense>
              }
            />
            <Route
              path="/blog"
              element={
                <Suspense fallback={<RouteSkeleton title="Loading blog..." />}>
                  <BlogPage />
                </Suspense>
              }
            />
            <Route
              path="/blog/:id"
              element={
                <Suspense fallback={<RouteSkeleton title="Loading article..." />}>
                  <BlogPostPage />
                </Suspense>
              }
            />
            <Route
              path="/guides"
              element={
                <Suspense fallback={<RouteSkeleton title="Loading guides..." />}>
                  <GuidesPage />
                </Suspense>
              }
            />
            <Route
              path="/about"
              element={
                <Suspense fallback={<RouteSkeleton title="Loading about page..." />}>
                  <AboutPage />
                </Suspense>
              }
            />
            <Route
              path="/contact"
              element={
                <Suspense fallback={<RouteSkeleton title="Loading contact page..." />}>
                  <ContactPage />
                </Suspense>
              }
            />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </Layout>
  )
}

export default App
