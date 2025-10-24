/**
 * @description RightPanel component: displays pending requests/notifications
 */

import { Link } from "react-router-dom";
import { X, Check } from "lucide-react";

interface Updates {
  id: number | string;
  name: string;
  role: string;
  job: string;
  avatarUrl: string;
}
const dummyUpdate: Updates[] = [
  {
    id: 1,
    name: "Jane Doe",
    role: "Project Manager",
    job: "Website Redesign",
    avatarUrl: "/subhero/Ellipse.png",
  },
  {
    id: 2,
    name: "John Smith",
    role: "Developer",
    job: "Mobile App",
    avatarUrl: "/subhero/Ellipse.png",
  },
];

const RequestPanel = () => {
  return (
    <div className="flex flex-col h-screen p-4 border-l border-border-color overflow-auto">
      <h2 className="font-semibold text-sm mb-4">Pending Requests</h2>

      <ul>
        {dummyUpdate.length > 0 ? (
          dummyUpdate.map((update) => (
            <li
              key={update.id}
              className="flex flex-row items-start justify-between p-2 bg-white shadow border-2 border-border-color"
            >
              {/** avatar and request info div */}
              <div className="flex flex-row flex-1 items-center gap-2">
                <img
                  src={update.avatarUrl}
                  alt={update.name}
                  className="size-6 lg:w-12 lg:h-12 border bg-gray-700 border-purple-500 rounded-full object-cover"
                />
                <div className="text-start">
                  <p className="font-semibold text-sm">{update.name}</p>
                  <p className="text-xs text-gray-500">{update.role}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    To join: {update.job}{" "}
                    <span className="text-blue underline pl-3 cursor-pointer ">
                      {" "}
                      <Link to="/">View</Link>
                    </span>{" "}
                  </p>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-end justify-end gap-3 w-12 mt-3 :mt-5">
                <button className="cursor-pointer bg-red-100 text-red-500 rounded-full hover:bg-red-600 hover:text-white transition">
                  <X className="size-4" />
                </button>
                <button className="cursor-pointer text-blue bg-blue-100 rounded-full hover:bg-blue hover:text-white transition-all duration-300">
                  <Check className="size-4" />
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="p-3 flex flex-col justify-center items-center mt-10 text-gray-400">
            <p className="text-3xl">📁</p>
            You have no recent Update
          </li>
        )}
      </ul>
    </div>
  );
};

export default RequestPanel;
