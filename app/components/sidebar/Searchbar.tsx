import { Input } from '@/app/components/ui/input'
import { Search } from 'lucide-react'

interface SearchbarProps {
  sidebarWidth: number
}

export function Searchbar({ sidebarWidth }: SearchbarProps) {
  if (sidebarWidth <= 150) return null

  return (
    <div className="px-4 py-3 border-b border-gray-100">
      <div className="relative">
        <Input
          placeholder={sidebarWidth > 200 ? 'Search or enter website name' : 'Search...'}
          className="w-full pl-10 h-8 bg-gray-50 border-gray-200 rounded-lg"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
    </div>
  )
}
