import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createUserSlice, type UserSlice } from './slices/userSlice';
import { createProjectSlice, type ProjectSlice } from './slices/projectSlice';
import { createMessageSlice, type MessageSlice } from './slices/messageSlice';

export const useStore = create<UserSlice & ProjectSlice & MessageSlice>()(
  persist(
    (...a) => {
      const userSlice = createUserSlice(...a);
      return {
        ...userSlice,
        ...createProjectSlice(...a),
        ...createMessageSlice(...a),
        projects: [
          {
            id: '1',
            title: 'E-commerce Platform',
            description: 'Building a modern e-commerce platform with React and Node.js',
            owner: userSlice.users[0],
            skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
            collaborators: [userSlice.users[0]],
            applications: [],
            maxCollaborators: 4,
            status: 'open',
            visibility: 'public',
          },
        ],
      };
    },
    {
      name: 'wechieve-storage',
      partialize: (state) => ({
        currentUser: state.currentUser,
        users: state.users,
        projects: state.projects,
        messages: state.messages,
        conversations: state.conversations,
      }),
    }
  )
);