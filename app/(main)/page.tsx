import Hero from '@/components/homepage/Hero';
import SponsorSection from '@/components/homepage/SponsorSection';
import Footer from '@/components/Footer';
import CommunitySection from '@/components/homepage/CommunitySection';
import AIChatSection from '@/components/homepage/AIChatSection';
import CTASection from '@/components/homepage/CTASection';

export default function App() {
  return (
    <>
      <Hero />
      <CommunitySection />
      <SponsorSection />
      <AIChatSection />
      <CTASection />
      <Footer />
    </>
  );
}
