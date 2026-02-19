/**
 * @description This is the Our Team component used in the About page
 */

import { images, teamMembers } from "../../data/ourTeam";

const OurTeam = () => {
  return (
    <section className="py-24 bg-blue-200">
      <h1 className="mb-6 text-center text-3xl font-bold" data-aos="fade-up">
        Our Team
      </h1>
      <p
        className="text-center text-lg px-10 leading-light text-gray-600 tracking-wider"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        Explore Our Success Stories and Innovative Projects
      </p>

      {/* ===== content ======= */}
      <div className="container mx-auto mt-8 md:mt-12 p-2 md:p-4">
        <div className="flex flex-col-reverse md:flex-row justify-center items-center gap-6 md:gap-10 max-w-6xl mx-auto">
          {/* ==== left: Image div ======= */}
          <div className="grid grid-cols-2 gap-2 md:gap-4 p-2 md:p-4">
            {images.map((img, idx) => (
              <div
                key={idx}
                className={`aspect-square w-[120px] sm:w-[140px] md:w-[160px] lg:w-[180px] overflow-hidden flex items-center justify-center ${img.radius} ${img.color}`}
              >
                <img
                  src={img.src}
                  alt={`Team ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          {/* ====== right side ========= */}
          <div className="max-w-md p-2 text-center md:text-left">
            <p
              className="text-sm md:text-md max-w-md mx-auto md:mx-0 text-center md:text-start mb-6"
              data-aos="zoom-out"
            >
              On the best approach to solve a problem, Makeshift helps you hone
              your craft by tapping into our member's experience.
            </p>

            {/* =========== names ===== */}
            <div className="max-w-md mx-auto md:mx-0">
              <div className="grid grid-cols-2 gap-0">
                {teamMembers.map((member, idx) => (
                  <div
                    key={idx}
                    className={`p-4 flex flex-col justify-between h-full border-1 border-transparent ${member.border}`}
                  >
                    <h3
                      className="font-semibold text-lg mb-4 text-center md:text-start"
                      data-aos="zoom-in"
                    >
                      {member.name}
                    </h3>
                    <p
                      className="text-center md:text-start text-xs text-gray-600 tracking-wider"
                      data-aos="fade-up"
                      data-aos-delay={member.delay}
                    >
                      {member.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
