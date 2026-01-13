/**
 * @description This creates a plus icon to create projects
 */

import { Link2, Plus, X } from "lucide-react";
import { useState } from "react";

const CreateProjectButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        title="Create new project"
        className="flex cursor-pointer rounded-full p-1 hover:bg-gray-100 transition-colors duration-300"
      >
        <Plus className="size-6 p-1 bg-blue-200 text-blue hover:bg-gray-300 rounded-full cursor-pointer" />
      </button>

      {/** show create project pop up */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          {/* Modal box */}
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-6 relative mx-4">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-semibold mb-4">Create New Project</h2>

            {/* form */}
            <form className="space-y-4 text-gray-500">
              {/* project title */}
              <input
                type="text"
                className="w-full border text-sm border-gray-300 bg-gray-50 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter project name"
              />

              {/* tech stack */}
              <input
                type="text"
                className="w-full border text-sm border-gray-300 bg-gray-50 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Tech stack"
              />

              {/* description */}
              <textarea
                rows={3}
                className="w-full border text-sm border-gray-300 bg-gray-50 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Short project description..."
              />

              {/* Roles + Experience */}
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="text"
                  className="w-full border text-sm border-gray-300 bg-gray-50 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Required Roles (e.g. Project manager, backend..)"
                />
                {/* Experience */}
                <input
                  type="text"
                  className="w-full border text-sm border-gray-300 bg-gray-50 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Experience (e.g. 2+ yrs)"
                />
              </div>

              {/* Start + End date */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs md:text--sm text-gray-600 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full border text-sm border-gray-300 bg-gray-50 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm text-gray-600 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="w-full border text-sm border-gray-300 bg-gray-50 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* External link */}
              <div className="flex items-center border border-gray-300 bg-gray-50 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                <input
                  type="url"
                  className="w-full text-sm bg-transparent focus:outline-none"
                  placeholder="Link to collaboration tool (e.g. Trello)"
                />{" "}
                <Link2 className="w-4 h-4 text-gray-400 mr-2" />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue text-white font-medium py-2 px-8 rounded-full hover:bg-blue-700 transition"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateProjectButton;
