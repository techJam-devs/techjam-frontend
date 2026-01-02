/**
 * @description This is a component for empowerment section used in about page
 */

import AboutImg from "../../assets/about-img.webp";
import { Users, ClipboardCheck } from "lucide-react";

const AboutEmpowerment = () => {
  return (
    <div className="container mx-auto mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 overflow-hidden md:min-h-[420px]">
        {/* Text side */}
        <div className="p-6 flex flex-col justify-center space-y-6">
          <h3
            className="text-4xl w-full md:max-w-md font-semibold leading-snug text-center md:text-start"
            data-aos="fade-up"
          >
            Empowering Tech{" "}
            <span className="text-blue" data-aos="fade-up" data-aos-delay="300">
              Beginners
            </span>{" "}
            To Build The Future
          </h3>

          <p
            className="text-sm leading-relaxed text-gray-700 text-center md:text-start"
            data-aos="fade-right"
          >
            At TechJam we believe that the best way to learn is by doing. The
            world of technology is evolving at lightning speed and while there
            is no shortage of tutorials, courses and online resources, many
            aspiring tech enthusiasts struggle to bridge the gap between theory
            and real-world experience. That is where we come in.
          </p>
        </div>

        {/* Image side */}
        <div className="h-full p-4" data-aos="fade-up" data-aos-delay="200">
          <img
            src={AboutImg}
            alt="About TechJam"
            className="w-full h-full object-contain md:object-cover"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-10 pt-4 justify-center md:justify-start mt-4 md:mt-0">
        {/* Stat 1 */}
        <div
          className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-2 font-semibold text-sm"
          data-aos="fade-up"
        >
          <Users size={24} className="text-blue" />
          <div className="mt-1 md:mt-0 flex flex-col md:flex-row items-center gap-2">
            <span className="block">10K+</span>
            <span className="block font-normal text-xs md:text-sm">
              Active Learners
            </span>
          </div>
        </div>

        {/* Stat 2 */}
        <div
          className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-2 font-semibold text-sm"
          data-aos="fade-down"
          data-aos-delay="200"
        >
          <ClipboardCheck size={24} className="text-blue" />
          <div className="mt-1 md:mt-0 flex  flex-col md:flex-row items-center gap-2">
            <span className="block">500+</span>
            <span className="block font-normal text-xs md:text-sm">
              Projects Completed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutEmpowerment;
