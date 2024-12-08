import styles from '../styles/GameOver.module.css'

interface GameOverProps {
  score: number
  totalQuestions: number
  onRestart: () => void
}

export default function GameOver({
  score,
  totalQuestions,
  onRestart,
}: GameOverProps) {
  return (
    <div className={styles.gameOver}>
      <h1>Game Over!</h1>
      <p>
        Your Score: {score}/{totalQuestions}
      </p>
      <button onClick={onRestart} className={styles.restartButton}>
        Play Again
      </button>
    </div>
  )
}
