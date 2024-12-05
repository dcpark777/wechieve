import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Lock, Globe } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { EditProjectForm } from '../components/project/EditProjectForm';
import { ManageApplicationsModal } from '../components/project/ManageApplicationsModal';
import { TransferOwnershipModal } from '../components/project/TransferOwnershipModal';
import { useStore } from '../store/useStore';

export function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, currentUser } = useStore();
  const [showEditForm, setShowEditForm] = useState(false);
  const [showApplicationsModal, setShowApplicationsModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Project not found</h2>
        <Button variant="outline" onClick={() => navigate('/projects')}>
          Back to Projects
        </Button>
      </div>
    );
  }

  const isOwner = currentUser?.id === project.owner.id;
  const isCollaborator = project.collaborators.some(
    (collab) => collab.id === currentUser?.id
  );

  return (
    <div className="max-w-4xl mx-auto">
      <Button
        variant="outline"
        onClick={() => navigate(-1)}
        className="mb-6 gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {project.title}
            </h1>
            {currentUser ? (
              <div className="flex items-center gap-4">
                <span 
                  className="text-gray-600 hover:text-blue-600 cursor-pointer"
                  onClick={() => navigate(`/users/${project.owner.id}`)}
                >
                  Created by {project.owner.name}
                </span>
                <span className="flex items-center gap-1 text-gray-600">
                  {project.visibility === 'private' ? (
                    <><Lock className="h-4 w-4" /> Private</>
                  ) : (
                    <><Globe className="h-4 w-4" /> Public</>
                  )}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/login')}
                >
                  Sign in to view project details
                </Button>
              </div>
            )}
          </div>
          <span
            className={`px-3 py-1 text-sm rounded-full ${
              project.status === 'open'
                ? 'bg-green-100 text-green-800'
                : project.status === 'in-progress'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">About the Project</h2>
          <p className="text-gray-600">{project.description}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Required Skills</h2>
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {currentUser && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Members ({project.collaborators.length}/{project.maxCollaborators})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.collaborators.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
                  onClick={() => navigate(`/users/${member.id}`)}
                >
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-900 hover:text-blue-600">
                      {member.name}
                    </p>
                    <p className="text-sm text-gray-600">{member.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {isOwner && (
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowEditForm(true)}>
              Edit Project
            </Button>
            <Button variant="outline" onClick={() => setShowApplicationsModal(true)}>
              Manage Applications
            </Button>
            <Button variant="outline" onClick={() => setShowTransferModal(true)}>
              Transfer Ownership
            </Button>
          </div>
        )}
      </div>

      {showEditForm && (
        <EditProjectForm
          project={project}
          onClose={() => setShowEditForm(false)}
        />
      )}

      {showApplicationsModal && (
        <ManageApplicationsModal
          project={project}
          onClose={() => setShowApplicationsModal(false)}
        />
      )}

      {showTransferModal && (
        <TransferOwnershipModal
          project={project}
          onClose={() => setShowTransferModal(false)}
        />
      )}
    </div>
  );
}