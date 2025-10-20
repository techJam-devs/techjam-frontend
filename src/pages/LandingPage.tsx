/**
 * @description Landing page of our application
 */

import About from "../components/landingPage/about";
import Hero from "../components/landingPage/Hero";
import SubHero from "../components/landingPage/subHero";
import Benefit from "../components/landingPage/benefits";
import HowItWorks from "../components/landingPage/howItWorks";
import Testimonials from "../components/landingPage/testimonials";
import Userstories from "../components/landingPage/userstories";
import GetStarted from "../components/landingPage/getStarted";
import Newsletter from "../components/landingPage/newsletter";

const LandingPage = () => {
  return (
    <>
      <Hero />
      <SubHero />
      <About />
      <Benefit />
      <HowItWorks />
      <Userstories />
      <Testimonials />
      <GetStarted />
      <Newsletter />
    </>
  );
};

export default LandingPage;
