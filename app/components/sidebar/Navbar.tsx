import { Button } from '@/app/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface NavbarProps {
  sidebarWidth: number
}

export function Navbar({ sidebarWidth }: NavbarProps) {
  return (
    <div className="h-12 bg-white border-b border-gray-100 flex items-center justify-end px-4">
      {/* Back/Forward Buttons - Right Side */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
