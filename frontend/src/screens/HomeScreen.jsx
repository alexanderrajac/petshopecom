import React from "react";
import StartupHero from "../components/home/StartupHero";
import HomeCatergories from "../components/home/HomeCatergories";
import PetMatcherWidget from "../components/home/PetMatcherWidget";
import HomeAdoptionSpotlight from "../components/home/HomeAdoptionSpotlight";
import HomePopular from "../components/home/HomePopular";
import AutoshipBanner from "../components/home/AutoshipBanner";
import HomeSales from "../components/home/HomeSales";
import StartupTrustSection from "../components/home/StartupTrustSection";
import PetizenClubNewsletter from "../components/home/PetizenClubNewsletter";

const HomeScreen = () => {
  return (
    <div className="startup-home-wrapper">
      <StartupHero />
      <HomeCatergories />
      <PetMatcherWidget />
      <HomeAdoptionSpotlight />
      <HomePopular />
      <AutoshipBanner />
      <HomeSales />
      <StartupTrustSection />
      <PetizenClubNewsletter />
    </div>
  );
};

export default HomeScreen;
