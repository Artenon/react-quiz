import React from "react";
import './Quiz.css';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinisedQuiz/FinishedQuiz";

class Quiz extends React.Component {
    state = {
        activeQuestion: 0,
        answerState: null,
        isFinished: false,
        results: {},
        quiz: [
            {
                question: 'How\'re you?',
                rightAnswerId: 4,
                id: 1,
                answers: [
                    {text: 'Good', id: 1},
                    {text: 'Bad', id: 2},
                    {text: 'Angry', id: 3},
                    {text: 'Happy', id: 4}
                ]
            },
            {
                question: 'What are you doing here?',
                rightAnswerId: 1,
                id: 2,
                answers: [
                    {text: 'Answering stupid questions', id: 1},
                    {text: 'Sleeping in my bed', id: 2},
                    {text: 'Eating meat', id: 3},
                    {text: 'Reading book', id: 4}
                ]
            }
        ]
    }

    onClickAnswer = answerId => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)
            if (this.state.answerState[key] === 'right')
                return
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'right'
            }

            this.setState({answerState: {[answerId]: 'right',
                results: results}})
            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({isFinished: true})
                } else {
                    this.setState({activeQuestion: this.state.activeQuestion + 1,
                        answerState: null})
                }
                window.clearTimeout(timeout)
            }, 1000)

        } else {
            results[question.id] = 'wrong'
            this.setState({answerState: {[answerId]: 'wrong', 
                results: results}})
        }
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    onRetry = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    render() {
        return (
            <div className='quiz'>
                <div className='quizWrapper'>
                    <h1>Quiz</h1>
                    { this.state.isFinished 
                    ? <FinishedQuiz 
                        results={this.state.results}
                        quiz={this.state.quiz}
                        onRetry={this.onRetry}
                      /> 
                    : <ActiveQuiz
                        answers={this.state.quiz[this.state.activeQuestion].answers}
                        question={this.state.quiz[this.state.activeQuestion].question}
                        onClickAnswer={this.onClickAnswer}
                        answersListLength={this.state.quiz.length}
                        answerNumber={this.state.activeQuestion + 1}
                        answerState={this.state.answerState}
                    /> }
                </div>
            </div>
        )
    }
}

export default Quiz;