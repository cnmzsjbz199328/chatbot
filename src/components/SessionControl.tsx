'use client'

import React, { useState } from 'react'

interface SessionControlProps {
  compact?: boolean,
  onRetentionChange?: (hours: number) => void
}

const SessionControl = ({ 
  compact = true,
  onRetentionChange
}: SessionControlProps) => {
  const [retentionHours, setRetentionHours] = useState<number>(24)

  const handleRetentionChange = (hours: number) => {
    setRetentionHours(hours)
    if (onRetentionChange) {
      onRetentionChange(hours)
    }
  }

  const retentionOptions = [
    { value: 1, label: '1小时' },
    { value: 6, label: '6小时' },
    { value: 24, label: '24小时' },
    { value: 168, label: '7天' }
  ]

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-600">数据保留:</span>
        <select
          value={retentionHours}
          onChange={(e) => handleRetentionChange(Number(e.target.value))}
          className="text-sm border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {retentionOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          数据保留时间
        </label>
        <select
          value={retentionHours}
          onChange={(e) => handleRetentionChange(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {retentionOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default SessionControl
