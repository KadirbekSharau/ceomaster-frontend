export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="flex h-screen">
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    )
  }