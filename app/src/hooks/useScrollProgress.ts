import { useScroll, useTransform, MotionValue } from 'framer-motion'
import type { RefObject } from 'react'

interface ScrollProgressOptions {
  target: RefObject<HTMLElement | null>
  offset?: unknown[]
}

export function useScrollProgress({ target, offset = ["start start", "end start"] }: ScrollProgressOptions) {
  const { scrollYProgress } = useScroll({
    target,
    offset: offset as [any, any],
  })

  return scrollYProgress
}

export function useParallax(
  scrollYProgress: MotionValue<number>,
  distance: number
) {
  return useTransform(scrollYProgress, [0, 1], [0, -distance])
}
