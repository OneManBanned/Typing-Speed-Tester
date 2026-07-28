import styles from './Stats.module.scss'

type statsProps = {
    timeElapsed: number
    wpm: number
    accuracy: number
    mode: 'passage' | 'timed'
}

function Stats({ timeElapsed, wpm, accuracy, mode }: statsProps) {

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
    </div>


} export default Stats