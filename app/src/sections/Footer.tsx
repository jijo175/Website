import { Globe, Instagram, Facebook, Send } from 'lucide-react'

export default function Footer() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="w-full bg-mist py-12">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Hairline */}
        <div
          className="w-full h-px mb-8"
          style={{ background: 'var(--glass-border)' }}
        />

        {/* Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Globe
              className="w-5 h-5"
              strokeWidth={1.5}
              style={{ color: 'rgba(250, 250, 250, 0.5)' }}
            />
            <span
              className="small-caps"
              style={{ color: 'rgba(250, 250, 250, 0.5)' }}
            >
              JAPAN TOURS
            </span>
          </div>

          {/* Nav Links */}
          <div className="flex items-center gap-6 md:gap-8">
            <button
              onClick={() => scrollToSection('home')}
              className="small-caps transition-colors duration-300 hover:text-kimono"
              style={{ color: 'rgba(250, 250, 250, 0.5)' }}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="small-caps transition-colors duration-300 hover:text-kimono"
              style={{ color: 'rgba(250, 250, 250, 0.5)' }}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('included')}
              className="small-caps transition-colors duration-300 hover:text-kimono"
              style={{ color: 'rgba(250, 250, 250, 0.5)' }}
            >
              Included
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="small-caps transition-colors duration-300 hover:text-kimono"
              style={{ color: 'rgba(250, 250, 250, 0.5)' }}
            >
              Contacts
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="transition-all duration-300 hover:text-kimono hover:scale-110"
              style={{ color: 'rgba(250, 250, 250, 0.5)' }}
              aria-label="Instagram"
            >
              <Instagram className="w-[18px] h-[18px]" strokeWidth={1.5} />
            </a>
            <a
              href="#"
              className="transition-all duration-300 hover:text-kimono hover:scale-110"
              style={{ color: 'rgba(250, 250, 250, 0.5)' }}
              aria-label="Facebook"
            >
              <Facebook className="w-[18px] h-[18px]" strokeWidth={1.5} />
            </a>
            <a
              href="#"
              className="transition-all duration-300 hover:text-kimono hover:scale-110"
              style={{ color: 'rgba(250, 250, 250, 0.5)' }}
              aria-label="Telegram"
            >
              <Send className="w-[18px] h-[18px]" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
