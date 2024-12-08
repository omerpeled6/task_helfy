import styles from '../styles/StartScreen.module.css'

interface StartScreenProps {
  onStart: () => void
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className={styles.startScreen}>
      <h1>Welcome to the Trivia Game!</h1>
      <p>Test your knowledge with fun and tricky questions.</p>
      <button onClick={onStart} className={styles.startButton}>
        Start Game
      </button>
    </div>
  )
}
