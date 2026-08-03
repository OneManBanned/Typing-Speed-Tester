import { useState, useEffect, useRef } from 'react'

import { useTimer } from './hooks/useTimer'
import { getRandomPassage, getInitialPassage } from './utils/passageUtils'
import type { difficulty, mode, StatsData } from './types'

import TypingArea from './components/TypingArea'
import Stats from './components/Stats'
import Options from './components/Options'


function App() {

  const inputRef = useRef<HTMLInputElement>(null)
  const { timeElapsed, startTimer, resetTimer, stopTimer } = useTimer()

  const [mode, setMode] = useState<mode>('passage')
  const [userInput, setUserInput] = useState<string>('')
  const [stats, setStats] = useState<StatsData>({
    wpm: 0,
    accuracy: 100
  })
  const [difficulty, setDifficulty] = useState<difficulty>('easy')
  const [currentPassage, setCurrentPassage] = useState<string>(getInitialPassage('easy'))
  const characters: string[] = currentPassage.split('')

  const isCompleted = mode === 'passage'
    ? userInput.length === characters.length
    : userInput.length === characters.length || timeElapsed >= 60

  useEffect(() => {
    setCurrentPassage(getRandomPassage(difficulty))
  }, [difficulty])

  useEffect(() => {
    if (isCompleted) stopTimer()
  }, [isCompleted])

  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
    }
  }, [mode, difficulty])

  const resetTest = () => {
    resetTimer()
    setStats({ wpm: 0, accuracy: 100 })
    setUserInput('')
  }

  const onModeChange = (newMode: mode) => {
    setMode(newMode)
    resetTest()
  }

  const onDifficultyChange = (newDifficulty: difficulty) => {
    setDifficulty(newDifficulty)
    resetTest()
  }

  return (
    <>
      <Options
        mode={mode}
        difficulty={difficulty}
        onDifficultyChange={onDifficultyChange}
        onModeChange={onModeChange}
      />
      <Stats
        timeElapsed={timeElapsed}
        wpm={stats.wpm}
        accuracy={stats.accuracy}
        mode={mode}
      />
      <TypingArea
        ref={inputRef}
        startTimer={startTimer}
        elapsedTime={timeElapsed}
        onStatsUpdate={setStats}
        userInput={userInput}
        setUserInput={setUserInput}
        isCompleted={isCompleted}
        characters={characters}
      />
    </>
  )
}

export default App
