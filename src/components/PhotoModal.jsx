import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Clock, Heart, MessageCircle, Send, Bookmark } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import Me1 from '../assets/Me1.jpg'
import Me2 from '../assets/Me2.jpg'
import Me3 from '../assets/me3.jpg'

const photos = [
  {
    src: Me1,
    location: 'Almaty, Kazakhstan',
    locationRu: 'Алматы, Казахстан',
    locationKz: 'Алматы, Қазақстан',
    place: 'Home Office',
    placeRu: 'Домашний офис',
    placeKz: 'Үй кеңсесі',
    date: '2025',
    time: '14:30',
    likes: 127,
    comments: 12,
  },
  {
    src: Me2,
    location: 'Almaty, Kazakhstan',
    locationRu: 'Алматы, Казахстан',
    locationKz: 'Алматы, Қазақстан',
    place: 'Coffee Shop',
    placeRu: 'Кофейня',
    placeKz: 'Кофехана',
    date: '2024',
    time: '11:15',
    likes: 234,
    comments: 28,
  },
  {
    src: Me3,
    location: 'Almaty, Kazakhstan',
    locationRu: 'Алматы, Казахстан',
    locationKz: 'Алматы, Қазақстан',
    place: 'City Walk',
    placeRu: 'Прогулка по городу',
    placeKz: 'Қала серуені',
    date: '2024',
    time: '17:45',
    likes: 189,
    comments: 19,
  },
]

export default function PhotoModal({ isOpen, onClose, initialIndex = 0 }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [direction, setDirection] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const { language } = useLanguage()

  const photo = photos[currentIndex]

  const getLocalized = (en, ru, kz) => {
    if (language === 'ru') return ru
    if (language === 'kz') return kz
    return en
  }

  const nextPhoto = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % photos.length)
  }

  const prevPhoto = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && onClose()}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Instagram-style Header */}
              <div className="flex items-center justify-between p-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-[2px]">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white p-[2px]">
                      <img src={Me1} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-sm">anuar.lukpanov</span>
                      <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span>{getLocalized(photo.place, photo.placeRu, photo.placeKz)}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Photo Slider */}
              <div className="relative aspect-square bg-gray-100 overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.img
                    key={currentIndex}
                    src={photo.src}
                    alt={`Photo ${currentIndex + 1}`}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                    className="absolute inset-0 w-full h-full object-cover"
                    onDoubleClick={() => setIsLiked(true)}
                  />
                </AnimatePresence>

                {/* Navigation Arrows */}
                {photos.length > 1 && (
                  <>
                    <button
                      onClick={prevPhoto}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <button
                      onClick={nextPhoto}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                  </>
                )}

                {/* Dots Indicator */}
                {photos.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {photos.map((_, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => {
                          setDirection(idx > currentIndex ? 1 : -1)
                          setCurrentIndex(idx)
                        }}
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${
                          idx === currentIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                        whileHover={{ scale: 1.2 }}
                      />
                    ))}
                  </div>
                )}

                {/* Like Animation */}
                <AnimatePresence>
                  {isLiked && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      onAnimationComplete={() => setTimeout(() => {}, 500)}
                    >
                      <Heart className="w-24 h-24 text-white fill-white drop-shadow-lg" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Actions */}
              <div className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-4">
                    <motion.button
                      onClick={() => setIsLiked(!isLiked)}
                      whileTap={{ scale: 0.8 }}
                    >
                      <Heart className={`w-6 h-6 transition-colors ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-800'}`} />
                    </motion.button>
                    <MessageCircle className="w-6 h-6 text-gray-800" />
                    <Send className="w-6 h-6 text-gray-800 -rotate-12" />
                  </div>
                  <motion.button
                    onClick={() => setIsSaved(!isSaved)}
                    whileTap={{ scale: 0.8 }}
                  >
                    <Bookmark className={`w-6 h-6 transition-colors ${isSaved ? 'text-gray-800 fill-gray-800' : 'text-gray-800'}`} />
                  </motion.button>
                </div>

                {/* Likes */}
                <div className="font-semibold text-sm mb-1">
                  {(photo.likes + (isLiked ? 1 : 0)).toLocaleString()} {language === 'ru' ? 'отметок «Нравится»' : language === 'kz' ? 'ұнатты' : 'likes'}
                </div>

                {/* Location & Time Info */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 mt-2">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{getLocalized(photo.location, photo.locationRu, photo.locationKz)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{photo.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{photo.time}</span>
                  </div>
                </div>

                {/* Comments count */}
                <button className="text-xs text-gray-400 mt-2">
                  {language === 'ru' 
                    ? `Посмотреть все комментарии (${photo.comments})` 
                    : language === 'kz'
                    ? `Барлық пікірлерді көру (${photo.comments})`
                    : `View all ${photo.comments} comments`
                  }
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

