// src/hooks/useGoals.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Goal, Milestone } from '@/types/goals'

interface GoalStore {
  goals: Goal[];
  addGoal: (goal: Omit<Goal, 'id' | 'progress'>) => void;
  updateGoal: (id: string, goal: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  addMilestone: (goalId: string, milestone: Omit<Milestone, 'id' | 'goalId'>) => void;
  updateMilestone: (goalId: string, milestoneId: string, completed: boolean) => void;
}

export const useGoalStore = create<GoalStore>()(
  persist(
    (set) => ({
      goals: [],
      addGoal: (goal) => 
        set((state) => ({
          goals: [...state.goals, {
            ...goal,
            id: crypto.randomUUID(),
            progress: 0,
            milestones: []
          }]
        })),
      updateGoal: (id, updatedGoal) =>
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === id ? { ...goal, ...updatedGoal } : goal
          )
        })),
      deleteGoal: (id) =>
        set((state) => ({
          goals: state.goals.filter((goal) => goal.id !== id)
        })),
      addMilestone: (goalId, milestone) =>
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === goalId
              ? {
                  ...goal,
                  milestones: [
                    ...goal.milestones,
                    { ...milestone, id: crypto.randomUUID(), goalId }
                  ]
                }
              : goal
          )
        })),
      updateMilestone: (goalId, milestoneId, completed) =>
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === goalId
              ? {
                  ...goal,
                  milestones: goal.milestones.map((m) =>
                    m.id === milestoneId ? { ...m, completed } : m
                  )
                }
              : goal
          )
        })),
    }),
    {
      name: 'goal-storage',
    }
  )
)