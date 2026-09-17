import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

function PageLoader({ onComplete }) {
  const [showLoader] = useState(() => {
    return !sessionStorage.getItem('page-loader-shown')
  })
  const loaderRef = useRef(null)
  const percentageRef = useRef(null)
  const progressRef = useRef(null)
  const statusRef = useRef(null)

  useEffect(() => {
   const markComplete = () => {
     onComplete?.()
   }

   if (!showLoader) {
     markComplete()
     return
   }

   sessionStorage.setItem('page-loader-shown', 'true')

    const loader = loaderRef.current
    const percentage = percentageRef.current
    const progress = progressRef.current
    const status = statusRef.current

    if (!loader || !percentage || !progress || !status) return

    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

     window.lenis?.stop()

    const counter = { value: 0 }

    const updateStatus = (text) => {
      gsap.to(status, {
        opacity: 0,
        y: -4,
        duration: 0.15,
        ease: 'power2.out',
        onComplete: () => {
          status.textContent = text

          gsap.to(status, {
            opacity: 0.6,
            y: 0,
            duration: 0.25,
            ease: 'power2.out',
          })
        },
      })
    }

    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.style.overflow = ''
        document.body.style.overflow = ''


        window.lenis?.start()
        markComplete()
              },
    })

    // Initial state
    gsap.set(loader, {
      yPercent: 0,
    })

    gsap.set(percentage, {
      opacity: 0,
      y: 20,
    })

    gsap.set(progress, {
      scaleX: 0,
    })

    // Percentage entrance
    tl.to(percentage, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    })

    // Loading begins
    tl.call(() => {
      updateStatus('Loading')
    })

    // Counter + progress
    tl.to(counter, {
      value: 100,
      duration: 2.4,
      ease: 'power2.out',

      onUpdate: () => {
        const value = Math.round(counter.value)

        percentage.textContent = `${value}%`

        progress.style.transform = `scaleX(${counter.value / 100})`

        // Status changes
        if (value === 30) {
          updateStatus('Building')
        }

        if (value === 65) {
          updateStatus('Preparing')
        }

        if (value === 90) {
          updateStatus('Finalizing')
        }
      },
    })

    // 100%
    tl.call(() => {
      updateStatus('Ready')
    })

    // Small pause
    tl.to({}, {
      duration: 0.2,
    })

    // Slight scale/opacity emphasis at 100%
    tl.to(percentage, {
      scale: 1.025,
      duration: 0.2,
      ease: 'power2.out',
    })

    tl.to(percentage, {
      scale: 1,
      duration: 0.25,
      ease: 'power2.inOut',
    })

    // Premium exit
    tl.to(loader, {
      yPercent: -100,
      duration: 1.15,
      ease: 'expo.inOut',
    })

    return () => {
  tl.kill()
  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
  window.lenis?.start()
  }
  
  }, [showLoader, onComplete])

  if (!showLoader) {
  return null
}

  return (
    <div
      ref={loaderRef}
      className="
        fixed
        inset-0
        z-[99999]
        flex
        flex-col
        justify-between
        bg-[var(--color-page)]
        px-6
        py-6
        md:px-10
        md:py-8
        will-change-transform
      "
      aria-hidden="true"
    >
      {/* Top */}
      <div className="flex items-start justify-between">
        <div
          
          aria-label="Najaf loder"
          className="
            group
            flex
            items-center
            gap-2
            shrink-0
            text-[var(--color-primary)]
          "
         >
          <span
            className="
              text-[16px]
              font-semibold
              transition-all
              duration-500
              ease-out
              rotate-180
              leading-none
            "
           >
            ✦
          </span>

          <span
            className="
              font-logo
              text-[30px]
              font-semibold
              leading-none
              whitespace-nowrap
            "
           >
            Najaf.
          </span>
        </div>

        <span
          ref={statusRef}
          className="
            text-xs
            uppercase
            tracking-[0.15em]
            text-[var(--color-faint)]
            font-medium
            opacity-80
          "
        >
          Loading
        </span>
      </div>

      {/* Center */}
      <div className="flex items-center justify-center">
        <span
          ref={percentageRef}
          className="
            font-heading
            text-[clamp(80px,12vw,180px)]
            font-light
            leading-none
            tracking-[-0.05em]
            text-[var(--color-primary)]
            will-change-transform
          "
        >
          0%
        </span>
      </div>

      {/* Bottom */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span
            className="
              text-[14px]
              font-regular
              text-[var(--color-faint)]
              opacity-80
            "
          >
            Portfolio
          </span>

          <span
            className="
              text-[14px]
              text-[var(--color-faint)]
              font-regular
              opacity-80
            "
          >
            2026
          </span>
        </div>

        {/* Progress line */}
        <div
          className="
            h-px
            w-full
            overflow-hidden
            bg-white/10
          "
        >
          <div
            ref={progressRef}
            className="
              h-full
              w-full
              origin-left
              scale-x-0
              bg-[var(--color-primary)]
              will-change-transform
            "
          />
        </div>
      </div>
    </div>
  )
}

export default PageLoader