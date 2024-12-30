export interface User {
    id: string;
    email: string;
    name: string;
  }
  
export interface AuthState {
isAuthenticated: boolean;
user: User | null;
}



export interface Goal {
id: string;
title: string;
progress: number;
category: string;
endDate: Date;
}

export interface Task {
    id: string;
    title: string;
    description?: string;
    milestones: string[];
    label?: string;
    dueDate: string; // Store as ISO string instead of Date
    status: 'todo' | 'in_progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
}
   
   // src/hooks/useTasks.ts
   import { create } from 'zustand'
   
   interface TaskStore {
    tasks: Task[]
    addTask: (task: Omit<Task, 'id'>) => void
    updateTask: (id: string, task: Partial<Task>) => void
    deleteTask: (id: string) => void
   }
   
   export const useTaskStore = create<TaskStore>((set) => ({
    tasks: [],
    addTask: (task) => set((state) => ({ 
      tasks: [...state.tasks, { ...task, id: crypto.randomUUID() }] 
    })),
    updateTask: (id, task) => set((state) => ({
      tasks: state.tasks.map(t => t.id === id ? { ...t, ...task } : t)
    })),
    deleteTask: (id) => set((state) => ({ 
      tasks: state.tasks.filter(t => t.id !== id) 
    }))
   }))