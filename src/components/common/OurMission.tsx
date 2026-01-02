/**
 * @description RE useable mission component
 */

import { Sparkles, Compass, Handshake, Zap } from "lucide-react";

const OurMission = () => {
  return (
    <div className="bg-blue text-white py-16">
      <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row gap-12 items-start md:items-stretch">
        {/* Header */}
        <div className="w-full md:flex-[1] flex items-center justify-center text-center md:text-left">
          <h3
            className="text-3xl md:text-4xl font-semibold leading-tight"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            Our Mission
          </h3>
        </div>

        {/* Content */}
        <div className="md:flex-[2] text-center md:text-left space-y-8">
          <p
            className="text-base md:text-lg leading-relaxed text-white/90"
            data-aos="zoom-up"
            data-aos-delay="400"
          >
            Our mission is to empower tech beginners to gain hands-on experience
            through collaborative projects. We provide a platform where learning
            goes beyond tutorials and exercises—where aspiring developers,
            designers, and tech creators can work together on real-world
            projects. We are committed to:
          </p>

          <ul className="space-y-6 text-sm md:text-base text-white/70">
            <li
              className="flex flex-col md:flex-row items-center md:items-start gap-3"
              data-aos="fade-up"
            >
              <Zap size={18} />
              <span>
                <strong className="text-white">Building confidence:</strong>{" "}
                Helping beginners apply their skills in meaningful ways.
              </span>
            </li>

            <li
              className="flex flex-col md:flex-row items-center md:items-start gap-3"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <Handshake size={18} />
              <span>
                <strong className="text-white">Fostering collaboration:</strong>{" "}
                Connecting talents from diverse backgrounds to work as a team.
              </span>
            </li>

            <li
              className="flex flex-col md:flex-row items-center md:items-start gap-3"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <Compass size={18} />
              <span>
                <strong className="text-white">Providing mentorship:</strong>{" "}
                Offering guidance and insights from experienced tech
                professionals.
              </span>
            </li>

            <li
              className="flex flex-col md:flex-row items-center md:items-start gap-3"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <Sparkles size={18} />
              <span>
                <strong className="text-white">Creating opportunities:</strong>{" "}
                Helping users build portfolios that open doors to internships,
                jobs, and entrepreneurial ventures.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OurMission;
