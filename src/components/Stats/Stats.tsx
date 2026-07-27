import { useState, useEffect } from "react"
import styles from './Stats.module.scss'

type statsProps = {
    timeElapsed: number
    wpm: number
    accuracy: number
}   

function Stats({ timeElapsed, wpm, accuracy }: statsProps) {


    return <div className={styles.stats}>
        <div
            className={styles.timer}
            role="timer"
            aria-label="timer-elapsed"
        >
            {timeElapsed}
        </div>
    </div>


} export default Stats