// function ArrowIcon({ className = '' }) {
//   return (
//     <svg
//       width="19"
//       height="19"
//       viewBox="0 0 256 256"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       aria-hidden="true"
//       className={className}
//     >
//       <path
//         d="M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z"
//         fill="currentcolor"
//       />
//     </svg>
//   )
// }

// function Button({
//   variant = 'solid',
//   withArrow = false,
//   rotateArrow = false,
//   href,
//   className = '',
//   children,
//   ...props
// }) {
//   const base =
//     'group inline-flex items-center justify-center gap-2.5 rounded-full px-5 py-2.5 text-base font-medium transition-all duration-500 ease-out'
//   const variants = {
//     solid: 'bg-[var(--color-primary)] text-[var(--color-page)] hover:text-[var(--color-primary)] hover:bg-black/10 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.3)]',
//     outline:
//       'border border-white/20 bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-page)]',
//   }
//   const classes = `${base} ${variants[variant]} ${className}` .trim()

//   const arrowClasses = `
//     shrink-0 transition-transform duration-300 ease-out
//     group-hover:translate-x-1
//     ${rotateArrow ? 'bounce-down' : ''}
//   `.trim()

//   if (href) {
//     return (
//       <a href={href} className={classes} {...props}>
//         {children}
//         {withArrow && (
//           <ArrowIcon className={rotateArrow ? 'bounce-down' : ''} />
//         )}
//       </a>
//     )
//   }

//   return (
//     <button className={classes} {...props}>
//       {children}
//       {withArrow && (
//         <ArrowIcon className={rotateArrow ? 'bounce-down' : ''} />
//       )}
//     </button>
//   )
// }

// export default Button

import React from 'react'

function ArrowIcon({ className = '' }) {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z"
        fill="currentColor"
      />
    </svg>
  )
}

function Button({
  variant = 'solid',
  withArrow = false,
  rotateArrow = false,
  href,
  className = '',
  children,
  ...props
}) {
  const base =
    'group inline-flex items-center justify-center gap-2.5 rounded-full px-5 py-2.5 text-base font-medium transition-all duration-500 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:opacity-[0.8] active:scale-[0.96]'
  
  const variants = {
    solid:
      'bg-[var(--color-primary)] text-[var(--color-page,#000)] hover:text-[var(--color-primary,#fff)] hover:bg-black/10 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.3)]',
    outline:
      'border border-white/30 bg-transparent text-[var(--color-primary,#fff)] hover:bg-[var(--color-primary,#fff)] hover:text-[var(--color-page,#000)]',
  }

  const classes = `${base} ${variants[variant] || variants.solid} ${className}`.trim()

  const arrowClasses = `
    shrink-0 transition-transform duration-300 ease-out
    group-hover:translate-x-1
    ${rotateArrow ? 'bounce-down' : ''}
  `.trim()

  const content = (
    <>
      {children}
      {withArrow && <ArrowIcon className={arrowClasses} />}
    </>
  )

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    )
  }

  return (
    <button type={props.type || 'button'} className={classes} {...props}>
      {content}
    </button>
  )
}

export default Button