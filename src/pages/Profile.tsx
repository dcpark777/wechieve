import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { UserProjects } from '../components/profile/UserProjects';
import { EditProfileForm } from '../components/profile/EditProfileForm';

export function Profile() {
  const navigate = useNavigate();
  const { currentUser } = useStore();
  const [showEditForm, setShowEditForm] = useState(false);

  if (!currentUser) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Please sign in to view your profile
        </h2>
        <Button onClick={() => navigate('/login')}>Sign In</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-6 mb-8">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{currentUser.name}</h2>
            <p className="text-gray-600 dark:text-gray-300">{currentUser.title}</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">About</h3>
          <p className="text-gray-600 dark:text-gray-300">{currentUser.bio}</p>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {currentUser.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <Button variant="outline" className="w-full" onClick={() => setShowEditForm(true)}>
          Edit Profile
        </Button>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">My Projects</h3>
        <UserProjects user={currentUser} />
      </div>

      {showEditForm && (
        <EditProfileForm
          user={currentUser}
          onClose={() => setShowEditForm(false)}
        />
      )}
    </div>
  );
}