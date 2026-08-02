import data from '../data/data.json'
import { type difficulty } from '../types'

export const getRandomPassage = (diff: difficulty): string => {
    const diffPassage = data[diff]
    const randomIndex = Math.floor(Math.random() * diffPassage.length)
    return diffPassage[randomIndex].text
}

export const getInitialPassage = (diff: difficulty): string => {
    return data[diff][0].text
}