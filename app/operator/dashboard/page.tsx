'use client'

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Card } from '@/components/ui/card'
import { StatCard } from '@/components/stat-card'
import { Droplets, TrendingUp, Factory, AlertCircle, CheckCircle, MinusCircle } from 'lucide-react'

const rawMaterialsLog = [
  { date: 'Dushanba', material: 'Ohak toshi', intake: 120, expectedOutput: 96, actualOutput: 95, difference: -1, cost: 1200 },
  { date: 'Seshanba', material: 'Silik qum', intake: 140, expectedOutput: 112, actualOutput: 110, difference: -2, cost: 1400 },
  { date: 'Chorshanba', material: 'Gips', intake: 160, expectedOutput: 128, actualOutput: 130, difference: 2, cost: 1600 },
  { date: 'Payshanba', material: 'Temir ruda', intake: 130, expectedOutput: 104, actualOutput: 105, difference: 1, cost: 1300 },
  { date: 'Juma', material: 'Ohak toshi', intake: 150, expectedOutput: 120, actualOutput: 125, difference: 5, cost: 1500 },
]

const dailyData = [
  { date: 'Du', intake: 120, produced: 95, target: 100, difference: -5, profit: -500 },
  { date: 'Se', intake: 140, produced: 110, target: 100, difference: 10, profit: 1000 },
  { date: 'Ch', intake: 160, produced: 130, target: 100, difference: 30, profit: 3000 },
  { date: 'Pa', intake: 130, produced: 105, target: 100, difference: 5, profit: 500 },
  { date: 'Ju', intake: 150, produced: 125, target: 100, difference: 25, profit: 2500 },
  { date: 'Sha', intake: 170, produced: 140, target: 100, difference: 40, profit: 4000 },
  { date: 'Yak', intake: 145, produced: 118, target: 100, difference: 18, profit: 1800 },
]

const materialBreakdown = [
  { name: 'Ohak toshi', value: 45 },
  { name: 'Silik qum', value: 25 },
  { name: 'Gips', value: 20 },
  { name: 'Temir ruda', value: 10 },
]

const COLORS = ['#1e3a8a', '#2563eb', '#3b82f6', '#60a5fa']

