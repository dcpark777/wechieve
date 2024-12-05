import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { MessageList } from '../components/messages/MessageList';
import { Button } from '../components/ui/Button';

export function Messages() {
  const location = useLocation();
  const { currentUser, users } = useStore();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(
    (location.state as { selectedUserId?: string })?.selectedUserId || null
  );

  useEffect(() => {
    const userId = (location.state as { selectedUserId?: string })?.selectedUserId;
    if (userId) {
      setSelectedUserId(userId);
    }
  }, [location.state]);

  if (!currentUser) return null;

  const connections = users.filter((user) =>
    currentUser.connections.includes(user.id)
  );

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Messages</h2>
        <div className="space-y-2">
          {connections.map((user) => (
            <Button
              key={user.id}
              variant={selectedUserId === user.id ? 'primary' : 'outline'}
              className="w-full justify-start"
              onClick={() => setSelectedUserId(user.id)}
            >
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="text-left">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{user.title}</p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      <div className="col-span-8">
        {selectedUserId ? (
          <MessageList recipientId={selectedUserId} />
        ) : (
          <div className="h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
            Select a connection to start messaging
          </div>
        )}
      </div>
    </div>
  );
}