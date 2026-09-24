import { useEffect } from 'react'
import Navbar from '../components/Navbar.jsx'
import ParticleBackground from '../components/ui/ParticleBackground.jsx'
import CustomCursor from '../components/ui/CustomCursor.jsx'
import Button from '../components/ui/Button.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { usePageTransition } from '../Context/PageTransitionContext.jsx'

function NotFound() {
  const { transitionTo } = usePageTransition()

  usePageMeta({
    title: 'Page not found — Najaf Ali',
    description:
      'The page you were looking for could not be found. Head back to the homepage.',
  })

  useEffect(() => {
    let meta = document.head.querySelector('meta[name="robots"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'robots')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', 'noindex')
  }, [])

  return (
    <div id="top">
      <ParticleBackground fixed />
      <CustomCursor />

      <Navbar />

      <div className="relative z-10">
        <main>
          <section className="flex min-h-screen flex-col items-center justify-center px-5 pb-16 md:px-13">
            <span className="mb-4 text-[clamp(10px,1.4vw,14px)] font-light uppercase tracking-[3.12px] text-[var(--color-muted)]">
              404
            </span>
            <h1 className="font-heading font-light tracking-[-1.56px] text-[var(--color-primary)] text-center text-[clamp(42px,6.4vw,90px)] leading-[1.1]">
              Page not found.
            </h1>
            <p className="mt-4 max-w-[430px] text-center text-base text-[var(--color-faint)] opacity-65">
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved. Let&apos;s get you back home.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button withArrow onClick={() => transitionTo('/')}>
                Back home
              </Button>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default NotFound