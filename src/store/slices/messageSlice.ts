import { StateCreator } from 'zustand';
import type { Message, Conversation } from '../../types';
import type { UserSlice } from './userSlice';

export interface MessageSlice {
  messages: Message[];
  conversations: Conversation[];
  sendMessage: (receiverId: string, content: string) => void;
  markMessageAsRead: (messageId: string) => void;
  getConversation: (userId1: string, userId2: string) => Conversation | undefined;
  getUnreadCount: (userId: string) => number;
}

export const createMessageSlice: StateCreator<
  MessageSlice & UserSlice,
  [],
  [],
  MessageSlice
> = (set, get) => ({
  messages: [],
  conversations: [],
  sendMessage: (receiverId, content) => {
    const { currentUser } = get();
    if (!currentUser) return;

    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      senderId: currentUser.id,
      receiverId,
      content,
      timestamp: new Date().toISOString(),
      read: false,
    };

    set((state) => ({
      messages: [...state.messages, newMessage],
      conversations: [
        ...state.conversations.filter(
          (conv) =>
            !conv.participants.includes(currentUser.id) ||
            !conv.participants.includes(receiverId)
        ),
        {
          id: [currentUser.id, receiverId].sort().join('-'),
          participants: [currentUser.id, receiverId],
          lastMessage: newMessage,
        },
      ],
    }));
  },
  markMessageAsRead: (messageId) => {
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === messageId ? { ...msg, read: true } : msg
      ),
    }));
  },
  getConversation: (userId1, userId2) => {
    const { conversations } = get();
    return conversations.find(
      (conv) =>
        conv.participants.includes(userId1) && conv.participants.includes(userId2)
    );
  },
  getUnreadCount: (userId) => {
    const { messages } = get();
    return messages.filter((msg) => msg.receiverId === userId && !msg.read).length;
  },
});