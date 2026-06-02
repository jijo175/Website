import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { Users, Plane, Car, Building } from 'lucide-react'

const cards = [
  {
    icon: Users,
    title: 'Guides',
    description: '2 awesome guides who know everything about Japan!',
  },
  {
    icon: Plane,
    title: 'Flights',
    description: 'Routes: Moscow — Osaka, Tokyo — Moscow',
  },
  {
    icon: Car,
    title: 'Transfers',
    description: 'From the airport to the hotels',
  },
  {
    icon: Building,
    title: 'Hotels',
    description: 'Comfortable accommodation, 2 people per room (breakfasts included)',
  },
]

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
}

const ruleVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
}

export default function WhatsIncluded() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      ref={sectionRef}
      id="included"
      className="relative w-full bg-mist py-24 md:py-36"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Heading with right hairline */}
        <motion.div
          className="flex items-center gap-4 md:gap-6 mb-12 md:mb-16"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.h2
            className="font-display text-kimono shrink-0"
            style={{
              fontSize: 'clamp(48px, 6vw, 80px)',
              letterSpacing: '0.06em',
              lineHeight: 1,
            }}
            variants={cardVariants}
          >
            WHAT'S INCLUDED
          </motion.h2>
          <motion.div
            className="flex-1 h-px origin-left"
            style={{ background: 'var(--glass-border)' }}
            variants={ruleVariants}
          />
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {cards.map((card, i) => (
            <GlassCard key={i} card={card} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function GlassCard({
  card,
}: {
  card: (typeof cards)[0]
}) {
  const Icon = card.icon

  return (
    <motion.div
      className="group relative rounded-2xl p-8 transition-all duration-300"
      style={{
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
      }}
      variants={cardVariants}
      whileHover={{
        y: -4,
        boxShadow: '0 8px 32px rgba(212, 248, 122, 0.08)',
        borderColor: 'rgba(212, 248, 122, 0.6)',
      }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
    >
      {/* Icon */}
      <motion.div
        className="mb-5"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <Icon
          className="w-7 h-7"
          strokeWidth={1.5}
          style={{ color: 'var(--lime-accent)' }}
        />
      </motion.div>

      {/* Title */}
      <h3
        className="small-caps text-kimono mb-3"
        style={{ fontSize: '16px', letterSpacing: '0.12em' }}
      >
        {card.title}
      </h3>

      {/* Description */}
      <p
        className="font-body text-sm leading-relaxed"
        style={{ color: 'rgba(250, 250, 250, 0.75)' }}
      >
        {card.description}
      </p>
    </motion.div>
  )
}
