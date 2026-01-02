/**
 * @description How it works section — steps left, image right
 */

import { UserPlus, FolderPlus, Users, Rocket } from "lucide-react";

const HowItWorks = () => {
  const content = [
    { text: "Create an account", icon: <UserPlus size={24} /> },
    { text: "Join or create a project", icon: <FolderPlus size={24} /> },
    { text: "Collaborate and build together", icon: <Users size={24} /> },
    { text: "Grow your portfolio and skills", icon: <Rocket size={24} /> },
  ];

  return (
    <section
      style={{
        background:
          "linear-gradient(to bottom, #fff 0%, #ffff 20%, #0908c3 100%)",
      }}
      className="py-20 bg-gradient-to-b from-gray-50  via-bg-gray-900  to-blue"
    >
      <h2
        className="text-2xl md:text-3xl font-semibold mb-14 md:mb-20 text-center"
        data-aos="zoom-in"
      >
        How does it work?
      </h2>
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 px-6">
        {/* Left — Steps */}
        <div className="w-full md:flex-1 space-y-8" data-aos="fade-up">
          <div className="flex flex-col gap-4">
            {content.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-5 bg-white rounded-xl py-2 px-4 hover:shadow-2xl transition-all duration-300"
              >
                <p className="text-base md:text-md font-medium">{item.text}</p>
                <div className="p-3 flex items-center justify-center shrink-0 text-blue">
                  {item.icon}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Image */}
        <div
          className="flex-1 flex justify-center"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <img
            src="/Frame.svg"
            alt="How it works illustration"
            className="w-full max-w-md rounded-xl object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
