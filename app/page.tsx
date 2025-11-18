'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Sun, Moon, Factory } from 'lucide-react'
import { useEffect } from 'react'

export default function LoginPage() {
  const [isDark, setIsDark] = useState(false)
  const [role, setRole] = useState<'operator' | 'manager' | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (role === 'operator') {
      window.location.href = '/operator/dashboard'
    } else if (role === 'manager') {
      window.location.href = '/manager/dashboard'
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Background gradient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/10 to-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-40 w-80 h-80 bg-gradient-to-br from-accent/5 to-primary/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg gradient-navy flex items-center justify-center">
              <Factory className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">SimentMaker</h1>
              <p className="text-xs text-muted-foreground">Sement Ishlab Chiqarish Tizimi</p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Ranglarni o'zgartirish"
          >
            {mounted && (isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />)}
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left side - Illustration section */}
            <div className="hidden md:flex flex-col justify-center">
              <div className="space-y-6">
                <div>
                  <h2 className="text-4xl font-bold mb-2">Xush kelibsiz</h2>
                  <h3 className="text-4xl font-bold text-primary">SimentMaker'ga</h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Sement ishlab chiqarish va ombor boshqaruvi uchun to'liq platforma. Real vaqt analitikasi va intuitive boshqaruv bilan operatsiyalaringizni optimallashtiring.
                </p>

                {/* Feature boxes */}
                <div className="space-y-4 pt-4">
                  <div className="flex gap-3 items-start">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Factory className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Ishlab chiqarish Kuzatishi</h4>
                      <p className="text-sm text-muted-foreground">Kunlik sement ishlab chiqarish va maqsadlarni kuzatib boring</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Factory className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Xom Ashyo Boshqaruvi</h4>
                      <p className="text-sm text-muted-foreground">Xom ashyo qabul qilish va kuzatishni qayd qiling</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Factory className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Sotuvlar va Analitika</h4>
                      <p className="text-sm text-muted-foreground">Chuqur ma'lumotlar va sotuv boshqaruvi</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Login form */}
            <Card className="border-border/50 shadow-xl backdrop-blur-sm">
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6">Kirish</h2>

                {!role ? (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground mb-4">Davom etish uchun o'z rolni tanlang</p>
                    <Button
                      onClick={() => setRole('operator')}
                      variant="default"
                      className="w-full h-12 text-base font-semibold"
                    >
                      Operator Sifatida Kirish (Boshlovchi)
                    </Button>
                    <Button
                      onClick={() => setRole('manager')}
                      variant="outline"
                      className="w-full h-12 text-base font-semibold"
                    >
                      Menejir Sifatida Kirish (Ish Boshqaruvchi)
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-primary p-0 h-auto mb-4"
                      onClick={() => setRole(null)}
                    >
                      ← Rol tanloviga qaytish
                    </Button>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Email Manzili</label>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Parol</label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-11"
                      />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span>Meni eslab qol</span>
                      </label>
                      <button type="button" className="text-primary hover:underline">
                        Parolni unutdingizmi?
                      </button>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-11 font-semibold"
                      disabled={!email || !password}
                    >
                      Kirish
                    </Button>

                    <p className="text-center text-xs text-muted-foreground pt-2">
                      Demo: istalgan email/parol
                    </p>
                  </form>
                )}
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border mt-12 py-6 text-center text-sm text-muted-foreground">
        <p>&copy; 2025 SimentMaker. Barcha huquqlar himoyalangan.</p>
      </footer>
    </div>
  )
}
