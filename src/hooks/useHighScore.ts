import { useState, useEffect } from 'react';

import type { mode, difficulty } from '../types';

export type HighScoreData = {
    wpm: number;
    accuracy: number;
    date: string;
}

type HighScores = {
    passage: {
        easy: HighScoreData | null, medium: HighScoreData | null, hard: HighScoreData | null
    },
    timed: {
        easy: HighScoreData | null, medium: HighScoreData | null, hard: HighScoreData | null
    }

}

const STORAGE_KEY = 'highScoreData';

const defaultHighScores: HighScores = {
    passage: { easy: null, medium: null, hard: null },
    timed: { easy: null, medium: null, hard: null }
};

export const useHighScore = () => {


    const getInitialHighScores = () => {
        const stored = localStorage.getItem(STORAGE_KEY); 
        if (stored) {
            try {
                 const parsed: HighScores = JSON.parse(stored);
                 return parsed
            }  catch (error) {
                console.error('Failed to parse high score data from localStorage:', error);
            }
        }
            return defaultHighScores;
    }

    const [highScore, setHighScore] = useState<HighScores>(getInitialHighScores());

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(highScore));
    }, [highScore]) 
    
    const getHighScore = (mode: mode, difficulty: difficulty): HighScoreData | null => {
        return highScore[mode]?.[difficulty] || null;
    }   

    const updateHighScore = (mode: mode, difficulty: difficulty, wpm: number, accuracy: number) => {
        const current = getHighScore(mode, difficulty);       

        if (!current || wpm > current.wpm) {
            setHighScore(prev => ({
                ...prev,
                [mode]: { 
                    ...prev[mode],
                    [difficulty]: { wpm, accuracy, date: new Date().toISOString() }
                }
            }));
            return true; // Indicates that the high score was updated
        }
        return false; // Indicates that the high score was not updated
    }

    return { highScore, getHighScore, updateHighScore };
} 