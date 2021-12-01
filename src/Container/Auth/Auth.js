import React, {Component} from "react"
import './Auth.css'
import '../../components/UI/button/button.css'
import Input from "../../components/UI/Input/Input"
import axios from "axios"

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default class Auth extends Component {
    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label:'Email',
                errorMessage: 'Enter correct Email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label:'Password',
                errorMessage: 'Password length must be greater than 6',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }
    
    login = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }

        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCPrpkJTCjK039Y5f1esEZhLMvXTlrpkrk', authData)
            console.log(response.data)
        } catch(error) {
            console.log(error)
        }
    }

    register = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }

        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCPrpkJTCjK039Y5f1esEZhLMvXTlrpkrk', authData)
            console.log(response.data)
        } catch(error) {
            console.log(error)
        }
    }

    submit = event => {
        event.preventDefault()
    }

    validateControl(value, validation) {
        if (!validation){
            return true
        }

        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        if (validation.email) {
            isValid = validateEmail(value) && isValid
        }

        return isValid
    }

    onChange = (event, controlName) => {
        const formControls = this.state.formControls
        const control = formControls[controlName]

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true
        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({formControls, isFormValid})
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Input 
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={true}
                    errorMessage={control.errorMessage}
                    onChange={event => this.onChange(event, controlName)}
                />
            )
        })
    }
    
    render() {
        return (
            <div className='auth'>
                <div>
                    <h1>Authorization</h1>
                    <form onSubmit={this.submit} className='authForm'>
                        { this.renderInputs() }
                        <button 
                            onClick={this.login} 
                            className='login'
                            disabled={!this.state.isFormValid}
                        >
                            Sign in
                        </button>

                        <button 
                            onClick={this.register} 
                            className='register'
                            disabled={!this.state.isFormValid}
                        >
                            Sign up
                        </button>
                    </form>
                </div>
            </div>
        )
    }
} 