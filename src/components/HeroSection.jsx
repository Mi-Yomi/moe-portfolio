import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import Me1 from '../assets/Me1.jpg'
import Me2 from '../assets/Me2.jpg'
import Me3 from '../assets/me3.jpg'

export default function HeroSection() {
  const { t } = useLanguage()
  const [isHovered, setIsHovered] = useState(false)
  const particles = useMemo(() => (
    Array.from({ length: 12 }, (_, index) => ({
      width: 3 + (index % 4),
      height: 2 + ((index * 3) % 5),
      left: (index * 17) % 100,
      top: (index * 29) % 100,
      xOffset: ((index * 11) % 20) - 10,
      duration: 4 + (index % 5) * 0.6,
      delay: (index % 6) * 0.25,
      key: index,
    }))
  ), [])

  return (
    <section id="home" className="min-h-[85vh] md:min-h-[85vh] flex items-center justify-center px-4 md:px-6 pt-28 md:pt-40 pb-12 md:pb-16 relative overflow-hidden bg-white">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Animated gradient mesh - Hidden on mobile for performance */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
        {/* Large morphing blob */}
        <motion.div
          className="absolute top-1/4 left-1/3 w-[500px] h-[500px] opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(0,0,0,0.08) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          animate={{ 
            x: [0, 50, -30, 0],
            y: [0, -40, 30, 0],
            scale: [1, 1.2, 0.9, 1],
            rotate: [0, 90, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Secondary blob */}
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(0,0,0,0.1) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
          animate={{ 
            x: [0, -60, 40, 0],
            y: [0, 50, -30, 0],
            scale: [1, 0.8, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating particles */}
        {particles.map(({ key, width, height, left, top, xOffset, duration, delay }) => (
          <motion.div
            key={key}
            className="absolute rounded-full bg-gray-300"
            style={{
              width,
              height,
              left: `${left}%`,
              top: `${top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, xOffset, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
          />
        ))}

        {/* Connecting lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <motion.line
            x1="10%" y1="20%" x2="30%" y2="40%"
            stroke="currentColor"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.3, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0 }}
          />
          <motion.line
            x1="70%" y1="30%" x2="90%" y2="50%"
            stroke="currentColor"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.3, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          />
          <motion.line
            x1="50%" y1="60%" x2="70%" y2="80%"
            stroke="currentColor"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.3, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          />
        </svg>

        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-[20%] right-[15%] w-8 h-8 border border-gray-200"
          animate={{ 
            rotate: [0, 90, 180, 270, 360],
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-[30%] left-[10%] w-4 h-4 bg-gray-200 rounded-full"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[40%] left-[20%] w-6 h-6 border border-gray-300 rounded-full"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Flying plane with trail */}
        <motion.div
          className="absolute text-xl"
          initial={{ x: '-10%', y: '70%', rotate: -20 }}
          animate={{ 
            x: ['-10%', '25%', '50%', '75%', '110%'],
            y: ['70%', '45%', '50%', '30%', '20%'],
            rotate: [-20, -15, -25, -10, -20]
          }}
          transition={{ 
            duration: 16, 
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.25, 0.5, 0.75, 1]
          }}
        >
          ✈️
        </motion.div>

        {/* Dotted trail path */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <motion.path
            d="M -50 560 Q 200 360 400 400 T 700 300 T 1000 240 T 1300 160"
            fill="none"
            stroke="rgba(0,0,0,0.05)"
            strokeWidth="2"
            strokeDasharray="4 8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 1, 0] }}
            transition={{ duration: 16, repeat: Infinity, times: [0, 0.3, 0.7, 1] }}
          />
        </svg>

        {/* Orbiting dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="w-2 h-2 bg-gray-400 rounded-full"
            animate={{
              x: [0, 150, 0, -150, 0],
              y: [-100, 0, 100, 0, -100],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            style={{ opacity: 0.3 }}
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Stacked Avatar Photos */}
        <motion.div
          className="mb-6 md:mb-8"
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          <div 
            className="relative w-24 h-24 md:w-32 md:h-32 mx-auto cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setTimeout(() => setIsHovered(false), 1000)}
          >
            {/* Back photo (Me2) */}
            <motion.div
              className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg"
              initial={{ rotate: 0, x: 0 }}
              animate={{ 
                rotate: isHovered ? -15 : -6,
                x: isHovered ? -30 : -6,
                y: isHovered ? 5 : 2,
                scale: isHovered ? 0.9 : 0.95,
              }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              <img 
                src={Me2}
                alt="Photo 2"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Middle photo (Me3) */}
            <motion.div
              className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg"
              initial={{ rotate: 0, x: 0 }}
              animate={{ 
                rotate: isHovered ? 15 : 6,
                x: isHovered ? 30 : 6,
                y: isHovered ? 5 : 2,
                scale: isHovered ? 0.9 : 0.95,
              }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              <img 
                src={Me3}
                alt="Photo 3"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Front photo (Me1) - Main */}
            <motion.div 
              className="relative w-full h-full rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 p-0.5 shadow-xl z-10"
              animate={{ 
                scale: isHovered ? 1.05 : 1,
                y: isHovered ? -5 : 0,
              }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="w-full h-full rounded-2xl overflow-hidden">
                <img 
                  src={Me1}
                  alt="Anuar Lukpanov"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Hover hint - Hidden on mobile */}
            <motion.div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-400 whitespace-nowrap hidden md:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            >
              hover me ✨
            </motion.div>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1 
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 tracking-tight"
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          Anuar Lukpanov
        </motion.h1>

        {/* Description - 3 lines */}
        <motion.div 
          className="text-gray-500 text-base md:text-lg leading-relaxed mb-6 md:mb-8 max-w-2xl mx-auto space-y-2 md:space-y-3 px-2"
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          <p>{t('hero.line1')}</p>
          <p className="hidden md:block">{t('hero.line2')}</p>
          <p className="hidden md:block">{t('hero.line3')}</p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col sm:flex-row justify-center gap-3"
        >
          {/* View Projects Button */}
          <motion.a
            href="#work"
            className="px-6 py-3 bg-black text-white text-sm font-medium rounded-full flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {t('hero.viewProjects')}
            <motion.span
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              ↓
            </motion.span>
          </motion.a>

          {/* Let's Connect Button */}
          <motion.a
            href="#contact"
            className="group relative inline-flex items-center justify-center"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Animated gradient border */}
            <motion.div 
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(90deg, #e5e5e5, #171717, #e5e5e5, #171717)',
                backgroundSize: '300% 100%',
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            {/* Inner button */}
            <div className="absolute inset-[1.5px] rounded-full bg-white" />
            {/* Button content */}
            <span className="relative px-6 py-3 text-sm font-medium text-gray-900 flex items-center gap-2">
              {t('hero.cta')}
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
