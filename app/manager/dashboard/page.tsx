'use client'

import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { Card } from '@/components/ui/card'
import { StatCard } from '@/components/stat-card'
import { TrendingUp, Package, DollarSign, Users } from 'lucide-react'

const salesData = [
  { month: 'Jan', revenue: 125000, sales: 450 },
  { month: 'Feb', revenue: 145000, sales: 520 },
  { month: 'Mar', revenue: 165000, sales: 590 },
  { month: 'Apr', revenue: 155000, sales: 550 },
  { month: 'May', revenue: 185000, sales: 660 },
  { month: 'Jun', revenue: 210000, sales: 750 },
]

const distributionData = [
  { region: 'North', amount: 2400 },
  { region: 'South', amount: 2100 },
  { region: 'East', amount: 2200 },
  { region: 'West', amount: 2290 },
  { region: 'Central', amount: 2000 },
]

const topClients = [
  { name: 'Client A', sales: 45000, orders: 12 },
  { name: 'Client B', sales: 38000, orders: 10 },
  { name: 'Client C', sales: 32000, orders: 8 },
  { name: 'Client D', sales: 28000, orders: 7 },
  { name: 'Client E', sales: 25000, orders: 6 },
]

const COLORS = ['#1e3a8a', '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd']

export default function ManagerDashboard() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Manager Dashboard</h1>
        <p className="text-muted-foreground">Sales, production, and inventory overview</p>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Cement Produced"
          value="12,450 tons"
          change="8%"
          trend="up"
          icon={Package}
          variant="primary"
        />
        <StatCard
          title="Total Cement Sold"
          value="11,200 tons"
          change="12%"
          trend="up"
          icon={TrendingUp}
        />
        <StatCard
          title="Warehouse Stock"
          value="1,250 tons"
          change="3%"
          trend="down"
          icon={Package}
          variant="primary"
        />
        <StatCard
          title="Sales Revenue"
          value="$1.23M"
          change="15%"
          trend="up"
          icon={DollarSign}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend */}
        <Card className="lg:col-span-2 p-6 border-border">
          <h2 className="text-lg font-semibold mb-6">Revenue & Sales Trend (6 Months)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-chart-1)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '0.5rem',
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="var(--color-chart-1)"
                fillOpacity={1}
                fill="url(#colorRevenue)"
                name="Revenue ($)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Distribution by Region */}
        <Card className="p-6 border-border">
          <h2 className="text-lg font-semibold mb-6">Distribution by Region</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={distributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.region}: ${entry.amount}t`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="amount"
              >
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Sales vs Orders */}
      <Card className="p-6 border-border">
        <h2 className="text-lg font-semibold mb-6">Sales Volume Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem',
              }}
            />
            <Legend />
            <Bar dataKey="sales" fill="var(--color-chart-2)" radius={[8, 8, 0, 0]} name="Sales (tons)" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Top Clients */}
      <Card className="p-6 border-border">
        <h2 className="text-lg font-semibold mb-6">Top Clients</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left font-semibold">Client Name</th>
                <th className="px-4 py-3 text-right font-semibold">Total Sales</th>
                <th className="px-4 py-3 text-right font-semibold">Orders</th>
                <th className="px-4 py-3 text-right font-semibold">Avg Order Value</th>
              </tr>
            </thead>
            <tbody>
              {topClients.map((client, idx) => (
                <tr key={idx} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 font-medium">{client.name}</td>
                  <td className="px-4 py-3 text-right">${client.sales.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">{client.orders}</td>
                  <td className="px-4 py-3 text-right">${(client.sales / client.orders).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
