export interface User {
    id: string;
    name: string;
    avatar: string;
    title: string;
    bio: string;
    skills: string[];
    connections: string[];
    pendingConnections: {
      incoming: string[];
      outgoing: string[];
    };
  }
  
  export interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    timestamp: string;
    read: boolean;
  }
  
  export interface Conversation {
    id: string;
    participants: string[];
    lastMessage?: Message;
  }
  
  export interface ProjectApplication {
    id: string;
    userId: string;
    projectId: string;
    status: 'pending' | 'approved' | 'rejected';
    message: string;
    createdAt: string;
  }
  
  export interface Project {
    id: string;
    title: string;
    description: string;
    owner: User;
    skills: string[];
    collaborators: User[];
    applications: ProjectApplication[];
    maxCollaborators: number;
    status: 'open' | 'in-progress' | 'completed';
    visibility: 'public' | 'private';
  }