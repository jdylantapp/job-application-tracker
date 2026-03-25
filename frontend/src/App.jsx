import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import { useAuth } from './context/AuthContext'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className="flex flex-col h-screen">
      <Toaster />
      <Navbar />
      {user ? <DashboardPage /> : <HomePage />}
    </div>
  )
}

export default App