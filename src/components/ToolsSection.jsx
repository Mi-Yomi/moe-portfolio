import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import SkillModal from './SkillModal'

const tools = [
  { 
    name: 'Figma', 
    description: 'Leading collaborative design tool',
    descriptionRu: 'Ведущий инструмент для дизайна',
    descriptionKz: 'Жетекші дизайн құралы',
    yearsNum: 2,
    icon: (
      <svg viewBox="0 0 38 57" className="w-8 h-8 md:w-10 md:h-10">
        <path fill="#F24E1E" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"/>
        <path fill="#FF7262" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z"/>
        <path fill="#A259FF" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z"/>
        <path fill="#1ABCFE" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"/>
        <path fill="#0ACF83" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"/>
      </svg>
    )
  },
  { 
    name: 'MongoDB', 
    description: 'NoSQL database for modern apps',
    descriptionRu: 'NoSQL база данных',
    descriptionKz: 'NoSQL деректер базасы',
    yearsNum: 1,
    icon: (
      <div className="w-8 h-8 md:w-10 md:h-10 bg-[#00ED64] rounded-lg flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6" fill="#001E2B">
          <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/>
        </svg>
      </div>
    )
  },
  { 
    name: 'Cursor', 
    description: 'AI-powered code editor',
    descriptionRu: 'AI редактор кода',
    descriptionKz: 'AI код редакторы',
    yearsNum: 1,
    icon: (
      <div className="w-8 h-8 md:w-10 md:h-10 bg-black rounded-xl flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5v14" strokeLinecap="round"/>
        </svg>
      </div>
    )
  },
  { 
    name: 'Laravel', 
    description: 'PHP framework for web artisans',
    descriptionRu: 'PHP фреймворк',
    descriptionKz: 'PHP фреймворк',
    yearsNum: 1,
    icon: (
      <div className="w-8 h-8 md:w-10 md:h-10 bg-[#FF2D20] rounded-lg flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor">
          <path d="M23.642 5.43a.364.364 0 01.014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 01-.188.326L9.93 23.949a.316.316 0 01-.066.027c-.008.002-.016.008-.024.01a.348.348 0 01-.192 0c-.011-.002-.02-.008-.03-.012-.02-.008-.042-.014-.062-.025L.533 18.755a.376.376 0 01-.189-.326V2.974c0-.033.005-.066.014-.098.003-.012.01-.02.014-.032a.369.369 0 01.023-.058c.004-.013.015-.022.023-.033l.033-.045c.012-.01.025-.018.037-.027.014-.012.027-.024.041-.034h.001L5.044.05a.375.375 0 01.378 0L9.936 2.647h.002c.015.01.027.021.04.033l.038.027c.013.014.02.03.033.045.008.011.02.021.025.033.01.02.017.038.024.058.003.011.01.021.013.032.01.031.014.064.014.098v9.652l3.76-2.164V5.527c0-.033.004-.066.013-.098.003-.01.01-.02.013-.032a.487.487 0 01.024-.059c.007-.012.018-.02.025-.033.012-.015.021-.03.033-.043.012-.012.025-.02.037-.028.014-.01.026-.023.041-.032h.001l4.513-2.598a.375.375 0 01.378 0l4.513 2.598c.016.01.027.021.042.031.012.01.025.018.036.028.013.014.022.03.034.044.008.012.019.021.024.033.011.02.018.04.024.06.006.01.012.021.015.032zm-.74 5.032V6.179l-1.578.908-2.182 1.256v4.283zm-4.514 7.75v-4.287l-2.147 1.225-6.126 3.498v4.325zM1.093 3.624v14.588l8.273 4.761v-4.325l-4.322-2.445-.002-.003h-.002c-.014-.01-.025-.021-.04-.031-.012-.012-.025-.02-.035-.03l-.001-.002c-.013-.012-.021-.025-.031-.04-.01-.011-.021-.022-.028-.036h-.002c-.008-.014-.013-.031-.02-.047-.006-.016-.014-.027-.018-.043a.49.49 0 01-.008-.057c-.002-.014-.006-.027-.006-.041V5.789l-2.18-1.257zM5.23.81L1.47 2.974l3.76 2.164 3.758-2.164zm1.956 13.505l2.182-1.256V3.624l-1.58.91-2.182 1.255v9.435zm11.581-10.95l-3.76 2.163 3.76 2.163 3.759-2.164zm-.376 4.978L16.21 7.087l-1.58-.907v4.283l2.182 1.256 1.58.908zm-8.65 9.654l5.514-3.148 2.756-1.572-3.757-2.163-4.323 2.489-3.941 2.27z"/>
        </svg>
      </div>
    )
  },
  { 
    name: 'Angular', 
    description: 'Platform for web applications',
    descriptionRu: 'Платформа для веб-приложений',
    descriptionKz: 'Веб-қосымшалар платформасы',
    yearsNum: 1,
    icon: (
      <div className="w-8 h-8 md:w-10 md:h-10 bg-[#DD0031] rounded-lg flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor">
          <path d="M9.931 12.645h4.138l-2.07-4.908m0-7.737L.68 3.982l1.726 14.771L12 24l9.596-5.242L23.32 3.984 11.999.001zm7.064 18.31h-2.638l-1.422-3.503H8.996l-1.422 3.504h-2.64L12 2.65z"/>
        </svg>
      </div>
    )
  },
  { 
    name: 'React', 
    description: 'JavaScript library for building UI',
    descriptionRu: 'Библиотека для UI',
    descriptionKz: 'UI құру кітапханасы',
    yearsNum: 1,
    icon: (
      <div className="w-8 h-8 md:w-10 md:h-10 bg-[#20232A] rounded-lg flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 text-[#61DAFB]" fill="currentColor">
          <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/>
        </svg>
      </div>
    )
  },
  { 
    name: 'C++', 
    description: 'High-performance programming language',
    descriptionRu: 'Высокопроизводительный язык',
    descriptionKz: 'Жоғары өнімді тіл',
    yearsNum: 3,
    icon: (
      <div className="w-8 h-8 md:w-10 md:h-10 bg-[#00599C] rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-xs md:text-sm">C++</span>
      </div>
    )
  },
]

