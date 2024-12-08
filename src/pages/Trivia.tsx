import { SetStateAction, useEffect, useState } from 'react'
import { DB, Question } from '../data-providers/Server'
import TriviaContainer from '../components/TriviaContainer'
import StartScreen from '../components/StartScreen'
import GameOver from '../components/GameOver'
import QuestionDisplay from '../components/QuestionDisplay'
import Timer from '../components/Timer'

export default function Trivia() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [timer, setTimer] = useState(10)
  const [gameStarted, setGameStarted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    DB.getQuestions().then((questions) => {
      setQuestions(questions)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (!gameStarted || timer === 0) return
    const interval = setInterval(
      () => setTimer((prev) => Math.max(prev - 1, 0)),
      1000
    )
    return () => clearInterval(interval)
  }, [timer, gameStarted])

  const handleStartGame = () => {
    setGameStarted(true)
    setTimer(10)
  }

  const handleAnswerSelection = (answer: SetStateAction<string | null>) => {
    setSelectedAnswer(answer)
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    setSelectedAnswer(null)
    setTimer(10)
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setGameOver(true)
    }
  }

  const handleRestart = () => {
    setGameStarted(false)
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setScore(0)
    setTimer(10)
    setGameOver(false)
  }

  if (loading) return <div>Loading...</div>

  return (
    <TriviaContainer>
      {!gameStarted && !gameOver && <StartScreen onStart={handleStartGame} />}
      {gameStarted && !gameOver && (
        <>
          <Timer time={timer} />
          <QuestionDisplay
            question={questions[currentQuestionIndex]}
            selectedAnswer={selectedAnswer}
            onAnswerSelect={handleAnswerSelection}
            onNext={handleNextQuestion}
            isLastQuestion={currentQuestionIndex + 1 === questions.length}
          />
        </>
      )}
      {gameOver && (
        <GameOver
          score={score}
          totalQuestions={questions.length}
          onRestart={handleRestart}
        />
      )}
    </TriviaContainer>
  )
}
