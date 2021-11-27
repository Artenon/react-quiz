import React from "react";
import './FinishedQuiz.css';
import { Link } from "react-router-dom";
import '../UI/button/button.css';

const FinishedQuiz = props => {
    const rightAnswersCount = Object.keys(props.results).reduce((count, key) => {
        if (props.results[key] === 'right') {
            count++
        }
        return count
    }, 0)

    return (
        <div className='finishedQuiz'>
            <ul>
                {props.quiz.map((quizItem, index) => {  
                    return (
                        <li key={index}>
                            <strong>{index + 1}. </strong>
                            {quizItem.question}
                            <i className={props.results[index+1]} />
                        </li>
                    )
                })}
            </ul>
            
            <p>Правильно {rightAnswersCount} из {props.quiz.length}</p>

            <button onClick={props.onRetry} className='retry'>Повторить</button>
            <Link to='/'>
                <button className='toQuizList'>Перейти в список тестов</button>
            </Link>
            
        </div>
    )
}

export default FinishedQuiz;