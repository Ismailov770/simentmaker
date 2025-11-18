'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/modal'
import { DataTable } from '@/components/data-table'
import { Plus, TrendingUp, Printer } from 'lucide-react'

type Sale = {
  id: number
  customer: string
  destination: string
  product: string
  amount: number
  pricePerTon: number
  total: number
  date: string
  profit: number
}

const sampleSales: Sale[] = [
  { id: 1, customer: 'ABC Qurilish', destination: 'Shimoli Viloyat', product: 'M400 Sement', amount: 450, pricePerTon: 280, total: 126000, date: '2025-01-15', profit: 12600 },
  { id: 2, customer: 'XYZ Binolari', destination: 'Janubi Shahar', product: 'M500 Sement', amount: 320, pricePerTon: 280, total: 89600, date: '2025-01-15', profit: 8960 },
  { id: 3, customer: 'Metro Beton', destination: 'G\'arbiy Zona', product: 'Shpaklyovka', amount: 280, pricePerTon: 275, total: 77000, date: '2025-01-14', profit: 7084 },
  { id: 4, customer: 'Global Sanoat', destination: 'Sharqiy Port', product: 'M400 Sement', amount: 520, pricePerTon: 285, total: 148200, date: '2025-01-14', profit: 15048 },
  { id: 5, customer: 'Sanoat Aralashi', destination: 'Markaziy Hub', product: 'M500 Sement', amount: 380, pricePerTon: 280, total: 106400, date: '2025-01-13', profit: 10816 },
]

