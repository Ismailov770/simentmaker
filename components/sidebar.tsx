'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { LayoutDashboard, Layers, TrendingUp, DollarSign, LogOut, Menu, X, Factory, BarChart3, Users, FileText, MapPin } from 'lucide-react'

interface SidebarLink {
  name: string
  href: string
  icon: React.ReactNode
}

interface SidebarProps {
  role: 'operator' | 'manager'
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const operatorLinks: SidebarLink[] = [
    { name: 'Dashboard', href: '/operator/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Xom Ashyo', href: '/operator/raw-materials', icon: <Layers className="w-5 h-5" /> },
    { name: 'Ishlab Chiqarish', href: '/operator/production', icon: <Factory className="w-5 h-5" /> },
    { name: 'Xarajatlar', href: '/operator/expenses', icon: <DollarSign className="w-5 h-5" /> },
  ]

  const managerLinks: SidebarLink[] = [
    { name: 'Dashboard', href: '/manager/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Sotuvlar', href: '/manager/sales', icon: <TrendingUp className="w-5 h-5" /> },
    { name: 'Doiraviy Taqsimot', href: '/manager/distribution', icon: <MapPin className="w-5 h-5" /> },
    { name: 'Mijozlar', href: '/manager/clients', icon: <Users className="w-5 h-5" /> },
    { name: 'Hisobotlar', href: '/manager/reports', icon: <FileText className="w-5 h-5" /> },
  ]

  const links = role === 'operator' ? operatorLinks : managerLinks

  return (
    <>
      {/* Mobile toggle - fixed top-16 to appear below the header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-0 left-4 z-40 p-2 hover:bg-muted rounded-lg md:hidden transition-all duration-200 mt-2"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-screen w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-transform duration-300 z-40 md:translate-x-0 md:static md:z-auto overflow-y-auto pt-16 md:pt-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <nav className="p-4 space-y-2">
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                pathname === link.href
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              )}
            >
              <span className="flex-shrink-0">{link.icon}</span>
              <span className="font-medium text-sm">{link.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 space-y-2 border-t border-sidebar-border">
          <Button
            variant="outline"
            className="w-full justify-start gap-2 border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-200"
            onClick={() => (window.location.href = '/')}
          >
            <LogOut className="w-4 h-4" />
            Chiqish
          </Button>
        </div>
      </aside>
    </>
  )
}
