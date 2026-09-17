import SectionTag from './ui/SectionTag.jsx'
import Reveal from './ui/Reveal.jsx'
import { skills } from '../data/skills.js'

function SkillCard({ skill, index }) {
  return (
    <Reveal
      delay={0.08 * index}
      className="flex flex-col border-b sm:border-r sm:border-b-0 border-[var(--color-border)] pr-[32px] py-[42px] md:w-[280px]"
    >
      <span className="text-[clamp(11px,2.5vw,12px)] font-light text-[var(--color-faint)] opacity-65">
        {skill.number}
      </span>
      <h3 className="mt-8 font-heading font-light text-2xl leading-[30px] text-[var(--color-primary)] md:mt-8">
        {skill.title}
      </h3>
      <ul className="mt-3 flex flex-col gap-2 sm:gap-3 sm:mt-5">
        {skill.items.map((item) => (
          <li key={item} className="flex items-center gap-3">
            <span className="flex h-[18px] w-[18px] items-center justify-center">
              <svg width="6" height="6" viewBox="0 0 6 6" aria-hidden="true">
                <circle cx="3" cy="3" r="3" fill="var(--color-faint)" opacity="0.65" />
              </svg>
            </span>
            <span className="text-[14px] text-[var(--color-faint)] opacity-65 sm:text-[15px]">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </Reveal>
  )
}

function Skills() {
  return (
    <section
      id="skills"
      className="flex flex-col items-center gap-10 px-5 py-16 md:px-13 md:py-20 md:gap-15"
    >
      <Reveal className="flex flex-col items-center gap-4 text-center">
        <h2 className="font-heading text-[clamp(32px,6.5vw,48px)] leading-[1.3] text-[var(--color-primary)] font-light">
          Technologies I work With
        </h2>
        <p className="max-w-[520px] text-base text-[var(--color-faint)] opacity-65 md:mt-2">
          A selection of technologies and tools I use to design, build, and develop
          modern, responsive web experiences.
        </p>
      </Reveal>

      <div className="gap-[0px] md:gap-[38px]
      grid
      grid-cols-1
      [&>*:nth-child(4)]:border-b-0
      md:[&>*:nth-child(2)]:border-r-0
      sm:[&>*:nth-child(2)]:border-r-0
      sm:[&>*:nth-child(4)]:border-r-0
      sm:[&>*:nth-child(2)]:border-r
      lg:[&>*:nth-child(2)]:border-r
      md:[&>*:nth-child(4)]:border-r-0
      lg:grid-cols-4
      sm:grid-cols-2
      md:w-auto
      w-[100%]">
        {skills.map((skill, index) => (
          <SkillCard key={skill.number} skill={skill} index={index} />
        ))}
      </div>
    </section>
  )
}

export default Skills
