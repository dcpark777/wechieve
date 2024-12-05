import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { useStore } from '../../store/useStore';
import type { Project, ProjectApplication } from '../../types';

interface ManageApplicationsModalProps {
  project: Project;
  onClose: () => void;
}

export function ManageApplicationsModal({ project, onClose }: ManageApplicationsModalProps) {
  const { handleApplication, users } = useStore();

  const pendingApplications = project.applications.filter(
    (app) => app.status === 'pending'
  );

  const handleApplicationAction = (applicationId: string, status: 'approved' | 'rejected') => {
    handleApplication(applicationId, status);
  };

  const getApplicantDetails = (application: ProjectApplication) => {
    return users.find((user) => user.id === application.userId);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Manage Applications</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {pendingApplications.length === 0 ? (
            <p className="text-gray-600 text-center py-8">
              No pending applications at the moment.
            </p>
          ) : (
            <div className="space-y-4">
              {pendingApplications.map((application) => {
                const applicant = getApplicantDetails(application);
                if (!applicant) return null;

                return (
                  <div
                    key={application.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <img
                        src={applicant.avatar}
                        alt={applicant.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold">{applicant.name}</h3>
                        <p className="text-sm text-gray-600">{applicant.title}</p>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{application.message}</p>

                    <div className="flex gap-3">
                      <Button
                        onClick={() => handleApplicationAction(application.id, 'approved')}
                        className="flex-1"
                      >
                        Accept
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleApplicationAction(application.id, 'rejected')}
                        className="flex-1"
                      >
                        Decline
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-6">
            <Button variant="outline" onClick={onClose} className="w-full">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}