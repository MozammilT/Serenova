import React from "react";
import Hero from "../components/Hero";
import Featuredest from "../components/FeatureDest";
import ExclusiveOffers from "../components/ExclusiveOffers";
import Testimonials from "../components/Testimonials";
import NewsLetter from "../components/NewsLetter";

function Homepage() {
  return (
    <>
      <Hero />
      <Featuredest />
      <ExclusiveOffers />
      <Testimonials />
      <NewsLetter />
    </>
  );
}

export default Homepage;
