import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

function Reveal({
  children,
  delay = 0,
  y = 24,
  className = '',
  once = true,
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.25 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export default Reveal