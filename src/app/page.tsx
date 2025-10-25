import HeroSection from "./components/HeroSection";
import PeopleSection from "./components/PeopleSection";
import TestimonialSection from "./components/TestimonialSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <HeroSection />
      <PeopleSection />
      <TestimonialSection />
    </main>
  );
}