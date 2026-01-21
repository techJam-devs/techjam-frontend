import { useEffect, useState } from "react";
import {
  acceptRequestService,
  declineRequestService,
  viewAllRequestService,
} from "../../services/projectService";
import type { projectRequest } from "../../types/projects.types";
import { getInitials } from "../../utils/getInitials";
import useToastStore from "../../store/notificationStore";
import RequestDetailsModal from "./modal/requestModal";

const RequestPanel = () => {
  const [projectRequests, setProjectRequests] = useState<projectRequest[]>([]);
  const { addToast } = useToastStore();

  const [selectedProject, setSelectedProject] = useState<projectRequest | null>(
    null,
  );
  const [selectedUser, setSelectedUser] = useState<
    projectRequest["joinRequests"][0] | null
  >(null);

  // Fetch requests
  useEffect(() => {
    const fetchAllRequest = async () => {
      const res = await viewAllRequestService();
      setProjectRequests(res.projects);
    };
    fetchAllRequest();
  }, []);

  // Helpers
  const removeRequestFromState = (projectId: string, userId: string) => {
    setProjectRequests((prev) =>
      prev
        .map((project) =>
          project._id === projectId
            ? {
                ...project,
                joinRequests: project.joinRequests.filter(
                  (u) => u._id !== userId,
                ),
              }
            : project,
        )
        .filter((project) => project.joinRequests.length > 0),
    );
  };

  // Actions
  const acceptRequest = async () => {
    if (!selectedProject || !selectedUser) return;

    try {
      await acceptRequestService(selectedProject._id, selectedUser._id);
      addToast({ message: "Request accepted", type: "success" });
      removeRequestFromState(selectedProject._id, selectedUser._id);
      closeModal();
    } catch (error) {
      addToast({
        message:
          error instanceof Error ? error.message : "Something went wrong",
        type: "error",
      });
    }
  };

  const declineRequest = async () => {
    if (!selectedProject || !selectedUser) return;

    try {
      await declineRequestService(selectedProject._id, selectedUser._id);
      addToast({ message: "Request declined", type: "success" });
      removeRequestFromState(selectedProject._id, selectedUser._id);
      closeModal();
    } catch (error) {
      addToast({
        message:
          error instanceof Error ? error.message : "Something went wrong",
        type: "error",
      });
    }
  };

  const openModal = (
    project: projectRequest,
    user: projectRequest["joinRequests"][0],
  ) => {
    setSelectedProject(project);
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setSelectedUser(null);
  };

  return (
    <div className="flex flex-col h-screen p-4 border-l border-border-color overflow-auto">
      <h2 className="font-semibold text-sm mb-4">Pending Requests</h2>

      {projectRequests.length ? (
        projectRequests.map((project) => (
          <div key={project._id} className="mb-4">
            {project.joinRequests.map((user) => (
              <div
                key={user._id}
                onClick={() => openModal(project, user)}
                className="flex items-center justify-between p-3 bg-white border-2 border-border-color shadow cursor-pointer hover:bg-gray-50 transition hover:shadow-xl"
              >
                <div className="flex items-center gap-3">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold">
                      {getInitials(user.name)}
                    </div>
                  )}

                  <div>
                    <p className="font-semibold text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500">
                      {user.role ?? "N/A"} • {project.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-400 mt-10">
          You have no new requests.
        </p>
      )}

      {selectedProject && selectedUser && (
        <RequestDetailsModal
          isOpen
          project={selectedProject}
          user={selectedUser}
          onClose={closeModal}
          onAccept={acceptRequest}
          onDecline={declineRequest}
        />
      )}
    </div>
  );
};

export default RequestPanel;
