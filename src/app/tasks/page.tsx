// src/app/tasks/page.tsx
'use client'
import { TaskTabs } from "@/components/tasks/TaskTabs"

export default function TasksPage() {
  return (
    <div className="h-full">
      <TaskTabs />
    </div>
  )
}