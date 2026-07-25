import { useState } from "react"
import styles from './TypingArea.module.scss'   



function TypingArea() {

    const [userInput, setUserInput] = useState('')

    const paragraphs: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    const characters: string[] = paragraphs.split('')
    
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
                type="text" 
                value={userInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onPaste={(e) => e.preventDefault()} 
                autoFocus
            ></input>

            <div className={styles.typingArea} onClick={() => {
                const input = document.querySelector('.hidden-input') as HTMLInputElement
                input?.focus()
            }}
            >
                {characters.map((char, index) => {

                    const userChar = userInput[index]

                    return index < userInput.length
                        ? <span key={index} className={userChar === char ? styles.correct : styles.incorrect}>{userChar}</span>
                        : <span key={index} className={styles.ghost}>{char}</span>

                })}

            </div>
        </>
    )
}

export default TypingArea
