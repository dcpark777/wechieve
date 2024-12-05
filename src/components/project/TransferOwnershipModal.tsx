import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { useStore } from '../../store/useStore';
import type { Project } from '../../types';

interface TransferOwnershipModalProps {
  project: Project;
  onClose: () => void;
}

export function TransferOwnershipModal({ project, onClose }: TransferOwnershipModalProps) {
  const { transferOwnership } = useStore();
  const [selectedUserId, setSelectedUserId] = useState('');

  const eligibleUsers = project.collaborators.filter(
    (user) => user.id !== project.owner.id
  );

  const handleTransfer = () => {
    if (selectedUserId) {
      transferOwnership(project.id, selectedUserId);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Transfer Ownership</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {eligibleUsers.length === 0 ? (
            <p className="text-gray-600 text-center py-4">
              No eligible collaborators to transfer ownership to.
            </p>
          ) : (
            <>
              <p className="text-gray-600 mb-4">
                Select a team member to transfer project ownership to:
              </p>

              <div className="space-y-2 mb-6">
                {eligibleUsers.map((user) => (
                  <label
                    key={user.id}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300"
                  >
                    <input
                      type="radio"
                      name="newOwner"
                      value={user.id}
                      checked={selectedUserId === user.id}
                      onChange={(e) => setSelectedUserId(e.target.value)}
                      className="h-4 w-4 text-blue-600"
                    />
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.title}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </>
          )}

          <div className="flex gap-3">
            <Button
              onClick={handleTransfer}
              disabled={!selectedUserId}
              className="flex-1"
            >
              Transfer Ownership
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}