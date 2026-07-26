import { MotionConfig } from 'framer-motion'
import Hero from './components/Hero.jsx'
import AboutSection from './components/AboutSection.jsx'
import ValueProposition from './components/ValueProposition.jsx'
import WhoThisIsFor from './components/WhoThisIsFor.jsx'
import ExclusiveOpportunity from './components/ExclusiveOpportunity.jsx'
import Speakers from './components/Speakers.jsx'
import TrustpilotReviews from './components/TrustpilotReviews.jsx'
import InquirySection from './components/InquirySection.jsx'
import Footer from './components/Footer.jsx'
import ScrollProgressBar from './components/ScrollProgressBar.jsx'
                 
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <main>
        <ScrollProgressBar />
        <Hero />
        <ValueProposition />
        <WhoThisIsFor />
        <ExclusiveOpportunity />
        <Speakers />
        <AboutSection />
        <TrustpilotReviews />
        <InquirySection />
        {/* <Footer /> */}
      </main>
    </MotionConfig>
  )
}

