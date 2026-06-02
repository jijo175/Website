import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Smooth lerp via spring — stiffness/damping tuned for ~0.15 lag feel
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  const handleMouseEnter = useCallback(() => setIsHovering(true), [])
  const handleMouseLeave = useCallback(() => setIsHovering(false), [])

  useEffect(() => {
    // Detect touch device or small viewport
    const checkTouch = () => {
      setIsTouch(
        window.matchMedia('(hover: none)').matches || window.innerWidth < 768
      )
    }
    checkTouch()
    window.addEventListener('resize', checkTouch)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Bind hover to interactive elements
    const bindHoverListeners = () => {
      const els = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, .polaroid-card'
      )
      els.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter)
        el.addEventListener('mouseleave', handleMouseLeave)
      })
      return els
    }

    const els = bindHoverListeners()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', checkTouch)
      els.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [mouseX, mouseY, handleMouseEnter, handleMouseLeave])

  // Re-bind hover listeners when DOM changes (SPA nav, lazy content, etc.)
  useEffect(() => {
    if (isTouch) return

    const observer = new MutationObserver(() => {
      const els = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, .polaroid-card'
      )
      els.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
        el.addEventListener('mouseenter', handleMouseEnter)
        el.addEventListener('mouseleave', handleMouseLeave)
      })
    })

    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [isTouch, handleMouseEnter, handleMouseLeave])

  // Hide cursor on touch devices and small screens
  if (isTouch) return null

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{ x, y }}
    >
      <motion.div
        className="rounded-full"
        style={{
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 32 : 8,
          height: isHovering ? 32 : 8,
          backgroundColor: isHovering ? 'transparent' : '#FAFAFA',
          borderWidth: isHovering ? 1 : 0,
          borderColor: isHovering ? '#FAFAFA' : 'transparent',
          borderStyle: 'solid',
        }}
        transition={{
          duration: 0.25,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
    </motion.div>
  )
}
