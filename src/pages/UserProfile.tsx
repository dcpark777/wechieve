import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useStore } from '../store/useStore';
import { UserProjects } from '../components/profile/UserProjects';

export function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, currentUser, sendConnectionRequest } = useStore();
  
  const user = users.find((u) => u.id === id);

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">User not found</h2>
        <Button variant="outline" onClick={() => navigate('/network')}>
          Back to Network
        </Button>
      </div>
    );
  }

  const isCurrentUser = currentUser?.id === user.id;

  const getConnectionStatus = () => {
    if (!currentUser) return 'not-connected';

    if (currentUser.connections.includes(user.id)) return 'connected';
    if (currentUser.pendingConnections.outgoing.includes(user.id)) return 'pending-outgoing';
    if (currentUser.pendingConnections.incoming.includes(user.id)) return 'pending-incoming';
    return 'not-connected';
  };

  const getConnectionButton = () => {
    const status = getConnectionStatus();

    switch (status) {
      case 'connected':
        return (
          <Button variant="outline" className="w-full" disabled>
            Connected
          </Button>
        );
      case 'pending-outgoing':
        return (
          <Button variant="outline" className="w-full" disabled>
            Request Sent
          </Button>
        );
      case 'pending-incoming':
        return (
          <Button variant="outline" className="w-full" disabled>
            Respond to Request
          </Button>
        );
      default:
        return (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => sendConnectionRequest(user.id)}
          >
            Connect
          </Button>
        );
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Button
        variant="outline"
        onClick={() => navigate(-1)}
        className="mb-6 gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center gap-6 mb-8">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-600">{user.title}</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">About</h3>
          <p className="text-gray-600">{user.bio}</p>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {!isCurrentUser && currentUser && getConnectionButton()}
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Projects</h3>
        <UserProjects user={user} />
      </div>
    </div>
  );
}