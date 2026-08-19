import { useState } from 'react'

function WellnessCheckin() {
    const [mood, setMood] = useState(5)
    const [energy, setEnergy] = useState(5)
    const [sleep, setSleep] = useState(5)
    const [stress, setStress] = useState(5)
    const [anxiety, setAnxiety] = useState(5)
    const [emotion, setEmotion] = useState('')
    const [journal, setJournal] = useState('')


  const handleSubmit = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem('token')

    try {
      const response = await fetch('http://localhost:5000/api/wellness', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
        mood,
        energy,
        sleep,
        stress,
        anxiety,
        emotion,
        journal,
        date: new Date(),
        }),
      })

      const data = await response.json()

      console.log(data)

      if (response.ok) {
        console.log('Wellness entry created successfully')
      }
    } catch (error) {
      console.error('Error creating wellness entry:', error)
    }
  }

  return (
    <div className="checkin-page">
      <div className="checkin-card">
        <p className="card-label">TODAY'S CHECK-IN</p>

        <h1>How are you feeling?</h1>

        <p className="checkin-subtitle">
          Take a moment to reflect on how you're doing today.
        </p>

        <form onSubmit={handleSubmit}>

        <div className="metric">
            <label>Mood: {mood}/10</label>
            <input
            type="range"
            min="1"
            max="10"
            value={mood}
            onChange={(e) => setMood(Number(e.target.value))}
            />
        </div>

        <div className="metric">
            <label>Energy: {energy}/10</label>
            <input
            type="range"
            min="1"
            max="10"
            value={energy}
            onChange={(e) => setEnergy(Number(e.target.value))}
            />
        </div>

        <div className="metric">
            <label>Sleep: {sleep}/10</label>
            <input
            type="range"
            min="1"
            max="10"
            value={sleep}
            onChange={(e) => setSleep(Number(e.target.value))}
            />
        </div>

        <div className="metric">
            <label>Stress: {stress}/10</label>
            <input
            type="range"
            min="1"
            max="10"
            value={stress}
            onChange={(e) => setStress(Number(e.target.value))}
            />
        </div>

        <div className="metric">
            <label>Anxiety: {anxiety}/10</label>
            <input
            type="range"
            min="1"
            max="10"
            value={anxiety}
            onChange={(e) => setAnxiety(Number(e.target.value))}
            />
        </div>

        <label>Emotion</label>

  {/* your existing select */}

          <select
            value={emotion}
            onChange={(e) => setEmotion(e.target.value)}
          >
            <option value="">Select an emotion</option>
            <option value="Happy">Happy</option>
            <option value="Calm">Calm</option>
            <option value="Sad">Sad</option>
            <option value="Anxious">Anxious</option>
            <option value="Angry">Angry</option>
            <option value="Stressed">Stressed</option>
          </select>

          <label>Journal</label>

          <textarea
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
            placeholder="What's on your mind today?"
            rows="6"
          />

          <button type="submit" className="primary-button">
            Save Check-in
          </button>
        </form>
      </div>
    </div>
  )
}

export default WellnessCheckin