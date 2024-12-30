// src/app/page.tsx
'use client'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function HomePage() {
 return (
   <div className="p-6">
     {/* Header */}
     <div className="flex justify-between items-center mb-6">
       <h1 className="text-2xl font-bold">Today&apos;s Tasks</h1>
       <Button>
         <Plus className="mr-2 h-4 w-4" />
         Add Task
       </Button>
     </div>

     {/* Tasks Section */}
     <div className="space-y-4">
       <Card className="p-4">
         <div className="flex items-center">
           <input type="checkbox" className="h-4 w-4 mr-4"/>
           <div>
             <h3 className="font-medium">Complete Python Module</h3>
             <p className="text-sm text-gray-500">Due today at 5:00 PM</p>
           </div>
         </div>
       </Card>
     </div>
   </div>
 )
}