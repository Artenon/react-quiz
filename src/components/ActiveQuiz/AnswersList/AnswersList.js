import React from "react";
import './AnswersList.css';
import AnswerItem from './AnswerItem/AnswerItem'

const AnswersList = props => (
    <ul className='answersList'>
        { props.answers.map((answer, index) => {
            return <AnswerItem 
                        key={index} 
                        answer={answer} 
                        onClickAnswer={props.onClickAnswer} 
                        answerState={props.answerState ? props.answerState[answer.id] : null }
                    />
        })}
    </ul>
)

export default AnswersList;