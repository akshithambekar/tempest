import { Button } from '@/app/components/ui/button'
import { Globe, Plus, Command } from 'lucide-react'
import { useEffect, useRef } from 'react'

interface MainContentProps {
  currentUrl?: string
  onTitleChange?: (title: string) => void
}

export function MainContent({ currentUrl, onTitleChange }: MainContentProps) {
  const webviewRef = useRef<any>(null)

  useEffect(() => {
    const webview = webviewRef.current
    if (!webview || !currentUrl) return

    const handleTitleUpdated = (event: any) => {
      const title = event.title
      if (title && onTitleChange) {
        onTitleChange(title)
      }
    }

    const handleDomReady = () => {
      // Get title after DOM is ready
      if (webview.getTitle && onTitleChange) {
        const title = webview.getTitle()
        if (title) {
          onTitleChange(title)
        }
      }
    }

    // Listen for title changes
    webview.addEventListener('page-title-updated', handleTitleUpdated)
    webview.addEventListener('dom-ready', handleDomReady)

    return () => {
      webview.removeEventListener('page-title-updated', handleTitleUpdated)
      webview.removeEventListener('dom-ready', handleDomReady)
    }
  }, [currentUrl, onTitleChange])

  return (
    <div className="flex-1 flex flex-col">
      {/* Browser Content */}
      <div className="flex-1 bg-white">
        {currentUrl ? (
          <webview 
            ref={webviewRef}
            src={currentUrl} 
            className="w-full h-full" 
            webpreferences="nodeintegration=false" 
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">Welcome to Tempest</h1>
              </div>
              <div className="flex items-center justify-center gap-4 pt-4">
                <Button className="rounded-full">
                  <Plus className="w-4 h-4 mr-2" />
                  New Tab
                </Button>
                <Button variant="outline" className="rounded-full bg-transparent">
                  <Command className="w-4 h-4 mr-2" />
                  Commands
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
