import { useState, useEffect } from 'react'
import TypingArea from './components/TypingArea'
import Stats from './components/Stats'

function App() {

  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [stats, setStats] = useState({
    wpm: 0,
    accuracy: 100
  })

  useEffect(() => {
    if (!isTimerRunning) return

    const interval = setInterval(() => {
      setTimeElapsed(prevTime => prevTime + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [isTimerRunning])

  return (
    <>
      <Stats
        timeElapsed={timeElapsed}
        wpm={stats.wpm}
        accuracy={stats.accuracy}
      />
      <TypingArea
        startTimer={() => setIsTimerRunning(true)}
        stopTimer={() => setIsTimerRunning(false)}
        onTimerUpdate={setTimeElapsed}
        onStatsUpdate={setStats}
      />
    </>
  )
}

export default App
