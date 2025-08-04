import { useState } from 'react'
import { Input } from '@/app/components/ui/input'
import { Search } from 'lucide-react'

interface SearchbarProps {
  sidebarWidth: number
  onNavigate: (url: string) => void
}

export function Searchbar({ sidebarWidth, onNavigate }: SearchbarProps) {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      onNavigate(inputValue.trim())
      setInputValue('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }
  if (sidebarWidth <= 150) return null

  return (
    <div className="px-4 py-3 border-b border-gray-100">
      <div className="relative">
        <Input
          placeholder={sidebarWidth > 300 ? 'Search or enter website name' : 'Search'}
          className="w-full pl-10 pr-10 h-8 !bg-gray-50 border-gray-300 rounded-lg text-gray-900 text-center text-sm focus:!bg-gray-50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
    </div>
  )
}
