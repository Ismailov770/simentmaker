'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/modal'
import { Plus, Phone, Mail, MapPin } from 'lucide-react'

const sampleClients = [
  { id: 1, name: 'ABC Construction', contact: 'John Smith', phone: '+1-555-0101', email: 'john@abc.com', location: 'North District', totalOrders: 12, status: 'Active' },
  { id: 2, name: 'XYZ Builders', contact: 'Sarah Johnson', phone: '+1-555-0102', email: 'sarah@xyz.com', location: 'South City', totalOrders: 10, status: 'Active' },
  { id: 3, name: 'Metro Concrete', contact: 'Mike Brown', phone: '+1-555-0103', email: 'mike@metro.com', location: 'West Zone', totalOrders: 8, status: 'Active' },
  { id: 4, name: 'Global Industries', contact: 'Emily Davis', phone: '+1-555-0104', email: 'emily@global.com', location: 'East Port', totalOrders: 15, status: 'Active' },
  { id: 5, name: 'Industrial Mix', contact: 'Robert Wilson', phone: '+1-555-0105', email: 'robert@industrial.com', location: 'Central Hub', totalOrders: 6, status: 'Inactive' },
]

export default function ClientsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [clients, setClients] = useState(sampleClients)
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    phone: '',
    email: '',
    location: '',
  })

  const handleSubmit = () => {
    const newClient = {
      id: clients.length ? clients[clients.length - 1].id + 1 : 1,
      name: formData.name,
      contact: formData.contact,
      phone: formData.phone,
      email: formData.email,
      location: formData.location,
      totalOrders: 0,
      status: 'Active',
    }
    setClients((prev) => [...prev, newClient])
    setIsModalOpen(false)
    setFormData({ name: '', contact: '', phone: '', email: '', location: '' })
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mijozlar</h1>
          <p className="text-muted-foreground">Xaridor ma'lumotlarini boshqarish va ularni kuzatib borish</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Mijoz Qo'shish
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="p-4 border-border">
          <p className="text-sm text-muted-foreground mb-1">Jami Mijozlar</p>
          <p className="text-2xl font-bold">{clients.length}</p>
        </Card>
        <Card className="p-4 border-border">
          <p className="text-sm text-muted-foreground mb-1">Faol Mijozlar</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{clients.filter(c => c.status === 'Active').length}</p>
        </Card>
      </div>

      {/* Add Client Modal */}
      <Modal
        isOpen={isModalOpen}
        title="Yangi Mijoz Qo'shish"
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">Kompaniya Nomi</label>
            <Input
              placeholder="Kompaniya nomini kiriting"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">Bog'lanish Shaxsi</label>
            <Input
              placeholder="Bog'lanish shaxsining nomini kiriting"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">Telefon</label>
            <Input
              placeholder="Telefon raqamini kiriting"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">Email</label>
            <Input
              type="email"
              placeholder="Email kiriting"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">Manzil</label>
            <Input
              placeholder="Manzilni kiriting"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors placeholder:text-slate-400"
            />
          </div>
        </div>
      </Modal>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <Card key={client.id} className="p-6 border-border hover:border-primary/50 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">{client.name}</h3>
                <p className="text-sm text-muted-foreground">{client.contact}</p>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                client.status === 'Active' 
                  ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
              }`}>
                {client.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{client.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="truncate">{client.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{client.location}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">Jami Buyurtmalar</p>
              <p className="text-lg font-semibold">{client.totalOrders}</p>
            </div>

            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">Tahrir</Button>
              <Button variant="outline" size="sm" className="flex-1">Bog'lanish</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
