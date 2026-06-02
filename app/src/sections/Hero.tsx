import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Globe, Instagram, Facebook, Send } from 'lucide-react'

const polaroids = [
  { img: '/polaroid-1.jpg', caption: '3 cities in Japan' },
  { img: '/polaroid-2.jpg', caption: '10 days' },
  { img: '/polaroid-3.jpg', caption: 'gigabytes of photos' },
  { img: '/polaroid-4.jpg', caption: 'eat ramen' },
  { img: '/polaroid-5.jpg', caption: 'enjoy the vibe' },
]

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 300])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 500])
  const stripX = useTransform(scrollYProgress, [0, 1], [0, -400])
  const uiOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', minHeight: '600px' }}
    >
      {/*
        LAYERING STRATEGY (bottom to top):
        z-0: Full mountain background (sky + mountains)
        z-1: "JAPAN" display text (sits above the background)
        z-2: Mountain foreground mask — SAME image with CSS gradient mask
             that makes the sky transparent → text peeks through the sky
             but is hidden behind the mountain peaks
        z-5: Bottom-fade gradient to #0A0A0A
        z-10: Kimono figure
        z-11: Cherry blossom branch
        z-20: UI chrome (nav, polaroids, buttons)
      */}

      {/* ─── Z-0: Full mountain background ─── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: bgY, zIndex: 0, willChange: 'transform' }}
      >
        <img
          src="/hero-mountains.jpg"
          alt="Misty Japanese mountains at dawn"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </motion.div>

      {/* ─── Z-1: "JAPAN" Typography ─── */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ y: textY, zIndex: 1, willChange: 'transform' }}
      >
        <h1
          className="font-display select-none whitespace-nowrap"
          style={{
            fontSize: 'clamp(120px, 18vw, 280px)',
            letterSpacing: '0.02em',
            lineHeight: 0.85,
            WebkitTextStroke: '2px rgba(250, 250, 250, 0.85)',
            color: 'transparent',
            textShadow: '0 0 60px rgba(250, 250, 250, 0.08)',
            transform: 'translateY(5%)',
          }}
        >
          JAPAN
        </h1>
      </motion.div>

      {/* ─── Z-2: Mountain foreground mask ───
           Same mountain image but with a CSS gradient mask:
           - Sky portion (top ~35%) → transparent → JAPAN text shows through
           - Mountain peaks (~35-50%) → gradual fade → soft edge
           - Mountains + ground (50%+) → opaque → covers the text
           This creates the illusion that the text stands behind the mountains.
      */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ y: bgY, zIndex: 2, willChange: 'transform' }}
      >
        <img
          src="/hero-mountains.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 20%, rgba(0,0,0,0.4) 28%, rgba(0,0,0,0.8) 34%, black 40%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 20%, rgba(0,0,0,0.4) 28%, rgba(0,0,0,0.8) 34%, black 40%, black 100%)',
          }}
          loading="eager"
          aria-hidden="true"
        />
      </motion.div>

      {/* ─── Z-5: Bottom gradient fade to mist-black ─── */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ zIndex: 5, height: '40vh' }}
      >
        <div className="w-full h-full bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
      </div>

      {/* ─── Z-10: Kimono Figure (fixed, no parallax) ─── */}
      <div
        className="absolute pointer-events-none"
        style={{
          zIndex: 10,
          right: '5%',
          bottom: 0,
          height: '75vh',
          width: 'auto',
        }}
      >
        <img
          src="/kimono-figure.png"
          alt="Woman in floral kimono gazing at the mountains"
          className="h-full w-auto object-contain object-bottom"
          style={{ filter: 'drop-shadow(0 0 40px rgba(0,0,0,0.3))' }}
          loading="eager"
        />
      </div>

      {/* ─── Z-11: Cherry Blossom Branch ─── */}
      <div
        className="absolute pointer-events-none"
        style={{
          zIndex: 11,
          right: 0,
          top: 0,
          height: '80vh',
          width: '25vw',
        }}
      >
        <img
          src="/cherry-branch.png"
          alt=""
          className="h-full w-full object-contain object-right-top"
          loading="eager"
        />
      </div>

      {/* ─── Z-20: UI Chrome (fades on scroll) ─── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 20, opacity: uiOpacity }}
      >
        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 md:px-10 py-6 pointer-events-auto">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-kimono" strokeWidth={1.5} />
            <span className="small-caps text-kimono">JAPAN TOURS</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('about')} className="nav-link">About</button>
            <button onClick={() => scrollToSection('included')} className="nav-link">Included</button>
            <button onClick={() => scrollToSection('contact')} className="nav-link">Contacts</button>
          </div>
          <button
            onClick={() => scrollToSection('contact')}
            className="small-caps px-5 py-2 rounded-full border transition-all duration-300 pointer-events-auto"
            style={{ borderColor: 'var(--mountain-cream)', color: 'var(--kimono-white)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--lime-accent)'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(212, 248, 122, 0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--mountain-cream)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Book
          </button>
        </nav>

        {/* Social Icons + Vertical Flow Line */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 pointer-events-auto">
          {/* Top glow dot */}
          <div className="relative w-1.5 h-1.5">
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: 'var(--lime-accent)', boxShadow: '0 0 8px var(--lime-accent)' }}
            />
            <motion.div
              className="absolute -inset-1 rounded-full"
              style={{ background: 'var(--lime-accent)', opacity: 0.3 }}
              animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Animated flowing vertical line */}
          <div className="relative w-px" style={{ height: '60px', overflow: 'hidden' }}>
            <div
              className="absolute inset-0 w-full"
              style={{
                background: 'linear-gradient(to bottom, transparent 0%, var(--glass-border) 100%)',
              }}
            />
            <motion.div
              className="absolute left-0 right-0"
              style={{
                height: '40px',
                background: 'linear-gradient(to bottom, var(--lime-accent), var(--sakura-pink), transparent)',
                filter: 'blur(1px)',
                opacity: 0.8,
              }}
              animate={{ y: ['-40px', '60px'] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          <a href="#" className="text-kimono/50 hover:text-kimono hover:scale-110 transition-all duration-300" aria-label="Instagram">
            <Instagram className="w-5 h-5" strokeWidth={1.5} />
          </a>

          {/* Connector line between icons */}
          <div className="relative w-px" style={{ height: '20px', overflow: 'hidden' }}>
            <div className="absolute inset-0" style={{ background: 'var(--glass-border)' }} />
            <motion.div
              className="absolute left-0 right-0"
              style={{
                height: '10px',
                background: 'linear-gradient(to bottom, var(--sakura-pink), var(--lime-accent))',
                opacity: 0.6,
              }}
              animate={{ y: ['-10px', '20px'] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'linear', delay: 0.3 }}
            />
          </div>

          <a href="#" className="text-kimono/50 hover:text-kimono hover:scale-110 transition-all duration-300" aria-label="Facebook">
            <Facebook className="w-5 h-5" strokeWidth={1.5} />
          </a>

          {/* Connector line between icons */}
          <div className="relative w-px" style={{ height: '20px', overflow: 'hidden' }}>
            <div className="absolute inset-0" style={{ background: 'var(--glass-border)' }} />
            <motion.div
              className="absolute left-0 right-0"
              style={{
                height: '10px',
                background: 'linear-gradient(to bottom, var(--lime-accent), var(--mountain-cream))',
                opacity: 0.6,
              }}
              animate={{ y: ['-10px', '20px'] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'linear', delay: 0.6 }}
            />
          </div>

          <a href="#" className="text-kimono/50 hover:text-kimono hover:scale-110 transition-all duration-300" aria-label="Telegram">
            <Send className="w-5 h-5" strokeWidth={1.5} />
          </a>

          {/* Bottom flowing tail */}
          <div className="relative w-px" style={{ height: '60px', overflow: 'hidden' }}>
            <div
              className="absolute inset-0 w-full"
              style={{
                background: 'linear-gradient(to bottom, var(--glass-border) 0%, transparent 100%)',
              }}
            />
            <motion.div
              className="absolute left-0 right-0"
              style={{
                height: '40px',
                background: 'linear-gradient(to bottom, var(--mountain-cream), transparent)',
                filter: 'blur(1px)',
                opacity: 0.5,
              }}
              animate={{ y: ['-40px', '60px'] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'linear', delay: 0.9 }}
            />
          </div>

          {/* Bottom dot */}
          <div
            className="w-1 h-1 rounded-full"
            style={{ background: 'rgba(255,255,255,0.2)' }}
          />
        </div>

        {/* Polaroid Strip */}
        <motion.div
          className="absolute bottom-8 left-6 md:left-10 pointer-events-auto"
          style={{ x: stripX, willChange: 'transform' }}
        >
          <div className="flex gap-3 md:gap-4">
            {polaroids.map((p, i) => (
              <motion.div
                key={i}
                className="group relative flex-shrink-0 rounded-lg overflow-hidden"
                style={{
                  width: 'clamp(100px, 12vw, 140px)',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(8px)',
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  boxShadow: '0 20px 40px rgba(255, 184, 197, 0.2)',
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="overflow-hidden" style={{ height: 'clamp(70px, 8vw, 95px)' }}>
                  <img
                    src={p.img}
                    alt={p.caption}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-2">
                  <span className="text-[11px] text-mouse tracking-wide">{p.caption}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Book Button */}
        <button
          onClick={() => scrollToSection('contact')}
          className="absolute bottom-12 right-8 md:right-[28%] pointer-events-auto group"
          style={{ zIndex: 35 }}
        >
          <div
            className="relative overflow-hidden rounded-full px-10 py-4 md:px-12 md:py-5 transition-all duration-400"
            style={{ background: 'var(--mountain-cream)', backdropFilter: 'blur(8px)' }}
          >
            <div
              className="absolute inset-0 origin-bottom transition-transform duration-400 ease-out scale-y-0 group-hover:scale-y-100"
              style={{ background: 'linear-gradient(to top, #D4F87A, #F5E8D3)' }}
            />
            <span
              className="relative font-body font-medium text-sm tracking-wide"
              style={{ color: 'var(--mist-black)', letterSpacing: '0.06em' }}
            >
              Book
            </span>
          </div>
        </button>
      </motion.div>
    </section>
  )
}
