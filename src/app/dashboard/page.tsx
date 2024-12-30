import { Card } from "@/components/ui/card"

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h2 className="font-semibold mb-4">Today&apos;s Tasks</h2>
          {/* Content */}
        </Card>
      </div>
    </div>
  )
}