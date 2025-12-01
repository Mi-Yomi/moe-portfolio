import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Calendar, Clock, Layers, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import Navbar from './Navbar'
import ProjectInnerPhoto from '../assets/project_inner_photo.png'
import ProjectPhoto1 from '../assets/project_pjoto_1.jpg'
import ProjectPhoto2 from '../assets/project_pjoto_2.jpg'

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
          <span className="text-orange-400">
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
                idx === currentIndex ? 'ring-2 ring-orange-500 ring-offset-2 ring-offset-black' : 'opacity-50 hover:opacity-80'
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
    title: 'Dashboard Design System',
    titleRu: 'Дизайн-система дашборда',
    titleKz: 'Дашборд дизайн жүйесі',
    description: 'A scalable dashboard design system with reusable components, built for enterprise applications.',
    descriptionRu: 'Масштабируемая дизайн-система дашборда с переиспользуемыми компонентами для корпоративных приложений.',
    descriptionKz: 'Корпоративтік қосымшалар үшін қайта пайдаланылатын компоненттері бар масштабталатын дашборд дизайн жүйесі.',
    role: 'Frontend Developer',
    roleRu: 'Frontend разработчик',
    roleKz: 'Frontend әзірлеуші',
    duration: '2 months',
    durationRu: '2 месяца',
    durationKz: '2 ай',
    year: '2024',
    tags: ['React', 'TypeScript', 'Storybook', 'Figma', 'SCSS'],
    features: [
      '50+ reusable components',
      'Storybook documentation',
      'Figma design tokens sync',
      'Accessibility compliant',
      'Theming support'
    ],
    featuresRu: [
      '50+ переиспользуемых компонентов',
      'Документация в Storybook',
      'Синхронизация дизайн-токенов с Figma',
      'Соответствие стандартам доступности',
      'Поддержка тем'
    ],
    featuresKz: [
      '50+ қайта пайдаланылатын компонент',
      'Storybook құжаттамасы',
      'Figma дизайн токендерімен синхрондау',
      'Қолжетімділік стандарттарына сәйкестік',
      'Тақырыптарды қолдау'
    ],
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/Mi-Yomi',
    bgColor: 'from-gray-800 via-gray-900 to-black',
    isDark: true,
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
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Description */}
        <ScrollReveal>
          <p className="text-xl text-gray-600 leading-relaxed">{description}</p>
        </ScrollReveal>

        {/* Meta Info */}
        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-3 gap-6 mt-12 p-6 bg-gray-50 rounded-2xl">
            <motion.div whileHover={{ scale: 1.02 }}>
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Layers className="w-4 h-4" />
                <span className="text-sm">{l.role}</span>
              </div>
              <p className="font-semibold text-gray-900">{role}</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }}>
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{l.duration}</span>
              </div>
              <p className="font-semibold text-gray-900">{duration}</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }}>
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{l.year}</span>
              </div>
              <p className="font-semibold text-gray-900">{project.year}</p>
            </motion.div>
          </div>
        </ScrollReveal>

        {/* Technologies */}
        <ScrollReveal delay={0.2}>
          <div className="mt-12">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{l.tech}</h2>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  className={`px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium ${
                    project.isOrangeTheme ? 'hover:bg-orange-500 hover:text-white' : 'hover:bg-black hover:text-white'
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
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
          <div className="mt-12">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{l.features}</h2>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.span 
                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${project.isOrangeTheme ? 'bg-orange-500' : 'bg-black'}`}
                    whileHover={{ scale: 1.5 }}
                  />
                  <span className="text-gray-600">{feature}</span>
                </motion.li>
              ))}
            </ul>
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
                      <span className={`text-sm ${project.isOrangeTheme ? 'text-orange-500/70' : 'text-gray-400'}`}>
                        {language === 'ru' ? `Рис. ${figureNum}` : language === 'kz' ? `Сур. ${figureNum}` : `Fig. ${figureNum}`}
                      </span>
                      <span className="text-sm text-gray-400"> — </span>
                      <span className="text-sm text-gray-500">{caption}</span>
                    </figcaption>
                    
                    {/* Separator between images */}
                    {index < project.images.length - 2 && (
                      <div className={`mt-12 h-px ${project.isOrangeTheme ? 'bg-orange-200' : 'bg-gray-200'}`} />
                    )}
                  </motion.figure>
                )
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Links */}
        <ScrollReveal delay={0.5}>
          <div className="mt-12 flex gap-4">
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                project.isOrangeTheme 
                  ? 'bg-orange-500 text-white hover:bg-orange-600' 
                  : 'bg-black text-white'
              }`}
              style={{ cursor: 'pointer' }}
              whileHover={{ scale: 1.03, boxShadow: project.isOrangeTheme ? '0 8px 20px rgba(255,99,60,0.25)' : '0 8px 20px rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-4 h-4" />
              {l.live}
            </motion.a>
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-900 rounded-full font-medium transition-all duration-300 hover:bg-black hover:text-white"
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
