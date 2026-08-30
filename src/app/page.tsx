import HeroSection from "@/components/home/HeroSection";
import LatestCollection from "@/components/home/LatestCollection";
import FrontEndLayout from "@/components/layout/FrontEndLayout";

export default function Home() {
  return (
    <FrontEndLayout>
      <HeroSection />
      <LatestCollection />
    </FrontEndLayout>
  );
}
