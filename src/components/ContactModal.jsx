import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function ContactModal({ isOpen, onClose }) {
  const { language } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    await new Promise(resolve => setTimeout(resolve, 1500))
    setStatus('success')
    setTimeout(() => {
      setStatus('idle')
      setFormData({ name: '', email: '', phone: '', message: '' })
      onClose()
    }, 5000)
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const labels = {
    en: {
      title: "Let's talk",
      subtitle: "Fill out the form and I'll get back to you soon",
      name: 'Your name',
      email: 'Email',
      phone: 'Phone',
      phoneOptional: 'optional',
      message: 'Message',
      send: 'Send message',
      sending: 'Sending...',
      success: 'Sent!',
      successText: "Thanks for reaching out!",
      successSubtext: "I'll reply within 24 hours",
    },
    ru: {
      title: 'Давайте поговорим',
      subtitle: 'Заполните форму и я свяжусь с вами',
      name: 'Ваше имя',
      email: 'Email',
      phone: 'Телефон',
      phoneOptional: 'необязательно',
      message: 'Сообщение',
      send: 'Отправить',
      sending: 'Отправка...',
      success: 'Отправлено!',
      successText: 'Спасибо за сообщение!',
      successSubtext: 'Отвечу в течение 24 часов',
    },
    kz: {
      title: 'Сөйлесейік',
      subtitle: 'Форманы толтырыңыз, мен сізге жауап беремін',
      name: 'Атыңыз',
      email: 'Email',
      phone: 'Телефон',
      phoneOptional: 'міндетті емес',
      message: 'Хабарлама',
      send: 'Жіберу',
      sending: 'Жіберілуде...',
      success: 'Жіберілді!',
      successText: 'Хабарлама үшін рахмет!',
      successSubtext: '24 сағат ішінде жауап беремін',
    },
  }
  const l = labels[language] || labels.en

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && onClose()}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div 
                    key="success"
                    className="p-8 text-center relative overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Background animated gradient */}
                    <motion.div
                      className="absolute inset-0 opacity-30"
                      style={{
                        background: 'radial-gradient(circle at 50% 50%, #22c55e 0%, transparent 70%)',
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 2, opacity: 0.3 }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />

                    {/* Animated circles */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-green-500/20"
                        initial={{ width: 0, height: 0, opacity: 1 }}
                        animate={{ 
                          width: 200 + i * 80, 
                          height: 200 + i * 80, 
                          opacity: 0 
                        }}
                        transition={{ 
                          duration: 1.5, 
                          delay: i * 0.2,
                          ease: 'easeOut',
                          repeat: Infinity,
                          repeatDelay: 0.5
                        }}
                      />
                    ))}

                    {/* Checkmark animation */}
                    <motion.div
                      className="relative w-20 h-20 mx-auto mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        type: 'spring', 
                        stiffness: 300, 
                        damping: 15,
                        delay: 0.1 
                      }}
                    >
                      {/* Outer ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400 to-green-600"
                        initial={{ rotate: -90 }}
                        animate={{ rotate: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      />
                      
                      {/* Inner circle */}
                      <div className="absolute inset-1 rounded-full bg-white flex items-center justify-center">
                        {/* Animated checkmark */}
                        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
                          <motion.path
                            d="M5 13l4 4L19 7"
                            stroke="#22c55e"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }}
                          />
                        </svg>
                      </div>

                      {/* Sparkles */}
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-green-400 rounded-full"
                          style={{
                            left: '50%',
                            top: '50%',
                          }}
                          initial={{ 
                            x: 0, 
                            y: 0, 
                            scale: 0,
                            opacity: 1 
                          }}
                          animate={{ 
                            x: Math.cos(i * 60 * Math.PI / 180) * 50,
                            y: Math.sin(i * 60 * Math.PI / 180) * 50,
                            scale: [0, 1.5, 0],
                            opacity: [0, 1, 0]
                          }}
                          transition={{ 
                            duration: 0.6, 
                            delay: 0.5 + i * 0.05,
                            ease: 'easeOut'
                          }}
                        />
                      ))}
                    </motion.div>

                    {/* Success text */}
                    <motion.h3 
                      className="text-2xl font-bold text-gray-900 mb-2 relative"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      {l.success}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-gray-600 relative"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      {l.successText}
                    </motion.p>
                    
                    <motion.p 
                      className="text-sm text-gray-400 mt-1 relative"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      {l.successSubtext}
                    </motion.p>

                    {/* Animated emoji */}
                    <motion.div
                      className="mt-4 text-4xl relative"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        type: 'spring', 
                        stiffness: 200, 
                        delay: 0.9 
                      }}
                    >
                      🚀
                    </motion.div>

                    {/* Progress bar for auto-close */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 bg-green-500"
                      initial={{ width: '100%' }}
                      animate={{ width: '0%' }}
                      transition={{ duration: 5, ease: 'linear' }}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Header */}
                    <div className="p-6 pb-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900">{l.title}</h2>
                          <p className="text-sm text-gray-500 mt-1">{l.subtitle}</p>
                        </div>
                        <button
                          onClick={onClose}
                          className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                        >
                          <X className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-3">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder={l.name}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-black/5 outline-none transition-all text-sm"
                      />
                      
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder={l.email}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-black/5 outline-none transition-all text-sm"
                      />
                      
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder={l.phone}
                          className="w-full px-4 py-3 pr-24 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-black/5 outline-none transition-all text-sm"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                          {l.phoneOptional}
                        </span>
                      </div>
                      
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={3}
                        placeholder={l.message}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-black/5 outline-none transition-all text-sm resize-none"
                      />

                      <motion.button
                        type="submit"
                        disabled={status === 'sending'}
                        className="w-full bg-black text-white font-medium py-3.5 rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2 text-sm"
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
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
