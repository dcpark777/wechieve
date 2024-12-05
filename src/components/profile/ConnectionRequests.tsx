import { useStore } from '../../store/useStore';
import { Button } from '../ui/Button';

export function ConnectionRequests() {
  const { users, currentUser, acceptConnectionRequest, rejectConnectionRequest } = useStore();

  if (!currentUser) return null;

  const pendingRequests = users.filter((user) =>
    currentUser.pendingConnections.incoming.includes(user.id)
  );

  if (pendingRequests.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <h3 className="text-lg font-semibold mb-4">Connection Requests</h3>
      <div className="space-y-4">
        {pendingRequests.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-3 border border-gray-100 rounded-lg"
          >
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
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => acceptConnectionRequest(user.id)}
              >
                Accept
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => rejectConnectionRequest(user.id)}
              >
                Decline
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}