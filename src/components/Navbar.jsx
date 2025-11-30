import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Briefcase, Wrench, User, HelpCircle, Mail, ChevronDown, DollarSign, Menu, X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const navItemsConfig = [
  { id: 'home', icon: Home, labelKey: 'nav.home', href: '#home' },
  { id: 'work', icon: Briefcase, labelKey: 'nav.work', href: '#work' },
  { id: 'tools', icon: Wrench, labelKey: 'nav.tools', href: '#tools' },
  { id: 'about', icon: User, labelKey: 'nav.about', href: '#about' },
  { id: 'faq', icon: HelpCircle, labelKey: 'nav.faq', href: '#faq' },
  { id: 'contact', icon: Mail, labelKey: 'nav.contact', href: '#contact' },
  { id: 'freelance', icon: DollarSign, labelKey: 'nav.freelance', href: '#', isPage: true },
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

function NavItem({ item, isActive, onClick, t, isMobile }) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = item.icon

  if (isMobile) {
    return (
      <motion.a
        href={item.href}
        onClick={onClick}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
          isActive 
            ? 'bg-gray-100 text-black' 
            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
        }`}
        whileTap={{ scale: 0.98 }}
      >
        <Icon className="w-5 h-5" strokeWidth={1.5} />
        <span className="text-sm font-medium">{t(item.labelKey)}</span>
      </motion.a>
    )
  }

  return (
    <motion.a
      href={item.href}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex items-center gap-0 rounded-full transition-colors ${
        isActive 
          ? 'bg-gray-100 text-black' 
          : 'text-gray-400 hover:text-gray-700 hover:bg-gray-50'
      }`}
      animate={{
        paddingLeft: isHovered || isActive ? 16 : 12,
        paddingRight: isHovered || isActive ? 16 : 12,
        paddingTop: 10,
        paddingBottom: 10,
      }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      layout
    >
      <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
      <motion.span
        className="text-sm font-medium overflow-hidden whitespace-nowrap"
        initial={false}
        animate={{
          width: isHovered || isActive ? 'auto' : 0,
          marginLeft: isHovered || isActive ? 8 : 0,
          opacity: isHovered || isActive ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      >
        {t(item.labelKey)}
      </motion.span>
    </motion.a>
  )
}

function LanguageSwitcher({ isMobile, onLanguageChange }) {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  
  const currentLang = languages.find(l => l.code === language)

  const handleLanguageSelect = (langCode) => {
    setLanguage(langCode)
    setIsOpen(false)
    if (onLanguageChange) {
      onLanguageChange()
    }
  }

  return (
    <div className="relative">
      <motion.button
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
        className={`flex items-center gap-2 px-3 py-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors ${isMobile ? 'w-full justify-between' : ''}`}
        whileHover={{ scale: isMobile ? 1 : 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-2">
          {currentLang?.flag}
          {isMobile && <span className="text-sm font-medium text-gray-700">{currentLang?.name}</span>}
        </div>
        <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop - only on desktop */}
            {!isMobile && (
              <div 
                className="fixed inset-0 z-[100]" 
                onClick={() => setIsOpen(false)}
              />
            )}
            
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className={`${isMobile ? 'relative mt-2' : 'absolute right-0 mt-2'} py-2 bg-white rounded-xl shadow-xl border border-gray-100 z-[110] min-w-[160px]`}
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
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Navbar({ onFreelanceClick }) {
  const { t } = useLanguage()
  const [activeItem, setActiveItem] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [showBadge, setShowBadge] = useState(true)
  const [scrollTimeout, setScrollTimeout] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const sections = ['home', 'work', 'tools', 'about', 'faq', 'contact']
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    }

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveItem(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  const handleNavClick = (e, item) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    
    if (item.isPage && item.id === 'freelance') {
      if (onFreelanceClick) {
        onFreelanceClick()
      }
      return
    }
    
    setActiveItem(item.id)
    
    const element = document.getElementById(item.id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      setShowBadge(false)
      
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
      
      const timeout = setTimeout(() => {
        if (window.scrollY < 300) {
          setShowBadge(true)
        }
      }, 800)
      
      setScrollTimeout(timeout)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout) clearTimeout(scrollTimeout)
    }
  }, [scrollTimeout])

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <div className={`fixed w-full flex flex-col items-center z-50 transition-all duration-500 ${isScrolled ? 'top-3 md:top-4' : 'top-4 md:top-6'}`}>
      {/* Desktop Navigation */}
      <motion.nav
        className="hidden md:block"
        initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        layout
      >
        <motion.div 
          className={`flex items-center gap-1 backdrop-blur-xl rounded-full px-2 py-2 shadow-lg border transition-all duration-500 ${
            isScrolled 
              ? 'bg-white/95 border-gray-200' 
              : 'bg-white/80 border-gray-100'
          }`}
          layout
        >
          {navItemsConfig.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={activeItem === item.id}
              onClick={(e) => handleNavClick(e, item)}
              t={t}
            />
          ))}
          
          <div className="w-px h-6 bg-gray-200 mx-1" />
          
          <LanguageSwitcher />
        </motion.div>
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.nav
        className="md:hidden w-full px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className={`flex items-center justify-between backdrop-blur-xl rounded-2xl px-4 py-3 shadow-lg border transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 border-gray-200' 
            : 'bg-white/80 border-gray-100'
        }`}>
          {/* Current section indicator */}
          <div className="flex items-center gap-2">
            {(() => {
              const currentItem = navItemsConfig.find(item => item.id === activeItem)
              const Icon = currentItem?.icon || Home
              return (
                <>
                  <Icon className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">{t(currentItem?.labelKey || 'nav.home')}</span>
                </>
              )
            })()}
          </div>

          {/* Menu button */}
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
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ top: 0, left: 0, right: 0, bottom: 0 }}
              />
              
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="relative mt-2 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden z-50"
              >
                <div className="p-2 space-y-1 max-h-[70vh] overflow-y-auto">
                  {navItemsConfig.map((item) => (
                    <NavItem
                      key={item.id}
                      item={item}
                      isActive={activeItem === item.id}
                      onClick={(e) => handleNavClick(e, item)}
                      t={t}
                      isMobile
                    />
                  ))}
                  
                  <div className="h-px bg-gray-100 my-2" />
                  
                  <div className="px-2 py-2">
                    <LanguageSwitcher isMobile />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Available for Work Badge - Desktop only */}
      <AnimatePresence>
        {showBadge && !isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, scale: 0.9, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="mt-3 hidden md:block"
          >
            <div 
              className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-2xl border border-white/40 shadow-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(255,255,255,0.2)',
              }}
            >
              <div className="relative">
                <motion.div 
                  className="w-2.5 h-2.5 bg-green-500 rounded-full"
                  animate={{ 
                    boxShadow: [
                      '0 0 0 0 rgba(34, 197, 94, 0.7)',
                      '0 0 0 8px rgba(34, 197, 94, 0)',
                      '0 0 0 0 rgba(34, 197, 94, 0)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="absolute inset-0 w-2.5 h-2.5 bg-green-400 rounded-full animate-ping opacity-75" />
              </div>
              <span className="text-sm font-medium text-gray-700">{t('hero.available')}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
