import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import WellnessCheckin from './components/WellnessCheckin'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/checkin" element={<WellnessCheckin />} />

          <Route
            path="/"
            element={<Navigate to="/signup" replace />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App