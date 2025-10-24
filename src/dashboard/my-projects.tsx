/**
 *@description  Displays projects page.  using search params to filter project status for display
 */

import { useSearchParams } from "react-router-dom";
import MyProjectCard from "./components/MyProjectCard";
import { Cloud } from "lucide-react";

const MyProjects = () => {
  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get("status");

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
      status: "cancelled" as const,
      title: "Banking App",
      description:
        "Develop a mobile banking app with account overview, fund transfer, and notifications.",
      duration: "10/Apr/25 - 30/Jun/25",
      techStack: ["React Native", "Node.js", "PostgreSQL"],
    },
  ];

  //filter base on the status params

  const filterProjects = statusParam
    ? projects.filter(
        (p) => p.status.toLocaleLowerCase() === statusParam.toLocaleLowerCase(),
      )
    : projects;

  return (
    <div className="flex flex-col justify-center p-6">
      {filterProjects.length > 0 ? (
        <div className="grid gap-4">
          {filterProjects.map((project, idx) => (
            <MyProjectCard key={idx} {...project} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-3 pt-10">
          <div className="w-20 h-20 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
            <Cloud className="w-8 h-8 text-gray-400" />
          </div>

          <p className="text-sm font-medium text-gray-500">
            No {statusParam} projects found
          </p>

          {/* Modal trigger button */}
          {/* <CreateProjectModal /> */}
        </div>
      )}
    </div>
  );
};

export default MyProjects;
