import React, {Component} from "react"
import { NavLink } from "react-router-dom"
import './QuizList.css'
import axios from "axios"
import Loader from "../../components/UI/Loader/Loader"
export default class QuizList extends Component {
    
    state = {
        quizes: [],
        loading: true
    }

    renderQuizList() {
        return this.state.quizes.map(quiz => {
            return (
                <li key={quiz.id}>
                    <NavLink to={'/quiz/' + quiz.id}>
                        { quiz.name }
                    </NavLink>
                </li>
            )
        })
    }
    
    async componentDidMount() {
        try {
            const response = await axios.get('https://react-quiz-2a49b-default-rtdb.firebaseio.com/quizes.json')
            const quizes = []

            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Test №${index + 1}`                   
                })
            })
            this.setState({
                quizes,
                loading: false
            })
        } catch(error) {
            console.log(error)
        }
    }

    render() {
        return (
            <div className='quizList'>
                <div>
                    <h1>Quiz List</h1>
                    { this.state.loading
                    ? <Loader />
                    :   <ul>
                            {this.renderQuizList()}
                        </ul> }
                </div>
            </div>
        )
    }
} 