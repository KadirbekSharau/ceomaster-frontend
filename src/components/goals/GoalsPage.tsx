// src/components/goals/GoalsPage.tsx
'use client'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, ChevronDown, Target } from 'lucide-react'
import { GoalDialog } from "./GoalDialog"
import { GoalCategory } from "@/types/goals"

const categories = [
  { name: 'Career' as GoalCategory, color: 'bg-blue-100 text-blue-800' },
  { name: 'Personal Life' as GoalCategory, color: 'bg-purple-100 text-purple-800' },
  { name: 'Health' as GoalCategory, color: 'bg-green-100 text-green-800' },
  { name: 'Finance' as GoalCategory, color: 'bg-yellow-100 text-yellow-800' }
];

export function GoalsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Goals</h1>
        <GoalDialog />
      </div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Goals</h1>
      </div>

      <Tabs defaultValue="2024">
        <TabsList>
          <TabsTrigger value="2024">2024</TabsTrigger>
          <TabsTrigger value="2023">2023</TabsTrigger>
        </TabsList>

        <TabsContent value="2024">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Categories Column */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Annual Goals by Category</h2>
              <div className="space-y-4">
                {categories.map((category) => (
                  <CategoryCard key={category.name} category={category} />
                ))}
              </div>
            </div>

            {/* Quarters Column */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Quarterly Breakdown</h2>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((quarter) => (
                  <QuarterCard key={quarter} quarter={quarter} />
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// src/components/goals/CategoryCard.tsx
function CategoryCard({ category }: { category: { name: string; color: string } }) {
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
      <div className="border rounded-lg p-3 mb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">Example Goal</h3>
            <p className="text-sm text-gray-500">Goal description</p>
          </div>
          <div className="text-sm text-gray-500">75%</div>
        </div>
        <div className="mt-2 h-2 bg-gray-100 rounded">
          <div className="h-2 bg-blue-500 rounded w-3/4"></div>
        </div>
      </div>
    </Card>
  )
}

// src/components/goals/QuarterCard.tsx
function QuarterCard({ quarter }: { quarter: number }) {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Q{quarter}</h3>
        <Button variant="outline" size="sm">
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-3">
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 text-sm">
            <Target className="h-4 w-4 text-blue-500" />
            <span className="text-blue-800 bg-blue-100 px-2 py-0.5 rounded">Career</span>
          </div>
          <p className="mt-1">Quarterly milestone example</p>
        </div>
      </div>
    </Card>
  )
}