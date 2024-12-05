import { useNavigate } from 'react-router-dom';
import { MessageCircle, User } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardFooter } from '../ui/Card';
import type { User as UserType } from '../../types';
import { useStore } from '../../store/useStore';

interface UserListProps {
  users: UserType[];
  onConnect: (userId: string) => void;
  currentUserId?: string;
}

export function UserList({ users, onConnect, currentUserId }: UserListProps) {
  const navigate = useNavigate();
  const { currentUser } = useStore();

  if (users.length === 0) {
    return (
      <p className="text-gray-500 text-center py-8">
        No users found. Try adjusting your search!
      </p>
    );
  }

  const handleMessageClick = (userId: string) => {
    navigate('/messages', { state: { selectedUserId: userId } });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <Card key={user.id} className="h-[320px]">
          <CardContent>
            <div className="h-full">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                  <p className="text-gray-600">{user.title}</p>
                </div>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2">{user.bio}</p>

              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>

          <CardFooter className="mt-auto">
            {currentUser && user.id !== currentUser.id && (
              <div className="w-full grid grid-cols-2 gap-2">
                {currentUser.connections.includes(user.id) ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMessageClick(user.id)}
                      className="flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Send Message
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/users/${user.id}`)}
                      className="flex items-center justify-center gap-2"
                    >
                      <User className="h-4 w-4" />
                      View Profile
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    className="col-span-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      onConnect(user.id);
                    }}
                  >
                    Connect
                  </Button>
                )}
              </div>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}