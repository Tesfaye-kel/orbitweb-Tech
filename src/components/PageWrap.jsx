import { motion } from 'framer-motion'

function PageWrap({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26, scale: 0.985, filter: 'blur(5px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -20, scale: 0.992, filter: 'blur(4px)' }}
      transition={{ duration: 0.62, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

export default PageWrap
