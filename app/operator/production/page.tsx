'use client'

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card } from '@/components/ui/card'
import { StatCard } from '@/components/stat-card'
import { Factory, Target, CheckCircle, AlertCircle } from 'lucide-react'

const productionData = [
  { day: 'Du', planned: 100, actual: 95, difference: -5, profit: -500 },
  { day: 'Se', planned: 100, actual: 110, difference: 10, profit: 1000 },
  { day: 'Ch', planned: 100, actual: 130, difference: 30, profit: 3000 },
  { day: 'Pa', planned: 100, actual: 105, difference: 5, profit: 500 },
  { day: 'Ju', planned: 100, actual: 125, difference: 25, profit: 2500 },
  { day: 'Sha', planned: 100, actual: 140, difference: 40, profit: 4000 },
  { day: 'Yak', planned: 100, actual: 118, difference: 18, profit: 1800 },
]

const weeklyData = [
  { week: '1-hafta', planned: 700, actual: 680, difference: -20 },
  { week: '2-hafta', planned: 700, actual: 750, difference: 50 },
  { week: '3-hafta', planned: 700, actual: 820, difference: 120 },
  { week: '4-hafta', planned: 700, actual: 710, difference: 10 },
]

export default function ProductionPage() {
  const totalPlanned = productionData.reduce((sum, d) => sum + d.planned, 0)
  const totalActual = productionData.reduce((sum, d) => sum + d.actual, 0)
  const totalDifference = totalActual - totalPlanned
  const efficiency = ((totalActual / totalPlanned) * 100).toFixed(1)
  const totalProfit = productionData.reduce((sum, d) => sum + d.profit, 0)

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Ishlab Chiqarish Kuzatishi</h1>
        <p className="text-muted-foreground">Rejalashtirgan vs Haqiqiy sement ishlab chiqarishni kuzatib boring</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Bugungi Rejalash"
          value="100 tonna"
          icon={Target}
          variant="primary"
        />
        <StatCard
          title="Bugungi Haqiqiy"
          value="118 tonna"
          change="18%"
          trend="up"
          icon={Factory}
          variant="secondary"
        />
        <StatCard
          title="Farq (Profit)"
          value="+18 tonna"
          change="18%"
          trend="up"
          icon={CheckCircle}
        />
        <StatCard
          title="Haftalik Profit"
          value={`$${totalProfit.toLocaleString()}`}
          change={`${efficiency}%`}
          trend={parseFloat(efficiency) >= 100 ? 'up' : 'down'}
          icon={Factory}
          variant={parseFloat(efficiency) >= 100 ? 'primary' : 'danger'}
        />
      </div>

      {/* Efficiency Banner */}
      <Card className="p-6 border-border bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            {parseFloat(efficiency) >= 100 ? (
              <CheckCircle className="w-6 h-6 text-green-600" />
            ) : (
              <AlertCircle className="w-6 h-6 text-orange-600" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">Ishlab Chiqarish Samaradorligi</h3>
            <p className="text-sm text-muted-foreground">
              Jami: {totalActual} / {totalPlanned} tonna ({efficiency}%)
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">{efficiency}%</p>
            <p className="text-xs text-muted-foreground">Samaradorlik</p>
          </div>
        </div>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Production */}
        <Card className="p-6 border-border">
          <h2 className="text-lg font-semibold mb-6">Kunlik Ishlab Chiqarish (Bu hafta)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '0.5rem',
                }}
                formatter={(value) => [`${value} tonna`, '']}
              />
              <Legend />
              <Bar dataKey="planned" fill="var(--color-chart-4)" radius={[8, 8, 0, 0]} name="Rejalash" />
              <Bar dataKey="actual" fill="var(--color-chart-2)" radius={[8, 8, 0, 0]} name="Haqiqiy" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Weekly Production Trend */}
        <Card className="p-6 border-border">
          <h2 className="text-lg font-semibold mb-6">Haftalik Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="week" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '0.5rem',
                }}
                formatter={(value) => [`${value} tonna`, '']}
              />
              <Legend />
              <Line type="monotone" dataKey="planned" stroke="var(--color-chart-4)" strokeWidth={2} strokeDasharray="5 5" name="Rejalash" />
              <Line type="monotone" dataKey="actual" stroke="var(--color-chart-2)" strokeWidth={2} name="Haqiqiy" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Production Details */}
      <Card className="p-6 border-border">
        <h2 className="text-lg font-semibold mb-6">Batafsil Ma'lumotlar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-sm text-muted-foreground mb-1">Oylik Maqsad</p>
            <p className="text-2xl font-bold">2,800 tonna</p>
            <p className="text-xs text-muted-foreground mt-2">Rejalashtirilgan</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-sm text-muted-foreground mb-1">Oyda Ishlab Chiqarilgan</p>
            <p className="text-2xl font-bold">2,845 tonna</p>
            <p className="text-xs text-muted-foreground mt-2">Haqiqiy natija</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-sm text-muted-foreground mb-1">Bajarilish Foizi</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">101.6%</p>
            <p className="text-xs text-muted-foreground mt-2">Maqsaddan oshdi</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-sm text-muted-foreground mb-1">Qolgan Kunlar</p>
            <p className="text-2xl font-bold">16 kun</p>
            <p className="text-xs text-muted-foreground mt-2">Oyning oxirigacha</p>
          </div>
        </div>
      </Card>

      {/* Profit/Loss Chart */}
      <Card className="p-6 border-border">
        <h2 className="text-lg font-semibold mb-6">Kunlik Profit/Loss</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={productionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem',
              }}
              formatter={(value) => {
                if (value > 0) return [`+$${value}`, 'Profit']
                return [`$${value}`, 'Loss']
              }}
            />
            <Bar dataKey="profit" fill="var(--color-chart-2)" radius={[8, 8, 0, 0]} name="Profit/Loss ($)" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
