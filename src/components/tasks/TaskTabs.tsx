// src/components/tasks/TaskTabs.tsx
'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TaskDialog } from "./TaskDialog"
import { useTaskStore } from '@/hooks/useTasks'
import { TaskList } from "./TaskList"

export function TaskTabs() {
  const tasks = useTaskStore(state => state.tasks)

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <TaskDialog />
      </div>

      <Tabs defaultValue="today" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="today">
          <TaskList filter="today" />
        </TabsContent>
        <TabsContent value="inbox">
          <TaskList filter="inbox" />
        </TabsContent>
        <TabsContent value="upcoming">
          <TaskList filter="upcoming" />
        </TabsContent>
        <TabsContent value="completed">
          <TaskList filter="completed" />
        </TabsContent>
        <TabsContent value="weekly">
          <div>Weekly Review Coming Soon</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}