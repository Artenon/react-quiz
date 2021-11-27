import React, {Component} from "react"
import './QuizCreator.css'
import '../../components/UI/button/button.css'
import {createControl, validate, validateForm} from '../../Form/formFramework'
import Input from "../../components/UI/Input/Input"
import Select from "../../components/UI/Select/Select"
import axios from "axios"

function createOptionControl(number) {
    return createControl({
        label: `Question №${number}`,
        errorMessage: 'Can\'t be empty',
        id: number
    }, {required: true})
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Enter the Question',
            errorMessage: 'Can\'t be empty'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }
}

export default class QuizCreator extends Component {
    state = {
        quiz: [],
        rightAnswerId: 1,
        isFormValid: false,
        formControls: createFormControls()
    }

    onSubmit = event => {
        event.preventDefault()
    }

    addQuestion = event => {
        event.preventDefault()
        const quiz = this.state.quiz
        const index = quiz.length + 1

        const {question, option1, option2, option3, option4} = this.state.formControls

        const questionItem = {
            question: question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        }
        quiz.push(questionItem)
        this.setState({
            quiz,
            rightAnswerId: 1,
            isFormValid: false,
            formControls: createFormControls()
        })
    }

    createQuiz = event => {
        event.preventDefault()
        axios.post('https://react-quiz-2a49b-default-rtdb.firebaseio.com/quizes.json', this.state.quiz)
            .then(response => {
                console.log(response)
            })
            .catch(error => console.log(error))
    }

    onChange = (value, controlName) => {
        const formControls = this.state.formControls
        const control = formControls[controlName]

        control.touched = true
        control.value = value
        control.valid = validate(value, control.required)

        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }

    selectChange = event => {
        this.setState({
            rightAnswerId: event.target.value
        })
    }

    renderInputs = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]

            return (
                <React.Fragment key={controlName + index}>
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={true}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => this.onChange(event.target.value, controlName)}
                    />
                    { index === 0 ? <hr/> : null }
                </React.Fragment>
            )
        })
    }
    
    render() {
        return (
            <div className='quizCreator'>
                <div>
                    <h1>Quiz Creator</h1>
                    
                    <form onSubmit={this.onSubmit}>
                        
                        { this.renderInputs() }

                        <Select 
                            label='Choose right answer'
                            value={this.state.rightAnswerId}
                            onChange={this.selectChange}
                            options={[
                                {text: 1, value: 1},
                                {text: 2, value: 2},
                                {text: 3, value: 3},
                                {text: 4, value: 4},
                            ]}
                        />

                        <button className='add-button' onClick={this.addQuestion}>
                            Add Question
                        </button>
                        <button className='create-button' onClick={this.createQuiz}>
                            Create Quiz
                        </button>
                    </form>
                
                </div>
            </div>
        )
    }
} 