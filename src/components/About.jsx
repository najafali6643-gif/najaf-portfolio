import Button from './ui/Button.jsx'
import Reveal from './ui/Reveal.jsx'
import Parallax from './ui/Parallax.jsx'
import aboutPortrait from '../assets/image/about-portrait.webp'
import { usePageTransition } from '../Context/PageTransitionContext.jsx'

function About() {
  const { transitionTo } = usePageTransition()

  return (
    <section
      id="about"
      className="flex flex-col items-center justify-center gap-10 py-16 px-5 md:flex-row md:px-13 md:py-20 md:item-center md:gap-16"
    >
      <Parallax className="h-[100%] w-[100%] shrink-0 md:h-[560px] md:w-[560px]">
        <img
          src={aboutPortrait}
          alt="Najaf Ali — portrait"
          width="1000"
          height="1000"
          loading="lazy"
          decoding="async"
          className="h-auto w-full object-cover"
        />
      </Parallax>

      <div className="flex flex-col w-[100%] md:w-[500px] gap-2 md:gap-0">

        <Reveal delay={0.1}>
          <h2 className="font-heading text-[clamp(32px,6.5vw,48px)] leading-none text-[var(--color-primary)] font-light">
            Who am I
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-2 lg:max-w-[500px] text-base leading-[1.5] text-[var(--color-faint)] opacity-65 md:mt-6">
            I&apos;m an aspiring Front-End Developer focused on building clean,
            responsive, and modern web experiences. I enjoy turning UI/UX designs
            into pixel-perfect interfaces and bringing them to life with HTML, CSS,
            JavaScript, and React.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mt-1 max-w-[500px] text-base leading-[1.5] text-[var(--color-faint)] opacity-65 md:mt-4">
            I&apos;ve also worked with WordPress, Webflow, and modern website-building
            tools, while continuously improving my development and design skills
            through hands-on projects.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <Button className="mt-6 md:mt-9" withArrow
           onClick={() => transitionTo('/contact')}>
            Let&apos;s talk
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

export default About
