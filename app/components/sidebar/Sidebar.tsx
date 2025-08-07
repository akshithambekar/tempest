'use client'

import type React from 'react'
import { useState, useRef, useCallback, useEffect } from 'react'
import { Button } from '@/app/components/ui/button'
import { Plus, Download, Settings } from 'lucide-react'
import { Navbar } from './Navbar'
import { Searchbar } from './Searchbar'
import { Tablist } from './TabList'

interface SidebarProps {
  onNavigate: (url: string) => void
  onGoBack: () => void
  onGoForward: () => void
  canGoBack: boolean
  canGoForward: boolean
}

export function Sidebar({ onNavigate, onGoBack, onGoForward, canGoBack, canGoForward }: SidebarProps) {
  const [sidebarWidth, setSidebarWidth] = useState(320)
  const [isResizing, setIsResizing] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsResizing(true)
    e.preventDefault()
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) return

      const newWidth = e.clientX
      const minWidth = 200
      const maxWidth = Math.min(500, window.innerWidth / 3)

      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setSidebarWidth(newWidth)
      }
    },
    [isResizing]
  )

  const handleMouseUp = useCallback(() => {
    setIsResizing(false)
  }, [])

  // Add global mouse event listeners
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isResizing, handleMouseMove, handleMouseUp])

  // Handle window resize and initial width check
  useEffect(() => {
    const handleWindowResize = () => {
      const maxAllowedWidth = window.innerWidth / 3
      if (sidebarWidth > maxAllowedWidth) {
        setSidebarWidth(Math.max(200, maxAllowedWidth))
      }
    }

    handleWindowResize()

    window.addEventListener('resize', handleWindowResize)
    return () => window.removeEventListener('resize', handleWindowResize)
  }, [sidebarWidth])

  return (
    <div
      ref={sidebarRef}
      className="bg-white border-r border-gray-200 flex flex-col relative"
      style={{ width: `${sidebarWidth}px` }}
    >
      {/* Navbar */}
      <Navbar
        sidebarWidth={sidebarWidth}
        onGoBack={onGoBack}
        onGoForward={onGoForward}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
      />

      {/* Searchbar */}
      <Searchbar sidebarWidth={sidebarWidth} onNavigate={onNavigate} />

      {/* Tablist */}
      <Tablist sidebarWidth={sidebarWidth} />

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Plus className="h-4 w-4" />
          </Button>
          {sidebarWidth > 150 && (
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Resize Handle */}
      <div
        className="absolute top-0 right-0 w-2 h-full cursor-col-resize group hover:bg-blue-500/20 transition-colors z-10"
        onMouseDown={handleMouseDown}
      >
        {/* Visual Notch Indicator */}
        <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-center">
          <div className="w-1 h-8 bg-gray-300 rounded-full opacity-60 group-hover:opacity-100 group-hover:bg-blue-500 transition-all"></div>
        </div>
      </div>
    </div>
  )
}
