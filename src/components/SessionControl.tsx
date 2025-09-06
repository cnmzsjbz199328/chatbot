'use client'

import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { sessionManager } from '@/lib/session-manager'

const SessionControl = () => {
  const [sessionId, setSessionId] = useState<string>('')
  const [duration, setDuration] = useState<number>(24)
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    // 获取当前会话ID
    const currentSessionId = sessionManager.getSessionId()
    setSessionId(currentSessionId)
  }, [])

  const handleCreateSession = async () => {
    setIsCreating(true)
    try {
      await sessionManager.createSession(sessionId, duration)
      alert(`会话已设置！数据将在 ${duration} 小时后自动清理。`)
    } catch (error) {
      console.error('Failed to create session:', error)
      alert('会话设置失败，请检查网络连接。')
    } finally {
      setIsCreating(false)
    }
  }

  const handleClearSession = async () => {
    if (confirm('确定要清除当前会话吗？这将丢失所有上传的文件和聊天记录。')) {
      try {
        // 先调用API清理会话数据
        const response = await fetch('/api/cron/cleanup-sessions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer cleanup-token' // 添加授权头
          }
        });

        if (response.ok) {
          // 清除本地session
          sessionManager.clearSession()
          // 重新获取新的session ID
          const newSessionId = sessionManager.getSessionId()
          setSessionId(newSessionId)
          alert('会话已清理完成！')
        } else {
          throw new Error('Failed to cleanup session')
        }
      } catch (error) {
        console.error('Failed to clear session:', error)
        // 如果API调用失败，仍然清除本地session
        sessionManager.clearSession()
        const newSessionId = sessionManager.getSessionId()
        setSessionId(newSessionId)
        alert('本地会话已清除，但可能需要等待自动清理过期数据。')
      }
    }
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">会话管理</h3>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            当前会话ID
          </label>
          <div className="text-xs text-gray-500 font-mono bg-white px-2 py-1 rounded border">
            {sessionId}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            数据保留时间 (小时)
          </label>
          <select
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={1}>1 小时</option>
            <option value={6}>6 小时</option>
            <option value={12}>12 小时</option>
            <option value={24}>24 小时 (推荐)</option>
            <option value={72}>72 小时</option>
            <option value={168}>1 周</option>
          </select>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleCreateSession}
            disabled={isCreating}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            {isCreating ? '设置中...' : '设置会话时间'}
          </Button>
          
          <Button
            onClick={handleClearSession}
            variant="outline"
            className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
          >
            清除会话
          </Button>
        </div>
      </div>

      <div className="mt-3 text-xs text-gray-500">
        💡 提示：会话时间到期后，您的文件和聊天记录将自动删除以保护隐私。
      </div>
    </div>
  )
}

export default SessionControl
