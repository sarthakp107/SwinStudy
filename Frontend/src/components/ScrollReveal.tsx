import React, { useEffect, useRef, useState } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  /** Delay before animation starts (ms) */
  delay?: number
  /** Direction to slide from */
  direction?: 'up' | 'down' | 'left' | 'right'
  /** How much of element must be visible to trigger (0-1) */
  threshold?: number
  className?: string
}

const translateMap = {
  up: 'translateY(30px)',
  down: 'translateY(-30px)',
  left: 'translateX(30px)',
  right: 'translateX(-30px)',
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  direction = 'up',
  threshold = 0.1,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  const initialTranslate = translateMap[direction]

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) translateX(0)' : initialTranslate,
        transition: `opacity 1s ease-out ${delay}ms, transform 1s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
