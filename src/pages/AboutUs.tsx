/**
 * @description About component
 */

import AboutImg from "../assets/about-img.svg";

const AboutUs = () => {
  return (
    <div className="mt-[4rem] px-4 py-10 h-screen container mx-auto">
      {/** ======= Header text ========*/}
      <h2 className="text-5xl text-center text-bold mb-20"> About Us</h2>

      {/** ==== Middle content ============== */}
      <div className="grid md:grid-cols-2 gap-4 mt-10">
        <div className="p-4 space-y-4">
          <h3 className="text-4xl max-w-md leading-0">
            Empowering Tech <span className="text-blue">Beginners</span> To
            build The Future
          </h3>
          <p className="text-sm">
            At TechJam we believe that the best way to learn is by doing. The
            world of technology is evolving at lightning speed and while there
            is no shortage of tutorials, courses and online resources, many
            aspiring tech enthusiasts struggle to bridge the gap between theory
            and real-world experience. That is where we come in.
          </p>
        </div>
        <div>
          <img src={AboutImg} alt="about image" />
        </div>
      </div>

      {/** ======= Floating widget ============= */}
    </div>
  );
};

export default AboutUs;
