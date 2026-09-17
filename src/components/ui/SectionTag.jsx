function SectionTag({ children, className = '' }) {
  return (
    <span
      className={`text-[clamp(10px,1.4vw,14px)]
        leading-[1.1] font-medium tracking-[1.12px] text-[var(--color-muted)] uppercase ${className}`}
    >
      {children}
    </span>
  )
}

export default SectionTag
