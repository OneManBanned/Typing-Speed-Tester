import { useEffect, useState, useRef, type JSX } from "react"
import { getCharacterState, type CharacterState } from "../../utils/typingUtils"
import styles from '../TypingArea/TypingArea.module.scss'

type TypingAreaProps = {
    startTimer: () => void
    stopTimer: () => void
    onTimerUpdate: (timeElapsed: number) => void
    onStatsUpdate: (stats: { wpm: number, accuracy: number }) => void
}

function TypingArea({ startTimer, stopTimer, onTimerUpdate, onStatsUpdate }: TypingAreaProps) {

    const inputRef = useRef<HTMLInputElement>(null)
    const [userInput, setUserInput] = useState('')

    const paragraphs: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
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
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setUserInput(e.target.value)
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
                autoFocus
            ></input>

            <div className={styles.typingArea} onClick={handleTypingAreaClick}>
                {characters.map((c, i) => renderCharacter(c, i))}
            </div>
        </>
    )
}

export default TypingArea
