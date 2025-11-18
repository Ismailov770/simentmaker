import { Card } from './ui/card'
import { Type as type, LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  icon?: LucideIcon
  trend?: 'up' | 'down'
  variant?: 'default' | 'primary' | 'secondary'
}

export function StatCard({
  title,
  value,
  change,
  icon: Icon,
  trend,
  variant = 'default',
}: StatCardProps) {
  const variantClasses = {
    default: 'bg-card border-border',
    primary: 'bg-primary/5 border-primary/20',
    secondary: 'bg-accent/5 border-accent/20',
  }

  return (
    <Card className={`${variantClasses[variant]} p-6 border animate-slide-in-up hover-lift`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold">{value}</h3>
            {change && (
              <span
                className={`text-sm font-semibold transition-smooth ${
                  trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}
              >
                {trend === 'up' ? '↑' : '↓'} {change}
              </span>
            )}
          </div>
        </div>
        {Icon && (
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group hover:scale-110 transition-smooth">
            <Icon className="w-6 h-6 text-primary transition-smooth" />
          </div>
        )}
      </div>
    </Card>
  )
}
