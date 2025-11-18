'use client'

import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Sun, Moon, Settings, Bell } from 'lucide-react'

export function TopBar() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)
  }, [])

  const toggleTheme = () => {
    if (!mounted) return
    const html = document.documentElement
    html.classList.toggle('dark')
    setIsDark(!isDark)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm transition-all duration-200">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex-1">
          <h2 className="text-lg font-semibold">Xush Kelibsiz</h2>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex transition-all duration-200 hover:scale-110"
            onClick={toggleTheme}
          >
            {mounted && (isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />)}
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex transition-all duration-200 hover:scale-110">
            <Bell className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex transition-all duration-200 hover:scale-110">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
