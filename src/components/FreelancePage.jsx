import { useState, useRef, useEffect } from 'react'
import { motion, useInView, useAnimationControls, AnimatePresence } from 'framer-motion'
import { Star, Quote, Linkedin, Github, Send, Calculator, Sparkles, Check, Home, Briefcase, Mail, ChevronDown, Code, Zap, Shield, Clock, Award, X, ArrowRight, Menu } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import Me1 from '../assets/Me1.jpg'

const services = [
  {
    id: 'landing',
    name: 'Landing Page',
    nameRu: 'Лендинг',
    nameKz: 'Лендинг',
    description: 'Single page website with modern design',
    descriptionRu: 'Одностраничный сайт с современным дизайном',
    descriptionKz: 'Заманауи дизайнмен бір беттік сайт',
    priceUSD: 150,
    priceKZT: 70000,
    duration: '3-5 days',
    durationRu: '3-5 дней',
    durationKz: '3-5 күн',
    features: ['Responsive design', 'Animations', 'SEO optimization'],
    featuresRu: ['Адаптивный дизайн', 'Анимации', 'SEO оптимизация'],
    featuresKz: ['Адаптивті дизайн', 'Анимациялар', 'SEO оңтайландыру'],
  },
  {
    id: 'website',
    name: 'Multi-page Website',
    nameRu: 'Многостраничный сайт',
    nameKz: 'Көп беттік сайт',
    description: 'Full website with multiple pages',
    descriptionRu: 'Полноценный сайт с несколькими страницами',
    descriptionKz: 'Бірнеше беті бар толық сайт',
    priceUSD: 400,
    priceKZT: 180000,
    duration: '1-2 weeks',
    durationRu: '1-2 недели',
    durationKz: '1-2 апта',
    features: ['Up to 5 pages', 'CMS integration', 'Contact forms'],
    featuresRu: ['До 5 страниц', 'Интеграция CMS', 'Формы обратной связи'],
    featuresKz: ['5 бетке дейін', 'CMS интеграциясы', 'Байланыс формалары'],
  },
  {
    id: 'webapp',
    name: 'Web Application',
    nameRu: 'Веб-приложение',
    nameKz: 'Веб-қосымша',
    description: 'Custom web application with backend',
    descriptionRu: 'Кастомное веб-приложение с бэкендом',
    descriptionKz: 'Backend-пен реттелетін веб-қосымша',
    priceUSD: 1000,
    priceKZT: 450000,
    duration: '3-6 weeks',
    durationRu: '3-6 недель',
    durationKz: '3-6 апта',
    features: ['Full-stack development', 'Database', 'Authentication', 'API'],
    featuresRu: ['Full-stack разработка', 'База данных', 'Авторизация', 'API'],
    featuresKz: ['Full-stack әзірлеу', 'Деректер базасы', 'Авторизация', 'API'],
  },
]

