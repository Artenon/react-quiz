import React from "react";
import './ActiveQuiz.css';
import AnswersList from "./AnswersList/AnswersList";

const ActiveQuiz = props => (
    <div className='activeQuiz'>
        <p className='question'>
            <span>
                <strong>{props.answerNumber}. </strong>
                {props.question}
            </span>
            <small>{props.answerNumber} из {props.answersListLength}</small>
        </p>
        <AnswersList 
            answers={props.answers} 
            onClickAnswer={props.onClickAnswer}
            answerState={props.answerState} 
        />
    </div>
)

export default ActiveQuiz;