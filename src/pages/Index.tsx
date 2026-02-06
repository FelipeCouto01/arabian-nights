import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StatsBar from '@/components/StatsBar';
import FeaturesSection from '@/components/FeaturesSection';
import ScienceSection from '@/components/ScienceSection';
import ROICalculator from '@/components/ROICalculator';
import PricingSection from '@/components/PricingSection';
import DigitalTwinSimulation from '@/components/DigitalTwinSimulation';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <FeaturesSection />
      <ScienceSection />
      <ROICalculator />
      <PricingSection />
      <DigitalTwinSimulation />
      <Footer />
    </div>
  );
};

export default Index;
