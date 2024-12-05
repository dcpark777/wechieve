import { useState } from 'react';
import { Plus, Search, Lock, Globe } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ProjectCard } from '../components/project/ProjectCard';
import { CreateProjectForm } from '../components/project/CreateProjectForm';
import { useStore } from '../store/useStore';

export function Projects() {
  const { projects, currentUser } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const visibleProjects = projects.filter(
    (project) =>
      project.visibility === 'public' ||
      (currentUser &&
        (project.owner.id === currentUser.id ||
          project.collaborators.some((collab) => collab.id === currentUser.id)))
  );

  const filteredProjects = visibleProjects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  // Separate user's projects and other projects
  const userProjects = currentUser
    ? filteredProjects.filter((project) => project.owner.id === currentUser.id)
    : [];
  const otherProjects = currentUser
    ? filteredProjects.filter((project) => project.owner.id !== currentUser.id)
    : filteredProjects;

  const renderProjectGrid = (projects: typeof filteredProjects) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div key={project.id} className="relative">
          <div className="absolute top-4 right-4 z-10">
            {project.visibility === 'private' ? (
              <Lock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            ) : (
              <Globe className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            )}
          </div>
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Projects</h2>
        {currentUser && (
          <Button className="gap-2" onClick={() => setShowCreateForm(true)}>
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        )}
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filteredProjects.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          No projects found. Try adjusting your search or create a new project!
        </p>
      ) : (
        <div className="space-y-12">
          {currentUser && userProjects.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                My Projects
              </h3>
              {renderProjectGrid(userProjects)}
            </div>
          )}

          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              {currentUser ? 'Other Projects' : 'All Projects'}
            </h3>
            {renderProjectGrid(otherProjects)}
          </div>
        </div>
      )}

      {showCreateForm && <CreateProjectForm onClose={() => setShowCreateForm(false)} />}
    </div>
  );
}