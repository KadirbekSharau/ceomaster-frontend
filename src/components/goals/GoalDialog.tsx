// src/components/goals/GoalDialog.tsx
'use client'
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from 'lucide-react'
import { useGoalStore } from '@/hooks/useGoals'
import { GoalCategory } from '@/types/goals'

export function GoalDialog() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    progress: 0,
    category: '' as GoalCategory,
    milestones: [],
    year: new Date().getFullYear()
  })

  const addGoal = useGoalStore(state => state.addGoal)

  const handleSubmit = () => {
    addGoal(formData)
    setOpen(false)
    setFormData({
      id: '',  
      title: '',
      description: '',
        progress: 0,
        milestones: [],
      category: '' as GoalCategory,
      year: new Date().getFullYear()
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Goal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Goal</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Input 
            placeholder="Goal title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <Textarea 
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          
          <Select 
            value={formData.category}
            onValueChange={(value: GoalCategory) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Career">Career</SelectItem>
              <SelectItem value="Personal Life">Personal Life</SelectItem>
              <SelectItem value="Health">Health</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
            </SelectContent>
          </Select>

          <Button className="w-full" onClick={handleSubmit}>
            Create Goal
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}