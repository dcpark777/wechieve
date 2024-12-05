import { StateCreator } from 'zustand';
import type { Project } from '../../types';
import type { UserSlice } from './userSlice';

export interface ProjectSlice {
  projects: Project[];
  addProject: (project: Project) => void;
  applyToProject: (projectId: string, message: string) => void;
  handleApplication: (applicationId: string, status: 'approved' | 'rejected') => void;
  transferOwnership: (projectId: string, newOwnerId: string) => void;
  updateProjectVisibility: (projectId: string, visibility: 'public' | 'private') => void;
}

export const createProjectSlice: StateCreator<
  ProjectSlice & UserSlice,
  [],
  [],
  ProjectSlice
> = (set, get) => ({
  projects: [],
  addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
  applyToProject: (projectId, message) => {
    const { currentUser } = get();
    if (!currentUser) return;

    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              applications: [
                ...project.applications,
                {
                  id: Math.random().toString(36).substr(2, 9),
                  userId: currentUser.id,
                  projectId,
                  status: 'pending',
                  message,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : project
      ),
    }));
  },
  handleApplication: (applicationId, status) => {
    set((state) => ({
      projects: state.projects.map((project) => ({
        ...project,
        applications: project.applications.map((app) =>
          app.id === applicationId ? { ...app, status } : app
        ),
        collaborators:
          status === 'approved'
            ? [
                ...project.collaborators,
                state.users.find(
                  (user) =>
                    user.id ===
                    project.applications.find((app) => app.id === applicationId)?.userId
                )!,
              ]
            : project.collaborators,
      })),
    }));
  },
  transferOwnership: (projectId, newOwnerId) => {
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              owner: state.users.find((user) => user.id === newOwnerId)!,
            }
          : project
      ),
    }));
  },
  updateProjectVisibility: (projectId, visibility) => {
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === projectId ? { ...project, visibility } : project
      ),
    }));
  },
});