const reviews = [
  {
    name: 'Alex K.',
    role: 'Startup Founder',
    roleRu: 'Основатель стартапа',
    roleKz: 'Стартап негізін қалаушы',
    text: 'Anuar delivered an excellent landing page for our startup. Fast, professional, and great attention to detail!',
    textRu: 'Ануар сделал отличный лендинг для нашего стартапа. Быстро, профессионально и с вниманием к деталям!',
    textKz: 'Ануар біздің стартап үшін тамаша лендинг жасады. Жылдам, кәсіби және егжей-тегжейге назар аударған!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  },
  {
    name: 'Maria S.',
    role: 'Business Owner',
    roleRu: 'Владелец бизнеса',
    roleKz: 'Бизнес иесі',
    text: 'Very satisfied with the web application. Communication was smooth and the result exceeded expectations.',
    textRu: 'Очень довольна веб-приложением. Коммуникация была отличной, результат превзошёл ожидания.',
    textKz: 'Веб-қосымшаға өте ризамын. Байланыс жақсы болды, нәтиже күткеннен асып түсті.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  },
  {
    name: 'Dmitry V.',
    role: 'Product Manager',
    roleRu: 'Продакт-менеджер',
    roleKz: 'Өнім менеджері',
    text: 'Great work on our dashboard project. Clean code, modern UI, and delivered on time.',
    textRu: 'Отличная работа над нашим дашбордом. Чистый код, современный UI и сдача в срок.',
    textKz: 'Біздің дашборд жобасы бойынша тамаша жұмыс. Таза код, заманауи UI және уақытында тапсыру.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  },
  {
    name: 'Elena T.',
    role: 'Marketing Director',
    roleRu: 'Директор по маркетингу',
    roleKz: 'Маркетинг директоры',
    text: 'Exceptional quality and creativity. Our new website has significantly improved our conversion rates.',
    textRu: 'Исключительное качество и креативность. Наш новый сайт значительно улучшил конверсию.',
    textKz: 'Ерекше сапа және шығармашылық. Жаңа сайтымыз конверсияны айтарлықтай жақсартты.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  },
  {
    name: 'Michael B.',
    role: 'Tech Lead',
    roleRu: 'Технический лид',
    roleKz: 'Техникалық лид',
    text: 'Impressive technical skills and problem-solving abilities. Highly recommend for complex projects.',
    textRu: 'Впечатляющие технические навыки и умение решать проблемы. Рекомендую для сложных проектов.',
    textKz: 'Керемет техникалық дағдылар және мәселелерді шешу қабілеті. Күрделі жобалар үшін ұсынамын.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
  },
  {
    name: 'Anna P.',
    role: 'E-commerce Manager',
    roleRu: 'Менеджер e-commerce',
    roleKz: 'E-commerce менеджері',
    text: 'The online store Anuar built for us works flawlessly. Sales increased by 40% after launch!',
    textRu: 'Интернет-магазин, который создал Ануар, работает безупречно. Продажи выросли на 40%!',
    textKz: 'Ануар құрған интернет-дүкен мінсіз жұмыс істейді. Сатылым 40%-ға өсті!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
  },
  {
    name: 'Sergey M.',
    role: 'CEO',
    roleRu: 'Генеральный директор',
    roleKz: 'Бас директор',
    text: 'Professional approach from start to finish. The dashboard helps us make data-driven decisions.',
    textRu: 'Профессиональный подход от начала до конца. Дашборд помогает принимать решения на основе данных.',
    textKz: 'Басынан аяғына дейін кәсіби көзқарас. Дашборд деректерге негізделген шешімдер қабылдауға көмектеседі.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
  },
  {
    name: 'Kate L.',
    role: 'Designer',
    roleRu: 'Дизайнер',
    roleKz: 'Дизайнер',
    text: 'Amazing collaboration! Anuar perfectly translated my designs into a working product.',
    textRu: 'Потрясающее сотрудничество! Ануар идеально воплотил мои дизайны в рабочий продукт.',
    textKz: 'Керемет ынтымақтастық! Ануар менің дизайндарымды жұмыс істейтін өнімге айналдырды.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
  },
]

const technologies = [
  { name: 'React', multiplier: 1.0 },
  { name: 'Next.js', multiplier: 1.2 },
  { name: 'TypeScript', multiplier: 1.1 },
  { name: 'Node.js', multiplier: 1.15 },
  { name: 'Laravel', multiplier: 1.1 },
  { name: 'MongoDB', multiplier: 1.05 },
  { name: 'PostgreSQL', multiplier: 1.1 },
]

const navItems = [
  { id: 'home', icon: Home, label: 'Home', labelRu: 'Главная', labelKz: 'Басты' },
  { id: 'services', icon: Briefcase, label: 'Services', labelRu: 'Услуги', labelKz: 'Қызметтер' },
  { id: 'calculator', icon: Calculator, label: 'Calculator', labelRu: 'Калькулятор', labelKz: 'Калькулятор' },
  { id: 'reviews', icon: Star, label: 'Reviews', labelRu: 'Отзывы', labelKz: 'Пікірлер' },
  { id: 'contact', icon: Mail, label: 'Contact', labelRu: 'Контакты', labelKz: 'Байланыс' },
]

const languages = [
  { 
    code: 'en', 
    name: 'English',
    flag: (
      <svg viewBox="0 0 36 36" className="w-5 h-5 rounded-full overflow-hidden">
        <rect fill="#B22234" width="36" height="36"/>
        <rect fill="#FFF" y="2.769" width="36" height="2.769"/>
        <rect fill="#FFF" y="8.308" width="36" height="2.769"/>
        <rect fill="#FFF" y="13.846" width="36" height="2.769"/>
        <rect fill="#FFF" y="19.385" width="36" height="2.769"/>
        <rect fill="#FFF" y="24.923" width="36" height="2.769"/>
        <rect fill="#FFF" y="30.462" width="36" height="2.769"/>
        <rect fill="#3C3B6E" width="15.385" height="19.385"/>
      </svg>
    )
  },
  { 
    code: 'ru', 
    name: 'Русский',
    flag: (
      <svg viewBox="0 0 36 36" className="w-5 h-5 rounded-full overflow-hidden">
        <rect fill="#CE2028" width="36" height="36"/>
        <rect fill="#22408C" width="36" height="24"/>
        <rect fill="#FFF" width="36" height="12"/>
      </svg>
    )
  },
  { 
    code: 'kz', 
    name: 'Қазақша',
    flag: (
      <svg viewBox="0 0 36 36" className="w-5 h-5 rounded-full overflow-hidden">
        <rect fill="#00AFCA" width="36" height="36"/>
        <circle cx="18" cy="18" r="6" fill="#FFD700"/>
        <path fill="#FFD700" d="M18 8l1 3h3l-2.5 2 1 3-2.5-2-2.5 2 1-3L14 11h3z"/>
      </svg>
    )
  },
]

const stats = [
  { icon: Code, value: '6', label: 'Projects', labelRu: 'Проектов', labelKz: 'Жоба' },
  { icon: Clock, value: '1', label: 'Year Experience', labelRu: 'Год опыта', labelKz: 'Жыл тәжірибе' },
  { icon: Award, value: '100%', label: 'Dedication', labelRu: 'Отдача', labelKz: 'Берілгендік' },
]

const whyChooseMe = [
  { icon: Zap, title: 'Fast Delivery', titleRu: 'Быстрая доставка', titleKz: 'Жылдам жеткізу', desc: 'Quick turnaround without compromising quality', descRu: 'Быстрый результат без потери качества', descKz: 'Сапаны жоғалтпай жылдам нәтиже' },
  { icon: Shield, title: 'Quality Code', titleRu: 'Качественный код', titleKz: 'Сапалы код', desc: 'Clean, maintainable, and scalable solutions', descRu: 'Чистые, поддерживаемые и масштабируемые решения', descKz: 'Таза, қолдауға және масштабтауға болатын шешімдер' },
  { icon: Mail, title: 'Communication', titleRu: 'Коммуникация', titleKz: 'Коммуникация', desc: 'Regular updates and transparent process', descRu: 'Регулярные обновления и прозрачный процесс', descKz: 'Тұрақты жаңартулар және ашық процесс' },
]

function FreelanceNavbar({ language, setLanguage, onBackToMain }) {
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const currentLang = languages.find(l => l.code === language)

  const getLabel = (item) => {
    if (language === 'ru') return item.labelRu
    if (language === 'kz') return item.labelKz
    return item.label
  }

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false)
    if (id === 'home') {
      onBackToMain()
      return
    }
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleLanguageSelect = (langCode) => {
    setLanguage(langCode)
    setIsLangOpen(false)
  }

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        className="fixed top-4 md:top-6 left-0 right-0 z-50 hidden md:flex justify-center px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-1 bg-white/90 backdrop-blur-xl rounded-full px-2 py-2 shadow-lg border border-gray-200">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex items-center gap-2 px-3 py-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{getLabel(item)}</span>
              </motion.button>
            )
          })}
          
          <div className="w-px h-6 bg-gray-200 mx-1" />
          
          <div className="relative">
            <motion.button
              onClick={(e) => {
                e.stopPropagation()
                setIsLangOpen(!isLangOpen)
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {currentLang?.flag}
              <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
            </motion.button>

            <AnimatePresence>
              {isLangOpen && (
                <>
                  <div className="fixed inset-0 z-[100]" onClick={() => setIsLangOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 py-2 bg-white rounded-xl shadow-xl border border-gray-100 z-[110] min-w-[140px]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleLanguageSelect(lang.code)
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors ${
                          language === lang.code ? 'bg-gray-50' : ''
                        }`}
                      >
                        {lang.flag}
                        <span className="text-sm font-medium text-gray-700">{lang.name}</span>
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navbar */}
      <motion.nav
        className="fixed top-4 left-0 right-0 z-50 md:hidden px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between bg-white/90 backdrop-blur-xl rounded-2xl px-4 py-3 shadow-lg border border-gray-200">
          <span className="text-sm font-medium text-gray-900">Freelance</span>
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center"
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-gray-600" />
            ) : (
              <Menu className="w-5 h-5 text-gray-600" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="relative mt-2 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden z-50"
              >
                <div className="p-2 space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{getLabel(item)}</span>
                      </motion.button>
                    )
                  })}
                  
                  <div className="h-px bg-gray-100 my-2" />
                  
                  {/* Mobile Language Selector */}
                  <div className="px-2 py-2">
                    <div className="relative">
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation()
                          setIsLangOpen(!isLangOpen)
                        }}
                        className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors"
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-2">
                          {currentLang?.flag}
                          <span className="text-sm font-medium text-gray-700">{currentLang?.name}</span>
                        </div>
                        <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
                      </motion.button>

                      <AnimatePresence>
                        {isLangOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="relative mt-2 py-2 bg-white rounded-xl shadow-xl border border-gray-100 z-[110]"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {languages.map((lang) => (
                              <button
                                key={lang.code}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleLanguageSelect(lang.code)
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors ${
                                  language === lang.code ? 'bg-gray-50' : ''
                                }`}
                              >
                                {lang.flag}
                                <span className="text-sm font-medium text-gray-700">{lang.name}</span>
                                {language === lang.code && (
                                  <div className="ml-auto w-1.5 h-1.5 bg-green-500 rounded-full" />
                                )}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}

function FreelanceContactModal({ isOpen, onClose, language }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState('idle')

  const labels = {
    en: {
      title: "Let's work together",
      subtitle: "Tell me about your project",
      name: 'Your name',
      email: 'Email',
      phone: 'Phone',
      phoneOptional: 'optional',
      message: 'Project details',
      send: 'Send request',
      sending: 'Sending...',
      success: 'Request sent!',
      successText: "I'll review and get back to you soon",
    },
    ru: {
      title: 'Давайте работать вместе',
      subtitle: 'Расскажите о вашем проекте',
      name: 'Ваше имя',
      email: 'Email',
      phone: 'Телефон',
      phoneOptional: 'необязательно',
      message: 'Детали проекта',
      send: 'Отправить заявку',
      sending: 'Отправка...',
      success: 'Заявка отправлена!',
      successText: 'Изучу и скоро свяжусь с вами',
    },
    kz: {
      title: 'Бірге жұмыс істейік',
      subtitle: 'Жобаңыз туралы айтыңыз',
      name: 'Атыңыз',
      email: 'Email',
      phone: 'Телефон',
      phoneOptional: 'міндетті емес',
      message: 'Жоба мәліметтері',
      send: 'Өтініш жіберу',
      sending: 'Жіберілуде...',
      success: 'Өтініш жіберілді!',
      successText: 'Қарап шығамын және жақын арада хабарласамын',
    },
  }
  const l = labels[language] || labels.en

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    await new Promise(resolve => setTimeout(resolve, 1500))
    setStatus('success')
    setTimeout(() => {
      setStatus('idle')
      setFormData({ name: '', email: '', phone: '', message: '' })
      onClose()
    }, 3000)
  }

  if (!isOpen) return null

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
        className="fixed inset-0 z-[201] flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {status === 'success' ? (
            <div className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center"
              >
                <Check className="w-8 h-8 text-green-600" />
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{l.success}</h3>
              <p className="text-gray-500">{l.successText}</p>
            </div>
          ) : (
            <>
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{l.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">{l.subtitle}</p>
                  </div>
                  <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center">
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-3">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                  required
                  placeholder={l.name}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-black/5 outline-none text-sm"
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                  required
                  placeholder={l.email}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-black/5 outline-none text-sm"
                />
                <div className="relative">
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                    placeholder={l.phone}
                    className="w-full px-4 py-3 pr-24 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-black/5 outline-none text-sm"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">{l.phoneOptional}</span>
                </div>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                  required
                  rows={4}
                  placeholder={l.message}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-black/5 outline-none text-sm resize-none"
                />
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-black text-white font-medium py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {status === 'sending' ? (
                    <>
                      <motion.div
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      {l.sending}
                    </>
                  ) : (
                    <>
                      {l.send}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </>
  )
}

function AnimatedPrice({ value, currencySymbol }) {
  const formattedValue = value.toLocaleString()
  const digits = (currencySymbol + formattedValue).split('')
  
  return (
    <div className="flex items-center justify-center gap-0.5">
      {digits.map((digit, index) => (
        <motion.span
          key={`${index}-${digit}`}
          className="inline-block"
          initial={{ 
            y: -30, 
            opacity: 0,
            rotateX: -90,
            filter: 'blur(8px)',
          }}
          animate={{ 
            y: 0, 
            opacity: 1,
            rotateX: 0,
            filter: 'blur(0px)',
          }}
          transition={{ 
            type: 'spring',
            stiffness: 300,
            damping: 20,
            delay: index * 0.03,
          }}
          style={{ 
            transformOrigin: 'center bottom',
            perspective: '500px',
          }}
        >
          {digit === ',' || digit === ' ' ? (
            <span className="mx-0.5">{digit}</span>
          ) : (
            <motion.span
              className="inline-block min-w-[0.6em] text-center"
              whileHover={{ scale: 1.1, color: '#a3e635' }}
            >
              {digit}
            </motion.span>
          )}
        </motion.span>
      ))}
    </div>
  )
}

function Meteor() {
  const [meteor, setMeteor] = useState(null)

  useEffect(() => {
    const spawnMeteor = () => {
      const startX = Math.random() * 100
      const endX = startX + (Math.random() * 40 - 20)
      const startY = -5
      const endY = 110
      const duration = 1.5 + Math.random() * 0.5

      setMeteor({
        id: Date.now(),
        startX,
        startY,
        endX,
        endY,
        duration,
      })

      setTimeout(() => setMeteor(null), duration * 1000)
    }

    spawnMeteor()
    const interval = setInterval(spawnMeteor, 10000)
    return () => clearInterval(interval)
  }, [])

  if (!meteor) return null

  return (
    <motion.div
      key={meteor.id}
      className="absolute pointer-events-none"
      initial={{ 
        left: `${meteor.startX}%`, 
        top: `${meteor.startY}%`,
        opacity: 1,
      }}
      animate={{ 
        left: `${meteor.endX}%`, 
        top: `${meteor.endY}%`,
        opacity: [0, 1, 1, 0],
      }}
      transition={{ 
        duration: meteor.duration, 
        ease: 'linear',
      }}
    >
      <div className="relative">
        {/* Meteor head */}
        <div className="w-2 h-2 bg-gray-400 rounded-full shadow-lg" />
        {/* Meteor tail */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-t from-transparent via-gray-300 to-gray-400 rounded-full origin-top"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 60, opacity: [0, 0.8, 0.8, 0] }}
          transition={{ duration: meteor.duration, ease: 'linear' }}
          style={{ transform: 'translateX(-50%) rotate(180deg)' }}
        />
      </div>
    </motion.div>
  )
}

function ReviewsMarquee({ reviews, language }) {
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef(null)
  
  const getLocalizedText = (en, ru, kz) => {
    if (language === 'ru') return ru
    if (language === 'kz') return kz
    return en
  }

  // Double reviews for seamless infinite scroll
  const allReviews = [...reviews, ...reviews]

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden py-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="flex gap-6"
        animate={{
          x: [0, -((reviews.length) * 424)],
        }}
        transition={{
          x: {
            duration: isHovered ? 120 : 40, // Slower on hover (120s vs 40s)
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop',
          },
        }}
        style={{ width: 'max-content' }}
      >
        {allReviews.map((review, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0 w-[400px] bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <Quote className="w-10 h-10 text-gray-200 mb-6" />
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              "{getLocalizedText(review.text, review.textRu, review.textKz)}"
            </p>
            <div className="flex items-center gap-4">
              <img 
                src={review.avatar} 
                alt={review.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900 text-lg">{review.name}</p>
                <p className="text-gray-500">
                  {getLocalizedText(review.role, review.roleRu, review.roleKz)}
                </p>
              </div>
            </div>
            <div className="flex gap-1 mt-6">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default function FreelancePage({ onBack }) {
  const { language, setLanguage } = useLanguage()
  const calculatorRef = useRef(null)
  const calculatorInView = useInView(calculatorRef, { once: true })
  const [isContactOpen, setIsContactOpen] = useState(false)

  const [complexity, setComplexity] = useState(2)
  const [pages, setPages] = useState(3)
  const [selectedTechs, setSelectedTechs] = useState(['React'])

  const labels = {
    en: {
      title: 'Freelance Services',
      subtitle: 'Professional web development at competitive rates',
      aboutTitle: 'About Me',
      aboutText: "I'm Anuar, a full-stack developer from Kazakhstan with experience in building modern web applications. I focus on clean code, great UX, and delivering projects on time.",
      servicesTitle: 'Services & Pricing',
      from: 'from',
      duration: 'Duration',
      calculatorTitle: 'Price Calculator',
      calculatorSubtitle: 'Get an estimate for your project',
      optional: 'Optional — for estimation only',
      complexity: 'Project Complexity',
      complexityLevels: ['Simple', 'Basic', 'Medium', 'Complex', 'Enterprise'],
      pages: 'Number of Pages',
      technologies: 'Technologies',
      estimatedPrice: 'Estimated Price',
      note: 'Final price may vary based on specific requirements',
      reviewsTitle: 'What Clients Say',
      connectTitle: "Let's Connect",
      whyTitle: 'Why Work With Me',
      contactBtn: 'Contact Me',
      currency: 'USD',
      currencySymbol: '$',
    },
    ru: {
      title: 'Фриланс услуги',
      subtitle: 'Профессиональная веб-разработка по конкурентным ценам',
      aboutTitle: 'Обо мне',
      aboutText: 'Я Ануар, full-stack разработчик из Казахстана с опытом создания современных веб-приложений. Фокусируюсь на чистом коде, отличном UX и сдаче проектов в срок.',
      servicesTitle: 'Услуги и цены',
      from: 'от',
      duration: 'Срок',
      calculatorTitle: 'Калькулятор цены',
      calculatorSubtitle: 'Получите оценку стоимости вашего проекта',
      optional: 'Необязательно — только для оценки',
      complexity: 'Сложность проекта',
      complexityLevels: ['Простой', 'Базовый', 'Средний', 'Сложный', 'Enterprise'],
      pages: 'Количество страниц',
      technologies: 'Технологии',
      estimatedPrice: 'Примерная стоимость',
      note: 'Финальная цена может отличаться в зависимости от требований',
      reviewsTitle: 'Что говорят клиенты',
      connectTitle: 'Связаться',
      whyTitle: 'Почему работать со мной',
      contactBtn: 'Связаться со мной',
      currency: 'KZT',
      currencySymbol: '₸',
    },
    kz: {
      title: 'Фриланс қызметтері',
      subtitle: 'Бәсекеге қабілетті бағамен кәсіби веб-әзірлеу',
      aboutTitle: 'Мен туралы',
      aboutText: 'Мен Ануар, Қазақстандағы заманауи веб-қосымшаларды құру тәжірибесі бар full-stack әзірлеуші. Таза код, тамаша UX және жобаларды уақытында тапсыруға назар аударамын.',
      servicesTitle: 'Қызметтер мен бағалар',
      from: 'бастап',
      duration: 'Мерзім',
      calculatorTitle: 'Баға калькуляторы',
      calculatorSubtitle: 'Жобаңыздың бағасын алыңыз',
      optional: 'Міндетті емес — тек бағалау үшін',
      complexity: 'Жоба күрделілігі',
      complexityLevels: ['Қарапайым', 'Базалық', 'Орташа', 'Күрделі', 'Enterprise'],
      pages: 'Беттер саны',
      technologies: 'Технологиялар',
      estimatedPrice: 'Болжамды баға',
      note: 'Соңғы баға талаптарға байланысты өзгеруі мүмкін',
      reviewsTitle: 'Клиенттер не дейді',
      connectTitle: 'Байланысу',
      whyTitle: 'Неге менімен жұмыс істеу керек',
      contactBtn: 'Маған хабарласыңыз',
      currency: 'KZT',
      currencySymbol: '₸',
    },
  }
  const l = labels[language] || labels.en

  const getLocalizedText = (en, ru, kz) => {
    if (language === 'ru') return ru
    if (language === 'kz') return kz
    return en
  }

  const getPrice = (priceUSD, priceKZT) => {
    if (language === 'en') return priceUSD
    return priceKZT
  }

  const formatPrice = (price) => price.toLocaleString()

  const calculatePrice = () => {
    const basePrice = language === 'en' ? 100 : 45000
    const complexityMultiplier = [0.5, 0.75, 1, 1.5, 2.5][complexity - 1]
    const pagesMultiplier = Math.log2(pages + 1) * 0.5 + 0.5
    const techMultiplier = selectedTechs.reduce((acc, tech) => {
      const found = technologies.find(t => t.name === tech)
      return acc + (found ? found.multiplier - 1 : 0)
    }, 1)
    return Math.round(basePrice * complexityMultiplier * pagesMultiplier * techMultiplier)
  }

  const toggleTech = (tech) => {
    setSelectedTechs(prev => prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech])
  }

  const socials = [
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/anuar-lukpanov-101a70265/' },
    { name: 'GitHub', icon: Github, href: 'https://github.com/Mi-Yomi' },
    { name: 'Telegram', icon: Send, href: 'https://t.me/Mi_Yomi' },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-white">
      <FreelanceNavbar language={language} setLanguage={setLanguage} onBackToMain={onBack} />
      <FreelanceContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} language={language} />

      {/* Hero */}
      <div className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
          {/* Meteor */}
          <Meteor />
          
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-64 h-64 rounded-full opacity-[0.03]"
              style={{ background: 'radial-gradient(circle, #000 0%, transparent 70%)', left: `${20 + i * 15}%`, top: `${10 + (i % 3) * 20}%` }}
              animate={{ y: [0, -20, 0], x: [0, 10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
            />
          ))}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`p-${i}`}
              className="absolute w-1 h-1 bg-gray-300 rounded-full"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 2 }}
            />
          ))}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`o-${i}`}
                className="absolute rounded-full border border-gray-200"
                style={{ width: 200 + i * 100, height: 200 + i * 100, left: -(100 + i * 50), top: -(100 + i * 50) }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20 + i * 10, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute w-2 h-2 bg-gray-300 rounded-full" style={{ top: -4, left: '50%', marginLeft: -4 }} />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.5, rotate: -10 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }} className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 md:mb-8">
            <motion.div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 blur-xl" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 3, repeat: Infinity }} />
            <motion.div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl" whileHover={{ scale: 1.05, rotate: 5 }}>
              <img src={Me1} alt="Anuar" className="w-full h-full object-cover" />
            </motion.div>
          </motion.div>

          <motion.h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-gray-900 mb-4 md:mb-6" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            {l.title}
          </motion.h1>

          <motion.p className="text-base md:text-xl text-gray-500 mb-6 md:mb-10 max-w-2xl mx-auto px-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>{l.subtitle}</motion.p>

          <motion.div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mb-10 md:mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <motion.button onClick={() => setIsContactOpen(true)} className="px-6 md:px-8 py-3 md:py-4 bg-black text-white rounded-full font-medium flex items-center justify-center gap-2 text-base md:text-lg" whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }} whileTap={{ scale: 0.95 }}>
              <Mail className="w-4 h-4 md:w-5 md:h-5" />
              {l.contactBtn}
            </motion.button>
            <motion.button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="px-6 md:px-8 py-3 md:py-4 bg-gray-100 text-gray-900 rounded-full font-medium flex items-center justify-center gap-2 text-base md:text-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Briefcase className="w-4 h-4 md:w-5 md:h-5" />
              {l.servicesTitle}
            </motion.button>
          </motion.div>

          <motion.div className="grid grid-cols-3 gap-4 md:gap-8 max-w-xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div key={index} className="text-center" whileHover={{ scale: 1.05 }}>
                  <Icon className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 md:mb-3 text-gray-400" />
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-gray-500 text-xs md:text-sm">{getLocalizedText(stat.label, stat.labelRu, stat.labelKz)}</div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>

      {/* Why Work With Me */}
      <div className="py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 md:mb-12 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>{l.whyTitle}</motion.h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {whyChooseMe.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div key={index} className="text-center p-4 md:p-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <motion.div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 bg-gray-100 rounded-xl md:rounded-2xl flex items-center justify-center" whileHover={{ scale: 1.1, rotate: 5 }}>
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-gray-700" />
                  </motion.div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">{getLocalizedText(item.title, item.titleRu, item.titleKz)}</h3>
                  <p className="text-sm md:text-base text-gray-500">{getLocalizedText(item.desc, item.descRu, item.descKz)}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* About */}
      <div className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.div className="bg-white rounded-3xl p-10 md:p-12 shadow-sm" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{l.aboutTitle}</h2>
            <p className="text-xl text-gray-600 leading-relaxed">{l.aboutText}</p>
          </motion.div>
        </div>
      </div>

      {/* Services */}
      <div id="services" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2 className="text-4xl font-bold text-gray-900 mb-16 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>{l.servicesTitle}</motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div key={service.id} className="bg-white rounded-3xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ y: -8 }}>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{getLocalizedText(service.name, service.nameRu, service.nameKz)}</h3>
                <p className="text-gray-500 mb-6">{getLocalizedText(service.description, service.descriptionRu, service.descriptionKz)}</p>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {l.currencySymbol}{formatPrice(getPrice(service.priceUSD, service.priceKZT))}
                  <span className="text-base font-normal text-gray-400 ml-2">{l.from}</span>
                </div>
                <p className="text-sm text-gray-400 mb-6">{l.duration}: {getLocalizedText(service.duration, service.durationRu, service.durationKz)}</p>
                <ul className="space-y-3">
                  {getLocalizedText(service.features, service.featuresRu, service.featuresKz).map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-600">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Calculator */}
      <div id="calculator" className="py-20 px-6 bg-gray-50" ref={calculatorRef}>
        <div className="max-w-5xl mx-auto">
          <motion.div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-10 md:p-12 text-white" initial={{ opacity: 0, y: 20 }} animate={calculatorInView ? { opacity: 1, y: 0 } : {}}>
            <div className="flex items-center gap-3 mb-2">
              <Calculator className="w-8 h-8" />
              <h2 className="text-3xl font-bold">{l.calculatorTitle}</h2>
            </div>
            <p className="text-gray-400 text-lg mb-8">{l.calculatorSubtitle}</p>
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm text-gray-300 mb-10" initial={{ opacity: 0, scale: 0.9 }} animate={calculatorInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.2 }}>
              <Sparkles className="w-4 h-4" />
              {l.optional}
            </motion.div>

            <div className="mb-10">
              <label className="block text-gray-300 mb-4">{l.complexity}</label>
              <input type="range" min="1" max="5" value={complexity} onChange={(e) => setComplexity(parseInt(e.target.value))} className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer" />
              <div className="flex justify-between text-sm text-gray-400 mt-3">
                {l.complexityLevels.map((level, i) => (
                  <span key={i} className={complexity === i + 1 ? 'text-white font-medium' : ''}>{level}</span>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <label className="block text-gray-300 mb-4">{l.pages}: <span className="text-white font-medium text-xl">{pages}</span></label>
              <input type="range" min="1" max="20" value={pages} onChange={(e) => setPages(parseInt(e.target.value))} className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer" />
            </div>

            <div className="mb-10">
              <label className="block text-gray-300 mb-4">{l.technologies}</label>
              <div className="flex flex-wrap gap-3">
                {technologies.map((tech) => (
                  <button key={tech.name} onClick={() => toggleTech(tech.name)} className={`px-5 py-2.5 rounded-full font-medium transition-all ${selectedTechs.includes(tech.name) ? 'bg-white text-black' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}>
                    {tech.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-8 text-center overflow-hidden">
              <p className="text-gray-400 mb-3">{l.estimatedPrice}</p>
              <div className="text-5xl md:text-6xl font-bold" key={calculatePrice()}>
                <AnimatedPrice value={calculatePrice()} currencySymbol={l.currencySymbol} />
              </div>
              <motion.div 
                className="h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent mt-6 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
              <p className="text-sm text-gray-500 mt-4">{l.note}</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-2xl font-bold text-gray-900 mb-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {language === 'en' ? 'Payment Methods' : language === 'ru' ? 'Способы оплаты' : 'Төлем әдістері'}
          </motion.h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            {/* Kaspi */}
            <motion.a
              href="https://t.me/Mi_Yomi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 rounded-2xl font-medium transition-all"
              style={{ backgroundColor: '#F04438', color: 'white' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(240, 68, 56, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Kaspi Logo - Stylized K */}
              <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
                <rect width="32" height="32" rx="8" fill="white"/>
                <path d="M8 6h4v20H8V6z" fill="#F04438"/>
                <path d="M12 14l8-8h5l-9 9 9 11h-5l-8-10v-2z" fill="#F04438"/>
              </svg>
              <span className="font-semibold">Kaspi</span>
              <span className="text-white/80">→</span>
            </motion.a>

            {/* Freedom Bank */}
            <motion.a
              href="https://t.me/Mi_Yomi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 rounded-2xl font-medium transition-all"
              style={{ backgroundColor: '#00D26A', color: 'white' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0, 210, 106, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Freedom Bank Logo - Bird/Wing */}
              <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
                <rect width="32" height="32" rx="8" fill="white"/>
                <path d="M6 20c2-4 6-8 12-10 4-1.5 8-1 8-1s-3 2-6 4c-3 2-5 4-7 7-1.5 2.5-2 4-2 4s-3-1-5-4z" fill="#00D26A"/>
                <path d="M10 22c1.5-2.5 4-5 8-7 3-1.5 6-2 6-2s-2 2-4 4c-2 2-4 4-5 6-.8 1.5-1 2.5-1 2.5s-2.5-.5-4-3.5z" fill="#00D26A" opacity="0.7"/>
              </svg>
              <span className="font-semibold">Freedom</span>
              <span className="text-white/80">→</span>
            </motion.a>

            {/* Halyk Bank */}
            <motion.a
              href="https://t.me/Mi_Yomi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 rounded-2xl font-medium transition-all"
              style={{ backgroundColor: '#00A651', color: 'white' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0, 166, 81, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Halyk Bank Logo - Phoenix/Bird */}
              <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
                <rect width="32" height="32" rx="8" fill="white"/>
                <path d="M16 4c-1 2-1 4 0 6 1.5 3 5 5 5 5s-2 1-4 1c-3 0-5-2-6-4-1.5-3-1-6-1-6s2 1 3 2c1.5 1.5 2 3 3 2z" fill="#00A651"/>
                <path d="M16 28c1-2 1-4 0-6-1.5-3-5-5-5-5s2-1 4-1c3 0 5 2 6 4 1.5 3 1 6 1 6s-2-1-3-2c-1.5-1.5-2-3-3-2z" fill="#00A651"/>
                <circle cx="16" cy="16" r="3" fill="#00A651"/>
              </svg>
              <span className="font-semibold">Halyk</span>
              <span className="text-white/80">→</span>
            </motion.a>
          </div>
          
          <motion.p 
            className="text-center text-gray-400 text-sm mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {language === 'en' ? 'Click to discuss your project' : language === 'ru' ? 'Нажмите, чтобы обсудить проект' : 'Жобаны талқылау үшін басыңыз'}
          </motion.p>
        </div>
      </div>

      {/* Reviews */}
      <div id="reviews" className="py-20 overflow-hidden">
        <motion.h2 className="text-4xl font-bold text-gray-900 mb-8 text-center px-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>{l.reviewsTitle}</motion.h2>
        <ReviewsMarquee reviews={reviews} language={language} />
      </div>

      {/* Contact CTA */}
      <div className="py-20 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 className="text-4xl md:text-5xl font-bold mb-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>{l.connectTitle}</motion.h2>
          <motion.p className="text-gray-400 text-lg mb-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>{l.subtitle}</motion.p>
          <motion.button onClick={() => setIsContactOpen(true)} className="px-10 py-5 bg-white text-black rounded-full font-semibold text-lg flex items-center gap-3 mx-auto" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            {l.contactBtn}
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Social Links */}
      <div id="contact" className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex justify-center gap-6">
            {socials.map((social, index) => {
              const Icon = social.icon
              return (
                <motion.a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="w-16 h-16 bg-white hover:bg-black hover:text-white rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.95 }}>
                  <Icon className="w-6 h-6" />
                </motion.a>
              )
            })}
          </div>
        </div>
      </div>

      <div className="h-20" />
    </motion.div>
  )
}