export default function OperatorDashboard() {
  const totalIntake = rawMaterialsLog.reduce((sum, item) => sum + item.intake, 0)
  const totalExpectedOutput = rawMaterialsLog.reduce((sum, item) => sum + item.expectedOutput, 0)
  const totalActualOutput = rawMaterialsLog.reduce((sum, item) => sum + item.actualOutput, 0)
  const totalDifference = totalActualOutput - totalExpectedOutput
  const totalCost = rawMaterialsLog.reduce((sum, item) => sum + item.cost, 0)
  const efficiency = ((totalActualOutput / totalExpectedOutput) * 100).toFixed(1)

  return (
    <div className="w-full max-w-7xl mx-auto p-3 sm:p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold">Operator Paneli</h1>
        <p className="text-xs sm:text-sm text-muted-foreground">Kunlik ishlab chiqarish va xom ashyo qabul qilish ko'rinishi</p>
      </div>

      {/* Top Stats - Xom ashyo hisoboti */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          title="Bugungi Xom Ashyo"
          value={`${totalIntake} t`}
          change="12%"
          trend="up"
          icon={Droplets}
          variant="primary"
        />
        <StatCard
          title="Kutilgan Mahsulot"
          value={`${totalExpectedOutput} t`}
          change={efficiency}
          trend="up"
          icon={Factory}
        />
        <StatCard
          title="Haqiqiy Mahsulot"
          value={`${totalActualOutput} t`}
          change={efficiency}
          trend="up"
          icon={Factory}
          variant="primary"
        />
        <StatCard
          title="Farq (Profit/Loss)"
          value={`${totalDifference > 0 ? '+' : ''}${totalDifference} t`}
          change={`${((totalDifference / totalExpectedOutput) * 100).toFixed(1)}%`}
          trend={totalDifference >= 0 ? 'up' : 'down'}
          icon={totalDifference >= 0 ? TrendingUp : AlertCircle}
          variant={totalDifference >= 0 ? 'primary' : 'danger'}
        />
      </div>

      {/* Efficiency Info */}
      <Card className="p-4 sm:p-6 border-border bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base sm:text-lg">Ishlab Chiqarish Samaradorligi</h3>
            <p className="text-xs sm:text-sm text-muted-foreground truncate">Xom ashyodan mahsulot chiqarish tezligi {efficiency}%</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-xl sm:text-2xl font-bold text-primary">{efficiency}%</p>
            <p className="text-xs text-muted-foreground">Samaradorlik</p>
          </div>
        </div>
      </Card>

      {/* Charts Grid - responsive stacking */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Production vs Target */}
        <Card className="lg:col-span-2 p-4 sm:p-6 border-border overflow-x-auto">
          <h2 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Haftalik Ishlab Chiqarish Ko'rinishi</h2>
          <div className="w-full h-64 sm:h-80 md:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="date" stroke="var(--color-muted-foreground)" />
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
                <Bar dataKey="intake" fill="var(--color-chart-1)" radius={[8, 8, 0, 0]} name="Qabul qilingan" />
                <Bar dataKey="produced" fill="var(--color-chart-2)" radius={[8, 8, 0, 0]} name="Ishlab chiqarilgan" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Material Breakdown */}
        <Card className="p-4 sm:p-6 border-border flex flex-col">
          <h2 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Xom Ashyo Tarkibi</h2>
          <div className="w-full h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={materialBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}%`}
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {materialBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Production Trend with Profit/Loss */}
      <Card className="p-4 sm:p-6 border-border overflow-x-auto">
        <h2 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Ishlab Chiqarish Trendi va Profit/Loss (7 kun)</h2>
        <div className="w-full h-64 sm:h-80 md:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="date" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '0.5rem',
                }}
                formatter={(value) => {
                  if (typeof value === 'number' && value > 1000) {
                    return [`$${value}`, '']
                  }
                  return [`${value} tonna`, '']
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="produced" stroke="var(--color-chart-2)" strokeWidth={2} name="Ishlab chiqarilgan" />
              <Line type="monotone" dataKey="target" stroke="var(--color-chart-4)" strokeWidth={2} strokeDasharray="5 5" name="Maqsad" />
              <Line type="monotone" dataKey="difference" stroke="var(--color-chart-3)" strokeWidth={2} name="Farq" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Detailed Raw Materials Log */}
      <Card className="p-4 sm:p-6 border-border">
        <h2 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Xom Ashyo va Mahsulot Hisoboti</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold">Sana</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold whitespace-nowrap">Xom Ashyo</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-right font-semibold whitespace-nowrap">Qabuli (t)</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-right font-semibold whitespace-nowrap">Kutilgan (t)</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-right font-semibold whitespace-nowrap">Haqiqiy (t)</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-center font-semibold">Farq</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-right font-semibold">Xaraji</th>
              </tr>
            </thead>
            <tbody>
              {rawMaterialsLog.map((row, idx) => (
                <tr key={idx} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="px-2 sm:px-4 py-2 sm:py-3 font-medium">{row.date}</td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">{row.material}</td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-right font-medium">{row.intake}</td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-right text-muted-foreground">{row.expectedOutput}</td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-right font-semibold">{row.actualOutput}</td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-center">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                      row.difference > 0 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : row.difference < 0
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                    }`}>
                      {row.difference > 0 ? '+' : ''}{row.difference}
                      {row.difference > 0 && <CheckCircle className="w-3 h-3" />}
                      {row.difference < 0 && <MinusCircle className="w-3 h-3" />}
                    </span>
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-right font-medium">${row.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Summary row */}
        <div className="mt-4 p-3 sm:p-4 bg-primary/5 rounded-lg border border-primary/10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 sm:gap-4 text-xs sm:text-sm">
            <div>
              <p className="text-muted-foreground text-xs">Jami Qabul</p>
              <p className="text-sm sm:text-lg font-bold">{totalIntake}t</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Jami Kutilgan</p>
              <p className="text-sm sm:text-lg font-bold">{totalExpectedOutput}t</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Jami Haqiqiy</p>
              <p className="text-sm sm:text-lg font-bold text-primary">{totalActualOutput}t</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Jami Farq</p>
              <p className={`text-sm sm:text-lg font-bold ${totalDifference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {totalDifference > 0 ? '+' : ''}{totalDifference}t
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Samaradorlik</p>
              <p className="text-sm sm:text-lg font-bold">{efficiency}%</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
