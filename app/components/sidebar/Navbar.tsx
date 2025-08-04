import { Button } from '@/app/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface NavbarProps {
  sidebarWidth: number
  onGoBack: () => void
  onGoForward: () => void
  canGoBack: boolean
  canGoForward: boolean
}

export function Navbar({ sidebarWidth: _sidebarWidth, onGoBack, onGoForward, canGoBack, canGoForward }: NavbarProps) {
  const handleDoubleClick = () => {
    window.api.invoke('window-maximize-toggle')
  }

  return (
    <div 
      className="h-12 bg-white border-b border-gray-100 flex items-center justify-end px-4 sidebar-drag-area"
      onDoubleClick={handleDoubleClick}
    >
      {/* Back/Forward Buttons - Right Side */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={onGoBack} disabled={!canGoBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={onGoForward} disabled={!canGoForward}>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
