'use client'

import { Card } from '@/components/ui/card'
import { MapPin, Truck, CheckCircle, Clock } from 'lucide-react'

const deliveries = [
  { id: 1, client: 'ABC Construction', location: 'North District', amount: 450, status: 'Delivered', date: '2025-01-15' },
  { id: 2, client: 'XYZ Builders', location: 'South City', amount: 320, status: 'In Transit', date: '2025-01-15' },
  { id: 3, client: 'Metro Concrete', location: 'West Zone', amount: 280, status: 'Pending', date: '2025-01-14' },
  { id: 4, client: 'Global Industries', location: 'East Port', amount: 520, status: 'Delivered', date: '2025-01-14' },
  { id: 5, client: 'Industrial Mix', location: 'Central Hub', amount: 380, status: 'In Transit', date: '2025-01-13' },
]

const statusConfig = {
  'Delivered': { color: 'bg-green-100 dark:bg-green-900', textColor: 'text-green-700 dark:text-green-400', icon: CheckCircle },
  'In Transit': { color: 'bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700', textColor: 'text-slate-700 dark:text-slate-300', icon: Truck },
  'Pending': { color: 'bg-yellow-100 dark:bg-yellow-900', textColor: 'text-yellow-700 dark:text-yellow-400', icon: Clock },
}

export default function DistributionPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Distribution Management</h1>
        <p className="text-muted-foreground">Track deliveries and distribution status</p>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 border-border">
          <p className="text-sm text-muted-foreground mb-1">Delivered</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">2</p>
        </Card>
        <Card className="p-4 border-border">
          <p className="text-sm text-muted-foreground mb-1">In Transit</p>
          <p className="text-2xl font-bold text-slate-600 dark:text-slate-400">2</p>
        </Card>
        <Card className="p-4 border-border">
          <p className="text-sm text-muted-foreground mb-1">Pending</p>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">1</p>
        </Card>
      </div>

      {/* Delivery List View */}
      <Card className="p-6 border-border">
        <h2 className="text-lg font-semibold mb-6">Active Deliveries</h2>
        <div className="space-y-3">
          {deliveries.map((delivery) => {
            const StatusIcon = statusConfig[delivery.status as keyof typeof statusConfig]?.icon || MapPin
            const config = statusConfig[delivery.status as keyof typeof statusConfig]
            return (
              <div key={delivery.id} className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div className={`${config.color} p-2 rounded-lg`}>
                  <StatusIcon className={`w-5 h-5 ${config.textColor}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{delivery.client}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {delivery.location}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{delivery.amount} tons</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${config.color} ${config.textColor}`}>
                    {delivery.status}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Map View Alternative */}
      <Card className="p-6 border-border">
        <h2 className="text-lg font-semibold mb-6">Distribution Regions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {['North District', 'South City', 'West Zone', 'East Port', 'Central Hub'].map((region) => (
            <div key={region} className="p-4 rounded-lg border border-border text-center hover:bg-muted/50 transition-colors">
              <MapPin className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="font-semibold text-sm">{region}</p>
              <p className="text-xs text-muted-foreground mt-1">Active</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
