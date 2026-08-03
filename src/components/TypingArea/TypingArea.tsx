import { forwardRef, useEffect, type JSX } from "react"
import { getCharacterState, type CharacterState } from "../../utils/typingUtils"
import styles from '../TypingArea/TypingArea.module.scss'

type TypingAreaProps = {
    startTimer: () => void
    onStatsUpdate: (stats: { wpm: number, accuracy: number }) => void
    elapsedTime: number
    userInput: string
    setUserInput: (input: string) => void
    characters: string[]
    isCompleted: boolean
}

const TypingArea = forwardRef<HTMLInputElement, TypingAreaProps>(({ ...props }, ref) => {

    const { startTimer, onStatsUpdate, elapsedTime, userInput, setUserInput, characters, isCompleted } = props

    useEffect(() => {
        if (userInput.length === 1) {
            startTimer()
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

    const handleTypingAreaClick = () => {
        if (ref && typeof ref !== 'function') {
            ref.current?.focus()
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (userInput.length >= characters.length)
            return;

        setUserInput(e.target.value)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

        const blockedKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'End', 'Home']

        if (e.key === 'a' && (e.ctrlKey || e.metaKey)) e.preventDefault()
        if (blockedKeys.includes(e.key)) e.preventDefault()
        
    }

    return (
        <>
            <input
                className={styles.userInput}
                value={userInput}
                type="text"
                ref={ref}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onPaste={(e) => e.preventDefault()}
                disabled={isCompleted}
                autoFocus
            ></input>

            <div className={styles.typingArea} onClick={handleTypingAreaClick}>
                {characters.map((c, i) => renderCharacter(c, i))}
            </div>
        </>
    )
})

export default TypingArea