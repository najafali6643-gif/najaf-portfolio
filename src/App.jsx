import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Hero from './components/hero/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Work from './components/Work.jsx'
import Services from './components/Services.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import ParticleBackground from './components/ui/ParticleBackground.jsx'
import CustomCursor from './components/ui/CustomCursor.jsx'
import SmoothScroll from './components/ui/SmoothScroll.jsx'
import ContactPage from './pages/ContactPage.jsx'
import { PageTransitionProvider } from './Context/PageTransitionContext.jsx'
import { LoaderProvider } from './Context/LoaderContext.jsx'

function Home() {
  return (
    <div id="top">
      <ParticleBackground fixed />
      <CustomCursor />

      <Navbar />

      <div className="relative z-10">
        <main>
          <Hero />
          <About />
          <Skills />
          <Work />
          <Services />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}

function App() {
  return (
    <LoaderProvider>
      <PageTransitionProvider>
        <SmoothScroll />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </PageTransitionProvider>
    </LoaderProvider>
  );
}

export default App
