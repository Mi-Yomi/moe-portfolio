import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const allProjects = [
  {
    id: 1,
    title: 'Growbit | Finance Management App',
    titleRu: 'Growbit | Приложение для управления финансами',
    titleKz: 'Growbit | Қаржыны басқару қосымшасы',
    description: 'A comprehensive finance tracking application that helps users manage their budgets, track expenses, and achieve financial goals.',
    descriptionRu: 'Комплексное приложение для отслеживания финансов.',
    descriptionKz: 'Кешенді қаржылық қосымша.',
    tags: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    year: '2025',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop',
    status: 'completed',
  },
  {
    id: 2,
    title: 'Dashboard Design System',
    titleRu: 'Дизайн-система дашборда',
    titleKz: 'Дашборд дизайн жүйесі',
    description: 'A scalable dashboard design system with reusable components, built for enterprise applications.',
    descriptionRu: 'Масштабируемая дизайн-система дашборда.',
    descriptionKz: 'Масштабталатын дашборд дизайн жүйесі.',
    tags: ['React', 'Storybook', 'Figma', 'SCSS'],
    year: '2024',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    status: 'completed',
  },
  {
    id: 3,
    title: 'Minimal Reading App',
    titleRu: 'Минималистичное приложение для чтения',
    titleKz: 'Минималистік оқу қосымшасы',
    description: 'Clean and focused reading experience with customizable themes.',
    descriptionRu: 'Чистый и сфокусированный опыт чтения.',
    descriptionKz: 'Таза және фокусталған оқу тәжірибесі.',
    tags: ['React Native', 'TypeScript', 'UI/UX'],
    year: '2024',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=400&fit=crop',
    status: 'coming-soon',
  },
  {
    id: 4,
    title: 'E-Commerce Platform',
    titleRu: 'E-Commerce платформа',
    titleKz: 'E-Commerce платформасы',
    description: 'Modern shopping experience with seamless checkout.',
    descriptionRu: 'Современный опыт покупок.',
    descriptionKz: 'Заманауи сауда тәжірибесі.',
    tags: ['Next.js', 'Stripe', 'Prisma'],
    year: '2024',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    status: 'coming-soon',
  },
  {
    id: 5,
    title: 'AI Chat Assistant',
    titleRu: 'AI Чат-ассистент',
    titleKz: 'AI Чат-көмекші',
    description: 'Intelligent conversational AI powered by GPT.',
    descriptionRu: 'Умный разговорный AI на базе GPT.',
    descriptionKz: 'GPT негізіндегі ақылды AI.',
    tags: ['Python', 'OpenAI', 'FastAPI'],
    year: '2024',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    status: 'coming-soon',
  },
  {
    id: 6,
    title: 'Portfolio Website',
    titleRu: 'Портфолио сайт',
    titleKz: 'Портфолио сайты',
    description: 'This portfolio website you are viewing right now.',
    descriptionRu: 'Этот сайт-портфолио, который вы сейчас просматриваете.',
    descriptionKz: 'Қазір көріп отырған осы портфолио сайты.',
    tags: ['React', 'Tailwind', 'Framer Motion'],
    year: '2025',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    status: 'completed',
  },
]

function ProjectCard({ project, index, onProjectClick, language }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const title = language === 'ru' ? project.titleRu : language === 'kz' ? project.titleKz : project.title
  const description = language === 'ru' ? project.descriptionRu : language === 'kz' ? project.descriptionKz : project.description

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      onClick={() => project.status === 'completed' && onProjectClick(project.id)}
      className={`group bg-white rounded-xl md:rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 ${
        project.status === 'completed' ? 'cursor-pointer' : 'cursor-default'
      }`}
    >
      {/* Image */}
      <div className="relative aspect-[3/2] overflow-hidden bg-gray-100">
        <img 
          src={project.image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Status Badge */}
        {project.status === 'coming-soon' && (
          <div className="absolute top-3 right-3 md:top-4 md:right-4 px-2.5 py-1 md:px-3 md:py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-[10px] md:text-xs font-medium text-gray-600 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse" />
            {language === 'ru' ? 'Скоро' : language === 'kz' ? 'Жақында' : 'Coming Soon'}
          </div>
        )}

        {/* Year Badge */}
        <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 px-2.5 py-0.5 md:px-3 md:py-1 bg-black/70 backdrop-blur-sm rounded-full text-[10px] md:text-xs font-medium text-white">
          {project.year}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-2 md:mb-3">
          {project.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag}
              className="px-2 py-0.5 md:px-2.5 md:py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] md:text-xs font-medium"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-0.5 md:px-2.5 md:py-1 bg-gray-100 text-gray-400 rounded-full text-[10px] md:text-xs font-medium">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-1.5 md:mb-2 group-hover:text-gray-600 transition-colors text-sm md:text-base">
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs md:text-sm text-gray-500 line-clamp-2">{description}</p>

        {/* View Project Link */}
        {project.status === 'completed' && (
          <motion.div 
            className="flex items-center gap-1 mt-3 md:mt-4 text-xs md:text-sm font-medium text-gray-900 group-hover:text-black"
            whileHover={{ x: 4 }}
          >
            {language === 'ru' ? 'Смотреть проект' : language === 'kz' ? 'Жобаны көру' : 'View Project'}
            <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default function AllProjectsPage({ onBack, onProjectClick }) {
  const { language } = useLanguage()

  const labels = {
    en: { 
      title: 'All Projects', 
      subtitle: 'A collection of my work across different domains',
      back: 'Back',
      completed: 'Completed',
      upcoming: 'Upcoming',
    },
    ru: { 
      title: 'Все проекты', 
      subtitle: 'Коллекция моих работ в разных направлениях',
      back: 'Назад',
      completed: 'Завершённые',
      upcoming: 'В разработке',
    },
    kz: { 
      title: 'Барлық жобалар', 
      subtitle: 'Әртүрлі бағыттардағы жұмыстарым',
      back: 'Артқа',
      completed: 'Аяқталған',
      upcoming: 'Әзірленуде',
    },
  }
  const l = labels[language] || labels.en

  const completedProjects = allProjects.filter(p => p.status === 'completed')
  const upcomingProjects = allProjects.filter(p => p.status === 'coming-soon')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white"
    >
      {/* Back Button */}
      <motion.button
        onClick={onBack}
        className="fixed top-4 left-4 md:top-6 md:left-6 z-50 flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-white/90 backdrop-blur-xl rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        whileHover={{ x: -4 }}
        whileTap={{ scale: 0.98 }}
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-xs md:text-sm font-medium">{l.back}</span>
      </motion.button>

      {/* Header */}
      <div className="pt-24 md:pt-32 pb-10 md:pb-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-3 md:mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {l.title}
          </motion.h1>
          <motion.p 
            className="text-base md:text-lg text-gray-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {l.subtitle}
          </motion.p>
        </div>
      </div>

      {/* Completed Projects */}
      <div className="px-4 md:px-6 pb-10 md:pb-16">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6 md:mb-8 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            {l.completed}
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {completedProjects.map((project, index) => (
              <ProjectCard 
                key={project.id}
                project={project}
                index={index}
                onProjectClick={onProjectClick}
                language={language}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Projects */}
      <div className="px-4 md:px-6 pb-16 md:pb-24 bg-gray-50">
        <div className="max-w-6xl mx-auto pt-10 md:pt-16">
          <motion.h2 
            className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6 md:mb-8 flex items-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
            {l.upcoming}
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {upcomingProjects.map((project, index) => (
              <ProjectCard 
                key={project.id}
                project={project}
                index={index}
                onProjectClick={onProjectClick}
                language={language}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
