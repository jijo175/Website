import { useLenis } from './hooks/useLenis'
import CustomCursor from './sections/CustomCursor'
import Hero from './sections/Hero'
import About from './sections/About'
import WhatsIncluded from './sections/WhatsIncluded'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

export default function App() {
  useLenis()

  return (
    <div className="relative bg-mist min-h-screen">
      <CustomCursor />
      <Hero />
      <About />
      <WhatsIncluded />
      <Contact />
      <Footer />
    </div>
  )
}
