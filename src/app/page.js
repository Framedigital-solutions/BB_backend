import React from "react";
import CategoryGrid from "./Components/CategoryGrid";
import FeaturedCollection from "./Components/FeaturedCollection";
import LuxuryJewelryHero from "./Components/LuxuryJewelryHero";

const page = () => {
  return (
    <div>
      <LuxuryJewelryHero />
      {/* <FeaturedCollection /> */}
      <CategoryGrid />
    </div>
  );
};

export default page;
