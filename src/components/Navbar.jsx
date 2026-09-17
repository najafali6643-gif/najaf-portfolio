// import { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import Button from './ui/Button.jsx'
// import { usePageTransition } from '../Context/PageTransitionContext.jsx'

// const NAV_LINKS = [
//   { label: 'About', href: '#about' },
//   { label: 'Skill', href: '#skills' },
//   { label: 'Work', href: '#work' },
// ]

// function Navbar() {
//   const [scrolled, setScrolled] = useState(false)
//   const { transitionTo } = usePageTransition()

//   useEffect(() => {
//     const handleScroll = () => {
//       const triggerPoint = window.innerHeight * 0.5

//       setScrolled(window.scrollY >= triggerPoint)
//     }

//     window.addEventListener('scroll', handleScroll, {
//       passive: true,
//     })

//     handleScroll()

//     return () => {
//       window.removeEventListener('scroll', handleScroll)
//     }
//   }, [])

//   return (
//     <header
//       className="
//         fixed
//         inset-x-0
//         top-0
//         z-50
//         flex
//         justify-center
//         pointer-events-none
//         pt-[20px]
//         px-[40px]
//       "
//     >
//       <nav
//         className="
//           pointer-events-auto
//           flex
//           items-center
//           justify-between
//           box-border
//           border
//           transition-all
//           duration-500
//           ease-[cubic-bezier(0.22,1,0.36,1)]
//         "
//         style={{
//           /*
//            * Before 50%:
//            * 100% width
//            *
//            * After 50%:
//            * 50% width
//            */
//           width: scrolled ? '50%' : '100%',

//           /*
//            * Padding NEVER changes.
//            */
//           padding: '10px 12px',

//           /*
//            * Background appears after crossing 50%.
//            */
//           backgroundColor: scrolled
//             ? 'rgba(0, 0, 0, 0.4)'
//             : 'rgba(0, 0, 0, 0)',

//           /*
//            * Border appears after crossing 50%.
//            */
//           borderColor: scrolled
//             ? 'rgba(255, 255, 255, 0.2)'
//             : 'rgba(255, 255, 255, 0)',

//           /*
//            * Blur appears after crossing 50%.
//            */
//           backdropFilter: scrolled
//             ? 'blur(16px)'
//             : 'blur(0px)',

//           WebkitBackdropFilter: scrolled
//             ? 'blur(16px)'
//             : 'blur(0px)',

//           /*
//            * Rounded corners appear together.
//            */
//           borderRadius: scrolled
//             ? '999px'
//             : '0px',
//         }}
//       >
//         {/* LOGO */}

//         <a
          
//           aria-label="Najaf home"
//           className="
//             group
//             flex
//             items-center
//             gap-2
//             shrink-0
//             text-[var(--color-primary)]
//           "
//           onClick={() => transitionTo('/')}
//          >
//           <span
//             className="
//               text-[16px]
//               font-semibold
//               transition-all
//               duration-500
//               ease-out
//               rotate-180
//               leading-none
//               group-hover:rotate-90
//             "
//            >
//             ✦
//           </span>

//           <span
//             className="
//               font-logo
//               text-[30px]
//               font-semibold
//               leading-none
//               whitespace-nowrap
//             "
//            >
//             Najaf.
//           </span>
//         </a>

//         {/* NAVIGATION */}

//         <div
//           className="
//             flex
//             items-center
//             gap-8
//             shrink-0
//           "
//         >
//           <ul
//             className="
//               flex
//               items-center
//               gap-6
//           "
//           >
//             {NAV_LINKS.map((link) => (
//               <li key={link.label}>
//                 <a
//                   href={link.href}
//                   className="
//                   group
//                   relative
//                   text-[15px]
//                   text-[var(--color-muted)]
//                   whitespace-nowrap
//                   transition-opacity
//                   duration-200
//                   hover:text-[var(--color-primary)]
//                   "
//                 >
//                    {link.label}

//                 <span
//                   className="
//                    absolute
//                    -bottom-1
//                    left-0
//                    h-px
//                    w-full
//                    origin-left
//                    scale-x-0
//                    bg-current
//                    transition-transform
//                    duration-300
//                    ease-[cubic-bezier(0.22,1,0.36,1)]
//                    group-hover:scale-x-100
//                    "
//                   />
//                </a>
//               </li>
//             ))}
//           </ul>

//           <Button
//             className="text-[15px]"
//             withArrow
//             onClick={() => transitionTo('/contact')}
//            >
//             Get In touch
//           </Button>
//         </div>
//       </nav>
//     </header>
//   )
// }

// export default Navbar






