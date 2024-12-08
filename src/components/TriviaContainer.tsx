import styles from '../styles/TriviaContainer.module.css'

import { ReactNode } from 'react'

export default function TriviaContainer({ children }: { children: ReactNode }) {
  return <div className={styles.container}>{children}</div>
}
