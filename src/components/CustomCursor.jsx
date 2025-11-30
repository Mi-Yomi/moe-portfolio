import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

export default function CustomCursor() {
  const { language } = useLanguage()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHoveringProject, setIsHoveringProject] = useState(false)
  const [isComingSoon, setIsComingSoon] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  const labels = {
    en: {
      viewProject: 'View Project',
      comingSoon: 'Coming Soon',
    },
    ru: {
      viewProject: 'Смотреть',
      comingSoon: 'Скоро',
    },
    kz: {
      viewProject: 'Қарау',
      comingSoon: 'Жақында',
    },
  }

  const l = labels[language] || labels.en

  useEffect(() => {
    // Check if device supports touch
    const checkTouchDevice = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(hover: none)').matches
      )
    }
    
    checkTouchDevice()
    window.addEventListener('resize', checkTouchDevice)
    
    return () => window.removeEventListener('resize', checkTouchDevice)
  }, [])

  useEffect(() => {
    if (isTouchDevice) return

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    const setupHoverListeners = () => {
      const projectCards = document.querySelectorAll('[data-cursor="project"]')
      const comingSoonCards = document.querySelectorAll('[data-cursor="coming-soon"]')
      
      projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          setIsHoveringProject(true)
          setIsComingSoon(false)
        })
        card.addEventListener('mouseleave', () => {
          setIsHoveringProject(false)
          setIsComingSoon(false)
        })
      })

      comingSoonCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          setIsHoveringProject(true)
          setIsComingSoon(true)
        })
        card.addEventListener('mouseleave', () => {
          setIsHoveringProject(false)
          setIsComingSoon(false)
        })
      })
    }

    window.addEventListener('mousemove', updateMousePosition)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    
    setupHoverListeners()
    const observer = new MutationObserver(setupHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      observer.disconnect()
    }
  }, [isTouchDevice])

  // Don't render on touch devices
  if (isTouchDevice) return null

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - (isHoveringProject ? 70 : 6),
          y: mousePosition.y - (isHoveringProject ? 22 : 6),
          scale: isVisible ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 800,
          damping: 35,
          mass: 0.3,
        }}
      >
        <AnimatePresence mode="wait">
          {isHoveringProject ? (
            <motion.div
              key={isComingSoon ? "coming-soon" : "view"}
              initial={{ 
                scale: 0.5, 
                opacity: 0,
                filter: 'blur(20px)',
              }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                filter: 'blur(0px)',
              }}
              exit={{ 
                scale: 0.5, 
                opacity: 0,
                filter: 'blur(20px)',
              }}
              transition={{ 
                duration: 0.2,
                ease: [0.32, 0.72, 0, 1],
              }}
              className="px-5 py-3 rounded-full flex items-center gap-2.5 whitespace-nowrap border"
              style={{
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.2)',
              }}
            >
              {isComingSoon ? (
                <>
                  <motion.span 
                    className="text-base"
                    initial={{ rotate: -20, scale: 0.8 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ delay: 0.05, duration: 0.15 }}
                  >
                    🚧
                  </motion.span>
                  <span className="text-sm font-medium tracking-wide text-white/90">{l.comingSoon}</span>
                  <motion.span 
                    className="text-base"
                    initial={{ rotate: 20, scale: 0.8 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ delay: 0.08, duration: 0.15 }}
                  >
                    🚧
                  </motion.span>
                </>
              ) : (
                <>
                  <motion.span 
                    className="text-base"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.03, duration: 0.12 }}
                  >
                    👁️
                  </motion.span>
                  <span className="text-sm font-medium tracking-wide text-white/90">{l.viewProject}</span>
                  <motion.span 
                    className="text-white/70"
                    initial={{ x: -5, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.06, duration: 0.12 }}
                  >
                    →
                  </motion.span>
                </>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="dot"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="w-3 h-3 bg-black rounded-full"
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Outer ring cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isVisible && !isHoveringProject ? 1 : 0,
          opacity: isHoveringProject ? 0 : 0.3,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 28,
          mass: 0.5,
        }}
      >
        <div className="w-10 h-10 border border-black rounded-full" />
      </motion.div>
    </>
  )
}
