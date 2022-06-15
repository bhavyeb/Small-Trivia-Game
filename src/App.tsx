import React, { useState } from "react";
import { fetchQuizQuestions, Question } from "./API";

// Components
import QuestionCard from "./components/QuestionCard";

// Styles
import { GlobalStyle, Wrapper } from './App.styles';

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

  // console.log(questions);

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
    if (!gameOver) {
      // User answer
      const answer = e.currentTarget.value;

      // Check if the answer is correct or not
      const correct = answer === questions[number].answer;
      // console.log(answer, correct);

      const mc = document.getElementById("submit");
      mc?.addEventListener("click", () => {
        // Increase score if answer is correct
        if (correct) {
          const p: HTMLElement = document.getElementById(
            "result"
          ) as HTMLElement;
          p.innerHTML = "Correct Answer";
          p.style.color = "green";
          setScore((prev) => prev + 1);
        } else {
          const p: HTMLElement = document.getElementById(
            "result"
          ) as HTMLElement;
          p.innerHTML = "Incorrect Answer";
          p.style.color = "red";
        }
        nextQuestion();
      });

      // Save answer in array of AnswerObjects
      const answerObject = {
        question: questions[number].question,
        answer: answer,
        correct: correct,
        correctAnswer: questions[number].answer,
      };

      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const ans: HTMLInputElement = document.getElementById(
      "ans"
    ) as HTMLInputElement;
    ans.value = "";

    // Moving to next question until we are at the last question
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) setGameOver(true);
    else setNumber(nextQuestion);
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
      {/* <div className="App"> */}
        <h1>Trivia Game</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startTrivia}>
            Start
          </button>
        ) : null}
        {/* {!gameOver ? <p className="score">Score: {score}</p> : null} */}
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
        <p id="result"></p>
      {/* </div> */}
      </Wrapper>
    </>
  );
};

export default App;
