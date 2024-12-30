'use client'
import { Calendar, CheckSquare, Target, BarChart2, Home } from 'lucide-react'

export function Sidebar() {
  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/' },
    { icon: CheckSquare, label: 'Tasks', href: '/tasks' },
    { icon: Target, label: 'Goals', href: '/goals' },
    { icon: Calendar, label: 'Calendar', href: '/calendar' },
    { icon: BarChart2, label: 'Progress', href: '/progress' },
  ]

  return (
    <div className="w-64 bg-white border-r h-screen">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">Ceomaster</h1>
      </div>
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 p-3 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  )
}