// import Button from '../ui/Button.jsx'
// import heroPortrait from '../../assets/image/hero-portrait.png'
// import HeroBackground from './HeroBackground.jsx'

// function Hero() {
//   return (
//     <section className="relative flex h-[100vh] items-center justify-between px-[90px] pt-[80px]">
//       <HeroBackground />

//       <div className="relative z-1 flex w-[900px] flex-col gap-5">
//         <span className="text-sm font-medium uppercase tracking-[1.12px] text-[var(--color-muted)]">
//           Front-end Developer
//         </span>

//         <h1 className="font-heading text-[72px] font-light leading-none tracking-[-1.56px] text-[var(--color-primary)]">
//           Najaf Ali.
//           <br />
//           <span className="block whitespace-nowrap leading-[1.1] text-[#8B90A0] font-medium">
//             Developer for AI &amp; products.
//           </span>
//         </h1>

//         <div className="flex items-center gap-3">
//           <Button href="#work" withArrow>
//             View my work
//           </Button>
//           <Button href="#contact" variant="outline" withArrow>
//             Let&apos;s talk
//           </Button>
//         </div>

//         <p className="max-w-[480px] text-base text-[var(--color-faint)] opacity-65">
//           Lead Interaction Designer for AI at Netflix. Previously Google, LinkedIn,
//           Apple, and eBay. Based in Las Vegas, from Toronto.
//         </p>
//       </div>

//       <img
//         src={heroPortrait}
//         alt="Najaf Ali — front-end developer portrait"
//         className="relative z-10 h-[100%] object-cover left-[-85px]"
//       />
//     </section>
//   )
// }

// export default Hero


import { motion } from 'framer-motion'
import Button from '../ui/Button.jsx'
import heroPortrait from '../../assets/image/hero-portrait.png'
import robotPortrait from '../../assets/image/hero-portrait-robot.png'
import HeroBackground from './HeroBackground.jsx'
import HeroImage from './Heroimage.jsx'
import { usePageTransition } from '../../Context/PageTransitionContext.jsx'
import { useLoader } from '../../Context/LoaderContext.jsx'

const EASE = [0.22, 1, 0.36, 1]

const mountVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.15 * i, ease: EASE },
  }),
}

function Hero() {
  const { transitionTo } = usePageTransition()
  const { loaderDone } = useLoader()

  return (
    <section className="relative flex flex-col items-left justify-between px-5 pt-30 pb-15 gap-5 md:gap-10 md:flex-row md:px-13 md:pb-16 md:pt-25 md:gap-23 md:items-center ">
      <HeroBackground />

      {/* LEFT CONTENT */}
      <div className="relative z-[1] flex w-100% flex-col gap-3 lm:w-[900px] md:gap-5">
        <motion.span
          variants={mountVariants}
          initial="hidden"
          animate={loaderDone ? 'visible' : 'hidden'}
          custom={0}
          className="text-[clamp(10px,1.4vw,14px)] font-light leading-[1] mb-2 uppercase tracking-[3.12px] text-[var(--color-muted)]"
        >
          Front-end Developer
        </motion.span>

        <motion.h1
          variants={mountVariants}
          initial="hidden"
          animate={loaderDone ? 'visible' : 'hidden'}
          custom={1}
          className="font-heading font-light tracking-[-1.56px] text-[var(--color-primary)] text-[clamp(42px,6.4vw,90px)] leading-[1.1]"
        >
          Najaf Ali.
          <br />

          <span className="block whitespace-nowrap text-[clamp(32px,4.4vw,56px)] font-regular text-[#8B90A0]">
            Developer for AI &amp; products.
          </span>
        </motion.h1>

         <motion.p
          variants={mountVariants}
          initial="hidden"
          animate={loaderDone ? 'visible' : 'hidden'}
          custom={2}
          className="max-w-[580px] mt-2 text-base text-[var(--color-faint)] opacity-65 md:max-w-[480px] md:mt-2"
        >
          Lead Interaction Designer for AI at Netflix. Previously Google,
          LinkedIn, Apple, and eBay. Based in Las Vegas, from Toronto.
        </motion.p>

        <motion.div
          variants={mountVariants}
          initial="hidden"
          animate={loaderDone ? 'visible' : 'hidden'}
          custom={3}
          className="flex items-center mt-3 gap-3 md:mt-3"
        >
          <Button href="#work" withArrow rotateArrow className='px-[22px] py-[10px] !bg-[var(--color-primary)] !text-[var(--color-page)] hover:!bg-[var(--color-primary)] hover:!text-[var(--color-page)] hover:!shadow-none !transition-transform [&>svg]:!translate-x-0 [&>svg]:!transition-none'>
            View my work
          </Button>

          <Button variant="outline" withArrow className='px-[22px] py-[10px]'
           onClick={() => transitionTo('/contact')}>
            Let&apos;s talk
          </Button>
        </motion.div>
      </div>

      {/* PORTRAIT */}
      <motion.div
        variants={mountVariants}
        initial="hidden"
        animate={loaderDone ? 'visible' : 'hidden'}
        custom={4}
      >
        <HeroImage
          normalImage={heroPortrait}
          robotImage={robotPortrait}
        />
      </motion.div>
    </section>
  )
}

export default Hero
