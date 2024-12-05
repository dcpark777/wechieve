import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { useStore } from '../../store/useStore';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate();
  const { currentUser, applyToProject } = useStore();
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [message, setMessage] = useState('');

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    applyToProject(project.id, message);
    setShowApplyForm(false);
    setMessage('');
  };

  const hasApplied = project.applications.some(
    (app) => app.userId === currentUser?.id && app.status === 'pending'
  );

  const isCollaborator = project.collaborators.some(
    (collab) => collab.id === currentUser?.id
  );

  return (
    <Card onClick={() => navigate(`/projects/${project.id}`)}>
      <CardContent>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{project.title}</h3>
            {currentUser && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Owner: {project.owner.name}
              </p>
            )}
          </div>
          <span
            className={`px-2 py-1 text-sm rounded-full ${
              project.status === 'open'
                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100'
                : project.status === 'in-progress'
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100'
            }`}
          >
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.skills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-sm rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        {currentUser ? (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {project.collaborators.length}/{project.maxCollaborators} members
          </div>
        ) : (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                navigate('/login');
              }}
            >
              Sign in to view details
            </Button>
          </div>
        )}
        {currentUser && !isCollaborator && project.owner.id !== currentUser.id && (
          <>
            {showApplyForm ? (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleApply(e);
                }} 
                className="flex gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Why do you want to join?"
                  className="flex-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  required
                />
                <Button type="submit" size="sm">
                  Submit
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowApplyForm(false);
                  }}
                >
                  Cancel
                </Button>
              </form>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowApplyForm(true);
                }}
                disabled={hasApplied || project.collaborators.length >= project.maxCollaborators}
              >
                {hasApplied ? 'Application Pending' : 'Apply to Join'}
              </Button>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
}