import React, { useState } from "react";
import { fetchQuizQuestions, Question } from "./API";

// Components
import QuestionCard from "./components/QuestionCard";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(questions);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS);

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  // const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
  const checkAnswer = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(!gameOver) {
      // User answer
      const answer = e.currentTarget.value;

      // Check if the answer is correct or not
      const correct = answer === questions[number].answer;

      // Increase score if answer is correct
      if (correct) { setScore((prev) => (prev + 1))};

      // Save answer in array of AnswerObjects
      const answerObject = {
        question: questions[number].question,
        answer: answer,
        correct: correct,
        correctAnswer: questions[number].answer
      };

      setUserAnswers((prev) => [...prev, answerObject]);
    }
  }

  const nextQuestion = () => {
    // Moving to next question until we are at the last question
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS)
      setGameOver(true);
    else
      setNumber(nextQuestion);
  };

  return (
    <div className="App">
      <h1>Trivia Game</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startTrivia}>
          Start
        </button>
      ) : null}
      {!gameOver ? <p className="score">Score: {score}</p> : null}
      {loading ? <p>Loading Questions...</p> : null}
      {!loading && !gameOver && (
        <QuestionCard
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answer={questions[number].answer}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}
      {!loading &&
      !gameOver &&
      // userAnswers.length === number + 1 &&
      userAnswers.length !== TOTAL_QUESTIONS - 1 ? (
        <button className="next" onClick={nextQuestion}>
          Next
        </button>
      ) : null}
    </div>
  );
};

export default App;
