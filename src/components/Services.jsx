import Button from './ui/Button.jsx'
import SectionTag from './ui/SectionTag.jsx'
import Reveal from './ui/Reveal.jsx'
import { services } from '../data/services.js'
import { usePageTransition } from '../Context/PageTransitionContext.jsx'

function ServiceCard({ service, index }) {

  return (
    <Reveal delay={0.08 * index} className="border-t border-[var(--color-border)] py-6 px-0 md:px-8 md:py-8">
      <span className="text-[clamp(11px,2.5vw,12px)] font-light text-[var(--color-muted)]">
        {service.number}
      </span>
      <h3 className="mt-5 font-heading text-[clamp(26px,5.5vw,32px)] leading-[30px] text-[var(--color-primary)] font-light">
        {service.title}
      </h3>
      <p className="mt-3 text-base leading-[1.5] text-[var(--color-faint)] opacity-65">
        {service.description}
      </p>
    </Reveal>
  )
}

function Services() {
  const { transitionTo } = usePageTransition()

  return (
    <section
      id="services"
      className="flex flex-col px-5 py-10 md:px-13 md:py-20 gap-10 md:gap-15"
    >
      <Reveal className="flex flex-col items-center gap-4 text-center">
        <h2 className="font-heading text-[clamp(32px,6.5vw,48px)] leading-[1.3] text-[var(--color-primary)] font-light">
          What I Can Do
        </h2>
        <p className="max-w-[600px] text-base text-[var(--color-faint)] opacity-65 md:mt-2">
          From responsive interfaces to custom websites, I build modern web
          experiences focused on clean design, usability, and performance.
        </p>
      </Reveal>

      <div>
       <div className="grid md:grid-cols-3 divide-x-0 divide-[var(--color-border)] [&>*:nth-child(3n)]:border-r-0 md:divide-x">
        {services.map((service, index) => (
          <ServiceCard key={service.number} service={service} index={index} />
        ))}
       </div>

       <Reveal delay={0.15} className="flex flex-col items-start gap-6 justify-between border-t border-[var(--color-border)] border-b border-[var(--color-border)] px-0 py-12 md:flex-row md:items-center md:justify-between md:gap-10 md:px-8 md:py-14">
        <span className="font-heading text-[clamp(24px,2.4vw,32px)] leading-[30px] bg-[linear-gradient(90deg,#EBE1B0_-86.53%,#AEA8FE_100%)] bg-clip-text text-transparent font-light">
          Have a project in mind? Let&apos;s talk.
        </span>
        <Button withArrow
        onClick={() => transitionTo('/contact')}>
          Get In touch
        </Button>
       </Reveal>
      </div>
    </section>
  )
}

export default Services
