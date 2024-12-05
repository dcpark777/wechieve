import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface CounterSlice {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

interface UserSlice {
  username: string | null
  setUsername: (username: string) => void
  logout: () => void
}

interface Store extends CounterSlice, UserSlice {}

export const useStore = create<Store>()(
  devtools(
    (set) => ({
      // Counter slice
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
      reset: () => set({ count: 0 }),

      // User slice
      username: null,
      setUsername: (username) => set({ username }),
      logout: () => set({ username: null }),
    }),
    { name: 'app-store' }
  )
) 