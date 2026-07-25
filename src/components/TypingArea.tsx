import { useState, useRef, type JSX } from "react"
import styles from './TypingArea.module.scss'

function TypingArea() {

    const inputRef = useRef<HTMLInputElement>(null)
    const [userInput, setUserInput] = useState('')

    const paragraphs: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    const characters: string[] = paragraphs.split('')

    type CharacterState = {
        displayChar: string,
        hasTyped: boolean,
        isCorrect: boolean
    }

    const getCharacterState = (char: string, index: number, userInput: string): CharacterState => {
        const userChar = userInput[index]
        const hasTyped = index < userInput.length

        let displayChar: string = char;
        let isCorrect: boolean = false;

        if (hasTyped) {
            isCorrect = userChar === char
            displayChar = userChar

            if (!isCorrect && userChar === ' ') {
                displayChar = '_'
            }

        }

        return { displayChar, hasTyped, isCorrect }
    }

    const renderCharacter = (char: string, index: number): JSX.Element => {

        const state : CharacterState = getCharacterState(char, index, userInput)
        const { displayChar, hasTyped, isCorrect } = state

        let className = hasTyped
            ? isCorrect ? styles.correct : styles.incorrect
            : styles.isGhost

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

            <div
                className={styles.typingArea}
                onClick={handleTypingAreaClick}
            >
                {characters.map((c, i) => renderCharacter(c, i))}


            </div>
        </>
    )
}

export default TypingArea
