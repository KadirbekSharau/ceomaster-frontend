// src/components/goals/QuarterCard.tsx
'use client'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, Target, CheckCircle2 } from 'lucide-react'
import { useGoalStore } from '@/hooks/useGoals'
import { useState } from 'react'

interface QuarterCardProps {
  quarter: 1 | 2 | 3 | 4;
}

export function QuarterCard({ quarter }: QuarterCardProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const goals = useGoalStore(state => state.goals)
  const updateMilestone = useGoalStore(state => state.updateMilestone)

  const quarterMilestones = goals.flatMap(goal => 
    goal.milestones
      .filter(milestone => milestone.quarter === quarter)
      .map(milestone => ({
        ...milestone,
        goalCategory: goal.category,
        goalTitle: goal.title
      }))
  )

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Q{quarter}</h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <ChevronDown className={`h-4 w-4 transform ${isExpanded ? 'rotate-180' : ''}`} />
        </Button>
      </div>
      {isExpanded && (
        <div className="space-y-3">
          {quarterMilestones.map((milestone) => (
            <div key={milestone.id} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <Target className="h-4 w-4 text-blue-500" />
                  <span className="text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                    {milestone.goalCategory}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => updateMilestone(
                    milestone.goalId, 
                    milestone.id, 
                    !milestone.completed
                  )}
                >
                  <CheckCircle2 
                    className={`h-4 w-4 ${
                      milestone.completed ? 'text-green-500' : 'text-gray-300'
                    }`} 
                  />
                </Button>
              </div>
              <p className="mt-1">{milestone.title}</p>
              <p className="text-sm text-gray-500 mt-1">From: {milestone.goalTitle}</p>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}