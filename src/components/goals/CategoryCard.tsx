// src/components/goals/CategoryCard.tsx
'use client'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import { useGoalStore } from '@/hooks/useGoals'
import { GoalCategory } from '@/types/goals'

interface CategoryCardProps {
  category: {
    name: GoalCategory;
    color: string;
  }
}

export function CategoryCard({ category }: CategoryCardProps) {
  const goals = useGoalStore(state => 
    state.goals.filter(goal => 
      goal.category === category.name && 
      goal.year === new Date().getFullYear()
    )
  )

  return (
    <Card className="p-4">
      <div className="flex justify-between items-start mb-3">
        <span className={`inline-block px-2 py-1 rounded text-sm ${category.color}`}>
          {category.name}
        </span>
        <Button variant="ghost" size="sm">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {goals.map(goal => (
        <div key={goal.id} className="border rounded-lg p-3 mb-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{goal.title}</h3>
              <p className="text-sm text-gray-500">{goal.description}</p>
            </div>
            <div className="text-sm text-gray-500">{goal.progress}%</div>
          </div>
          <div className="mt-2 h-2 bg-gray-100 rounded">
            <div 
              className="h-2 bg-blue-500 rounded" 
              style={{ width: `${goal.progress}%` }}
            />
          </div>
        </div>
      ))}
    </Card>
  )
}