/**
 * @description Tech support - Circular layout of tech tools
 */

import { useEffect, useState } from "react";
import {
  FaGoogleDrive,
  FaGithub,
  FaDiscord,
  FaSlack,
  FaDropbox,
} from "react-icons/fa";

import {
  SiFigma,
  SiNotion,
  SiJira,
  SiAdobephotoshop,
  SiAdobexd,
  SiAdobeillustrator,
} from "react-icons/si";

import { VscCode } from "react-icons/vsc"; // VS Code icon

const techIcons = [
  { icon: <FaGoogleDrive size={36} color="#4285F4" />, name: "Google Drive" },
  { icon: <SiFigma size={36} color="#F24E1E" />, name: "Figma" },
  { icon: <FaDiscord size={36} color="#5865F2" />, name: "Discord" },
  { icon: <FaGithub size={36} color="#000000" />, name: "GitHub" },
  { icon: <SiNotion size={36} color="#000000" />, name: "Notion" },
  { icon: <FaSlack size={36} color="#4A154B" />, name: "Slack" },
  { icon: <SiJira size={36} color="#0052CC" />, name: "Jira" },
  { icon: <SiAdobephotoshop size={36} color="#31A8FF" />, name: "Photoshop" },
  { icon: <SiAdobexd size={36} color="#FF61F6" />, name: "Adobe XD" },
  {
    icon: <SiAdobeillustrator size={36} color="#FF9A00" />,
    name: "Illustrator",
  },
  { icon: <VscCode size={36} color="#007ACC" />, name: "VS Code" },
  { icon: <FaDropbox size={36} color="#0061FF" />, name: "Dropbox" },
];

const TechSupport = () => {
  const getRadius = () =>
    typeof window !== "undefined" && window.innerWidth < 640 ? 120 : 250;

  const [radius, setRadius] = useState(getRadius);

  useEffect(() => {
    const handleResize = () => {
      setRadius(getRadius());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-2xl md:text-4xl font-bold mb-20" data-aos="fade-up">
          Tech and Technology we support
        </h3>

        <div
          className="
            relative
            w-[320px] h-[320px]
            sm:w-[420px] sm:h-[420px]
            lg:w-[600px] lg:h-[600px]
            mx-auto
          "
        >
          {techIcons.map((tech, idx) => {
            const angle = (idx / techIcons.length) * 2 * Math.PI;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            return (
              <div
                key={idx}
                className="
                  absolute
                  top-1/2 left-1/2
                  w-14 h-14 md:w-16 md:h-16
                  bg-white rounded-full
                  flex items-center justify-center
                  shadow-md
                  transition-transform duration-300
                  hover:scale-110
                  cursor-pointer
                "
                title={tech.name}
                style={{
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                }}
                data-aos="zoom-in"
                data-aos-delay={idx * 100}
              >
                {tech.icon}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechSupport;
