import { useState } from "react"


function TypingArea() {

    const [userInput, setUserInput] = useState('')

    const paragraphs: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    const characters: string[] = paragraphs.split('')

    return (
        <>
            <input className="hidden-input" type="hidden" value={userInput}></input>

            <div className="typing-area" onClick={() => {
                const input = document.querySelector('.hidden-input') as HTMLInputElement
                input?.focus()
            }}
            >
                {characters.map((char, index) => {

                    const userChar = userInput[index]

                    return index < userInput.length
                        ? <span key={index} className={userChar === char ? 'correct' : 'incorrect'}>{userChar}</span>
                        : <span key={index} className="ghost">{char}</span>

                })}



            </div>
        </>
    )
}

export default TypingArea
