import { useState } from 'react'
import Reveal from './ui/Reveal.jsx'

const EMAIL = 'najafali6643@gmail.com'

function Field({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label
        htmlFor={name}
        className="font-sans text-[11px] uppercase tracking-[0.12em] font-medium leading-none text-[var(--color-muted)]"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className="mt-4 pb-3 w-full cursor-none transition-color duration-200 bg-transparent font-sans text-[16px] font-regular leading-none text-[var(--color-faint)] border-b-1 border-[var(--color-border)] placeholder-[var(--color-muted)]/50 outline-none focus:border-[#ffffff]"
      />
    </div>
  )
}

function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const body = `From: ${name} (${email})\n\n${message}`
    const href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`

    window.location.href = href
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <Reveal y={20}>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <Field
            label="Name"
            name="name"
            placeholder="Your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Field
            label="Email"
            name="email"
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
      </Reveal>

      <Reveal y={20} delay={0.08}>
        <Field
          label="Subject"
          name="subject"
          placeholder="what's it about"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          className='mt-10'
        />
      </Reveal>

      <Reveal y={20} delay={0.16}>
      <div className="flex h-[200px] flex-col">
        <label
          htmlFor="message"
          className="mt-10 font-sans text-[12px] uppercase tracking-[0.12em] font-medium leading-none text-[var(--color-muted)]"
        >
          message
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell me about the project"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
          className="mt-4 pb-3 h-full w-full transition-color duration-200 cursor-none resize-none bg-transparent font-sans text-[16px] font-regular leading-none text-[var(--color-faint)] focus:border-[#ffffff] placeholder-[var(--color-muted)]/50 outline-none border-b-1 border-[var(--color-border)]"
        />
      </div>
      </Reveal>

      <Reveal y={20} delay={0.24}>
      <button
        type="submit"
        className="group mt-12 inline-flex w-fit items-center gap-3 rounded-full bg-[var(--color-primary)] px-10 py-3 font-sans text-base font-medium text-[var(--color-page)] transition-all duration-300 ease-out hover:bg-black/10 hover:text-[var(--color-primary)] hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.3)]"
      >
        Send message
      </button>
      </Reveal>
    </form>
  )
}

export default ContactForm