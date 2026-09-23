import Reveal from './ui/Reveal.jsx'

const EMAIL = 'najafali6643@gmail.com'

function Contact() {
  return (
    <section
      id="contact"
      className="flex flex-col gap-[33px] px-5 pt-10 pb-10 md:px-13 md:pt-30 md:mb-15"
    >
      <div className="max-w-[971px]">
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[633px] font-sans text-base leading-6 text-[var(--color-faint)] opacity-65">
            Have a project in mind or looking for someone to bring your website idea
            to life? Let&apos;s talk about your goals, requirements, and how I can help.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
        <a
          href={`mailto:${EMAIL}`}
          className="group mt-6 inline-flex relative gap-4 font-heading text-[clamp(30px,6.2vw,92px)] font-light leading-[1.06] bg-[linear-gradient(90deg,#EBE1B0_-86.53%,#AEA8FE_100%)] bg-clip-text text-transparent  transition-opacity md:text-[clamp(22px,8.2vw,92px)] md:mt-12 active:opacity-[0.8]" 
         >
          <span className="pointer-events-none absolute inset-x-0 -bottom-[0.06em] h-[0.04em] origin-left scale-x-0 bg-[#AEA8FE] transition-transform duration-700 ease-out group-hover:scale-x-93"></span>

          {EMAIL}
          <span className="transition-all hidden duration-700 ease-out overflow-hidden items-center opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 md:inline-flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" fill="#AEA8FE" viewBox="0 0 256 256"><path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"></path></svg>
          </span>
        </a>
        </Reveal>
      </div>
    </section>
  )
}

export default Contact
