import { useState, useEffect } from 'react'

export const useTimer = () => {

    const [timeElapsed, setTimeElapsed] = useState(0)
    const [isTimerRunning, setIsTimerRunning] = useState(false)

    useEffect(() => {
        if (!isTimerRunning) return

        const timer = setInterval(() => {
            setTimeElapsed(prevTime => prevTime + 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [isTimerRunning])

    const startTimer = () => setIsTimerRunning(true)
    const stopTimer = () => setIsTimerRunning(false)
    const resetTimer = () => {
        stopTimer()
        setTimeElapsed(0)
    }

    return { timeElapsed, isTimerRunning, startTimer, stopTimer, resetTimer }
}