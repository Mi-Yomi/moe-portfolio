import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import Me3 from '../assets/me3.jpg'
import PhotoModal from './PhotoModal'

// Kazakhstan Flag SVG Component
const KazakhstanFlag = () => (
  <svg viewBox="0 0 36 24" className="inline-block w-5 h-3 md:w-6 md:h-4 rounded-sm shadow-sm align-middle mx-1">
    <rect fill="#00AFCA" width="36" height="24"/>
    <circle cx="18" cy="12" r="4" fill="#FFD700"/>
    {[...Array(32)].map((_, i) => (
      <line
        key={i}
        x1="18"
        y1="12"
        x2={18 + 6 * Math.cos((i * 11.25 * Math.PI) / 180)}
        y2={12 + 6 * Math.sin((i * 11.25 * Math.PI) / 180)}
        stroke="#FFD700"
        strokeWidth="0.5"
      />
    ))}
    <path
      d="M18 6.5c-1 0-1.5.5-2 1s-1 1-2 1c1 0 1.5.5 2 1s1 1 2 1c1 0 1.5-.5 2-1s1-1 2-1c-1 0-1.5-.5-2-1s-1-1-2-1z"
      fill="#FFD700"
    />
    <path
      d="M2 4v16M4 6v12M2 8h2M2 12h2M2 16h2"
      stroke="#FFD700"
      strokeWidth="0.8"
      fill="none"
    />
  </svg>
)

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { t, language } = useLanguage()
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false)

  const skills = t('about.skills')

  const getGreetingWithFlag = () => {
    if (language === 'ru') {
      return (
        <>
          Привет! Я Ануар — разработчик из Казахстана <KazakhstanFlag /> который любит создавать технологичные и удобные продукты.
        </>
      )
    }
    if (language === 'kz') {
      return (
        <>
          Сәлем! Мен Ануар — Қазақстандағы <KazakhstanFlag /> технологиялық және ыңғайлы өнімдер жасауды ұнататын әзірлеуші.
        </>
      )
    }
    return (
      <>
        Hey there! I'm Anuar — a developer from Kazakhstan <KazakhstanFlag /> who loves creating tech-forward and user-friendly products.
      </>
    )
  }

  return (
    <>
      <section id="about" className="py-16 md:py-24 px-4 md:px-6 bg-white" ref={ref}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Photo - Mobile first (above text on mobile) */}
            <motion.div
              className="flex justify-center lg:hidden order-first"
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <motion.div 
                className="relative bg-white p-2 pb-10 shadow-xl rounded-sm cursor-pointer group"
                style={{ transform: 'rotate(2deg)' }}
                whileHover={{ rotate: 0, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsPhotoModalOpen(true)}
              >
                <div className="w-48 h-60 overflow-hidden relative">
                  <img 
                    src={Me3}
                    alt="Anuar Lukpanov"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="absolute bottom-3 left-0 right-0 text-center text-gray-500 font-handwriting text-base italic">
                  {t('about.photoCaption')}
                </p>
              </motion.div>
            </motion.div>

            {/* Left - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
              animate={isInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="mb-6 md:mb-8 hidden md:block">
                <motion.div 
                  className="w-3 h-3 bg-black rounded-full"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

              <motion.div 
                className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-3 py-1.5 md:px-4 md:py-2 mb-6 md:mb-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs md:text-sm text-green-700 font-medium">{t('about.availableBadge')}</span>
              </motion.div>

              <div className="space-y-3 md:space-y-4 text-base md:text-lg leading-relaxed text-gray-700">
                <p>{getGreetingWithFlag()}</p>
                <p>{t('about.paragraph2')}</p>
                <p className="font-medium text-gray-900">{t('about.paragraph3')}</p>
                
                {Array.isArray(skills) && (
                  <ul className="space-y-2 text-gray-600 text-sm md:text-base">
                    {skills.map((skill, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-gray-400 mt-1">—</span>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <p>{t('about.paragraph4')}</p>
                <p className="hidden md:block">{t('about.paragraph5')}</p>
                <p className="hidden md:block">{t('about.paragraph6')}</p>
                <p>{t('about.paragraph7')}</p>
                <p className="font-medium text-gray-900">{t('about.paragraph8')}</p>
              </div>

              <motion.a
                href="#"
                className="inline-flex items-center gap-3 mt-8 md:mt-10 group"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-green-500 flex items-center justify-center text-white group-hover:bg-green-600 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
                <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors text-sm md:text-base">{t('about.resume')}</span>
              </motion.a>
            </motion.div>

            {/* Right - Clickable Polaroid Photo - Desktop */}
            <motion.div
              className="hidden lg:flex justify-center lg:justify-end lg:sticky lg:top-32"
              initial={{ opacity: 0, x: 30, filter: 'blur(10px)' }}
              animate={isInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="relative">
                <div className="absolute -inset-8 bg-[linear-gradient(transparent_31px,rgba(0,0,0,0.03)_31px)] bg-[size:100%_32px] rounded-lg" />
                
                <motion.div 
                  className="absolute -top-4 left-1/2 -translate-x-1/2 z-20"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-6 h-6 bg-red-500 rounded-full shadow-lg" />
                  <div className="w-2 h-2 bg-red-600 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </motion.div>

                {/* Clickable Polaroid */}
                <motion.div 
                  className="relative bg-white p-3 pb-14 shadow-2xl rounded-sm cursor-pointer group"
                  style={{ transform: 'rotate(2deg)' }}
                  whileHover={{ rotate: 0, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setIsPhotoModalOpen(true)}
                >
                  {/* Photo */}
                  <div className="w-64 h-80 overflow-hidden relative">
                    <img 
                      src={Me3}
                      alt="Anuar Lukpanov"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-800 shadow-lg">
                          {language === 'ru' ? 'Посмотреть фото' : language === 'kz' ? 'Фотоны көру' : 'View photos'}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                  
                  <p className="absolute bottom-4 left-0 right-0 text-center text-gray-500 font-handwriting text-lg italic">
                    {t('about.photoCaption')}
                  </p>
                </motion.div>

                <div className="absolute -top-12 -right-8 grid grid-cols-3 gap-2 opacity-20">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-gray-400 rounded-full" />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Photo Modal */}
      <PhotoModal 
        isOpen={isPhotoModalOpen} 
        onClose={() => setIsPhotoModalOpen(false)}
        initialIndex={2}
      />
    </>
  )
}
