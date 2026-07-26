export type CharacterState = {
    displayChar: string,
    hasTyped: boolean,
    isCorrect: boolean
}

export const getCharacterState = (char: string, index: number, userInput: string): CharacterState => {
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