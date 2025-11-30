import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Briefcase, Code, Cpu, Database, Layout, Layers, Terminal, Box, Zap, Settings, GitBranch, FileCode, Server } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

// Map skill names to icons
const skillIcons = {
  'UI Design': Layout,
  'Prototyping': Layers,
  'Design Systems': Box,
  'Auto Layout': Settings,
  'Components': Cpu,
  'CRUD Operations': Database,
  'Aggregation': Server,
  'Indexing': Zap,
  'Mongoose ODM': FileCode,
  'AI Assistance': Zap,
  'Code Generation': Code,
  'Refactoring': GitBranch,
  'Documentation': FileCode,
  'Eloquent ORM': Database,
  'API Development': Server,
  'Authentication': Settings,
  'Queue Jobs': Layers,
  'Testing': Terminal,
  'Services': Server,
  'RxJS': Zap,
  'NgRx': Database,
  'Angular Material': Layout,
  'Hooks': Code,
  'Context API': Layers,
  'React Query': Database,
  'Framer Motion': Zap,
  'Next.js': Server,
  'OOP': Box,
  'STL': Cpu,
  'Boost': Zap,
  'Qt5': Layout,
  'Memory Management': Settings,
  'Data Structures': Layers,
  'Algorithms': Code,
}

const skillsData = {
  'Figma': {
    years: 2,
    description: 'My primary design tool for creating interfaces, prototypes, and design systems.',
    descriptionRu: 'Мой основной инструмент для создания интерфейсов, прототипов и дизайн-систем.',
    descriptionKz: 'Интерфейстерді, прототиптерді және дизайн жүйелерін жасау үшін негізгі құралым.',
    projects: [
      { name: 'Growbit Finance App', year: '2025' },
      { name: 'Dashboard Design System', year: '2024' },
      { name: 'E-commerce UI Kit', year: '2024' },
    ],
    skills: ['UI Design', 'Prototyping', 'Design Systems', 'Auto Layout', 'Components'],
  },
  'MongoDB': {
    years: 1,
    description: 'NoSQL database I use for flexible, scalable backend solutions.',
    descriptionRu: 'NoSQL база данных для гибких и масштабируемых backend-решений.',
    descriptionKz: 'Икемді және масштабталатын backend шешімдері үшін NoSQL деректер базасы.',
    projects: [
      { name: 'User Analytics Platform', year: '2024' },
      { name: 'Real-time Chat App', year: '2024' },
    ],
    skills: ['CRUD Operations', 'Aggregation', 'Indexing', 'Mongoose ODM'],
  },
  'Cursor': {
    years: 1,
    description: 'AI-powered code editor that significantly boosts my productivity.',
    descriptionRu: 'AI-редактор кода, который значительно повышает мою продуктивность.',
    descriptionKz: 'Өнімділігімді айтарлықтай арттыратын AI-код редакторы.',
    projects: [
      { name: 'This Portfolio Website', year: '2025' },
      { name: 'Multiple client projects', year: '2024-2025' },
    ],
    skills: ['AI Assistance', 'Code Generation', 'Refactoring', 'Documentation'],
  },
  'Laravel': {
    years: 1,
    description: 'PHP framework for building robust, scalable web applications and APIs.',
    descriptionRu: 'PHP-фреймворк для создания надёжных, масштабируемых веб-приложений и API.',
    descriptionKz: 'Сенімді, масштабталатын веб-қосымшалар мен API құру үшін PHP-фреймворк.',
    projects: [
      { name: 'E-commerce Backend', year: '2024' },
      { name: 'CRM System', year: '2024' },
      { name: 'REST API Services', year: '2023' },
    ],
    skills: ['Eloquent ORM', 'API Development', 'Authentication', 'Queue Jobs', 'Testing'],
  },
  'Angular': {
    years: 1,
    description: 'Enterprise-grade frontend framework for complex applications.',
    descriptionRu: 'Enterprise-фреймворк для сложных фронтенд-приложений.',
    descriptionKz: 'Күрделі қосымшалар үшін Enterprise деңгейіндегі фронтенд-фреймворк.',
    projects: [
      { name: 'Admin Dashboard', year: '2024' },
      { name: 'Internal Management Tool', year: '2023' },
    ],
    skills: ['Components', 'Services', 'RxJS', 'NgRx', 'Angular Material'],
  },
  'React': {
    years: 1,
    description: 'My go-to library for building modern, interactive user interfaces.',
    descriptionRu: 'Моя основная библиотека для создания современных интерактивных интерфейсов.',
    descriptionKz: 'Заманауи интерактивті интерфейстер құру үшін негізгі кітапханам.',
    projects: [
      { name: 'This Portfolio', year: '2025' },
      { name: 'Growbit Finance App', year: '2025' },
      { name: 'Dashboard Design System', year: '2024' },
      { name: 'Multiple SaaS Projects', year: '2023-2024' },
    ],
    skills: ['Hooks', 'Context API', 'React Query', 'Framer Motion', 'Next.js'],
  },
  'C++': {
    years: 3,
    description: 'My first programming language. I still use it for performance-critical applications.',
    descriptionRu: 'Мой первый язык программирования. Использую для производительных приложений.',
    descriptionKz: 'Менің алғашқы бағдарламалау тілім. Өнімділікті қажет ететін қосымшалар үшін қолданамын.',
    projects: [
      { name: 'Pyramid Game (College)', year: '2023' },
      { name: 'Project Menu (College)', year: '2022' },
      { name: 'Algorithm Implementations', year: '2020-2024' },
    ],
    skills: ['OOP', 'STL', 'Boost', 'Qt5', 'Memory Management', 'Data Structures', 'Algorithms'],
  },
}

