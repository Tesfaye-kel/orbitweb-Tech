import { motion } from 'framer-motion'

const pageTransition = {
  default: {
    type: 'tween',
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1],
  },
  exit: {
    type: 'tween',
    duration: 0.5,
    ease: [0.4, 0, 1, 1],
  },
}

function PageWrap({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -18, scale: 0.992 }}
      transition={pageTransition}
      style={{ willChange: 'opacity, transform', transformOrigin: '50% 40%' }}
    >
      {children}
    </motion.div>
  )
}

export default PageWrap
