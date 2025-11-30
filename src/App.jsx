import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { LanguageProvider } from './context/LanguageContext'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import WorkSection from './components/WorkSection'
import ToolsSection from './components/ToolsSection'
import AboutSection from './components/AboutSection'
import FAQSection from './components/FAQSection'
import ContactSection from './components/ContactSection'
import ProjectPage from './components/ProjectPage'
import AllProjectsPage from './components/AllProjectsPage'
import FreelancePage from './components/FreelancePage'

function App() {
  const [currentPage, setCurrentPage] = useState('home') // 'home', 'all-projects', 'freelance', or 'project'
  const [selectedProject, setSelectedProject] = useState(null)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  // Detect touch device
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(hover: none)').matches
      )
    }
    checkTouch()
    window.addEventListener('resize', checkTouch)
    return () => window.removeEventListener('resize', checkTouch)
  }, [])

  const handleProjectClick = (projectId) => {
    setSelectedProject(projectId)
    setCurrentPage('project')
    window.scrollTo(0, 0)
  }

  const handleViewAllProjects = () => {
    setCurrentPage('all-projects')
    window.scrollTo(0, 0)
  }

  const handleViewFreelance = () => {
    setCurrentPage('freelance')
    window.scrollTo(0, 0)
  }

  const handleBackToHome = () => {
    setSelectedProject(null)
    setCurrentPage('home')
    window.scrollTo(0, 0)
  }

  const handleBackFromAllProjects = () => {
    setCurrentPage('home')
    window.scrollTo(0, 0)
  }

  const isOnSpecialPage = currentPage !== 'home'
  const showCustomCursor = !isOnSpecialPage && !isTouchDevice

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#FAFAFA]">
        {/* Only show custom cursor on home page and non-touch devices */}
        {showCustomCursor && <CustomCursor />}
        
        <AnimatePresence mode="wait">
          {currentPage === 'project' && selectedProject ? (
            <ProjectPage 
              key="project"
              projectId={selectedProject} 
              onBack={handleBackToHome} 
            />
          ) : currentPage === 'all-projects' ? (
            <AllProjectsPage 
              key="all-projects"
              onBack={handleBackFromAllProjects}
              onProjectClick={handleProjectClick}
            />
          ) : currentPage === 'freelance' ? (
            <FreelancePage 
              key="freelance"
              onBack={handleBackToHome}
            />
          ) : (
            <div key="home">
              <Navbar onFreelanceClick={handleViewFreelance} />
              <main>
                <HeroSection />
                <WorkSection 
                  onProjectClick={handleProjectClick} 
                  onViewAll={handleViewAllProjects}
                />
                <ToolsSection />
                <AboutSection />
                <FAQSection />
                <ContactSection />
              </main>
            </div>
          )}
        </AnimatePresence>
      </div>
    </LanguageProvider>
  )
}

export default App
