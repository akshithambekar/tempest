import { useState } from 'react'
import { Sidebar } from './components/sidebar/Sidebar'
import { MainContent } from './components/MainContent'

interface Tab {
  id: string
  url: string
  title: string
}

export default function App() {
  const [tabs, setTabs] = useState<Tab[]>([])
  const [activeTabId, setActiveTabId] = useState<string | null>(null)
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const getCurrentTab = () => tabs.find(tab => tab.id === activeTabId)
  const currentUrl = getCurrentTab()?.url || ''

  const navigateToUrl = (url: string) => {
    // Add protocol if missing
    const formattedUrl = url.startsWith('http') ? url : `https://${url}`

    if (activeTabId) {
      // Update existing tab
      setTabs(prevTabs =>
        prevTabs.map(tab =>
          tab.id === activeTabId
            ? { ...tab, url: formattedUrl, title: getDomainName(formattedUrl) }
            : tab
        )
      )
    } else {
      // Create new tab if none active
      const newTabId = `tab-${Date.now()}`
      const newTab: Tab = {
        id: newTabId,
        url: formattedUrl,
        title: getDomainName(formattedUrl)
      }
      setTabs(prevTabs => [...prevTabs, newTab])
      setActiveTabId(newTabId)
    }

    // Update history
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(formattedUrl)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const switchToTab = (tabId: string) => {
    setActiveTabId(tabId)
    const tab = tabs.find(t => t.id === tabId)
    if (tab) {
      // Update history when switching tabs
      const newHistory = history.slice(0, historyIndex + 1)
      newHistory.push(tab.url)
      setHistory(newHistory)
      setHistoryIndex(newHistory.length - 1)
    }
  }

  const closeTab = (tabId: string) => {
    setTabs(prevTabs => {
      const newTabs = prevTabs.filter(tab => tab.id !== tabId)
      
      // If closing active tab, switch to another tab or clear
      if (activeTabId === tabId) {
        if (newTabs.length > 0) {
          setActiveTabId(newTabs[newTabs.length - 1].id)
        } else {
          setActiveTabId(null)
        }
      }
      
      return newTabs
    })
  }

  const getDomainName = (url: string): string => {
    try {
      const domain = new URL(url).hostname
      return domain.replace('www.', '')
    } catch {
      return url
    }
  }

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      const url = history[newIndex]
      
      if (activeTabId) {
        setTabs(prevTabs =>
          prevTabs.map(tab =>
            tab.id === activeTabId
              ? { ...tab, url, title: getDomainName(url) }
              : tab
          )
        )
      }
    }
  }

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      const url = history[newIndex]
      
      if (activeTabId) {
        setTabs(prevTabs =>
          prevTabs.map(tab =>
            tab.id === activeTabId
              ? { ...tab, url, title: getDomainName(url) }
              : tab
          )
        )
      }
    }
  }

  const createNewTab = () => {
    const newTabId = Date.now().toString()
    const newTab = {
      id: newTabId,
      title: 'New Tab',
      url: 'https://www.google.com'
    }
    
    setTabs(prevTabs => [...prevTabs, newTab])
    setActiveTabId(newTabId)
    
    // Add to history
    setHistory(prev => [...prev.slice(0, historyIndex + 1), 'https://www.google.com'])
    setHistoryIndex(prev => prev + 1)
  }

  const handleTitleChange = (title: string) => {
    if (activeTabId) {
      setTabs(prevTabs =>
        prevTabs.map(tab =>
          tab.id === activeTabId
            ? { ...tab, title }
            : tab
        )
      )
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        onNavigate={navigateToUrl}
        onGoBack={goBack}
        onGoForward={goForward}
        canGoBack={historyIndex > 0}
        canGoForward={historyIndex < history.length - 1}
        currentUrl={currentUrl}
        tabs={tabs}
        activeTabId={activeTabId}
        onTabSwitch={switchToTab}
        onTabClose={closeTab}
        onNewTab={createNewTab}
      />
      <MainContent currentUrl={currentUrl} onTitleChange={handleTitleChange} />
    </div>
  )
}