export default function SkillModal({ isOpen, onClose, skillName, skillIcon }) {
  const { language } = useLanguage()
  const skill = skillsData[skillName]

  if (!skill) return null

  const getLocalizedText = (en, ru, kz) => {
    if (language === 'ru') return ru || en
    if (language === 'kz') return kz || en
    return en
  }

  const description = getLocalizedText(skill.description, skill.descriptionRu, skill.descriptionKz)

  const labels = {
    en: { 
      experience: 'Years of Experience', 
      about: 'About', 
      projects: 'Projects', 
      skills: 'Key Skills',
      year: 'year',
      years: 'years'
    },
    ru: { 
      experience: 'Лет опыта', 
      about: 'Описание', 
      projects: 'Проекты', 
      skills: 'Ключевые навыки',
      year: 'год',
      years: 'лет'
    },
    kz: { 
      experience: 'Тәжірибе жылдары', 
      about: 'Сипаттама', 
      projects: 'Жобалар', 
      skills: 'Негізгі дағдылар',
      year: 'жыл',
      years: 'жыл'
    },
  }
  const l = labels[language] || labels.en

  const getYearsText = (num) => {
    if (language === 'ru') {
      if (num === 1) return `${num} ${l.year}`
      if (num >= 2 && num <= 4) return `${num} года`
      return `${num} ${l.years}`
    }
    return `${num} ${num === 1 ? l.year : l.years}`
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - click to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
          />

          {/* Modal Container - click outside to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="bg-white rounded-2xl md:rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[85vh] overflow-y-auto cursor-auto mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative p-6 pb-4 border-b border-gray-100">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
                
                <div className="flex items-center gap-4">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                    className="flex-shrink-0"
                  >
                    {skillIcon}
                  </motion.div>
                  <div>
                    <motion.h2 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 }}
                      className="text-2xl font-bold text-gray-900"
                    >
                      {skillName}
                    </motion.h2>
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center gap-2 text-gray-500 mt-1"
                    >
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{getYearsText(skill.years)} {l.experience.toLowerCase()}</span>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* About */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    {l.about}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{description}</p>
                </motion.div>

                {/* Years Badge */}
                <motion.div 
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div 
                    className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center font-bold text-xl"
                    initial={{ rotate: -10 }}
                    animate={{ rotate: 0 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                  >
                    {skill.years}
                  </motion.div>
                  <div>
                    <div className="text-sm text-gray-500">{l.experience}</div>
                    <div className="font-semibold text-gray-900">{getYearsText(skill.years)}</div>
                  </div>
                </motion.div>

                {/* Projects */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    {l.projects}
                  </h3>
                  <div className="space-y-2">
                    {skill.projects.map((project, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 + index * 0.05 }}
                        whileHover={{ x: 4, backgroundColor: '#f3f4f6' }}
                      >
                        <span className="font-medium text-gray-900">{project.name}</span>
                        <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded-lg">{project.year}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Skills with Icons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    {l.skills}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.skills.map((s, index) => {
                      const IconComponent = skillIcons[s] || Code
                      return (
                        <motion.span
                          key={s}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.35 + index * 0.03 }}
                          whileHover={{ scale: 1.05, backgroundColor: '#000', color: '#fff' }}
                        >
                          <IconComponent className="w-3.5 h-3.5" />
                          {s}
                        </motion.span>
                      )
                    })}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
