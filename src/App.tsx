import { useState, useEffect, useRef, useMemo } from 'react'

import { useTimer } from './hooks/useTimer'
import { useFocus } from './hooks/useFocus'
import { useStats } from './hooks/useStats'
import {useHighScore} from './hooks/useHighScore'
import { isTestComplete } from './utils/testUtils'
import { getRandomPassage, getInitialPassage } from './utils/passageUtils'
import type { difficulty, mode } from './types'

import TypingArea from './components/TypingArea'
import Stats from './components/Stats'
import Options from './components/Options'


function App() {


  const [mode, setMode] = useState<mode>('passage')
  const [userInput, setUserInput] = useState<string>('')
  const [difficulty, setDifficulty] = useState<difficulty>('easy')
  const [currentPassage, setCurrentPassage] = useState<string>(getInitialPassage('easy'))
  const characters: string[] = useMemo(() => currentPassage.split(''), [currentPassage] )

  const inputRef = useRef<HTMLInputElement>(null)
  const { timeElapsed, startTimer, resetTimer, stopTimer } = useTimer()
  const {stats, resetStats }= useStats(userInput, characters, timeElapsed)  

  const isCompleted = isTestComplete(mode, userInput, characters, timeElapsed);
  const { updateHighScore } = useHighScore()
  
  
  useEffect(() => {
    if (isCompleted) {
      const isNewHighScore = updateHighScore(mode, difficulty, stats.wpm, stats.accuracy)
      if (isNewHighScore) {
        console.log('New high score achieved!')
      }
    }
  }, [isCompleted])  

  useEffect(() => {
    setCurrentPassage(getRandomPassage(difficulty))
  }, [difficulty])

  useEffect(() => {
    if (isCompleted) stopTimer()
  }, [isCompleted])

  useFocus(inputRef, [mode, difficulty])

  const resetTest = () => {
    resetTimer()
    resetStats()
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
        userInput={userInput}
        setUserInput={setUserInput}
        isCompleted={isCompleted}
        characters={characters}
      />
    </>
  )
}

export default App
