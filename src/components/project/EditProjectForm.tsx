import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { useStore } from '../../store/useStore';
import type { Project } from '../../types';

interface EditProjectFormProps {
  project: Project;
  onClose: () => void;
}

export function EditProjectForm({ project, onClose }: EditProjectFormProps) {
  const { projects, currentUser } = useStore();
  const [formData, setFormData] = useState({
    title: project.title,
    description: project.description,
    skills: project.skills.join(', '),
    maxCollaborators: project.maxCollaborators,
    visibility: project.visibility,
    status: project.status,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) return;

    const skillsArray = formData.skills
      .split(',')
      .map((skill) => skill.trim())
      .filter(Boolean);

    const updatedProject = {
      ...project,
      title: formData.title,
      description: formData.description,
      skills: skillsArray,
      maxCollaborators: formData.maxCollaborators,
      visibility: formData.visibility as 'public' | 'private',
      status: formData.status as 'open' | 'in-progress' | 'completed',
    };

    // Update project in store
    const updatedProjects = projects.map((p) =>
      p.id === project.id ? updatedProject : p
    );
    useStore.setState({ projects: updatedProjects });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Edit Project</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Project Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                required
              />
            </div>

            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                Required Skills (comma-separated)
              </label>
              <input
                type="text"
                id="skills"
                value={formData.skills}
                onChange={(e) => setFormData((prev) => ({ ...prev, skills: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="maxCollaborators" className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Team Size
              </label>
              <input
                type="number"
                id="maxCollaborators"
                value={formData.maxCollaborators}
                onChange={(e) => setFormData((prev) => ({ ...prev, maxCollaborators: parseInt(e.target.value) }))}
                min={project.collaborators.length}
                max={10}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Visibility
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="public"
                    checked={formData.visibility === 'public'}
                    onChange={(e) => setFormData((prev) => ({ ...prev, visibility: e.target.value as 'public' | 'private' }))}
                    className="mr-2"
                  />
                  Public
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="private"
                    checked={formData.visibility === 'private'}
                    onChange={(e) => setFormData((prev) => ({ ...prev, visibility: e.target.value as 'public' | 'private' }))}
                    className="mr-2"
                  />
                  Private
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as 'open' | 'in-progress' | 'completed' }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="flex-1">
                Save Changes
              </Button>
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}