import { useState, useEffect } from 'react'
import type { StatsData } from '../types'

export const useStats = (userInput: string, characters: string[], elapsedTime: number) => {

  const [stats, setStats] = useState<StatsData>({
    wpm: 0,
    accuracy: 100
  })

    useEffect(() => {
        const correctChars = characters.filter((char, index) => char === userInput[index]).length
        const accuracy = userInput.length > 0 ? (correctChars / userInput.length) * 100 : 100

        let wpm = 0
        if (elapsedTime > 0 && userInput.length > 0) {
            wpm = (correctChars / 5) / (elapsedTime / 60)
        }

        setStats({ wpm: Math.round(wpm), accuracy: Math.round(accuracy) })
    }, [userInput, elapsedTime, characters ])
    
    const resetStats = () => {
        setStats({ wpm: 0, accuracy: 100 })
    }

    return { stats, resetStats }
}