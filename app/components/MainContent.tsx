import { Button } from '@/app/components/ui/button'
import { Globe, Plus, Command } from 'lucide-react'

export function MainContent() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Browser Content */}
      <div className="flex-1 bg-white">
        <div className="h-full flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Welcome to Arc</h1>
              <p className="text-gray-600">A browser that's designed for the way you work</p>
            </div>
            <div className="flex items-center justify-center gap-4 pt-4">
              <Button className="rounded-full">
                <Plus className="w-4 h-4 mr-2" />
                New Tab
              </Button>
              <Button variant="outline" className="rounded-full bg-transparent">
                <Command className="w-4 h-4 mr-2" />
                Command Palette
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
