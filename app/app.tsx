import { Sidebar } from './components/sidebar/Sidebar'
import { MainContent } from './components/MainContent'

export default function App() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <MainContent />
    </div>
  )
}
