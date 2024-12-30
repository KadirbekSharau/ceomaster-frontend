// src/components/tasks/TaskList.tsx
'use client'
import { useTaskStore } from '@/hooks/useTasks'
import { Task } from '@/types'
import { useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"

export function TaskList() {
  const tasks = useTaskStore(state => state.tasks)
  const updateTask = useTaskStore(state => state.updateTask)

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onStatusChange={(checked) => 
            updateTask(task.id, { status: checked ? 'completed' : 'todo' })
          }
        />
      ))}
    </div>
  )
}

function TaskItem({ task, onStatusChange }: { 
  task: Task; 
  onStatusChange: (checked: boolean) => void;
}) {
  const [expanded, setExpanded] = useState(false)
  const formattedDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : ''

  return (
    <div className="bg-white p-4 rounded-lg border space-y-2">
      <div className="flex items-center gap-4">
        <Checkbox 
          checked={task.status === 'completed'}
          onCheckedChange={onStatusChange}
        />
        <div 
          className="flex-1 cursor-pointer" 
          onClick={() => setExpanded(!expanded)}
        >
          <h3 className="font-medium">{task.title}</h3>
          {task.description && (
            <p className="text-sm text-gray-500">{task.description}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {task.label && (
            <span className={`px-2 py-1 rounded text-sm ${
              task.label === 'work' ? 'bg-blue-100 text-blue-800' :
              task.label === 'personal' ? 'bg-green-100 text-green-800' :
              'bg-purple-100 text-purple-800'
            }`}>
              {task.label}
            </span>
          )}
          <span className="text-sm text-gray-500">
            {formattedDate}
          </span>
        </div>
      </div>
      
      {expanded && task.milestones.length > 0 && (
        <div className="pl-9 pt-2">
          <p className="text-sm font-medium mb-2">Milestones:</p>
          <ul className="space-y-1">
            {task.milestones.map((milestone, index) => (
              <li key={index} className="text-sm text-gray-600">
                • {milestone}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}