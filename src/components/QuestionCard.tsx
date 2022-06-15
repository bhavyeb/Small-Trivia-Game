import React from "react";
import { AnswerObject } from '../App';

type Props = {
  question: string;
  answer: string;
  callback: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answer,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) => (
  <div>
    <p className="number">
      Question: {questionNr} / {totalQuestions}
    </p>
    <p className="question" dangerouslySetInnerHTML={{__html: question}} />
    <div>
      <input type="text" id="ans" onKeyUp={callback}/>
      <input type="submit" id="submit" value="submit" />
    </div>
  </div>
);

export default QuestionCard;
