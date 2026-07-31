import styles from './Options.module.scss'

type OptionsProps = {
    mode: 'passage' | 'timed'
    difficulty: 'easy' | 'medium' | 'hard'
    onDifficultyChange: (d: 'easy' | 'medium' | 'hard' ) => void
    onModeChange: (newMode: 'passage' | 'timed') => void
} 

function Options({ mode, difficulty, onDifficultyChange, onModeChange }: OptionsProps ) {
  return (
        <div className={styles.optionsContainer}>
            {/* Mode Toggle */}
            <div className={styles.modeToggle} role="group" aria-label="Test mode">
                <button
                    className={`${styles.modeButton} ${mode === 'passage' ? styles.active : ''}`}
                    onClick={() => onModeChange('passage')}
                    aria-pressed={mode === 'passage'}
                >
                    Passage
                </button>
                <button
                    className={`${styles.modeButton} ${mode === 'timed' ? styles.active : ''}`}
                    onClick={() => onModeChange('timed')}
                    aria-pressed={mode === 'timed'}
                >
                    Timed (60s)
                </button>
            </div>

            {/* Difficulty Buttons */}
            <div className={styles.difficultyGroup} role="group" aria-label="Difficulty level">
                <button
                    className={`${styles.difficultyButton} ${difficulty === 'easy' ? styles.active : ''}`}
                    onClick={() => onDifficultyChange('easy')}
                    aria-pressed={difficulty === 'easy'}
                >
                    Easy
                </button>
                <button
                    className={`${styles.difficultyButton} ${difficulty === 'medium' ? styles.active : ''}`}
                    onClick={() => onDifficultyChange('medium')}
                    aria-pressed={difficulty === 'medium'}
                >
                    Medium
                </button>
                <button
                    className={`${styles.difficultyButton} ${difficulty === 'hard' ? styles.active : ''}`}
                    onClick={() => onDifficultyChange('hard')}
                    aria-pressed={difficulty === 'hard'}
                >
                    Hard
                </button>
            </div>
        </div>
    )
  }  
  
  export default Options