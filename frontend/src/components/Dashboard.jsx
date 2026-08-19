import { useNavigate } from 'react-router-dom'


function Dashboard() {
  const navigate = useNavigate()

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
          <p>No wellness entries yet. Your first check-in will appear here.</p>
        </section>
      </main>
    </div>
  )
}

export default Dashboard