import styles from './Options.module.scss'

type OptionsProps = {
    mode: 'passage' | 'timed'
    onModeChange: (newMode: 'passage' | 'timed') => void
} 

function Options({ mode, onModeChange }: OptionsProps ) {
  return <>
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
  </>
  }  
  
  export default Options