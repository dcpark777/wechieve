import { StateCreator } from 'zustand';
import type { User } from '../../types';

export interface UserSlice {
  currentUser: User | null;
  users: User[];
  setCurrentUser: (user: User | null) => void;
  logout: () => void;
  createUser: (user: User) => void;
  sendConnectionRequest: (userId: string) => void;
  acceptConnectionRequest: (userId: string) => void;
  rejectConnectionRequest: (userId: string) => void;
}

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  currentUser: null,
  users: [
    {
      id: '1',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      title: 'Full Stack Developer',
      bio: 'Passionate about building great software and collaborating with other developers.',
      skills: ['React', 'TypeScript', 'Node.js', 'Python'],
      connections: ['2'],
      pendingConnections: {
        incoming: ['3'],
        outgoing: [],
      },
    },
    {
      id: '2',
      name: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      title: 'UI/UX Designer',
      bio: 'Creating beautiful and intuitive user experiences.',
      skills: ['UI Design', 'UX Research', 'Figma', 'Adobe XD'],
      connections: ['1'],
      pendingConnections: {
        incoming: [],
        outgoing: [],
      },
    },
  ],
  setCurrentUser: (user) => set({ currentUser: user }),
  logout: () => set({ currentUser: null }),
  createUser: (user) => set((state) => ({ users: [...state.users, user] })),
  sendConnectionRequest: (userId) =>
    set((state) => {
      if (!state.currentUser) return state;

      return {
        users: state.users.map((user) =>
          user.id === state.currentUser!.id
            ? {
                ...user,
                pendingConnections: {
                  ...user.pendingConnections,
                  outgoing: [...user.pendingConnections.outgoing, userId],
                },
              }
            : user.id === userId
            ? {
                ...user,
                pendingConnections: {
                  ...user.pendingConnections,
                  incoming: [...user.pendingConnections.incoming, state.currentUser.id],
                },
              }
            : user
        ),
      };
    }),
  acceptConnectionRequest: (userId) =>
    set((state) => {
      if (!state.currentUser) return state;

      return {
        users: state.users.map((user) =>
          user.id === state.currentUser!.id
            ? {
                ...user,
                connections: [...user.connections, userId],
                pendingConnections: {
                  ...user.pendingConnections,
                  incoming: user.pendingConnections.incoming.filter((id) => id !== userId),
                },
              }
            : user.id === userId
            ? {
                ...user,
                connections: [...user.connections, state.currentUser.id],
                pendingConnections: {
                  ...user.pendingConnections,
                  outgoing: user.pendingConnections.outgoing.filter(
                    (id) => id !== state.currentUser!.id
                  ),
                },
              }
            : user
        ),
      };
    }),
  rejectConnectionRequest: (userId) =>
    set((state) => {
      if (!state.currentUser) return state;

      return {
        users: state.users.map((user) =>
          user.id === state.currentUser!.id
            ? {
                ...user,
                pendingConnections: {
                  ...user.pendingConnections,
                  incoming: user.pendingConnections.incoming.filter((id) => id !== userId),
                },
              }
            : user.id === userId
            ? {
                ...user,
                pendingConnections: {
                  ...user.pendingConnections,
                  outgoing: user.pendingConnections.outgoing.filter(
                    (id) => id !== state.currentUser!.id
                  ),
                },
              }
            : user
        ),
      };
    }),
});