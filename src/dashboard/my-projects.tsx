import { useSearchParams } from "react-router-dom";
import { Cloud, Crown, UserCheck, Clock } from "lucide-react";
import { getInitials } from "../utils/getInitials";

// ----------------------
// Types
// ----------------------
type ProjectRelation = "owner" | "member" | "pending";
type ProjectStatus = "in-progress" | "completed" | "cancelled";

interface MyProject {
  _id: string;
  title: string;
  description: string;
  duration: string;
  techStack: string[];
  relation: ProjectRelation;
  status: ProjectStatus;
}

// ----------------------
// Dummy Data
// ----------------------
const projects: MyProject[] = [
  {
    _id: "1",
    title: "E-commerce Website",
    description:
      "Build an online store with payment integration, product listings, and admin dashboard.",
    duration: "01/Mar/25 - 30/Mar/25",
    techStack: ["Next.js", "TypeScript", "MongoDB", "TailwindCSS"],
    relation: "owner",
    status: "in-progress",
  },
  {
    _id: "2",
    title: "Portfolio Website",
    description:
      "Design and develop a personal portfolio showcasing projects, skills, and blog posts.",
    duration: "15/Jan/25 - 01/Feb/25",
    techStack: ["React", "CSS", "Framer Motion"],
    relation: "member",
    status: "completed",
  },
  {
    _id: "3",
    title: "Banking App",
    description:
      "Develop a mobile banking app with account overview, fund transfer, and notifications.",
    duration: "10/Apr/25 - 30/Jun/25",
    techStack: ["React Native", "Node.js", "PostgreSQL"],
    relation: "pending",
    status: "cancelled",
  },
];

// ----------------------
// Status Badge Config
// ----------------------
const relationConfig: Record<
  ProjectRelation,
  { label: string; color: string; icon: JSX.Element }
> = {
  owner: {
    label: "Owner",
    color: "bg-green-100 text-green-600",
    icon: <Crown className="size-3" />,
  },
  member: {
    label: "Member",
    color: "bg-blue-100 text-blue-600",
    icon: <UserCheck className="size-3" />,
  },
  pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-600",
    icon: <Clock className="size-3" />,
  },
};

// ----------------------
// Component
// ----------------------
const MyProjects = () => {
  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get("status");
  const relationParam = searchParams.get("relation");

  const filteredProjects = projects.filter((p) => {
    const statusMatch = statusParam ? p.status === statusParam : true;
    const relationMatch = relationParam ? p.relation === relationParam : true;
    return statusMatch && relationMatch;
  });

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">My Projects</h2>

      {filteredProjects.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => {
            const relation = relationConfig[project.relation];
            return (
              <div
                key={project._id}
                className="border border-border-color rounded-lg p-4 bg-white shadow-sm hover:shadow transition"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-sm">{project.title}</h3>
                  <span
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${relation.color}`}
                  >
                    {relation.icon}
                    {relation.label}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-500 mt-2">
                  {project.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold text-gray-700">
                      {getInitials(project.title)}
                    </div>
                    <span className="text-xs text-gray-600">
                      {project.duration}
                    </span>
                  </div>

                  <button className="text-xs text-blue-500 opacity-80 hover:opacity-100">
                    View
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-3 pt-10">
          <div className="w-20 h-20 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
            <Cloud className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-sm font-medium text-gray-500">No projects found</p>
        </div>
      )}
    </div>
  );
};

export default MyProjects;
