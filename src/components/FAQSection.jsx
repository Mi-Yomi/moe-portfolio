import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

function FAQItem({ faq, index, isOpen, onToggle }) {
  return (
    <motion.div
      className="border-b border-gray-200 last:border-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
    >
      <button
        onClick={onToggle}
        className="w-full py-4 md:py-6 flex items-center justify-between text-left group"
      >
        <span className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors pr-4 text-sm md:text-base">
          {faq.question}
        </span>
        <motion.div
          className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        >
          {isOpen ? (
            <Minus className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-600" />
          ) : (
            <Plus className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-600" />
          )}
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-4 md:pb-6 text-gray-500 leading-relaxed text-sm md:text-base">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { t } = useLanguage()

  const faqs = t('faq.questions')

  return (
    <section id="faq" className="py-16 md:py-24 px-4 md:px-6 bg-white" ref={ref}>
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="inline-flex items-center gap-2 text-xs text-gray-400 uppercase tracking-widest mb-3 md:mb-4">
            <span className="w-6 md:w-8 h-px bg-gray-300" />
            {t('faq.label')}
            <span className="w-6 md:w-8 h-px bg-gray-300" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            {t('faq.title')}
          </h2>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          className="bg-gray-50 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          {Array.isArray(faqs) && faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
