'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/modal'
import { DataTable } from '@/components/data-table'
import { Plus, TrendingUp, AlertCircle } from 'lucide-react'

const sampleMaterials = [
  { id: 1, type: 'Ohak toshi', amount: 125, supplier: 'A Yetkazuvchi', date: '2025-01-15', time: '08:30', cost: 1250, quality: 'Yaxshi' },
  { id: 2, type: 'Silik qum', amount: 80, supplier: 'B Yetkazuvchi', date: '2025-01-15', time: '10:15', cost: 800, quality: 'Yaxshi' },
  { id: 3, type: 'Gips', amount: 45, supplier: 'A Yetkazuvchi', date: '2025-01-14', time: '14:20', cost: 450, quality: 'O\'rta' },
  { id: 4, type: 'Temir ruda', amount: 30, supplier: 'C Yetkazuvchi', date: '2025-01-14', time: '09:45', cost: 300, quality: 'Yaxshi' },
  { id: 5, type: 'Ohak toshi', amount: 100, supplier: 'B Yetkazuvchi', date: '2025-01-13', time: '11:00', cost: 1000, quality: 'Yaxshi' },
]

export default function RawMaterialsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [materials, setMaterials] = useState(sampleMaterials)
  const [formData, setFormData] = useState({
    type: '',
    amount: '',
    supplier: '',
    date: '',
    time: '',
    cost: '',
  })

  const handleSubmit = () => {
    const amount = parseFloat(formData.amount || '0')
    const cost = parseFloat(formData.cost || '0')
    const newMaterial = {
      id: materials.length ? materials[materials.length - 1].id + 1 : 1,
      type: formData.type,
      amount,
      supplier: formData.supplier,
      date: formData.date || new Date().toISOString().slice(0, 10),
      time: formData.time || new Date().toTimeString().slice(0, 5),
      cost,
      quality: 'Yaxshi',
    }
    setMaterials((prev) => [...prev, newMaterial])
    setIsModalOpen(false)
    setFormData({ type: '', amount: '', supplier: '', date: '', time: '', cost: '' })
  }

  const totalCost = materials.reduce((sum, m) => sum + m.cost, 0)
  const totalAmount = materials.reduce((sum, m) => sum + m.amount, 0)

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Xom Ashyo Qabuli</h1>
          <p className="text-muted-foreground">Kiruvchi materiallarni qayd qiling va kuzatib boring</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Xom Ashyo Qo'shish
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 border-border bg-gradient-to-br from-primary/5 to-accent/5">
          <p className="text-sm text-muted-foreground mb-1">Jami Qabuli</p>
          <p className="text-2xl font-bold">{totalAmount} tonna</p>
          <p className="text-xs text-muted-foreground mt-2">{materials.length} ta recorddan</p>
        </Card>
        <Card className="p-4 border-border">
          <p className="text-sm text-muted-foreground mb-1">Jami Xaraji</p>
          <p className="text-2xl font-bold">${totalCost.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-2">O'rtacha: {(materials.length ? (totalCost / materials.length).toFixed(0) : 0)}/ta</p>
        </Card>
        <Card className="p-4 border-border">
          <p className="text-sm text-muted-foreground mb-1">O'rtacha Qabuli</p>
          <p className="text-2xl font-bold">{(materials.length ? (totalAmount / materials.length).toFixed(0) : 0)} tonna</p>
          <p className="text-xs text-muted-foreground mt-2">Kunlik o'rtacha</p>
        </Card>
      </div>

      {/* Add Material Modal */}
      <Modal
        isOpen={isModalOpen}
        title="Yangi Xom Ashyo Qo'shish"
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">Xom Ashyo Turi</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
            >
              <option value="">Turi tanlang</option>
              <option value="Ohak toshi">Ohak toshi</option>
              <option value="Silik qum">Silik qum</option>
              <option value="Gips">Gips</option>
              <option value="Temir ruda">Temir ruda</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Miqdor (tonna)</label>
            <Input
              type="number"
              placeholder="Miqdorni kiriting"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Yetkazuvchi Nomi</label>
            <Input
              placeholder="Yetkazuvchining nomini kiriting"
              value={formData.supplier}
              onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium mb-2">Sana</label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors placeholder:text-slate-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Vaqt</label>
              <Input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Xaraji ($)</label>
            <Input
              type="number"
              placeholder="Xarajini kiriting"
              value={formData.cost}
              onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
            />
          </div>
        </div>
      </Modal>

      {/* Materials Table */}
      <Card className="p-6 border-border">
        <h2 className="text-lg font-semibold mb-6">Xom Ashyo Recordlari</h2>
        <DataTable
          columns={[
            { key: 'type', label: 'Turi', sortable: true },
            { key: 'amount', label: 'Miqdor (t)', sortable: true },
            { key: 'supplier', label: 'Yetkazuvchi', sortable: true },
            { key: 'date', label: 'Sana', sortable: true },
            { key: 'time', label: 'Vaqt', sortable: false },
            { key: 'cost', label: 'Xaraji', sortable: true },
            { key: 'quality', label: 'Sifat', sortable: true },
          ]}
          data={materials.map(m => ({ ...m, cost: `$${m.cost}` }))}
        />
      </Card>
    </div>
  )
}
