import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


function Dashboard() {
  const navigate = useNavigate()
  const [entries, setEntries] = useState([])

useEffect(() => {
  const fetchEntries = async () => {
    const token = localStorage.getItem('token')

    try {
      const response = await fetch('http://localhost:5000/api/wellness', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      console.log('Wellness entries:', data)

      if (response.ok) {
        setEntries(data)
      }
    } catch (error) {
      console.error('Error fetching wellness entries:', error)
    }
  }

  fetchEntries()
}, [])

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <p className="dashboard-label">YOUR WELLNESS SPACE</p>
          <h1>Welcome back</h1>
          <p className="dashboard-subtitle">
            Take a moment to check in with yourself.
          </p>
        </div>
      </header>
    

      <main className="dashboard-content">
        <section className="checkin-card">
          <div>
            <p className="card-label">TODAY'S CHECK-IN</p>
            <h2>How are you feeling today?</h2>
            <p>
              Track your mood, energy and thoughts in a few minutes.
            </p>
          </div>

          <button className="primary-button" onClick={() => navigate('/checkin')}>
            Start today's check-in
          </button>
        </section>

        <section className="wellness-section">
  <h2>Your wellness</h2>

  {entries.length === 0 ? (
    <p>No wellness entries yet. Your first check-in will appear here.</p>
  ) : (
    <div>
      {entries.map((entry) => (
        <div key={entry._id}>
          <p>Mood: {entry.mood}/10</p>
          <p>Energy: {entry.energy}/10</p>
          <p>Sleep: {entry.sleep}/10</p>
          <p>Stress: {entry.stress}/10</p>
          <p>Anxiety: {entry.anxiety}/10</p>
          <p>Emotion: {entry.emotion}</p>
        </div>
      ))}
    </div>
  )}
</section>
</main>
</div>
  )
}


export default Dashboard