import { useEffect, useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft, ExternalLink, Github, Calendar, Clock, Layers } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const projectData = {
  1: {
    title: 'Growbit | Finance Management App',
    titleRu: 'Growbit | Приложение для управления финансами',
    titleKz: 'Growbit | Қаржыны басқару қосымшасы',
    description: 'A comprehensive finance tracking application that helps users manage their budgets, track expenses, and achieve financial goals.',
    descriptionRu: 'Комплексное приложение для отслеживания финансов, которое помогает пользователям управлять бюджетом, отслеживать расходы и достигать финансовых целей.',
    descriptionKz: 'Пайдаланушыларға бюджетті басқаруға, шығындарды бақылауға және қаржылық мақсаттарға жетуге көмектесетін кешенді қаржылық қосымша.',
    role: 'Full-Stack Developer',
    roleRu: 'Full-Stack разработчик',
    roleKz: 'Full-Stack әзірлеуші',
    duration: '3 months',
    durationRu: '3 месяца',
    durationKz: '3 ай',
    year: '2025',
    tags: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    features: [
      'Real-time expense tracking',
      'Budget planning with AI suggestions',
      'Multiple account management',
      'Interactive charts and reports',
      'Dark/Light mode support'
    ],
    featuresRu: [
      'Отслеживание расходов в реальном времени',
      'Планирование бюджета с AI-подсказками',
      'Управление несколькими счетами',
      'Интерактивные графики и отчёты',
      'Поддержка тёмной/светлой темы'
    ],
    featuresKz: [
      'Шығындарды нақты уақытта бақылау',
      'AI ұсыныстарымен бюджетті жоспарлау',
      'Бірнеше шоттарды басқару',
      'Интерактивті диаграммалар мен есептер',
      'Қараңғы/жарық тақырыпты қолдау'
    ],
    images: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/Mi-Yomi',
    bgColor: 'from-amber-100 via-orange-50 to-amber-200',
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
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function ProjectPage({ projectId, onBack }) {
  const { language } = useLanguage()
  const project = projectData[projectId]
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
      className="min-h-screen bg-white"
      style={{ cursor: 'auto' }}
    >
      {/* Back Button */}
      <motion.button
        onClick={onBack}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-xl rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        style={{ cursor: 'pointer' }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        whileHover={{ x: -4, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back</span>
      </motion.button>

      {/* Hero with Parallax */}
      <motion.div 
        className={`relative h-[60vh] bg-gradient-to-br ${project.bgColor} overflow-hidden`}
        style={{ y: heroY }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiPjwvcmVjdD4KPC9zdmc+')] opacity-50" />
        
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: heroOpacity }}
        >
          <motion.img
            src={project.images[0]}
            alt={title}
            className="w-[80%] max-w-4xl rounded-2xl shadow-2xl"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Title & Description */}
        <ScrollReveal>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{title}</h1>
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
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  whileHover={{ scale: 1.05, backgroundColor: '#000', color: '#fff' }}
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
                    className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"
                    whileHover={{ scale: 1.5 }}
                  />
                  <span className="text-gray-600">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        {/* Gallery */}
        <ScrollReveal delay={0.4}>
          <div className="mt-12">
            <div className="grid gap-4">
              {project.images.slice(1).map((image, index) => (
                <motion.img
                  key={index}
                  src={image}
                  alt={`${title} screenshot ${index + 2}`}
                  className="w-full rounded-2xl shadow-lg"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ scale: 1.02 }}
                />
              ))}
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
              className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium transition-all"
              style={{ cursor: 'pointer' }}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-4 h-4" />
              {l.live}
            </motion.a>
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
          </div>
        </ScrollReveal>
      </div>
    </motion.div>
  )
}
