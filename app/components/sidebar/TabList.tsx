import type React from 'react'
import { Button } from '@/app/components/ui/button'
import { X, Globe } from 'lucide-react'

interface Tab {
  id: string
  url: string
  title: string
}

interface TablistProps {
  sidebarWidth: number
  tabs: Tab[]
  activeTabId: string | null
  onTabClick: (tabId: string) => void
  onTabClose: (tabId: string) => void
}

export function Tablist({ sidebarWidth, tabs, activeTabId, onTabClick, onTabClose }: TablistProps) {
  const handleTabClose = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onTabClose(tabId)
  }

  if (tabs.length === 0) {
    return (
      <div className="flex-1 px-4 py-3 overflow-y-auto">
        <div className="text-center text-gray-500 text-sm py-8">
          No open tabs
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 px-4 py-3 overflow-y-auto">
      <div className="space-y-1">
        {tabs.map((tab) => {
          const isActive = activeTabId === tab.id
          
          return (
            <div
              key={tab.id}
              onClick={() => onTabClick(tab.id)}
              className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer group transition-colors ${
                isActive ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-100'
              }`}
            >
              <div className="w-4 h-4 bg-gray-500 rounded flex items-center justify-center">
                <Globe className="w-2.5 h-2.5 text-white" />
              </div>
              {sidebarWidth > 140 && (
                <>
                  <span className="text-sm flex-1 truncate text-gray-900" title={tab.title}>
                    {tab.title}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => handleTabClose(tab.id, e)}
                    className={`h-4 w-4 p-0 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
