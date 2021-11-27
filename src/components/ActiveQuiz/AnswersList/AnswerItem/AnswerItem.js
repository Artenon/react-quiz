import React from "react";
import './AnswerItem.css'

const AnswerItem = props => {
    const answerClass = ['answerItem']
    
    if (props.answerState) {
        answerClass.push(props.answerState)
    }

    return (
        <li 
            className={answerClass.join(' ')} 
            onClick={() => props.onClickAnswer(props.answer.id)} 
        >
            {props.answer.text}
        </li>
    )
}

export default AnswerItem;