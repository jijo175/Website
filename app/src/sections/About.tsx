import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'

const timelineData = [
  {
    days: 'Days 1–3',
    city: 'Osaka',
    photos: [
      { src: '/osaka-castle.jpg', alt: 'Osaka Castle', rotate: -3, size: 'lg' },
      { src: '/osaka-skyline.jpg', alt: 'Osaka skyline', rotate: 4, size: 'sm' },
    ],
  },
  {
    days: 'Days 4–6',
    city: 'Kyoto',
    photos: [
      { src: '/kyoto-pagoda.jpg', alt: 'Kyoto pagoda', rotate: 2, size: 'lg' },
      { src: '/kyoto-shrine.jpg', alt: 'Red shrine', rotate: -3, size: 'sm' },
    ],
  },
  {
    days: 'Days 7–10',
    city: 'Tokyo',
    photos: [
      { src: '/tokyo-shibuya.jpg', alt: 'Shibuya neon', rotate: -2, size: 'lg' },
      { src: '/tokyo-street.jpg', alt: 'Tokyo street', rotate: 3, size: 'sm' },
    ],
  },
]

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
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

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full bg-mist py-24 md:py-36"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Heading with hairline rules */}
        <motion.div
          className="flex items-center justify-center gap-4 md:gap-6 mb-16 md:mb-24"
          initial="hidden"
          animate={headingInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.div
            className="flex-1 h-px origin-right"
            style={{ background: 'var(--glass-border)' }}
            variants={ruleVariants}
          />
          <motion.h2
            className="font-display text-kimono text-center"
            style={{
              fontSize: 'clamp(48px, 6vw, 80px)',
              letterSpacing: '0.06em',
              lineHeight: 1,
            }}
            variants={itemVariants}
          >
            ABOUT THE TOUR
          </motion.h2>
          <motion.div
            className="flex-1 h-px origin-left"
            style={{ background: 'var(--glass-border)' }}
            variants={ruleVariants}
          />
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Text */}
          <motion.div
            className="space-y-6"
            initial="hidden"
            animate={headingInView ? 'visible' : 'hidden'}
            variants={containerVariants}
          >
            <motion.p className="editorial-serif text-kimono" variants={itemVariants}>
              We've planned a simple and convenient 10-day itinerary for your trip to Japan. You'll visit three cities:{' '}
              <HighlightText isInView={headingInView} delay={0.3}>
                Osaka, Kyoto, and Tokyo
              </HighlightText>
              .
            </motion.p>
            <motion.p className="editorial-serif text-kimono" variants={itemVariants}>
              No need to worry about routes, schedules, or finding places — everything is already organized. We'll show you where to go, what to see, and where to eat, so you can simply{' '}
              <HighlightText isInView={headingInView} delay={0.6}>
                enjoy the journey
              </HighlightText>
              .
            </motion.p>
          </motion.div>

          {/* Right: Timeline — each city reveals independently */}
          <div className="relative pl-10">
            {/* Vertical hairline */}
            <div
              className="absolute left-0 top-0 bottom-0 w-px"
              style={{ background: 'var(--glass-border)' }}
            />

            {/* Timeline nodes — individually observed with stagger delay */}
            <div className="space-y-16 md:space-y-20">
              {timelineData.map((item, i) => (
                <TimelineNode key={i} data={item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function HighlightText({
  children,
  isInView,
  delay,
}: {
  children: React.ReactNode
  isInView: boolean
  delay: number
}) {
  return (
    <motion.span
      className="text-lime inline-block"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      {children}
    </motion.span>
  )
}

function TimelineNode({
  data,
  index,
}: {
  data: (typeof timelineData)[0]
  index: number
}) {
  const nodeRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(nodeRef, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={nodeRef}
      className="relative"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
    >
      {/* Lime dot */}
      <div
        className="absolute -left-10 top-1 w-2 h-2 rounded-full -translate-x-1/2"
        style={{ background: 'var(--lime-accent)' }}
      />

      {/* Label */}
      <div className="mb-4">
        <span className="small-caps text-lime block mb-1">{data.days}</span>
        <span className="font-body text-kimono text-lg">{data.city}</span>
      </div>

      {/* Photo cluster */}
      <motion.div
        className="relative"
        whileHover="hover"
        initial="rest"
        animate="rest"
      >
        <div className="relative" style={{ width: '220px', height: '140px' }}>
          {data.photos.map((photo, i) => (
            <motion.div
              key={i}
              className="absolute rounded overflow-hidden shadow-card"
              style={{
                width: photo.size === 'lg' ? '160px' : '140px',
                height: photo.size === 'lg' ? '120px' : '100px',
                border: '3px solid white',
                top: i === 0 ? 0 : 'auto',
                bottom: i === 1 ? 0 : 'auto',
                left: i === 0 ? 0 : 'auto',
                right: i === 1 ? 0 : 'auto',
                zIndex: i === 0 ? 1 : 2,
                transform: `rotate(${photo.rotate}deg)`,
              }}
              variants={{
                rest: {
                  rotate: photo.rotate,
                  x: 0,
                },
                hover: {
                  rotate: photo.rotate + (i === 0 ? -4 : 4),
                  x: i === 0 ? -8 : 8,
                  transition: {
                    type: 'spring',
                    stiffness: 200,
                    damping: 20,
                  },
                },
              }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
