import Reveal from './ui/Reveal.jsx'

const socials = [
  {
    label: 'Linkedin',
    href: 'https://www.linkedin.com/in/najaf-ali-347605301',
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.7807 12.7809H10.5582V9.30027C10.5582 8.47029 10.5434 7.40183 9.40225 7.40183C8.24467 7.40183 8.06754 8.30617 8.06754 9.23986V12.7807H5.84508V5.6231H7.97865V6.60127H8.00854C8.22206 6.23617 8.5306 5.93582 8.90132 5.73221C9.27203 5.5286 9.69103 5.42935 10.1137 5.44503C12.3663 5.44503 12.7816 6.92675 12.7816 8.85437L12.7807 12.7809ZM3.33727 4.64476C2.62494 4.64488 2.04738 4.0675 2.04727 3.35517C2.04715 2.64285 2.62447 2.06529 3.3368 2.06517C4.04912 2.065 4.62668 2.64238 4.6268 3.3547C4.62686 3.69678 4.49103 4.02486 4.2492 4.26679C4.00737 4.50873 3.67934 4.64468 3.33727 4.64476ZM4.44855 12.781H2.22369V5.6231H4.4485V12.7809L4.44855 12.781ZM13.8887 0.00109171H1.10689C0.502793 -0.00570516 0.00738281 0.47822 0 1.08232V13.9175C0.00714844 14.5218 0.5025 15.0062 1.10684 14.9999H13.8887C14.4943 15.0074 14.9916 14.523 15 13.9175V1.08133C14.9914 0.476052 14.494 -0.00781453 13.8887 9.56187e-05" fill="currentColor"/>
</svg>

    ),
  },
  {
    label: 'Whatsapp',
    href: 'https://wa.me/923052564255?text=Hi%20Najaf%2C%20I%20found%20your%20portfolio.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.47 1.07 2.88 1.22 3.08.15.2 2.1 3.21 5.1 4.5.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM12.05 21.79h-.01a9.87 9.87 0 01-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 01-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.82 9.82 0 016.99 2.9 9.82 9.82 0 012.89 7 9.9 9.9 0 01-9.89 9.87zM20.46 3.49A11.8 11.8 0 0012.05 0C5.5 0 .16 5.33.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 005.68 1.45h.01c6.55 0 11.89-5.33 11.89-11.89 0-3.18-1.24-6.16-3.48-8.42z" />
      </svg>
    ),
  },
  {
    label: 'Github',
    href: 'https://github.com/najafali6643-gif',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 .3a12 12 0 00-3.79 23.39c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .1-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.38.82 1.11.82 2.24v3.32c0 .32.21.7.82.58A12 12 0 0012 .3z" />
      </svg>
    ),
  },
]

function Footer() {
  return (
    <footer className="flex justify-between px-5 pb-10 md:px-13 md:pt-10">
      <Reveal y={16} className="flex w-full gap-6 items-start justify-between border-t border-[var(--color-border)] pt-10 pb-5 flex-col md:flex-row md:item-center md">
        <span className="text-sm text-[var(--color-faint)] opacity-65">
          © 2026 Najaf Ali. All rights reserved.
        </span>
        <ul className="flex flex-wrap items-center order-first gap-2 md:order-last">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"

                className="flex items-center px-4 py-2 rounded-full border border-[var(--color-border)] gap-2 text-[13px] font-medium text-[var(--color-faint)] opacity-65 transition-all hover:opacity-100 active:scale-[0.96] active:bg-white/[0.06] active:text-[var(--color-text)]"
              >
                {social.icon}
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </footer>
  )
}

export default Footer
