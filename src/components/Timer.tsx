import styles from '../styles/Timer.module.css'

interface TimerProps {
  time: number
}

export default function Timer({ time }: TimerProps) {
  return (
    <div className={styles.timer}>
      <span>{time}</span>
    </div>
  )
}
