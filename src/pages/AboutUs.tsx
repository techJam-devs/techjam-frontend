/**
 * @description This is the about page
 */

import AboutEmpowerment from "../components/common/AboutEmpowerment";
import OurMission from "../components/common/OurMission";
import OurVision from "../components/common/OurVision";
import Collaboration from "../components/common/Collaborate";
import OurTeam from "../components/common/OurTeam";

const AboutUs = () => {
  return (
    <section className="mt-16 py-10">
      {/* ===== Header text ===== */}
      <h2
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 leading-tight tracking-wide"
        data-aos="fade-up"
      >
        About Us
      </h2>

      {/* ===== Empowerment===== */}
      <AboutEmpowerment />
      {/* ======== Our Mission ======== */}
      <OurMission />
      {/** ===== Vision =====*/}
      <OurVision />

      {/** ==== global collaboration ==== */}
      <Collaboration />

      {/** ==== Our team ==== */}
      <OurTeam />
    </section>
  );
};

export default AboutUs;
