/**
 * @description This is the Our Team component used in the About page
 */
import Marcus from "../../assets/marcus.webp";
import Otega from "../../assets/ortega.webp";
import Deborah from "../../assets/deb.webp";
import Thelma from "../../assets/thelma.webp";

const OurTeam = () => {
  const images = [
    {
      src: Marcus,
      radius: "rounded-full rounded-br-none",
      color: "bg-yellow-400",
    },
    {
      src: Deborah,
      radius: "rounded-full rounded-bl-none",
      color: "bg-gray-400",
    },
    {
      src: Otega,
      radius: "rounded-full rounded-tr-none",
      color: "bg-pink-400",
    },

    {
      src: Thelma,
      radius: "rounded-full rounded-tl-none",
      color: "bg-purple-400",
    },
  ];

  const teamMembers = [
    {
      name: "Marcus",
      role: "Our leading UI/UX designer delivering good and catchy designs across projects.",
      border: "border-r-red-600 border-b-pink-400",
      delay: 600,
    },
    {
      name: "Deborah",
      role: "Project manager, keeping the team in check with years of expertise handling projects and delivering good results.",
      border: "border-l-pink-400",
      delay: 300,
    },
    {
      name: "Otega Otite",
      role: "Our backend lead, building security and database for applications.",
      border: "border-t-red-400 border-r-yellow-400",
      delay: 500,
    },

    {
      name: "Thelma",
      role: "Project manager, keeping the team in check with years of expertise handling projects and delivering good results.",
      border: "border-t-blue border-l-yellow-400",
      delay: 100,
    },
  ];

  return (
    <section className="py-24">
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
      <div className="container mx-auto mt-8 md:mt-12 p-2 md:p-4 flex flex-col-reverse md:flex-row gap-6 md:gap-10">
        {/* ==== left: Image div ======= */}
        <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-3 md:gap-4 p-4 h-[360px] md:h-[420px]">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`w-full h-full overflow-hidden flex items-center justify-center ${img.radius} ${img.color}`}
            >
              <img
                src={img.src}
                alt={`Team ${idx + 1}`}
                className="max-h-48 max-w-48 object-contain"
              />
            </div>
          ))}
        </div>

        {/* ====== right side ========= */}
        <div className="p-2 flex-1">
          <p
            className="text-sm md:text-lg max-w-md mx-auto md:mx-0 text-center md:text-start mb-6"
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
                    className="text-center md:text-start text-xs md:text-sm text-gray-600 tracking-wider"
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
    </section>
  );
};

export default OurTeam;
