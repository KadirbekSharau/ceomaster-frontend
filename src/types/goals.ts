// src/types/goals.ts
export type GoalCategory = 'Career' | 'Personal Life' | 'Health' | 'Finance';

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: GoalCategory;
  year: number;
  progress: number;
  milestones: Milestone[];
}

export interface Milestone {
  id: string;
  goalId: string;
  title: string;
  quarter: 1 | 2 | 3 | 4;
  completed: boolean;
}