export default function ToolsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { t, language } = useLanguage()
  
  const [selectedSkill, setSelectedSkill] = useState(null)
  const [selectedIcon, setSelectedIcon] = useState(null)

  const getYearsText = (num) => {
    if (language === 'ru') {
      if (num === 1) return `${num} ${t('tools.year')}`
      if (num >= 2 && num <= 4) return `${num} года`
      return `${num} ${t('tools.years')}`
    }
    if (language === 'kz') {
      return `${num} ${t('tools.years')}`
    }
    return `${num} ${num === 1 ? t('tools.year') : t('tools.years')}`
  }

  const handleSkillClick = (tool) => {
    setSelectedSkill(tool.name)
    setSelectedIcon(tool.icon)
  }

  return (
    <>
      <section id="tools" className="py-16 md:py-24 px-4 md:px-6 bg-gray-50" ref={ref}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left - Header */}
            <motion.div
              className="lg:sticky lg:top-32"
              initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
              animate={isInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="inline-flex items-center gap-2 text-sm text-gray-500 mb-4 md:mb-6">
                <span className="w-2 h-2 md:w-2.5 md:h-2.5 bg-green-500 rounded-full" />
                {t('tools.label')}
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {t('tools.title1')}
                <br className="hidden md:block" />
                <span className="md:hidden"> </span>
                {t('tools.title2')}
              </h2>
            </motion.div>

            {/* Right - Tool Cards */}
            <div className="space-y-3 md:space-y-4">
              {tools.map((tool, index) => (
                <motion.button
                  key={tool.name}
                  onClick={() => handleSkillClick(tool)}
                  className="w-full text-left group bg-white rounded-xl md:rounded-2xl p-4 md:p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300"
                  initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                  animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.08, 
                    ease: [0.23, 1, 0.32, 1] 
                  }}
                  whileHover={{ x: -4, scale: 1.01 }}
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    {/* Animated Icon */}
                    <motion.div 
                      className="flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.3 }}
                    >
                      {tool.icon}
                    </motion.div>
                    
                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm md:text-base">{tool.name}</h3>
                      <p className="text-xs md:text-sm text-gray-500 truncate">
                        {language === 'ru' ? tool.descriptionRu : language === 'kz' ? tool.descriptionKz : tool.description}
                      </p>
                    </div>

                    {/* Years badge */}
                    <motion.div 
                      className="flex-shrink-0 px-2.5 py-1 md:px-3 md:py-1.5 bg-gray-100 rounded-full text-[10px] md:text-xs font-medium text-gray-600 group-hover:bg-black group-hover:text-white transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      {getYearsText(tool.yearsNum)}
                    </motion.div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skill Modal */}
      <SkillModal 
        isOpen={!!selectedSkill} 
        onClose={() => setSelectedSkill(null)} 
        skillName={selectedSkill}
        skillIcon={selectedIcon}
      />
    </>
  )
}
