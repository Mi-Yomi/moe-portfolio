import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Linkedin, Github, Send } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import ContactModal from './ContactModal'

const socials = [
  { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/anuar-lukpanov-101a70265/' },
  { name: 'Github', icon: Github, href: 'https://github.com/Mi-Yomi' },
  { name: 'Telegram', icon: Send, href: 'https://t.me/Mi_Yomi' },
]

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { t } = useLanguage()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <section id="contact" className="py-16 md:py-24 px-4 md:px-6 bg-gray-50" ref={ref}>
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="mb-8 md:mb-12"
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="inline-flex items-center gap-2 text-xs text-gray-400 uppercase tracking-widest mb-3 md:mb-4">
              <span className="w-6 md:w-8 h-px bg-gray-300" />
              {t('contact.label')}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {t('contact.title1')}
              <br className="hidden md:block" />
              <span className="md:hidden"> </span>
              {t('contact.title2')}
            </h2>
          </motion.div>

          {/* Contact Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {socials.map((social, index) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-xl md:rounded-2xl border border-gray-200 p-4 md:p-6 hover:border-gray-300 hover:shadow-lg transition-all"
                  initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                  animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1, 
                    ease: [0.23, 1, 0.32, 1] 
                  }}
                  whileHover={{ y: -4 }}
                >
                  <h3 className="font-medium text-gray-900 mb-6 md:mb-10 text-sm md:text-base">{social.name}</h3>
                  <div className="flex justify-end">
                    <motion.div 
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 group-hover:bg-black group-hover:text-white flex items-center justify-center transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
                    </motion.div>
                  </div>
                </motion.a>
              )
            })}

            {/* Get in Touch Card - Opens Modal */}
            <motion.button
              onClick={() => setIsModalOpen(true)}
              className="group bg-black rounded-xl md:rounded-2xl p-4 md:p-6 text-white hover:bg-gray-900 transition-colors text-left col-span-2 lg:col-span-1"
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <h3 className="font-medium mb-6 md:mb-10 text-sm md:text-base">{t('contact.getInTouch')}</h3>
              <div className="flex justify-end">
                <motion.div 
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center"
                  whileHover={{ rotate: 45 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2} />
                </motion.div>
              </div>
            </motion.button>
          </div>

          {/* Footer */}
          <motion.div
            className="mt-12 md:mt-20 pt-6 md:pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="text-gray-400 text-xs md:text-sm text-center">
              © {new Date().getFullYear()} Anuar Lukpanov. {t('contact.footer')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
