import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

function Parallax({
  children,
  speed = 1,
  className = '',
}) {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-40 * speed, 40 * speed],
  )

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        style={{ y }}
        className="h-[110%] w-full -mt-[5%] will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  )
}

export default Parallax