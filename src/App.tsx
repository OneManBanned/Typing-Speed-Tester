import data from './data/data.json'
import { useState, useEffect, useRef } from 'react'
import TypingArea from './components/TypingArea'
import Stats from './components/Stats'
import Options from './components/Options'

type mode = 'passage' | 'timed';
type difficulty = 'easy' | 'medium' | 'hard';

function App() {

  const passages = data;

  const inputRef = useRef<HTMLInputElement>(null)

  const [mode, setMode] = useState<mode>('passage')
  const [userInput, setUserInput] = useState<string>('')
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [stats, setStats] = useState({
    wpm: 0,
    accuracy: 100
  })
  const [difficulty, setDifficulty] = useState<difficulty>('easy')
  const [currentPassage, setCurrentPassage] = useState<string>(passages[difficulty][0].text)
  const characters: string[] = currentPassage.split('')
  const isCompleted = mode === 'passage'
    ? userInput.length === characters.length
    : userInput.length === characters.length || timeElapsed >= 60

  useEffect(() => {
    const diffPassage = passages[difficulty]
    const randomIndex = Math.floor(Math.random() * diffPassage.length)
    setCurrentPassage(diffPassage[randomIndex].text)
  }, [difficulty])

  useEffect(() => {
    if (!isTimerRunning) return

    const timer = setInterval(() => {
      setTimeElapsed(prevTime => prevTime + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [isTimerRunning])

  useEffect(() => {
    if (isCompleted) {
      setIsTimerRunning(false)
    }
  }, [isCompleted])

  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
    }
  }, [mode])

  return (
    <>
      <Options
        mode={mode}
        difficulty={difficulty}
        onDifficultyChange={(d) => setDifficulty(d)}
        onModeChange={(newMode: mode) => {
          setMode(newMode)
          setTimeElapsed(0)
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
        ref={inputRef}
        startTimer={() => setIsTimerRunning(true)}
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
