import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useStore } from '../store/useStore';
import { ConnectionRequestList } from '../components/network/ConnectionRequestList';
import { UserList } from '../components/network/UserList';

export function Network() {
  const { users, currentUser, sendConnectionRequest, acceptConnectionRequest, rejectConnectionRequest } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    // Remove notification when user visits the network page
    setShowNotification(false);
  }, []);

  if (!currentUser) return null;

  const pendingRequests = users.filter((user) =>
    currentUser.pendingConnections.incoming.includes(user.id)
  );

  const connectedUsers = users.filter((user) =>
    currentUser.connections.includes(user.id)
  );

  // Filter out users who:
  // 1. Are not the current user
  // 2. Are not already connected
  // 3. Don't have pending incoming requests
  // 4. Don't have pending outgoing requests
  const otherUsers = users.filter(
    (user) =>
      user.id !== currentUser.id &&
      !currentUser.connections.includes(user.id) &&
      !currentUser.pendingConnections.incoming.includes(user.id) &&
      !currentUser.pendingConnections.outgoing.includes(user.id)
  );

  const handleAcceptRequest = (userId: string) => {
    acceptConnectionRequest(userId);
  };

  const handleRejectRequest = (userId: string) => {
    rejectConnectionRequest(userId);
  };

  // Only show connected users in the search results
  const filteredUsers = connectedUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Professional Network</h2>
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search your network..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <ConnectionRequestList
        requests={pendingRequests}
        onAccept={handleAcceptRequest}
        onReject={handleRejectRequest}
      />

      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Your Network ({connectedUsers.length})
        </h3>
        <UserList
          users={filteredUsers}
          onConnect={sendConnectionRequest}
          currentUserId={currentUser.id}
        />
      </div>
    </div>
  );
}