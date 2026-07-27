import { useEffect, useState, useRef, type JSX } from "react"
import { getCharacterState, type CharacterState } from "../../utils/typingUtils"
import styles from '../TypingArea/TypingArea.module.scss'

type TypingAreaProps = {
    startTimer: () => void
    stopTimer: () => void
    onStatsUpdate: (stats: { wpm: number, accuracy: number }) => void
    elapsedTime: number
}

function TypingArea({ startTimer, stopTimer, onStatsUpdate, elapsedTime }: TypingAreaProps) {

    const inputRef = useRef<HTMLInputElement>(null)
    const [userInput, setUserInput] = useState('')

    const paragraphs: string = "The cat jumped over the moon"
    const characters: string[] = paragraphs.split('')

    useEffect(() => {
        if (userInput.length === 1) {
            startTimer()
        }
    }, [userInput])
    
    useEffect(() => {   
        if (userInput.length === characters.length) {
            stopTimer()
        }
    }, [userInput]) 
    
    useEffect(() => {
        const correctChars = characters.filter((char, index) => char === userInput[index]).length
        const accuracy = userInput.length > 0 ? (correctChars / userInput.length) * 100 : 100
        
        let wpm = 0
        if (elapsedTime > 0 && userInput.length > 0) {
            wpm = (correctChars / 5) / (elapsedTime / 60)
        }   

        onStatsUpdate({ wpm: Math.round(wpm), accuracy: Math.round(accuracy) })
    }, [userInput, elapsedTime])        

    const renderCharacter = (char: string, index: number): JSX.Element => {

        const state: CharacterState = getCharacterState(char, index, userInput)
        const { displayChar, hasTyped, isCorrect } = state
        const isCursor = index === userInput.length

        let className = hasTyped
            ? isCorrect ? styles.correct : styles.incorrect
            : isCursor ? styles.cursor : styles.isGhost

        return <span key={index} className={className}>{displayChar}</span>
    }

    const handleTypingAreaClick = () => inputRef.current?.focus()
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (userInput.length >= characters.length) 
            return;

         setUserInput(e.target.value)
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

        const blockedKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'End', 'Home']

        if (e.key === 'a' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault()
        }

        if (blockedKeys.includes(e.key)) {
            e.preventDefault()
        }
    }

    return (
        <>
            <input
                className={styles.userInput}
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onPaste={(e) => e.preventDefault()}
                disabled={userInput.length >= characters.length}
                autoFocus
            ></input>

            <div className={styles.typingArea} onClick={handleTypingAreaClick}>
                {characters.map((c, i) => renderCharacter(c, i))}
            </div>
        </>
    )
}

export default TypingArea