import { useEffect, useState } from 'react'
import Button from './ui/Button.jsx'
import { usePageTransition } from '../Context/PageTransitionContext.jsx'
import Reveal from '../components/ui/Reveal.jsx'


const EMAIL = 'najafali6643@gmail.com'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skill', href: '#skills' },
  { label: 'Work', href: '#work' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isDesktop, setIsDesktop] = useState(
    window.innerWidth >= 768
  )
  const [menuOpen, setMenuOpen] = useState(false)

  const { transitionTo } = usePageTransition()

  useEffect(() => {
    const handleScroll = () => {
      const triggerPoint = window.innerHeight * 0.5

      setScrolled(window.scrollY >= triggerPoint)
    }

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768)

      // Close mobile menu when entering desktop
      if (window.innerWidth >= 768) {
        setMenuOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    window.addEventListener('resize', handleResize)

    handleScroll()
    handleResize()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const handleLogoClick = (e) => {
    e.preventDefault()
    closeMenu()
    transitionTo('/')
  }

  const handleContactClick = () => {
    closeMenu()
    transitionTo('/contact')
  }

  return (
    <>

      <header
        className="
          fixed
          inset-x-0
          top-0
          z-50
          flex
          justify-center
          pointer-events-auto
          md:px-[20px]
          md:pt-[20px]
        "
>
        <nav
          className="
            pointer-events-auto
            flex
            items-center
            justify-between
            box-border
            border
            gap-30
            px-5
            md:px-3
            md:py-[10px]
            py-[16px]
            transition-all
            duration-500
            ease-[cubic-bezier(0.22,1,0.36,1)]
          "
          style={{
          
          width:
            scrolled && isDesktop
             ? '600px'
             : '100%',

          
          backgroundColor: 
          scrolled && isDesktop
            ? 'rgba(0, 0, 0, 0.1)'
            : 'rgba(0, 0, 0, 0)',


          borderColor: 
          scrolled && isDesktop
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(255, 255, 255, 0)',

          
          backdropFilter: 
          scrolled
            ? 'blur(16px)'
            : 'blur(0px)',

          WebkitBackdropFilter: 
          scrolled
            ? 'blur(16px)'
            : 'blur(0px)',

          
          borderRadius: 
          scrolled && isDesktop
            ? '999px'
            : '0px',
        }}
        >
        
          <a
            href="#top"
            aria-label="Najaf home"
            onClick={handleLogoClick}
            className="
              group
              flex
              shrink-0
              items-center
              gap-2
              active:opacity-[0.8]
              text-[var(--color-primary)]
            "
          >
            <span
              className="
                rotate-180
                text-[clamp(13px,2.5vw,16px)]
                font-semibold
                leading-none
                transition-all
                duration-500
                ease-out
                group-hover:rotate-90
              "
            >
              ✦
            </span>

            <span
              className="
                font-logo
                text-[clamp(28px,3.5vw,30px)]
                font-semibold
                leading-none
                whitespace-nowrap
              "
            >
              Najaf.
            </span>
          </a>

          {/* =================================================
              DESKTOP NAVIGATION
              768px+
          ================================================== */}

          <div
            className="
              hidden
              items-center
              gap-8
              md:flex
            "
          >
            {/* NAV LINKS */}

            <ul
              className="
                flex
                items-center
                gap-6
              "
            >
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="
                      group
                      relative
                      whitespace-nowrap
                      text-[15px]
                      text-[var(--color-muted)]
                      transition-colors
                      duration-200
                      active:opacity-[0.8]
                      hover:text-[var(--color-primary)]
                    "
                  >
                    {link.label}

                    <span
                      className="
                        absolute
                        -bottom-1
                        left-0
                        h-px
                        w-full
                        origin-left
                        scale-x-0
                        bg-current
                        transition-transform
                        duration-300
                        ease-[cubic-bezier(0.22,1,0.36,1)]
                        group-hover:scale-x-100
                      "
                    />
                  </a>
                </li>
              ))}
            </ul>

            {/* CONTACT BUTTON */}

            <Button
              className="text-[15px]"
              withArrow
              onClick={handleContactClick}
            >
              Get In touch
            </Button>
          </div>

          {/* =================================================
              HAMBURGER
              0–767px
          ================================================== */}

          <button
            type="button"
            aria-label={
              menuOpen
                ? 'Close menu'
                : 'Open menu'
            }
            aria-expanded={menuOpen}
            onClick={() =>
              setMenuOpen((prev) => !prev)
            }
            className="
              relative
              z-[100]
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              md:hidden
            "
          >
            <span className="relative block h-3 w-6">

              {/* TOP */}

              <span
                className={`
                  absolute
                  left-0
                  top-0
                  block
                  h-[1.3px]
                  w-full
                  bg-[var(--color-primary)]
                  transition-transform
                  duration-300
                  ease-out

                  ${
                    menuOpen
                      ? 'translate-y-[5px] rotate-45'
                      : ''
                  }
                `}
              />

              {/* MIDDLE */}

              {/* <span
                className={`
                  absolute
                  left-0
                  top-[9px]
                  block
                  h-[1.3px]
                  w-full
                  bg-[var(--color-primary)]
                  transition-opacity
                  duration-200

                  ${
                    menuOpen
                      ? 'opacity-0'
                      : 'opacity-100'
                  }
                `}
              /> */}

              {/* BOTTOM */}

              <span
                className={`
                  absolute
                  left-0
                  bottom-0
                  block
                  h-[1.3px]
                  w-full
                  bg-[var(--color-primary)]
                  transition-transform
                  duration-300
                  ease-out

                  ${
                    menuOpen
                      ? '-translate-y-[5px] -rotate-45'
                      : ''
                  }
                `}
              />

            </span>
          </button>
        </nav>
      </header>

      {/* =====================================================
          MOBILE MENU
          0–767px
      ====================================================== */}

      <div
        className={`
          fixed
          inset-0
          z-40
          bg-[var(--color-page)]
          md:hidden

          transition-all
          duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]

          ${
            menuOpen
              ? 'visible opacity-100'
              : 'invisible opacity-0'
          }
        `}
      >
        <div
          className="
            flex
            h-full
            flex-col
            px-5
            pb-8
            gap-0
            pt-28
            sm:px-8
          "
        >

          <nav className="flex flex-col divide-y divide-[var(--color-border)]">
            {NAV_LINKS.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className={`
                  flex
                  items-center
                  justify-between
                  border-
                  border-[var(--color-border)]
                  pt-5
                  py-3
                  font-heading
                  font-light
                  tracking-[-0.03em]
                  text-[clamp(48px,10vw,52px)]
                  leading-[1]
                  text-[var(--color-primary)]
                  active:opacity-[0.8]

                  transition-all
                  duration-500
                  ease-[cubic-bezier(0.22,1,0.36,1)]

                  ${
                    menuOpen
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-8 opacity-0'
                  }
                `}
                style={{
                  transitionDelay: menuOpen
                    ? `${index * 80}ms`
                    : '0ms',
                }}
              >
                <span>
                  {link.label}
                </span>

                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="#AEA8FE" viewBox="0 0 256 256"><path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"></path></svg>
              </a>
            ))}
          </nav>

          <div className='flex flex-col h-full justify-between'>
           <div
            className={`
              flex
              flex-col
              w-full
              items-start
              justify-between
              gap-3
              border-t
              border-[var(--color-border)]
              pt-10
              text-left
              transition-all
              duration-500

              ${
                menuOpen
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-5 opacity-0'
              }
            `}
            >
            <span
                className="
                  block
                  text-sm
                  text-[var(--color-faint)]
                  opacity-50
                "
              >
                Have a project in mind?
              </span>

              <Button
              className="text-[15px]"
              withArrow
              onClick={handleContactClick}
            >
              Get In touch
            </Button>
           </div>
           
           <div className={`
             mt-auto
             flex
             flex-col
             gap-2
             transition-all
             duration-500
             ease-out
             ${
               menuOpen
                 ? 'translate-y-0 opacity-100'
                 : 'translate-y-5 opacity-0'
             }
           `}
           >
             <a
                href={`mailto:${EMAIL}`}
                className="group mt-2 inline-flex relative gap-2 font-heading text-[clamp(30px,5.5vw,42px)] font-light leading-[1.06] bg-[linear-gradient(90deg,#EBE1B0_-86.53%,#AEA8FE_100%)] bg-clip-text text-transparent transition-opacity md:mt-6 active:opacity-[0.8]"
              >
                <span className="pointer-events-none absolute inset-x-0 -bottom-[0.06em] h-[0.04em] origin-left scale-x-0 bg-[#AEA8FE] transition-transform duration-700 ease-out group-hover:scale-x-80"></span>
                {EMAIL}

                <span className="transition-all hidden duration-700 ease-out overflow-hidden md:inline-flex items-center opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#AEA8FE"viewBox="0 0 256 256"><path d="M196,64V168a4,4,0,0,1-8,0V73.66L66.83,194.83a4,4,0,0,1-5.66-5.66L182.34,68H88a4,4,0,0,1,0-8H192A4,4,0,0,1,196,64Z"></path></svg>
                </span>
             </a>
             <span className='text-[14px] text-[var(--color-faint)] opacity-65'>Karachi,Pakistan</span>
           </div>
          </div>


        </div>
      </div>
    </>
  )
}

export default Navbar