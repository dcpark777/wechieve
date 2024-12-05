import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/Button';
import { Card, CardContent, CardFooter } from '../ui/Card';
import type { User } from '../../types';

interface UserProjectsProps {
  user: User;
}

export function UserProjects({ user }: UserProjectsProps) {
  const navigate = useNavigate();
  const { projects } = useStore();
  
  const userProjects = user ? projects.filter(
    (project) =>
      project.owner.id === user.id ||
      project.collaborators.some((collaborator) => collaborator.id === user.id)
  ) : [];

  if (userProjects.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-gray-600 mb-4">No projects yet.</p>
          <Button variant="outline" onClick={() => navigate('/projects')}>
            Create Your First Project
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {userProjects.map((project) => (
        <Card key={project.id}>
          <CardContent>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">
                  {project.title}
                </h4>
                <p className="text-sm text-gray-500">
                  {project.owner.id === user.id ? 'Owner' : 'Collaborator'}
                </p>
              </div>
              <span
                className={`px-2 py-1 text-sm rounded-full ${
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

            <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>

            <div className="flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </CardContent>

          <CardFooter className="flex items-center justify-between">
            <div className="flex -space-x-2">
              {project.collaborators.slice(0, 3).map((collaborator) => (
                <img
                  key={collaborator.id}
                  src={collaborator.avatar}
                  alt={collaborator.name}
                  className="w-8 h-8 rounded-full border-2 border-white"
                  title={collaborator.name}
                />
              ))}
              {project.collaborators.length > 3 && (
                <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-sm text-gray-600">
                  +{project.collaborators.length - 3}
                </div>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/projects/${project.id}`)}
            >
              View Details
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}