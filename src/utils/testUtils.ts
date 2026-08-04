import type { mode } from '../types'

export const isTestComplete = (mode: mode, userInput: string, characters: string[], timeElapsed: number): boolean => {
 return mode === 'passage'
    ? userInput.length === characters.length
    : userInput.length === characters.length || timeElapsed >= 60
}