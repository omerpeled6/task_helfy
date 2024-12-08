import styles from '../styles/QuestionDisplay.module.css'

interface QuestionDisplayProps {
  question: {
    question: string
    options: string[]
  }
  selectedAnswer: string | null
  onAnswerSelect: (option: string) => void
  onNext: () => void
  isLastQuestion: boolean
  timerExpired: boolean
}

export default function QuestionDisplay({
  question,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  isLastQuestion,
  timerExpired,
}: QuestionDisplayProps) {
  const colors = ['red', 'green', 'blue', 'yellow'] // Array of button colors

  return (
    <div>
      <h2 className={styles.question}>{question.question}</h2>
      <div className={styles.options}>
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === option
          const isDisabled = timerExpired && !isSelected

          return (
            <button
              key={index}
              className={`${styles.optionButton} ${
                styles[colors[index % colors.length]]
              } ${isSelected ? styles.selected : ''} ${
                isDisabled ? styles.disabled : ''
              }`}
              onClick={() => onAnswerSelect(option)}
              disabled={isDisabled} // Disable only unselected buttons when the timer expires
            >
              {option}
            </button>
          )
        })}
      </div>
      {selectedAnswer && (
        <button onClick={onNext} className={styles.nextButton}>
          {isLastQuestion ? 'Finish' : 'Next'}
        </button>
      )}
    </div>
  )
}
