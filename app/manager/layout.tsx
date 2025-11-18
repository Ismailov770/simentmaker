import { Sidebar } from '@/components/sidebar'
import { TopBar } from '@/components/top-bar'

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden md:block md:w-64 flex-shrink-0">
        <Sidebar role="manager" />
      </div>

      {/* Mobile sidebar - overlays on top */}
      <div className="md:hidden fixed inset-0 pointer-events-none z-30">
        <Sidebar role="manager" />
      </div>

      <div className="flex-1 flex flex-col min-h-screen w-full md:w-auto">
        <TopBar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
