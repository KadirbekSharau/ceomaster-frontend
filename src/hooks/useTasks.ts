// src/hooks/useTasks.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Task } from '@/types'

interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'status'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task) => 
        set((state) => ({
          tasks: [...state.tasks, {
            ...task,
            id: crypto.randomUUID(),
            status: 'todo' as const,
            dueDate: new Date(task.dueDate).toISOString(),
            priority: task.priority || 'medium'
          }]
        })),
      updateTask: (id, updatedTask) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updatedTask } : task
          )
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id)
        })),
    }),
    {
      name: 'task-storage',
    }
  )
)