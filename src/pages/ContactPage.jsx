import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import ParticleBackground from '../components/ui/ParticleBackground.jsx'
import CustomCursor from '../components/ui/CustomCursor.jsx'
import ContactForm from '../components/ContactForm.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'

const EMAIL = 'najafali6643@gmail.com'

const INFO = [
  { label: 'Based in', value: 'Karachi, Pakistan.' },
  { label: 'Focus in', value: 'Front-end' },
]

function ContactPage() {
  usePageMeta({
    title: 'Contact — Najaf Ali',
    description:
      'Get in touch with Najaf Ali, a front-end developer based in Karachi, Pakistan. Briefs, collaborations, or a quick question — drop a note.',
    canonical: 'https://najaf-portfolio.vercel.app/contact',
  })
  return (
    <div id="top">
      <ParticleBackground fixed />
      <CustomCursor />

      <Navbar />

      <div className="relative z-10">
        <main>
          <section
            id="contact"
            className="flex flex-col justify-between gap-x-10 gap-y-16 px-5 pt-32 pb-16 md:pb-30 md:px-13 md:pt-40 lg:flex-row lg:gap-5"
          >
            <div className="flex w-full max-w-[563px] flex-col gap-5">
              <Reveal>
                <h1 className="font-heading leading-[1.2] text-[clamp(40px,5vw,5rem)] font-light leading-[1.05] text-[#f2f3ed]">
                  Let&apos;s build something worth shipping.
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-3 max-w-[543px] font-sans text-base font-medium leading-6 text-[#a3a3a3]">
                  Briefs, collaborations, or a quick question — drop a note. I
                  read everything and usually reply within a couple of working
                  days.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
              <a
                href={`mailto:${EMAIL}`}
                className="group mt-2 inline-flex relative gap-2 font-heading text-[clamp(30px,5.5vw,42px)] font-light leading-[1.06] bg-[linear-gradient(90deg,#EBE1B0_-86.53%,#AEA8FE_100%)] bg-clip-text text-transparent transition-opacity md:mt-6 active:opacity-[0.8]"
              >
                <span className="pointer-events-none absolute inset-x-0 -bottom-[0.06em] h-[0.04em] origin-left scale-x-0 bg-[#AEA8FE] transition-transform duration-700 ease-out group-hover:scale-x-92"></span>
                {EMAIL}

                <span className="transition-all hidden duration-700 ease-out overflow-hidden md:inline-flex items-center opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#AEA8FE"viewBox="0 0 256 256"><path d="M196,64V168a4,4,0,0,1-8,0V73.66L66.83,194.83a4,4,0,0,1-5.66-5.66L182.34,68H88a4,4,0,0,1,0-8H192A4,4,0,0,1,196,64Z"></path></svg>
                </span>
              </a>
              </Reveal>

              <Reveal delay={0.3}>
              <div className="flex gap-16 mt-4">
                {INFO.map((item) => (
                  <div key={item.label} className="flex flex-col gap-2.5">
                    <span className="text-[14px] font-regular leading-none text-[var(--color-muted)]">
                      {item.label}
                    </span>
                    <span className="font-sans text-base font-medium leading-6 text-[var(--color-primary)]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
              </Reveal>
            </div>

            <div className="w-full max-w-[660px]">
              <Reveal delay={0.15}>
                <ContactForm />
              </Reveal>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default ContactPage