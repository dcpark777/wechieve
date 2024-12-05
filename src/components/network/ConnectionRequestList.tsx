import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Card, CardContent, CardFooter } from '../ui/Card';
import type { User } from '../../types';

interface ConnectionRequestListProps {
  requests: User[];
  onAccept: (userId: string) => void;
  onReject: (userId: string) => void;
}

export function ConnectionRequestList({ requests, onAccept, onReject }: ConnectionRequestListProps) {
  const navigate = useNavigate();

  if (requests.length === 0) return null;

  return (
    <div className="mb-12">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Connection Requests ({requests.length})
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((user) => (
          <Card key={user.id}>
            <CardContent>
              <div 
                className="cursor-pointer"
                onClick={() => navigate(`/users/${user.id}`)}
              >
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

            <CardFooter>
              <div className="flex gap-2 w-full">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAccept(user.id);
                  }}
                  className="flex-1"
                >
                  Accept
                </Button>
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onReject(user.id);
                  }}
                  className="flex-1"
                >
                  Decline
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}