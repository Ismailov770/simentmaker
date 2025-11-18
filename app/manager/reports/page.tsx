'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FileText, Download, Filter } from 'lucide-react'

export default function ReportsPage() {
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [reportType, setReportType] = useState('sales')

  const reports = [
    { id: 1, name: 'Monthly Sales Report', date: '2025-01-15', type: 'Sales', status: 'Ready' },
    { id: 2, name: 'Production Summary', date: '2025-01-14', type: 'Production', status: 'Ready' },
    { id: 3, name: 'Inventory Status', date: '2025-01-13', type: 'Inventory', status: 'Ready' },
    { id: 4, name: 'Client Performance', date: '2025-01-12', type: 'Clients', status: 'Ready' },
    { id: 5, name: 'Distribution Analysis', date: '2025-01-11', type: 'Distribution', status: 'Ready' },
  ]

  const downloadCsv = (filename: string) => {
    const headers = ['Name', 'Date', 'Type', 'Status']
    const rows = reports.map((r) => [r.name, r.date, r.type, r.status])
    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Reports</h1>
        <p className="text-muted-foreground">Generate and export business reports</p>
      </div>

      {/* Report Generator */}
      <Card className="p-6 border-border">
        <h2 className="text-lg font-semibold mb-6">Generate Report</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Report Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="sales">Sales Report</option>
                <option value="production">Production Report</option>
                <option value="inventory">Inventory Report</option>
                <option value="clients">Client Report</option>
                <option value="distribution">Distribution Report</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">From Date</label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">To Date</label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button className="w-full h-11 gap-2">
                <Filter className="w-4 h-4" />
                Generate
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Export Options */}
      <Card className="p-6 border-border">
        <h2 className="text-lg font-semibold mb-6">Export Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="h-12 gap-2"
            onClick={() => downloadCsv('reports.csv')}
          >
            <Download className="w-4 h-4" />
            Export as CSV
          </Button>
          <Button
            variant="outline"
            className="h-12 gap-2"
            onClick={() => downloadCsv('reports.xlsx.csv')}
          >
            <Download className="w-4 h-4" />
            Export as Excel
          </Button>
          <Button
            variant="outline"
            className="h-12 gap-2"
            onClick={() => downloadCsv('reports.pdf.csv')}
          >
            <Download className="w-4 h-4" />
            Export as PDF
          </Button>
        </div>
      </Card>

      {/* Recent Reports */}
      <Card className="p-6 border-border">
        <h2 className="text-lg font-semibold mb-6">Recent Reports</h2>
        <div className="space-y-3">
          {reports.map((report) => (
            <div key={report.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-4">
                <FileText className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="font-semibold">{report.name}</h3>
                  <p className="text-sm text-muted-foreground">{report.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-medium px-2 py-1 rounded bg-primary/10 text-primary">
                  {report.type}
                </span>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
