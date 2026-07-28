import { useState, useEffect } from 'react'
import TypingArea from './components/TypingArea'
import Stats from './components/Stats'
import Options from './components/Options'

type mode = 'passage' | 'timed';

function App() {

  const [mode, setMode] = useState<mode>('passage') 
  const [userInput, setUserInput] = useState<string>('')
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [stats, setStats] = useState({
    wpm: 0,
    accuracy: 100
  })
    const paragraphs: string = "The cat jumped over the moon"
    const characters: string[] = paragraphs.split('')

    const isCompleted = mode === 'passage' ? userInput.length === characters.length : timeElapsed >= 60

  useEffect(() => {
    if (!isTimerRunning) return
      
    const timer = setInterval(() => {
      setTimeElapsed(prevTime => prevTime + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [isTimerRunning])  
  
  useEffect(() => {
    if (mode === 'timed' && timeElapsed >= 60) {
      setIsTimerRunning(false)
    } 
  }, [timeElapsed, mode])
      

  return (
    <>
      <Options
        mode={mode}
        onModeChange={(newMode: mode) => {
          setMode(newMode)
          setTimeElapsed(mode === 'timed' ? 60 : 0)
          setIsTimerRunning(false)
          setStats({ wpm: 0, accuracy: 100 })
          setUserInput('')
        }}
      />
      <Stats
        timeElapsed={timeElapsed}
        wpm={stats.wpm}
        accuracy={stats.accuracy}
        mode={mode}
      />
      <TypingArea
        startTimer={() => setIsTimerRunning(true)}
        stopTimer={() => setIsTimerRunning(false)}
        onStatsUpdate={setStats}
        elapsedTime={timeElapsed}
        userInput={userInput}
        setUserInput={setUserInput}
        isCompleted={isCompleted}
        characters={characters}
      />
    </>
  )
}

export default App
