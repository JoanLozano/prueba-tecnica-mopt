import FooterSection from "./components/FooterSection";
import HeroSection from "./components/HeroSection";
import PeopleSection from "./components/PeopleSection";
import TestimonialSection from "./components/TestimonialSection";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import ScrollProgress from "./components/ScrollProgress";

export default function Home() {
  return (
    <>
      <Navbar />
      <ScrollProgress />
      <ScrollToTop />
      <main className="flex min-h-screen flex-col items-center justify-between pt-16">
        <HeroSection />
        <PeopleSection />
        <TestimonialSection />
        <FooterSection />
      </main>
    </>
  );
}