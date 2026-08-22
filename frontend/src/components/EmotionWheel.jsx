import { useState } from 'react'

const emotions = [
  {
    primary: 'Joy',
    color: '#F4C542',
    levels: ['Serenity', 'Joy', 'Ecstasy'],
  },
  {
    primary: 'Trust',
    color: '#79C267',
    levels: ['Acceptance', 'Trust', 'Admiration'],
  },
  {
    primary: 'Fear',
    color: '#4FAF7B',
    levels: ['Apprehension', 'Fear', 'Terror'],
  },
  {
    primary: 'Surprise',
    color: '#35B7B0',
    levels: ['Distraction', 'Surprise', 'Amazement'],
  },
  {
    primary: 'Sadness',
    color: '#5B73C5',
    levels: ['Pensiveness', 'Sadness', 'Grief'],
  },
  {
    primary: 'Disgust',
    color: '#9B62C9',
    levels: ['Boredom', 'Disgust', 'Loathing'],
  },
  {
    primary: 'Anger',
    color: '#E05A47',
    levels: ['Annoyance', 'Anger', 'Rage'],
  },
  {
    primary: 'Anticipation',
    color: '#F08A45',
    levels: ['Interest', 'Anticipation', 'Vigilance'],
  },
]

const polarToCartesian = (cx, cy, radius, angle) => {
  const angleInRadians = ((angle - 90) * Math.PI) / 180

  return {
    x: cx + radius * Math.cos(angleInRadians),
    y: cy + radius * Math.sin(angleInRadians),
  }
}

const createArc = (
  cx,
  cy,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle
) => {
  const outerStart = polarToCartesian(
    cx,
    cy,
    outerRadius,
    startAngle
  )

  const outerEnd = polarToCartesian(
    cx,
    cy,
    outerRadius,
    endAngle
  )

  const innerStart = polarToCartesian(
    cx,
    cy,
    innerRadius,
    endAngle
  )

  const innerEnd = polarToCartesian(
    cx,
    cy,
    innerRadius,
    startAngle
  )

  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0

  return `
    M ${outerStart.x} ${outerStart.y}
    A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEnd.x} ${outerEnd.y}
    L ${innerStart.x} ${innerStart.y}
    A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerEnd.x} ${innerEnd.y}
    Z
  `
}

function EmotionWheel({ onSelect }) {
  const [selectedEmotion, setSelectedEmotion] = useState('')

  const handleSelect = (emotion) => {
    setSelectedEmotion(emotion)
    onSelect(emotion)
  }

  const center = 200

  return (
    <div className="emotion-wheel-section">

      <h2>How are you feeling emotionally?</h2>

      <p className="emotion-subtitle">
        Explore the emotions that best describe how you feel right now.
      </p>

      <div className="emotion-wheel-container">

        <svg
          viewBox="0 0 400 400"
          className="emotion-wheel"
          role="img"
          aria-label="Interactive Plutchik emotion wheel"
        >

          {emotions.map((emotion, index) => {
            const startAngle = index * 45
            const endAngle = startAngle + 45
            const labelPosition = polarToCartesian(
              center,
              center,
              105,
              startAngle + 22.5
            )

            return (
              <g key={emotion.primary}>

                {/* Outer intensity */}
                <path
                  d={createArc(
                    center,
                    center,
                    125,
                    180,
                    startAngle + 1,
                    endAngle - 1
                  )}
                  fill={emotion.color}
                  fillOpacity="0.45"
                  stroke="white"
                  strokeWidth="2"
                  className="emotion-segment"
                  onClick={() =>
                    handleSelect(emotion.levels[0])
                  }
                />

                {/* Primary emotion */}
                <path
                  d={createArc(
                    center,
                    center,
                    75,
                    125,
                    startAngle + 1,
                    endAngle - 1
                  )}
                  fill={emotion.color}
                  fillOpacity="0.7"
                  stroke="white"
                  strokeWidth="2"
                  className="emotion-segment"
                  onClick={() =>
                    handleSelect(emotion.levels[1])
                  }
                />

                {/* Strong intensity */}
                <path
                  d={createArc(
                    center,
                    center,
                    25,
                    75,
                    startAngle + 1,
                    endAngle - 1
                  )}
                  fill={emotion.color}
                  fillOpacity="0.95"
                  stroke="white"
                  strokeWidth="2"
                  className="emotion-segment"
                  onClick={() =>
                    handleSelect(emotion.levels[2])
                  }
                />

                {/* Primary emotion label */}
                <text
                  x={labelPosition.x}
                  y={labelPosition.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="primary-emotion-label"
                  onClick={() =>
                    handleSelect(emotion.levels[1])
                  }
                >
                  {emotion.primary}
                </text>

              </g>
            )
          })}

          {/* Center */}
          <circle
            cx="200"
            cy="200"
            r="24"
            fill="white"
            stroke="#e5e7eb"
            strokeWidth="2"
          />

          <text
            x="200"
            y="196"
            textAnchor="middle"
            className="wheel-center-text"
          >
            EMOTION
          </text>

          <text
            x="200"
            y="209"
            textAnchor="middle"
            className="wheel-center-text"
          >
            WHEEL
          </text>

        </svg>

      </div>

      {selectedEmotion && (
        <div className="selected-emotion">
          Feeling:{' '}
          <strong>{selectedEmotion}</strong>
        </div>
      )}

    </div>
  )
}

export default EmotionWheel