export default function SalesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null)
  const [sales, setSales] = useState<Sale[]>(sampleSales)
  const [formData, setFormData] = useState({
    customer: '',
    destination: '',
    product: '',
    amount: '',
    pricePerTon: '',
  })

  const handleSubmit = () => {
    const amount = parseFloat(formData.amount || '0')
    const pricePerTon = parseFloat(formData.pricePerTon || '0')
    const total = amount * pricePerTon
    const profit = total * 0.1
    const newSale: Sale = {
      id: sales.length ? sales[sales.length - 1].id + 1 : 1,
      customer: formData.customer,
      destination: formData.destination,
      product: formData.product,
      amount,
      pricePerTon,
      total,
      profit,
      date: new Date().toISOString().slice(0, 10),
    }
    setSales((prev) => [...prev, newSale])
    setIsModalOpen(false)
    setFormData({ customer: '', destination: '', product: '', amount: '', pricePerTon: '' })
  }

  const handlePrintReceipt = (sale: Sale) => {
    const printWindow = window.open('', '', 'height=600,width=400')
    if (!printWindow) return
    const content = `
      <html>
      <head>
        <title>Sotuv Cheki</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .receipt { border: 1px solid #ccc; padding: 20px; }
          .header { text-align: center; margin-bottom: 20px; }
          .title { font-size: 18px; font-weight: bold; }
          .divider { border-top: 1px dashed #000; margin: 10px 0; }
          .row { display: flex; justify-content: space-between; margin: 8px 0; }
          .label { font-weight: bold; }
          .total { font-size: 16px; font-weight: bold; margin-top: 15px; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="header">
            <div class="title">SOTUV CHEKI</div>
            <div style="font-size: 12px; color: #666;">SimentMaker Tizim</div>
          </div>
          <div class="divider"></div>
          <div class="row">
            <span class="label">Xaridor:</span>
            <span>${sale.customer}</span>
          </div>
          <div class="row">
            <span class="label">Manzil:</span>
            <span>${sale.destination}</span>
          </div>
          <div class="row">
            <span class="label">Mahsulot:</span>
            <span>${sale.product}</span>
          </div>
          <div class="divider"></div>
          <div class="row">
            <span class="label">Miqdor:</span>
            <span>${sale.amount} tonna</span>
          </div>
          <div class="row">
            <span class="label">Narx/Tonna:</span>
            <span>$${sale.pricePerTon}</span>
          </div>
          <div class="divider"></div>
          <div class="row total">
            <span>JAMI NARX:</span>
            <span>$${sale.total.toLocaleString()}</span>
          </div>
          <div class="row" style="margin-top: 15px;">
            <span class="label">Profit:</span>
            <span>$${sale.profit.toLocaleString()}</span>
          </div>
          <div class="row">
            <span class="label">Sana:</span>
            <span>${sale.date}</span>
          </div>
          <div class="divider"></div>
          <div class="divider"></div>
          <div class="row" style="margin-top: 15px;">
            <div style="flex:1; text-align:left;">
              <div class="label">Pechat:</div>
              <div style="margin-top: 20px; height: 60px; border: 1px dashed #999;"></div>
            </div>
            <div style="flex:1; text-align:right;">
              <div class="label">Mas'ul shaxs imzosi:</div>
              <div style="margin-top: 20px; border-top: 1px solid #000; width: 140px; margin-left:auto;"></div>
            </div>
          </div>
          <div class="footer">
            <p>Rahmat xaridingiz uchun!</p>
            <p>${new Date().toLocaleString()}</p>
          </div>
        </div>
      </body>
      </html>
    `
    printWindow.document.write(content)
    printWindow.document.close()
    printWindow.print()
  }

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0)
  const totalSold = sales.reduce((sum, sale) => sum + sale.amount, 0)
  const totalProfit = sales.reduce((sum, sale) => sum + sale.profit, 0)

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Sotuv Boshqaruvi</h1>
          <p className="text-muted-foreground">Sement sotuvlarini kuzatib boring va boshqarish</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Sotuv Qo'shish
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border-border bg-gradient-to-br from-primary/5 to-accent/5">
          <p className="text-sm text-muted-foreground mb-1">Jami Daromad</p>
          <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-2">5 ta sotuvdan</p>
        </Card>
        <Card className="p-4 border-border">
          <p className="text-sm text-muted-foreground mb-1">Jami Sotilgan (tonna)</p>
          <p className="text-2xl font-bold">{totalSold.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-2">O'rtacha: {(totalSold / sales.length).toFixed(0)}t</p>
        </Card>
        <Card className="p-4 border-border">
          <p className="text-sm text-muted-foreground mb-1">O'rtacha Narx</p>
          <p className="text-2xl font-bold">${(totalRevenue / totalSold).toFixed(2)}/t</p>
          <p className="text-xs text-muted-foreground mt-2">Tonna uchun</p>
        </Card>
        <Card className="p-4 border-border">
          <p className="text-sm text-muted-foreground mb-1">Jami Profit</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">${totalProfit.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-2">{((totalProfit/totalRevenue)*100).toFixed(1)}% margin</p>
        </Card>
      </div>

      {/* Add Sale Modal */}
      <Modal
        isOpen={isModalOpen}
        title="Yangi Sotuv Qo'shish"
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">Xaridor Nomi</label>
            <Input
              placeholder="Xaridor nomini kiriting"
              value={formData.customer}
              onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">Manzil</label>
            <Input
              placeholder="Manzilni kiriting"
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">Mahsulot</label>
            <select
              value={formData.product}
              onChange={(e) => setFormData({ ...formData, product: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
            >
              <option value="">Mahsulotni tanlang</option>
              <option value="M400 Sement">M400 Sement</option>
              <option value="M500 Sement">M500 Sement</option>
              <option value="Shpaklyovka">Shpaklyovka</option>
              <option value="Boshqa">Boshqa</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">Miqdor (tonna)</label>
            <Input
              type="number"
              placeholder="Miqdorni kiriting"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2.5">Narx / Tonna ($)</label>
            <Input
              type="number"
              placeholder="Narxni kiriting"
              value={formData.pricePerTon}
              onChange={(e) => setFormData({ ...formData, pricePerTon: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors placeholder:text-slate-400"
            />
          </div>

          {formData.amount && formData.pricePerTon && (
            <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-700">
              <p className="text-sm text-slate-600 dark:text-slate-400">Jami Narx</p>
              <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                ${(parseFloat(formData.amount) * parseFloat(formData.pricePerTon)).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </Modal>

      {/* Sales Table */}
      <Card className="p-6 border-border">
        <h2 className="text-lg font-semibold mb-6">Sotuv Recordlari</h2>
        <DataTable
          columns={[
            { key: 'customer', label: 'Xaridor', sortable: true },
            { key: 'destination', label: 'Manzil', sortable: true },
            { key: 'product', label: 'Mahsulot', sortable: true },
            { key: 'amount', label: 'Miqdor (t)', sortable: true, width: '100px' },
            { key: 'pricePerTon', label: 'Narx/t ($)', sortable: true, width: '110px' },
            { key: 'total', label: 'Jami ($)', sortable: true, width: '130px' },
            { key: 'profit', label: 'Profit ($)', sortable: true, width: '130px' },
            { key: 'date', label: 'Sana', sortable: true },
            { key: 'action', label: 'Harakat', width: '100px' },
          ]}
          data={sales.map((s) => ({
            ...s,
            pricePerTon: `$${s.pricePerTon}`,
            total: `$${s.total.toLocaleString()}`,
            profit: `$${s.profit.toLocaleString()}`,
            action: (
              <button
                onClick={() => handlePrintReceipt(s)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors text-sm font-medium"
              >
                <Printer className="w-4 h-4" />
                Chek
              </button>
            ),
          }))}
        />
      </Card>
    </div>
  )
}
