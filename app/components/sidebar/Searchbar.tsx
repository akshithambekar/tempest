import { useState, useRef, useEffect } from 'react'
import { Input } from '@/app/components/ui/input'
import { Search, Globe, Clock } from 'lucide-react'

interface SearchbarProps {
  sidebarWidth: number
  onNavigate: (url: string) => void
  hasActiveTab?: boolean
}

interface SearchSuggestion {
  id: string
  title: string
  url: string
  type: 'search' | 'url' | 'history'
}

export function Searchbar({ sidebarWidth, onNavigate, hasActiveTab = false }: SearchbarProps) {
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Popular search suggestions
  const popularSuggestions: SearchSuggestion[] = [
    { id: '1', title: 'Google', url: 'https://google.com', type: 'url' },
    { id: '2', title: 'YouTube', url: 'https://youtube.com', type: 'url' },
    { id: '3', title: 'GitHub', url: 'https://github.com', type: 'url' },
    { id: '4', title: 'Stack Overflow', url: 'https://stackoverflow.com', type: 'url' },
    { id: '5', title: 'Twitter', url: 'https://twitter.com', type: 'url' },
  ]

  // Mock history suggestions
  const historySuggestions: SearchSuggestion[] = [
    { id: 'h1', title: 'React Documentation', url: 'https://react.dev', type: 'history' },
    { id: 'h2', title: 'TypeScript Handbook', url: 'https://typescriptlang.org', type: 'history' },
  ]

  const isUrl = (input: string) => {
    try {
      new URL(input)
      return true
    } catch {
      return /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/.test(input) || input.includes('.')
    }
  }

  const generateSuggestions = (value: string) => {
    if (!value.trim()) {
      return [...historySuggestions.slice(0, 2), ...popularSuggestions.slice(0, 3)]
    }

    const filtered = [...popularSuggestions, ...historySuggestions].filter(
      suggestion =>
        suggestion.title.toLowerCase().includes(value.toLowerCase()) ||
        suggestion.url.toLowerCase().includes(value.toLowerCase())
    )

    const searchSuggestion: SearchSuggestion = {
      id: 'search',
      title: hasActiveTab ? `Search "${value}" in current tab` : `Search for "${value}"`,
      url: `https://google.com/search?q=${encodeURIComponent(value)}`,
      type: 'search'
    }

    return [searchSuggestion, ...filtered].slice(0, 5)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    setSuggestions(generateSuggestions(value))
    setShowSuggestions(true)
    setSelectedIndex(-1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      navigate(inputValue.trim())
    }
  }

  const navigate = (input: string) => {
    let url = input

    if (isUrl(input)) {
      if (!input.startsWith('http://') && !input.startsWith('https://')) {
        url = `https://${input}`
      }
    } else {
      url = `https://google.com/search?q=${encodeURIComponent(input)}`
    }

    onNavigate(url)
    setInputValue('')
    setShowSuggestions(false)
    setSelectedIndex(-1)
  }

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    if (suggestion.type === 'search') {
      navigate(inputValue)
    } else {
      onNavigate(suggestion.url)
      setInputValue('')
      setShowSuggestions(false)
      setSelectedIndex(-1)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === 'Enter') {
        handleSubmit(e)
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex])
        } else {
          handleSubmit(e)
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  const handleFocus = () => {
    setSuggestions(generateSuggestions(inputValue))
    setShowSuggestions(true)
  }

  const handleBlur = (e: React.FocusEvent) => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      if (!suggestionsRef.current?.contains(e.relatedTarget as Node)) {
        setShowSuggestions(false)
        setSelectedIndex(-1)
      }
    }, 150)
  }

  if (sidebarWidth <= 150) return null

  return (
    <div className="px-4 py-3 border-b border-gray-100 relative">
      <div className="relative">
        <Input
          ref={inputRef}
          placeholder={
            sidebarWidth > 300 
              ? (hasActiveTab ? 'Search in current tab or enter URL' : 'Search or enter website URL')
              : 'Search'
          }
          className="w-full pl-10 pr-4 h-8 !bg-gray-50 border-gray-300 rounded-lg text-gray-900 text-sm focus:!bg-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        
        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div 
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
          >
            {suggestions.map((suggestion, index) => (
              <div
                key={suggestion.id}
                className={`flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-50 ${
                  index === selectedIndex ? 'bg-blue-50 border-l-2 border-blue-400' : ''
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="flex-shrink-0">
                  {suggestion.type === 'search' && (
                    <Search className="h-4 w-4 text-gray-400" />
                  )}
                  {suggestion.type === 'url' && (
                    <Globe className="h-4 w-4 text-blue-500" />
                  )}
                  {suggestion.type === 'history' && (
                    <Clock className="h-4 w-4 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-gray-900 truncate">
                    {suggestion.title}
                  </div>
                  {suggestion.type !== 'search' && sidebarWidth > 250 && (
                    <div className="text-xs text-gray-500 truncate">
                      {suggestion.url}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
