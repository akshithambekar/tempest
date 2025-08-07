import type React from 'react'
import { useState } from 'react'
import { Button } from '@/app/components/ui/button'
import { X, Globe, Github, Twitter, Youtube, FileText, Calendar, Home, Mail, Figma } from 'lucide-react'

interface Tab {
  id: string
  title: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  isActive?: boolean
}

interface TablistProps {
  sidebarWidth: number
}

const tabs: Tab[] = [
  {
    id: '1',
    title: 'Google',
    icon: Globe,
    color: 'bg-blue-600',
  },
  {
    id: '2',
    title: 'GitHub - Where the world builds software',
    icon: Github,
    color: 'bg-green-500',
  },
  {
    id: '3',
    title: 'Twitter / X',
    icon: Twitter,
    color: 'bg-blue-400',
  },
  {
    id: '4',
    title: 'YouTube',
    icon: Youtube,
    color: 'bg-red-600',
  },
  {
    id: '5',
    title: 'Notion - Notes & Docs',
    icon: FileText,
    color: 'bg-orange-500',
  },
  {
    id: '6',
    title: 'Google Calendar',
    icon: Calendar,
    color: 'bg-indigo-500',
  },
  {
    id: '7',
    title: 'Dashboard',
    icon: Home,
    color: 'bg-blue-500',
  },
  {
    id: '8',
    title: 'Gmail',
    icon: Mail,
    color: 'bg-red-500',
  },
  {
    id: '9',
    title: 'Figma',
    icon: Figma,
    color: 'bg-purple-500',
  },
]

export function Tablist({ sidebarWidth }: TablistProps) {
  const [activeTabs, setActiveTabs] = useState<string[]>(['1'])
  const [activeTabId, setActiveTabId] = useState('1')

  const handleTabClick = (tabId: string) => {
    setActiveTabId(tabId)
    if (!activeTabs.includes(tabId)) {
      setActiveTabs([...activeTabs, tabId])
    }
  }

  const handleTabClose = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveTabs(activeTabs.filter(id => id !== tabId))
    if (activeTabId === tabId && activeTabs.length > 1) {
      const newActiveTab = activeTabs.find(id => id !== tabId)
      if (newActiveTab) setActiveTabId(newActiveTab)
    }
  }

  return (
    <div className="flex-1 px-4 py-3 overflow-y-auto">
      <div className="space-y-1">
        {tabs.map((tab) => {
          const IconComponent = tab.icon
          const isActive = activeTabId === tab.id
          const isOpen = activeTabs.includes(tab.id)
          
          return (
            <div
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer group transition-colors ${
                isActive ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-100'
              }`}
            >
              <div className={`w-4 h-4 ${tab.color} rounded flex items-center justify-center`}>
                <IconComponent className="w-2.5 h-2.5 text-white" />
              </div>
              {sidebarWidth > 140 && (
                <>
                  <span className="text-sm flex-1 truncate text-gray-900">{tab.title}</span>
                  {isOpen && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleTabClose(tab.id, e)}
                      className={`h-4 w-4 p-0 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
