import { useState } from 'react'
import { Sidebar } from './components/sidebar/Sidebar'
import { MainContent } from './components/MainContent'

export default function App() {
  const [currentUrl, setCurrentUrl] = useState<string>('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const navigateToUrl = (url: string) => {
    // Add protocol if missing
    const formattedUrl = url.startsWith('http') ? url : `https://${url}`

    setCurrentUrl(formattedUrl)

    // Update history
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(formattedUrl)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      setCurrentUrl(history[newIndex])
    }
  }

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      setCurrentUrl(history[newIndex])
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
      />
      <MainContent currentUrl={currentUrl} />
    </div>
  )
}
