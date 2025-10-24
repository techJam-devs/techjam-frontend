/**
 * @description This is the home page of our dashboard and this serve as the page for our Best Match page
 */

import BestMatchCard from "./components/BestMatchCard";
import { Cloud } from "lucide-react";

const projects = [
  {
    time: "09:15am",
    status: "in-progress" as const,
    title: "E-commerce Website",
    description:
      "Build an online store with payment integration, product listings, and admin dashboard.",
    duration: "01/Mar/25 - 30/Mar/25",
    techStack: ["Next.js", "TypeScript", "MongoDB", "TailwindCSS"],
  },
  {
    time: "01:40pm",
    status: "completed" as const,
    title: "Portfolio Website",
    description:
      "Design and develop a personal portfolio showcasing projects, skills, and blog posts.",
    duration: "15/Jan/25 - 01/Feb/25",
    techStack: ["React", "CSS", "Framer Motion"],
  },
  {
    time: "05:30pm",
    status: "pending" as const,
    title: "Banking App",
    description:
      "Develop a mobile banking app with account overview, fund transfer, and notifications.",
    duration: "10/Apr/25 - 30/Jun/25",
    techStack: ["React Native", "Node.js", "PostgreSQL"],
  },
];

const Index = () => {
  return (
    <div className="p-6 overflow-y-auto">
      {projects.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((project, idx) => (
            <BestMatchCard key={idx} {...project} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-3 pt-10">
          <div className="w-20 h-20 flex items-center justify-center rounded-lg border-2 border-dashed border-border-color">
            <Cloud className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-sm font-medium text-gray-500">
            {" "}
            There is no available projects to join
          </p>
        </div>
      )}
    </div>
  );
};

export default Index;
