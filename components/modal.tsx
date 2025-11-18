'use client'

import { ReactNode } from 'react'
import { X } from 'lucide-react'
import { Button } from './ui/button'

interface ModalProps {
  isOpen: boolean
  title: string
  children: ReactNode
  onClose: () => void
  onSubmit?: () => void
  submitLabel?: string
}

export function Modal({
  isOpen,
  title,
  children,
  onClose,
  onSubmit,
  submitLabel = 'Saqlash',
}: ModalProps) {
  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-40 animate-fade-in"
        onClick={onClose}
      />

      <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl animate-slide-in-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 max-h-96 overflow-y-auto">
          {children}
        </div>

        {/* Footer */}
        {onSubmit && (
          <div className="flex gap-3 px-6 py-5 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Bekor qilish
            </Button>
            <Button
              onClick={onSubmit}
              className="flex-1"
            >
              {submitLabel}
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
