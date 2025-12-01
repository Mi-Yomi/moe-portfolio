import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Calendar, Clock, Layers, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import Navbar from './Navbar'
import ProjectInnerPhoto from '../assets/project_inner_photo.png'
import ProjectPhoto1 from '../assets/project_pjoto_1.jpg'
import ProjectPhoto2 from '../assets/project_pjoto_2.jpg'
import PyramidGameProject from '../assets/Pyramif_game_project.png'
import PyramidGameInner from '../assets/pyramidf_game_inner_photo.jpg'

// Image Lightbox Component with zoom and navigation
function ImageLightbox({ images, currentIndex, onClose, onPrev, onNext, language, hasImageCaptions }) {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const imageRef = useRef(null)

  const currentImage = images[currentIndex]
  const imageSrc = hasImageCaptions ? currentImage.src : currentImage
  const caption = hasImageCaptions 
    ? (language === 'ru' ? currentImage.captionRu : language === 'kz' ? currentImage.captionKz : currentImage.caption)
    : `Image ${currentIndex + 1}`
  const figureNum = `1.${currentIndex + 1}`

  // Reset zoom when image changes
  useEffect(() => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }, [currentIndex])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, onPrev, onNext])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.5, 4))
  }

  const handleZoomOut = () => {
    setScale(prev => {
      const newScale = Math.max(prev - 0.5, 1)
      if (newScale === 1) setPosition({ x: 0, y: 0 })
      return newScale
    })
  }

  const handleDoubleClick = () => {
    if (scale > 1) {
      setScale(1)
      setPosition({ x: 0, y: 0 })
    } else {
      setScale(2)
    }
  }

  // Touch/drag handling for panning zoomed image
  const handleDragStart = () => {
    if (scale > 1) setIsDragging(true)
  }

  const handleDrag = (_, info) => {
    if (scale > 1) {
      setPosition({
        x: position.x + info.delta.x,
        y: position.y + info.delta.y
      })
    }
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex flex-col"
      onClick={(e) => e.target === e.currentTarget && scale === 1 && onClose()}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 md:p-6">
        {/* Counter */}
        <div className="text-white/60 text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Zoom controls */}
        <div className="flex items-center gap-2">
          <motion.button
            onClick={handleZoomOut}
            disabled={scale <= 1}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <ZoomOut className="w-5 h-5 text-white" />
          </motion.button>
          <span className="text-white/60 text-sm w-12 text-center">{Math.round(scale * 100)}%</span>
          <motion.button
            onClick={handleZoomIn}
            disabled={scale >= 4}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <ZoomIn className="w-5 h-5 text-white" />
          </motion.button>
        </div>

        {/* Close button */}
        <motion.button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <X className="w-5 h-5 text-white" />
        </motion.button>
      </div>

      {/* Main image area */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden px-4 md:px-16">
        {/* Previous button */}
        <motion.button
          onClick={onPrev}
          className="absolute left-2 md:left-6 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-white" />
        </motion.button>

        {/* Image */}
        <motion.div
          ref={imageRef}
          className="max-w-full max-h-full cursor-grab active:cursor-grabbing"
          style={{ 
            scale,
            x: position.x,
            y: position.y,
          }}
          drag={scale > 1}
          dragConstraints={{ left: -500, right: 500, top: -500, bottom: 500 }}
          dragElastic={0.1}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onDoubleClick={handleDoubleClick}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={imageSrc}
              alt={caption}
              className="max-w-full max-h-[70vh] md:max-h-[75vh] object-contain rounded-lg select-none"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              draggable={false}
            />
          </AnimatePresence>
        </motion.div>

        {/* Next button */}
        <motion.button
          onClick={onNext}
          className="absolute right-2 md:right-6 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-white" />
        </motion.button>
      </div>

      {/* Caption */}
      <div className="p-4 md:p-6 text-center">
        <p className="text-white/60 text-sm">
          <span className="text-pink-400">
            {language === 'ru' ? `Рис. ${figureNum}` : language === 'kz' ? `Сур. ${figureNum}` : `Fig. ${figureNum}`}
          </span>
          <span className="mx-2">—</span>
          <span className="text-white/80">{caption}</span>
        </p>
        <p className="text-white/40 text-xs mt-2">
          {language === 'ru' ? 'Двойной клик для увеличения • Стрелки для навигации' : 
           language === 'kz' ? 'Үлкейту үшін екі рет басыңыз • Навигация үшін көрсеткілер' :
           'Double-click to zoom • Use arrows to navigate'}
        </p>
      </div>

      {/* Thumbnail strip */}
      <div className="p-4 flex justify-center gap-2 overflow-x-auto">
        {images.map((img, idx) => {
          const thumbSrc = hasImageCaptions ? img.src : img
          return (
            <motion.button
              key={idx}
              onClick={() => {
                setScale(1)
                setPosition({ x: 0, y: 0 })
                // Navigate to this image by calling onPrev/onNext multiple times or direct set
                const diff = idx - currentIndex
                if (diff > 0) for (let i = 0; i < diff; i++) onNext()
                if (diff < 0) for (let i = 0; i < Math.abs(diff); i++) onPrev()
              }}
              className={`relative w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                idx === currentIndex ? 'ring-2 ring-pink-500 ring-offset-2 ring-offset-black' : 'opacity-50 hover:opacity-80'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={thumbSrc} alt="" className="w-full h-full object-cover" />
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}

const projectData = {
  1: {
    title: 'zhanuar.kz | Livestock Marketplace',
    titleRu: 'zhanuar.kz | Приложение для продажи скота',
    titleKz: 'zhanuar.kz | Мал сату қосымшасы',
    description: 'Complete UX/UI design for a livestock marketplace platform including web application, mobile app, merchandise, and company branding.',
    descriptionRu: 'Полный UX/UI дизайн платформы для продажи скота: веб-приложение, мобильное приложение, мерч и фирменный стиль компании.',
    descriptionKz: 'Мал сату платформасы үшін толық UX/UI дизайн: веб-қосымша, мобильді қосымша, мерч және компанияның фирмалық стилі.',
    role: 'UX/UI Designer',
    roleRu: 'UX/UI дизайнер',
    roleKz: 'UX/UI дизайнер',
    duration: '1 month',
    durationRu: '1 месяц',
    durationKz: '1 ай',
    year: '2025',
    tags: ['Figma', 'Adobe Photoshop', 'shadcn/ui'],
    features: [
      'Responsive adaptive design',
      'Modular 12-column grid system',
      'Design tokens & variables for quick customization',
      'Complete component library',
      'Brand identity & style guide',
      'Interactive micro-animations'
    ],
    featuresRu: [
      'Адаптивный отзывчивый дизайн',
      'Модульная 12-колоночная сетка',
      'Дизайн-токены и переменные для быстрых изменений',
      'Полная библиотека компонентов',
      'Фирменный стиль и гайдлайны',
      'Интерактивные микро-анимации'
    ],
    featuresKz: [
      'Адаптивті жауапты дизайн',
      'Модульді 12-бағандық тор',
      'Жылдам өзгертулер үшін дизайн-токендер мен айнымалылар',
      'Толық компонент кітапханасы',
      'Фирмалық стиль және нұсқаулықтар',
      'Интерактивті микро-анимациялар'
    ],
    images: [
      { src: ProjectInnerPhoto, caption: 'Brand Identity', captionRu: 'Фирменный стиль', captionKz: 'Фирмалық стиль' },
      { src: ProjectPhoto1, caption: 'Design System & Components', captionRu: 'Дизайн-система и компоненты', captionKz: 'Дизайн-жүйе және компоненттер' },
      { src: ProjectPhoto2, caption: 'Mobile App Screens', captionRu: 'Экраны мобильного приложения', captionKz: 'Мобильді қосымша экрандары' },
    ],
    liveUrl: 'https://zhanuar.kz',
    githubUrl: null,
    bgColor: 'bg-[#FF633C]',
    accentColor: '#FF633C',
    isOrangeTheme: true,
    hasImageCaptions: true,
  },
  2: {
    title: 'Pyramid Game | Desktop App',
    titleRu: 'Pyramid Game | Десктоп приложение',
    titleKz: 'Pyramid Game | Десктоп қосымша',
    description: 'A parody desktop application inspired by the Korean TV show "Pyramid Game". Built with Qt5 and C++, featuring a REST API backend with Flask and SQLite database for user authentication and data management.',
    descriptionRu: 'Пародийное десктоп-приложение, вдохновлённое корейским сериалом "Pyramid Game". Разработано на Qt5 и C++ с REST API бэкендом на Flask и базой данных SQLite для аутентификации пользователей и управления данными.',
    descriptionKz: 'Корей телехикаясы "Pyramid Game" негізінде жасалған пародиялық десктоп қосымшасы. Qt5 және C++ көмегімен жасалған, пайдаланушы аутентификациясы мен деректерді басқару үшін Flask REST API және SQLite дерекқоры бар.',
    role: 'C++ Main Developer',
    roleRu: 'C++ разработчик',
    roleKz: 'C++ әзірлеуші',
    duration: '7 days',
    durationRu: '7 дней',
    durationKz: '7 күн',
    year: '2023',
    tags: ['Qt5', 'C++', 'REST API', 'Boost', 'Python', 'Flask', 'SQLite'],
    features: [
      'REST API integration with Flask backend',
      'SQLite database for user data',
      'User authentication system',
      'Qt5 modern UI with custom styling',
      'Memory-safe implementation with smart pointers',
      'Cross-platform desktop application'
    ],
    featuresRu: [
      'REST API интеграция с Flask бэкендом',
      'SQLite база данных для пользователей',
      'Система аутентификации пользователей',
      'Современный UI на Qt5 с кастомными стилями',
      'Безопасная работа с памятью через умные указатели',
      'Кроссплатформенное десктоп-приложение'
    ],
    featuresKz: [
      'Flask бэкендімен REST API интеграциясы',
      'Пайдаланушы деректері үшін SQLite дерекқоры',
      'Пайдаланушы аутентификация жүйесі',
      'Qt5 заманауи UI арнайы стильдермен',
      'Ақылды көрсеткіштер арқылы жадпен қауіпсіз жұмыс',
      'Кросс-платформалы десктоп қосымша'
    ],
    images: [
      { src: PyramidGameProject, caption: 'Application Login Screen', captionRu: 'Экран входа в приложение', captionKz: 'Қосымшаға кіру экраны' },
      { src: PyramidGameInner, caption: 'Main Application Interface', captionRu: 'Главный интерфейс приложения', captionKz: 'Қосымшаның негізгі интерфейсі' },
    ],
    liveUrl: null,
    githubUrl: 'https://github.com/Mi-Yomi/Piramid_game',
    bgColor: 'from-[#1a1a2e] via-[#16213e] to-[#0f0f23]',
    isDark: true,
    hasImageCaptions: true,
    isSakuraTheme: true,
  },
}

function ScrollReveal({ children, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        delay, 
        ease: [0.25, 0.46, 0.45, 0.94] // Smooth easing
      }}
    >
      {children}
    </motion.div>
  )
}

export default function ProjectPage({ projectId, onBack }) {
  const { language } = useLanguage()
  const project = projectData[projectId]
  const containerRef = useRef(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const openLightbox = useCallback((index) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
  }, [])

  const goToPrevImage = useCallback(() => {
    setLightboxIndex(prev => (prev === 0 ? project?.images.length - 1 : prev - 1))
  }, [project?.images.length])

  const goToNextImage = useCallback(() => {
    setLightboxIndex(prev => (prev === project?.images.length - 1 ? 0 : prev + 1))
  }, [project?.images.length])

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Project not found</p>
      </div>
    )
  }

  const getLocalizedText = (en, ru, kz) => {
    if (language === 'ru') return ru
    if (language === 'kz') return kz
    return en
  }

  const title = getLocalizedText(project.title, project.titleRu, project.titleKz)
  const description = getLocalizedText(project.description, project.descriptionRu, project.descriptionKz)
  const role = getLocalizedText(project.role, project.roleRu, project.roleKz)
  const duration = getLocalizedText(project.duration, project.durationRu, project.durationKz)
  const features = getLocalizedText(project.features, project.featuresRu, project.featuresKz)

  const labels = {
    en: { role: 'My Role', duration: 'Duration', year: 'Year', features: 'Key Features', tech: 'Technologies', links: 'Links', live: 'Live Demo', code: 'Source Code' },
    ru: { role: 'Моя роль', duration: 'Длительность', year: 'Год', features: 'Ключевые функции', tech: 'Технологии', links: 'Ссылки', live: 'Демо', code: 'Исходный код' },
    kz: { role: 'Менің рөлім', duration: 'Ұзақтығы', year: 'Жыл', features: 'Негізгі мүмкіндіктер', tech: 'Технологиялар', links: 'Сілтемелер', live: 'Демо', code: 'Бастапқы код' },
  }
  const l = labels[language] || labels.en

  return (
    <motion.div
      ref={containerRef}
      data-page="project"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white scroll-smooth"
      style={{ cursor: 'auto' }}
    >
      {/* Navbar */}
      <Navbar onFreelanceClick={onBack} />

      {/* Hero Section - Improved Design */}
      <motion.div 
        className={`relative min-h-[75vh] ${project.bgColor.startsWith('bg-') ? project.bgColor : `bg-gradient-to-br ${project.bgColor}`} overflow-hidden`}
        style={{ y: heroY }}
      >
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTMwIDBMMzAgNjBNMCAzMEw2MCAzMCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] opacity-50" />
        
        {/* Farm Scene Animation - Only for Orange Theme (zhanuar.kz) */}
        {project.isOrangeTheme && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Sky gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-green-900/20" />
            
            {/* Sun */}
            <motion.div
              className="absolute top-16 right-20 w-16 h-16 rounded-full bg-yellow-300/30 blur-xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Distant hills */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-800/30 to-transparent" />
            
            {/* Barn */}
            <div className="absolute bottom-20 left-[10%] opacity-40">
              <svg width="80" height="70" viewBox="0 0 80 70">
                {/* Barn body */}
                <rect x="10" y="30" width="60" height="40" fill="#8B4513" />
                {/* Barn roof */}
                <polygon points="0,30 40,5 80,30" fill="#A0522D" />
                {/* Barn door */}
                <rect x="30" y="45" width="20" height="25" fill="#5D3A1A" />
                <line x1="40" y1="45" x2="40" y2="70" stroke="#3D2A0A" strokeWidth="2" />
                {/* Window */}
                <rect x="55" y="40" width="10" height="10" fill="#FFE4B5" opacity="0.8" />
                {/* Silo */}
                <rect x="70" y="20" width="15" height="50" fill="#808080" />
                <ellipse cx="77.5" cy="20" rx="7.5" ry="4" fill="#696969" />
              </svg>
            </div>
            
            {/* Fence posts */}
            {[...Array(12)].map((_, i) => (
              <div 
                key={`fence-${i}`}
                className="absolute bottom-16 opacity-30"
                style={{ left: `${5 + i * 8}%` }}
              >
                <svg width="20" height="40" viewBox="0 0 20 40">
                  <rect x="8" y="0" width="4" height="40" fill="#8B4513" />
                  <rect x="0" y="10" width="20" height="3" fill="#A0522D" />
                  <rect x="0" y="25" width="20" height="3" fill="#A0522D" />
                </svg>
              </div>
            ))}
            
            {/* Dirt road */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-24 opacity-20">
              <svg width="128" height="96" viewBox="0 0 128 96">
                <path d="M40,0 L88,0 L128,96 L0,96 Z" fill="#8B7355" />
                <path d="M50,20 L78,20 L95,96 L33,96 Z" fill="#9C8465" opacity="0.5" />
              </svg>
            </div>
            
            {/* Grass patches */}
            {[...Array(20)].map((_, i) => (
              <motion.div 
                key={`grass-${i}`}
                className="absolute bottom-12 opacity-40"
                style={{ left: `${Math.random() * 100}%` }}
                animate={{ 
                  rotateZ: [-3, 3, -3],
                  scaleY: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 2 + Math.random(), 
                  repeat: Infinity,
                  delay: Math.random() * 2 
                }}
              >
                <svg width="16" height="20" viewBox="0 0 16 20">
                  <path d="M8,20 Q6,10 4,0" stroke="#228B22" strokeWidth="2" fill="none" />
                  <path d="M8,20 Q8,8 8,0" stroke="#32CD32" strokeWidth="2" fill="none" />
                  <path d="M8,20 Q10,10 12,0" stroke="#228B22" strokeWidth="2" fill="none" />
                </svg>
              </motion.div>
            ))}
            
            {/* Cow 1 - Grazing */}
            <motion.div 
              className="absolute bottom-14 left-[25%] opacity-50"
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="50" height="35" viewBox="0 0 50 35">
                {/* Body */}
                <ellipse cx="25" cy="22" rx="18" ry="10" fill="#F5F5DC" />
                {/* Spots */}
                <ellipse cx="20" cy="20" rx="5" ry="4" fill="#2F2F2F" />
                <ellipse cx="32" cy="24" rx="4" ry="3" fill="#2F2F2F" />
                {/* Head */}
                <motion.g
                  animate={{ rotate: [0, 10, 0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  style={{ transformOrigin: '8px 18px' }}
                >
                  <ellipse cx="8" cy="18" rx="7" ry="5" fill="#F5F5DC" />
                  <ellipse cx="5" cy="16" rx="2" ry="1.5" fill="#FFB6C1" />
                  <circle cx="6" cy="15" r="1" fill="#2F2F2F" />
                  <ellipse cx="3" cy="19" rx="3" ry="2" fill="#FFB6C1" />
                </motion.g>
                {/* Legs */}
                <rect x="12" y="28" width="3" height="7" fill="#F5F5DC" />
                <rect x="20" y="28" width="3" height="7" fill="#F5F5DC" />
                <rect x="30" y="28" width="3" height="7" fill="#F5F5DC" />
                <rect x="38" y="28" width="3" height="7" fill="#F5F5DC" />
                {/* Tail */}
                <motion.path 
                  d="M43,20 Q48,18 46,25" 
                  stroke="#8B4513" 
                  strokeWidth="2" 
                  fill="none"
                  animate={{ d: ["M43,20 Q48,18 46,25", "M43,20 Q50,20 48,27", "M43,20 Q48,18 46,25"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </svg>
            </motion.div>
            
            {/* Cow 2 - Walking */}
            <motion.div 
              className="absolute bottom-16 opacity-40"
              animate={{ x: [0, 100, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{ left: '60%' }}
            >
              <svg width="40" height="28" viewBox="0 0 50 35">
                <ellipse cx="25" cy="22" rx="15" ry="8" fill="#8B4513" />
                <ellipse cx="10" cy="18" rx="6" ry="4" fill="#8B4513" />
                <circle cx="8" cy="16" r="1" fill="#2F2F2F" />
                <rect x="14" y="27" width="2" height="6" fill="#8B4513" />
                <rect x="22" y="27" width="2" height="6" fill="#8B4513" />
                <rect x="30" y="27" width="2" height="6" fill="#8B4513" />
                <rect x="36" y="27" width="2" height="6" fill="#8B4513" />
              </svg>
            </motion.div>
            
            {/* Sheep */}
            <motion.div 
              className="absolute bottom-12 right-[20%] opacity-40"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg width="30" height="25" viewBox="0 0 30 25">
                {/* Fluffy body */}
                <ellipse cx="15" cy="15" rx="12" ry="8" fill="#FFFAF0" />
                <circle cx="8" cy="12" r="4" fill="#FFFAF0" />
                <circle cx="22" cy="12" r="4" fill="#FFFAF0" />
                <circle cx="15" cy="8" r="4" fill="#FFFAF0" />
                {/* Head */}
                <ellipse cx="5" cy="15" rx="4" ry="3" fill="#2F2F2F" />
                <circle cx="3" cy="14" r="1" fill="#FFFAF0" />
                {/* Legs */}
                <rect x="10" y="20" width="2" height="5" fill="#2F2F2F" />
                <rect x="18" y="20" width="2" height="5" fill="#2F2F2F" />
              </svg>
            </motion.div>
            
            {/* Birds flying */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`bird-${i}`}
                className="absolute opacity-30"
                style={{ top: `${15 + i * 8}%` }}
                animate={{ 
                  x: ['-10%', '110%'],
                  y: [0, -10, 5, -5, 0]
                }}
                transition={{ 
                  duration: 15 + i * 5, 
                  repeat: Infinity, 
                  delay: i * 3,
                  ease: "linear"
                }}
              >
                <svg width="20" height="10" viewBox="0 0 20 10">
                  <motion.path 
                    d="M0,5 Q5,0 10,5 Q15,0 20,5" 
                    stroke="#2F2F2F" 
                    strokeWidth="2" 
                    fill="none"
                    animate={{ d: ["M0,5 Q5,0 10,5 Q15,0 20,5", "M0,5 Q5,8 10,5 Q15,8 20,5", "M0,5 Q5,0 10,5 Q15,0 20,5"] }}
                    transition={{ duration: 0.3, repeat: Infinity }}
                  />
                </svg>
              </motion.div>
            ))}
            
            {/* Clouds */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`cloud-${i}`}
                className="absolute opacity-20"
                style={{ 
                  top: `${10 + i * 5}%`,
                  left: `${20 + i * 25}%`
                }}
                animate={{ x: [0, 30, 0] }}
                transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg width="60" height="30" viewBox="0 0 60 30">
                  <ellipse cx="20" cy="20" rx="15" ry="10" fill="white" />
                  <ellipse cx="35" cy="18" rx="18" ry="12" fill="white" />
                  <ellipse cx="50" cy="22" rx="12" ry="8" fill="white" />
                </svg>
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Sakura Falling Petals - Only for Sakura Theme */}
        {project.isSakuraTheme && (
          <>
            {/* Sakura branch decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-20 pointer-events-none">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <path d="M180 0 Q 150 50, 120 80 Q 90 110, 60 130 Q 30 150, 10 180" stroke="#FFB7C5" strokeWidth="3" fill="none" />
                <circle cx="120" cy="80" r="8" fill="#FFB7C5" opacity="0.8" />
                <circle cx="90" cy="95" r="6" fill="#FFB7C5" opacity="0.6" />
                <circle cx="60" cy="130" r="7" fill="#FFB7C5" opacity="0.7" />
              </svg>
            </div>
            
            {/* Falling Sakura Petals */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute pointer-events-none"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: -20,
                }}
                animate={{
                  y: ['0vh', '110vh'],
                  x: [0, Math.sin(i) * 100, Math.cos(i) * 50, Math.sin(i + 1) * 80],
                  rotate: [0, 360, 720, 1080],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 8 + Math.random() * 6,
                  repeat: Infinity,
                  delay: Math.random() * 8,
                  ease: "linear",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" className="text-pink-300/60">
                  <path
                    fill="currentColor"
                    d="M12 2C12 2 8 6 8 10C8 12 10 14 12 14C14 14 16 12 16 10C16 6 12 2 12 2Z"
                    transform={`rotate(${i * 72} 12 12)`}
                  />
                  <path
                    fill="currentColor"
                    d="M12 2C12 2 8 6 8 10C8 12 10 14 12 14C14 14 16 12 16 10C16 6 12 2 12 2Z"
                    transform="rotate(72 12 12)"
                    opacity="0.8"
                  />
                  <path
                    fill="currentColor"
                    d="M12 2C12 2 8 6 8 10C8 12 10 14 12 14C14 14 16 12 16 10C16 6 12 2 12 2Z"
                    transform="rotate(144 12 12)"
                    opacity="0.6"
                  />
                  <path
                    fill="currentColor"
                    d="M12 2C12 2 8 6 8 10C8 12 10 14 12 14C14 14 16 12 16 10C16 6 12 2 12 2Z"
                    transform="rotate(216 12 12)"
                    opacity="0.8"
                  />
                  <path
                    fill="currentColor"
                    d="M12 2C12 2 8 6 8 10C8 12 10 14 12 14C14 14 16 12 16 10C16 6 12 2 12 2Z"
                    transform="rotate(288 12 12)"
                    opacity="0.7"
                  />
                  <circle cx="12" cy="12" r="2" fill="#FFD700" opacity="0.8" />
                </svg>
              </motion.div>
            ))}
            
            {/* Floating particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 rounded-full bg-pink-400/40"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  x: [0, Math.sin(i) * 15, 0],
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 4,
                  ease: "easeInOut",
                }}
              />
            ))}
          </>
        )}
        
        {/* Content container */}
        <motion.div 
          className="relative h-full flex flex-col items-center justify-center px-6 pt-28 pb-16"
          style={{ opacity: heroOpacity }}
        >
          {/* Project title on hero */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              {title.split('|')[0].trim()}
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
              {title.split('|')[1]?.trim() || ''}
            </p>
          </motion.div>

          {/* Hero image with smooth animation */}
          <motion.div
            className="relative w-full max-w-5xl cursor-pointer"
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: 0.3, 
              duration: 0.8, 
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            onClick={() => openLightbox(0)}
            whileHover={{ scale: 1.01 }}
          >
            <motion.img
              src={project.hasImageCaptions ? project.images[0].src : project.images[0]}
              alt={title}
              className="w-full rounded-2xl shadow-lg"
              animate={{ 
                y: [0, -6, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            {/* Click hint */}
            <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-white/80 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              {language === 'ru' ? 'Нажмите для просмотра' : language === 'kz' ? 'Көру үшін басыңыз' : 'Click to view'}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-24">
        {/* About Section - Clean Modern Design */}
        <ScrollReveal>
          <div className="mb-16">
            {/* Section Label */}
            <motion.div 
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className={`w-12 h-px ${
                project.isOrangeTheme ? 'bg-orange-400' : 
                project.isSakuraTheme ? 'bg-pink-400' : 'bg-gray-300'
              }`} />
              <span className={`text-sm font-semibold uppercase tracking-widest ${
                project.isOrangeTheme ? 'text-orange-500' : 
                project.isSakuraTheme ? 'text-pink-500' : 'text-gray-400'
              }`}>
                {language === 'ru' ? 'О проекте' : language === 'kz' ? 'Жоба туралы' : 'About'}
              </span>
            </motion.div>
            
            {/* Main Description - Large Typography */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-snug mb-8">
              {description.split('.')[0]}.
            </h2>
            
            {/* Additional Details - If description is long */}
            {description.split('.').length > 1 && (
              <p className="text-lg text-gray-500 leading-relaxed max-w-3xl">
                {description.split('.').slice(1).join('.').trim()}
              </p>
            )}
          </div>
        </ScrollReveal>

        {/* Meta Info - Modern Cards */}
        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Role Card */}
            <motion.div 
              className={`relative p-6 rounded-2xl border overflow-hidden group ${
                project.isOrangeTheme 
                  ? 'bg-gradient-to-br from-orange-50 to-white border-orange-100 hover:border-orange-300' 
                  : project.isSakuraTheme 
                  ? 'bg-gradient-to-br from-pink-50 to-white border-pink-100 hover:border-pink-300'
                  : 'bg-gradient-to-br from-gray-50 to-white border-gray-100 hover:border-gray-300'
              }`}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`absolute top-0 right-0 w-20 h-20 opacity-10 ${
                project.isOrangeTheme ? 'bg-orange-500' : 
                project.isSakuraTheme ? 'bg-pink-500' : 'bg-gray-500'
              } rounded-bl-full`} />
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4 ${
                project.isOrangeTheme ? 'bg-orange-100 text-orange-600' : 
                project.isSakuraTheme ? 'bg-pink-100 text-pink-600' : 'bg-gray-100 text-gray-600'
              }`}>
                <Layers className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-1">{l.role}</p>
              <p className="text-lg font-bold text-gray-900">{role}</p>
            </motion.div>
            
            {/* Duration Card */}
            <motion.div 
              className={`relative p-6 rounded-2xl border overflow-hidden group ${
                project.isOrangeTheme 
                  ? 'bg-gradient-to-br from-orange-50 to-white border-orange-100 hover:border-orange-300' 
                  : project.isSakuraTheme 
                  ? 'bg-gradient-to-br from-pink-50 to-white border-pink-100 hover:border-pink-300'
                  : 'bg-gradient-to-br from-gray-50 to-white border-gray-100 hover:border-gray-300'
              }`}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`absolute top-0 right-0 w-20 h-20 opacity-10 ${
                project.isOrangeTheme ? 'bg-orange-500' : 
                project.isSakuraTheme ? 'bg-pink-500' : 'bg-gray-500'
              } rounded-bl-full`} />
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4 ${
                project.isOrangeTheme ? 'bg-orange-100 text-orange-600' : 
                project.isSakuraTheme ? 'bg-pink-100 text-pink-600' : 'bg-gray-100 text-gray-600'
              }`}>
                <Clock className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-1">{l.duration}</p>
              <p className="text-lg font-bold text-gray-900">{duration}</p>
            </motion.div>
            
            {/* Year Card */}
            <motion.div 
              className={`relative p-6 rounded-2xl border overflow-hidden group ${
                project.isOrangeTheme 
                  ? 'bg-gradient-to-br from-orange-50 to-white border-orange-100 hover:border-orange-300' 
                  : project.isSakuraTheme 
                  ? 'bg-gradient-to-br from-pink-50 to-white border-pink-100 hover:border-pink-300'
                  : 'bg-gradient-to-br from-gray-50 to-white border-gray-100 hover:border-gray-300'
              }`}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`absolute top-0 right-0 w-20 h-20 opacity-10 ${
                project.isOrangeTheme ? 'bg-orange-500' : 
                project.isSakuraTheme ? 'bg-pink-500' : 'bg-gray-500'
              } rounded-bl-full`} />
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4 ${
                project.isOrangeTheme ? 'bg-orange-100 text-orange-600' : 
                project.isSakuraTheme ? 'bg-pink-100 text-pink-600' : 'bg-gray-100 text-gray-600'
              }`}>
                <Calendar className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-1">{l.year}</p>
              <p className="text-lg font-bold text-gray-900">{project.year}</p>
            </motion.div>
          </div>
        </ScrollReveal>

        {/* Technologies */}
        <ScrollReveal delay={0.2}>
          <div className="mt-16">
            {/* Section Label */}
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-8 h-px ${
                project.isOrangeTheme ? 'bg-orange-400' : 
                project.isSakuraTheme ? 'bg-pink-400' : 'bg-gray-300'
              }`} />
              <h2 className={`text-sm font-semibold uppercase tracking-widest ${
                project.isOrangeTheme ? 'text-orange-500' : 
                project.isSakuraTheme ? 'text-pink-500' : 'text-gray-400'
              }`}>{l.tech}</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-300 ${
                    project.isOrangeTheme 
                      ? 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-500 hover:text-white hover:border-orange-500' 
                      : project.isSakuraTheme 
                      ? 'bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-500 hover:text-white hover:border-pink-500'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-black hover:text-white hover:border-black'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  style={{ cursor: 'default' }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Features */}
        <ScrollReveal delay={0.3}>
          <div className="mt-16">
            {/* Section Label */}
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-8 h-px ${
                project.isOrangeTheme ? 'bg-orange-400' : 
                project.isSakuraTheme ? 'bg-pink-400' : 'bg-gray-300'
              }`} />
              <h2 className={`text-sm font-semibold uppercase tracking-widest ${
                project.isOrangeTheme ? 'text-orange-500' : 
                project.isSakuraTheme ? 'text-pink-500' : 'text-gray-400'
              }`}>{l.features}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${
                    project.isOrangeTheme 
                      ? 'bg-white border-orange-100 hover:border-orange-300 hover:shadow-md hover:shadow-orange-100' 
                      : project.isSakuraTheme 
                      ? 'bg-white border-pink-100 hover:border-pink-300 hover:shadow-md hover:shadow-pink-100'
                      : 'bg-white border-gray-100 hover:border-gray-300 hover:shadow-md'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ x: 4 }}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                    project.isOrangeTheme ? 'bg-orange-100 text-orange-600' : 
                    project.isSakuraTheme ? 'bg-pink-100 text-pink-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Gallery with Captions */}
        <ScrollReveal delay={0.4}>
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {language === 'ru' ? 'Галерея проекта' : language === 'kz' ? 'Жоба галереясы' : 'Project Gallery'}
            </h2>
            <div className="space-y-12">
              {project.images.slice(1).map((image, index) => {
                const imageSrc = project.hasImageCaptions ? image.src : image
                const figureNum = `1.${index + 2}`
                const caption = project.hasImageCaptions 
                  ? (language === 'ru' ? image.captionRu : language === 'kz' ? image.captionKz : image.caption)
                  : `Screenshot ${index + 2}`
                
                return (
                  <motion.figure
                    key={index}
                    className="group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                  >
                    {/* Section text before image */}
                    {index === 0 && project.hasImageCaptions && (
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {language === 'ru' 
                          ? 'Ниже представлены ключевые экраны и элементы дизайн-системы проекта.'
                          : language === 'kz'
                          ? 'Төменде жобаның негізгі экрандары мен дизайн-жүйе элементтері көрсетілген.'
                          : 'Below are the key screens and design system elements of the project.'}
                      </p>
                    )}
                    
                    <motion.img
                      src={imageSrc}
                      alt={caption}
                      className="w-full rounded-2xl shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
                      whileHover={{ scale: 1.005 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                      onClick={() => openLightbox(index + 1)}
                    />
                    
                    {/* Figure caption */}
                    <figcaption className="mt-4 text-center">
                      <span className={`text-sm ${
                        project.isOrangeTheme ? 'text-orange-500/70' : 
                        project.isSakuraTheme ? 'text-pink-500/70' : 'text-gray-400'
                      }`}>
                        {language === 'ru' ? `Рис. ${figureNum}` : language === 'kz' ? `Сур. ${figureNum}` : `Fig. ${figureNum}`}
                      </span>
                      <span className="text-sm text-gray-400"> — </span>
                      <span className="text-sm text-gray-500">{caption}</span>
                    </figcaption>
                    
                    {/* Separator between images */}
                    {index < project.images.length - 2 && (
                      <div className={`mt-12 h-px ${
                        project.isOrangeTheme ? 'bg-orange-200' : 
                        project.isSakuraTheme ? 'bg-pink-200' : 'bg-gray-200'
                      }`} />
                    )}
                  </motion.figure>
                )
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Links */}
        <ScrollReveal delay={0.5}>
          <div className="mt-12 flex flex-wrap gap-4">
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                  project.isOrangeTheme 
                    ? 'bg-orange-500 text-white hover:bg-orange-600' 
                    : project.isSakuraTheme
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600'
                    : 'bg-black text-white'
                }`}
                style={{ cursor: 'pointer' }}
                whileHover={{ scale: 1.03, boxShadow: project.isOrangeTheme ? '0 8px 20px rgba(255,99,60,0.25)' : '0 8px 20px rgba(0,0,0,0.2)' }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="w-4 h-4" />
                {l.live}
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  project.isSakuraTheme
                    ? 'bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-pink-200 border border-pink-500/30 hover:border-pink-400/60 hover:text-pink-100'
                    : 'bg-gray-100 text-gray-900 hover:bg-black hover:text-white'
                }`}
                style={{ cursor: 'pointer' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-4 h-4" />
                {l.code}
              </motion.a>
            )}
          </div>
        </ScrollReveal>
      </div>

      {/* Image Lightbox */}
      <AnimatePresence>
        {lightboxOpen && project.images && (
          <ImageLightbox
            images={project.images}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={goToPrevImage}
            onNext={goToNextImage}
            language={language}
            hasImageCaptions={project.hasImageCaptions}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
