import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const projects = [
  {
    id: 1,
    title: 'Growbit | Finance Management App',
    titleRu: 'Growbit | Приложение для управления финансами',
    titleKz: 'Growbit | Қаржыны басқару қосымшасы',
    description: 'A comprehensive finance tracking application',
    descriptionRu: 'Комплексное приложение для отслеживания финансов',
    descriptionKz: 'Кешенді қаржылық қосымша',
    tags: ['PRODUCT DESIGN', 'MOBILE APP'],
    year: '2025',
    bgColor: 'bg-gradient-to-br from-gray-100 to-gray-200',
    mockupImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=600&fit=crop',
    hasMockup: true,
    mockupType: 'phone',
    isComingSoon: false,
  },
  {
    id: 2,
    title: 'Dashboard Design System',
    titleRu: 'Дизайн-система дашборда',
    titleKz: 'Дашборд дизайн жүйесі',
    description: 'Scalable dashboard components',
    descriptionRu: 'Масштабируемые компоненты дашборда',
    descriptionKz: 'Масштабталатын дашборд компоненттері',
    tags: ['DASHBOARD', 'DESIGN SYSTEM'],
    year: '2024',
    bgColor: 'bg-gradient-to-br from-gray-900 to-black',
    mockupImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    hasMockup: true,
    mockupType: 'desktop',
    isDark: true,
    isComingSoon: false,
  },
  {
    id: 3,
    title: 'Minimal Reading App',
    titleRu: 'Минималистичное приложение для чтения',
    titleKz: 'Минималистік оқу қосымшасы',
    description: 'Clean and focused reading experience',
    descriptionRu: 'Чистый и сфокусированный опыт чтения',
    descriptionKz: 'Таза және фокусталған оқу тәжірибесі',
    tags: ['MOBILE APP', 'UI/UX'],
    year: '2024',
    bgColor: 'bg-gradient-to-br from-gray-50 to-gray-100',
    hasMockup: false,
    isComingSoon: true,
  },
  {
    id: 4,
    title: 'E-Commerce Platform',
    titleRu: 'E-Commerce платформа',
    titleKz: 'E-Commerce платформа',
    description: 'Modern shopping experience',
    descriptionRu: 'Современный опыт покупок',
    descriptionKz: 'Заманауи сауда тәжірибесі',
    tags: ['E-COMMERCE', 'WEB APP'],
    year: '2024',
    bgColor: 'bg-gradient-to-br from-gray-800 to-gray-900',
    hasMockup: false,
    isDark: true,
    isComingSoon: true,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1],
    },
  },
}

function ProjectCard({ project, onProjectClick, language }) {
  const title = language === 'ru' ? project.titleRu : language === 'kz' ? project.titleKz : project.title
  const description = language === 'ru' ? project.descriptionRu : language === 'kz' ? project.descriptionKz : project.description

  const handleClick = () => {
    if (!project.isComingSoon) {
      onProjectClick(project.id)
    }
  }

  return (
    <motion.div
      onClick={handleClick}
      className={`group block ${project.isComingSoon ? 'cursor-default' : 'cursor-pointer'}`}
      data-cursor={project.isComingSoon ? "coming-soon" : "project"}
      variants={itemVariants}
      whileHover={!project.isComingSoon ? { y: -6 } : {}}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Image Container */}
      <div className={`relative aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden ${project.bgColor}`}>
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4xIi8+PC9zdmc+')]" />

        {/* Coming Soon Badge */}
        {project.isComingSoon && (
          <motion.div 
            className="absolute top-3 right-3 md:top-4 md:right-4 z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className={`backdrop-blur-md px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-[10px] md:text-xs font-medium flex items-center gap-1.5 ${
              project.isDark 
                ? 'bg-white/10 text-white/80 border border-white/10' 
                : 'bg-black/5 text-black/60 border border-black/5'
            }`}>
              <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" />
              {language === 'ru' ? 'Скоро' : language === 'kz' ? 'Жақында' : 'Coming Soon'}
            </div>
          </motion.div>
        )}

        {/* Device Mockup */}
        {project.hasMockup && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ y: 0 }}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            {project.mockupType === 'phone' ? (
              <div className="relative w-32 md:w-44 h-[260px] md:h-[360px] mt-16 md:mt-24">
                <div className="absolute inset-0 bg-black rounded-[2rem] md:rounded-[2.5rem] p-1 md:p-1.5 shadow-2xl">
                  <div className="w-full h-full bg-gray-900 rounded-[1.8rem] md:rounded-[2.2rem] overflow-hidden">
                    <img 
                      src={project.mockupImage}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-2 md:top-3 left-1/2 -translate-x-1/2 w-12 md:w-16 h-4 md:h-5 bg-black rounded-full" />
                </div>
              </div>
            ) : (
              <div className="relative w-[80%] md:w-[85%] mt-12 md:mt-20">
                <div className="bg-gray-900 rounded-t-lg p-1.5 md:p-2 shadow-2xl">
                  <div className="flex gap-1 md:gap-1.5 mb-1.5 md:mb-2">
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-gray-700" />
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-gray-700" />
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-gray-700" />
                  </div>
                  <div className="bg-black rounded overflow-hidden aspect-video">
                    <img 
                      src={project.mockupImage}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="h-2 md:h-3 bg-gray-800 rounded-b-lg" />
              </div>
            )}
          </motion.div>
        )}

        {/* Decorative elements for non-mockup cards */}
        {!project.hasMockup && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              className={`text-6xl md:text-8xl ${project.isDark ? 'opacity-10' : 'opacity-5'}`}
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {project.id === 3 ? '📱' : '🛒'}
            </motion.div>
          </div>
        )}

        {/* Hover overlay */}
        <motion.div 
          className={`absolute inset-0 ${project.isDark ? 'bg-white/5' : 'bg-black/5'} opacity-0 group-hover:opacity-100`}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Tags & Title */}
      <div className="mt-4 md:mt-5">
        <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
          {project.tags.map((tag, i) => (
            <span 
              key={i}
              className="px-2 md:px-3 py-0.5 md:py-1 text-[9px] md:text-[10px] font-semibold uppercase tracking-wider rounded-full bg-gray-100 text-gray-600 border border-gray-200"
            >
              {tag}
            </span>
          ))}
          <span className="ml-auto text-gray-400 text-xs md:text-sm font-mono">{project.year}</span>
        </div>
        <h3 className="text-base md:text-lg font-semibold text-gray-900 group-hover:text-gray-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-xs md:text-sm text-gray-500 mt-1">{description}</p>
      </div>
    </motion.div>
  )
}

export default function WorkSection({ onProjectClick, onViewAll }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { t, language } = useLanguage()

  return (
    <section id="work" className="py-16 md:py-24 px-4 md:px-6 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-10 md:mb-16"
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="inline-flex items-center gap-2 text-xs text-gray-400 uppercase tracking-widest mb-3 md:mb-4">
            <span className="w-6 md:w-8 h-px bg-gray-300" />
            {t('work.label')}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            {t('work.title')}
          </h2>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onProjectClick={onProjectClick}
              language={language}
            />
          ))}
        </motion.div>

        {/* View All */}
        <motion.div 
          className="flex justify-center mt-10 md:mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.button
            onClick={onViewAll}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black font-medium transition-colors duration-300 group text-sm md:text-base"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            {t('work.viewAll')}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
