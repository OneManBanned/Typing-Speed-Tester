import styles from './Stats.module.scss'
import type { HighScoreData } from '../../hooks/useHighScore'

type statsProps = {
    timeElapsed: number
    wpm: number
    accuracy: number
    mode: 'passage' | 'timed'
    highScore: HighScoreData | null
}

function Stats({ timeElapsed, wpm, accuracy, mode, highScore }: statsProps) {

    const displayTime = mode === 'passage' ? timeElapsed : Math.max(0, 60 - timeElapsed)
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return <div className={styles.stats}>
        <div
            className={styles.timer}
            role="timer"
            aria-label="timer-elapsed"
        >
            {formatTime(displayTime)}
        </div>
        <div>{wpm}</div>
        <div>{accuracy}</div>
         {highScore && (
                    <span className={styles.best}>
                 🏆 Best: {highScore.wpm}
                    </span>
                )}
    </div>


} export default Stats