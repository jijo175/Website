import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [formData, setFormData] = useState({ name: '', phone: '', comment: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission would go here
    alert('Thank you for your interest! We will contact you soon.')
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      style={{ minHeight: '80vh' }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/contact-bg.jpg"
          alt="Cherry blossoms framing Mount Fuji and pagoda"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Subtle dark overlay for form readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-mist/40 via-transparent to-mist/20" />
      </div>

      {/* Frosted Glass Form Panel */}
      <motion.div
        className="relative z-10 max-w-[1280px] mx-auto w-full px-6 md:px-10 py-24"
        initial={{ opacity: 0, x: -60 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="rounded-2xl p-8 md:p-12 w-full max-w-md"
          style={{
            background: 'var(--frost-dark)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid var(--glass-border)',
            boxShadow: '0 24px 80px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Heading */}
          <h2 className="editorial-serif text-kimono mb-2">
            Want to join us, but still have questions?
          </h2>
          <p className="small-caps text-lime mb-8">Leave a request</p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border-0 border-b px-0 py-3.5 text-kimono font-body placeholder:text-kimono/40 focus:outline-none transition-colors duration-200"
                style={{
                  borderBottomWidth: '1px',
                  borderBottomColor: 'var(--glass-border)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderBottomColor = 'var(--lime-accent)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderBottomColor = 'var(--glass-border)'
                }}
                required
              />
            </div>
            <div>
              <input
                type="tel"
                placeholder="Phone number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-transparent border-0 border-b px-0 py-3.5 text-kimono font-body placeholder:text-kimono/40 focus:outline-none transition-colors duration-200"
                style={{
                  borderBottomWidth: '1px',
                  borderBottomColor: 'var(--glass-border)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderBottomColor = 'var(--lime-accent)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderBottomColor = 'var(--glass-border)'
                }}
                required
              />
            </div>
            <div>
              <textarea
                placeholder="Comment"
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                rows={3}
                className="w-full bg-transparent border-0 border-b px-0 py-3.5 text-kimono font-body placeholder:text-kimono/40 focus:outline-none transition-colors duration-200 resize-none"
                style={{
                  borderBottomWidth: '1px',
                  borderBottomColor: 'var(--glass-border)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderBottomColor = 'var(--lime-accent)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderBottomColor = 'var(--glass-border)'
                }}
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full py-4 rounded-full font-body font-medium text-sm tracking-wide transition-colors duration-300"
              style={{
                background: 'var(--kimono-white)',
                color: 'var(--mist-black)',
                letterSpacing: '0.06em',
              }}
              whileHover={{
                background: 'var(--lime-accent)',
              }}
              transition={{ duration: 0.3 }}
            >
              Send
            </motion.button>
          </form>
        </div>
      </motion.div>
    </section>
  )
}
