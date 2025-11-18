'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/modal'
import { DataTable } from '@/components/data-table'
import { Plus, DollarSign, AlertCircle } from 'lucide-react'

const sampleExpenses = [
  { id: 1, category: 'Ustun Ishi', amount: 5200, date: '2025-01-15', description: 'Pechni tamir qilish' },
  { id: 2, category: 'Ishchilar', amount: 12500, date: '2025-01-15', description: 'Haftalik ish haqi' },
  { id: 3, category: 'Elektr', amount: 8300, date: '2025-01-14', description: 'Elektr energiyasi' },
  { id: 4, category: 'Transport', amount: 3500, date: '2025-01-14', description: 'Mashinaning yonilg\'i' },
  { id: 5, category: 'Jihozlar', amount: 15000, date: '2025-01-13', description: 'Yangi konveyor tasmasi' },
]

export default function ExpensesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    date: '',
    description: '',
  })

  const handleSubmit = () => {
    console.log('Yangi xaraji:', formData)
    setIsModalOpen(false)
    setFormData({ category: '', amount: '', date: '', description: '' })
  }

  const totalExpenses = sampleExpenses.reduce((sum, exp) => sum + exp.amount, 0)
  const categoryBreakdown = {
    'Ustun Ishi': sampleExpenses.filter(e => e.category === 'Ustun Ishi').reduce((sum, e) => sum + e.amount, 0),
    'Ishchilar': sampleExpenses.filter(e => e.category === 'Ishchilar').reduce((sum, e) => sum + e.amount, 0),
    'Elektr': sampleExpenses.filter(e => e.category === 'Elektr').reduce((sum, e) => sum + e.amount, 0),
    'Transport': sampleExpenses.filter(e => e.category === 'Transport').reduce((sum, e) => sum + e.amount, 0),
    'Jihozlar': sampleExpenses.filter(e => e.category === 'Jihozlar').reduce((sum, e) => sum + e.amount, 0),
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Xaraji Kuzatishi</h1>
          <p className="text-muted-foreground">Operatsion xarajlarni kuzatib boring va qayd qiling</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Xaraji Qo'shish
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-4 border-border bg-gradient-to-br from-primary/5 to-accent/5">
          <p className="text-sm text-muted-foreground mb-1">Jami Xaraji</p>
          <p className="text-2xl font-bold">${totalExpenses.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-2">5 ta recorddan</p>
        </Card>
        <Card className="p-4 border-border">
          <p className="text-sm text-muted-foreground mb-1">Ustun Ishi</p>
          <p className="text-2xl font-bold">${categoryBreakdown['Ustun Ishi'].toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-2">{((categoryBreakdown['Ustun Ishi']/totalExpenses)*100).toFixed(0)}% dagi</p>
        </Card>
        <Card className="p-4 border-border">
          <p className="text-sm text-muted-foreground mb-1">Ishchilar</p>
          <p className="text-2xl font-bold">${categoryBreakdown['Ishchilar'].toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-2">{((categoryBreakdown['Ishchilar']/totalExpenses)*100).toFixed(0)}% dagi</p>
        </Card>
        <Card className="p-4 border-border">
          <p className="text-sm text-muted-foreground mb-1">Elektr</p>
          <p className="text-2xl font-bold">${categoryBreakdown['Elektr'].toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-2">{((categoryBreakdown['Elektr']/totalExpenses)*100).toFixed(0)}% dagi</p>
        </Card>
        <Card className="p-4 border-border">
          <p className="text-sm text-muted-foreground mb-1">Boshqa</p>
          <p className="text-2xl font-bold">${(categoryBreakdown['Transport'] + categoryBreakdown['Jihozlar']).toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-2">{(((categoryBreakdown['Transport'] + categoryBreakdown['Jihozlar'])/totalExpenses)*100).toFixed(0)}% dagi</p>
        </Card>
      </div>

      {/* Add Expense Modal */}
      <Modal
        isOpen={isModalOpen}
        title="Yangi Xaraji Qo'shish"
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">Kategoriya</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
            >
              <option value="">Kategoriya tanlang</option>
              <option value="Ustun Ishi">Ustun Ishi</option>
              <option value="Ishchilar">Ishchilar</option>
              <option value="Elektr">Elektr</option>
              <option value="Transport">Transport</option>
              <option value="Jihozlar">Jihozlar</option>
              <option value="Boshqa">Boshqa</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Miqdor ($)</label>
            <Input
              type="number"
              placeholder="Miqdorni kiriting"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Sana</label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tafsili</label>
            <textarea
              placeholder="Tafsili kiriting"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors placeholder:text-slate-400 resize-none"
              rows={3}
            />
          </div>
        </div>
      </Modal>

      {/* Expenses Table */}
      <Card className="p-6 border-border">
        <h2 className="text-lg font-semibold mb-6">Xaraji Recordlari</h2>
        <DataTable
          columns={[
            { key: 'category', label: 'Kategoriya', sortable: true },
            { key: 'amount', label: 'Miqdor ($)', sortable: true, width: '120px' },
            { key: 'date', label: 'Sana', sortable: true },
            { key: 'description', label: 'Tafsili', sortable: false },
          ]}
          data={sampleExpenses.map((e) => ({ ...e, amount: `$${e.amount.toLocaleString()}` }))}
        />
      </Card>
    </div>
  )
}
