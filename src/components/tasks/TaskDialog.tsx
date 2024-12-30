// src/components/tasks/TaskDialog.tsx
'use client'
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { useTaskStore } from '@/hooks/useTasks'

export function TaskDialog() {
  const addTask = useTaskStore(state => state.addTask)
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    milestones: [''],
    dueDate: '',
    label: ''
  })

  const handleSubmit = () => {
    addTask({
      title: formData.title,
      description: formData.description,
      milestones: formData.milestones.filter(m => m !== ''),
      dueDate: new Date(formData.dueDate),
      label: formData.label
    })

    setFormData({
      title: '',
      description: '',
      milestones: [''],
      dueDate: '',
      label: ''
    })
    setOpen(false)
  }

  const addMilestone = () => {
    setFormData({
      ...formData,
      milestones: [...formData.milestones, '']
    })
  }

  const updateMilestone = (index: number, value: string) => {
    const newMilestones = [...formData.milestones]
    newMilestones[index] = value
    setFormData({
      ...formData,
      milestones: newMilestones
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Input 
            placeholder="Task name"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <Textarea 
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Milestones</label>
            {formData.milestones.map((milestone, index) => (
              <Input 
                key={index}
                value={milestone}
                onChange={(e) => updateMilestone(index, e.target.value)}
                placeholder={`Milestone ${index + 1}`}
              />
            ))}
            <Button variant="outline" size="sm" onClick={addMilestone}>
              Add Milestone
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input 
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            />
            <Select 
              value={formData.label}
              onValueChange={(value) => setFormData({ ...formData, label: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select label" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="work">Work</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="health">Health</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full" onClick={handleSubmit}>
            Create Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}