import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as sessionActions from '../../store/session'
import { useHistory } from 'react-router-dom'
import './SignupForm.css'

const SignUpForm = ({ signupSetter }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    const history = useHistory()
    const session = useSelector(state => state.session.user)

    // if (session) {
    //     history.push('/')
    // }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password === confirmPassword) {
            setErrors([])
            let validate = []
            const newUser = {
                firstName,
                lastName,
                email,
                username,
                password
            }
            
            await dispatch(sessionActions.newUser(newUser)).catch(async err => {
                const error = await err.json()
                if (error && error.errors) {
                    
                    validate = [...error.errors]
                }

            })
            if (validate.length === 0){
                signupSetter(false)
            }
            setErrors(validate)
            return
        }
        return setErrors(['password and confirm password must match'])
    }

    return (
        <div className='signup-component-container'>
        
        <div className="signup-form-container">
            <div className='header-text'>
            Sign up
            </div>
             <form onSubmit={handleSubmit} >
                    <div className='welcome-text'>
                        <h3 style={{ textAlign: 'left' }}>Welcome to Airbnb</h3>
                        <ul style={{ listStyleType: 'none', color: 'red' }}>
                            {errors && (errors.map((err, index) => (
                                <li key={index}>{err}</li>
                            )))}
                        </ul>
                    </div>
                    <div className='input-field-container1'>
                        <label></label>
                        <input placeholder='FirstName' onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                    </div>
                    <div className='additional-input-field'>
                        <label></label>
                        <input  placeholder='LastName' onChange={(e) => setLastName(e.target.value)} value={lastName} />
                    </div>
                    <div className='additional-input-field'>
                        <label></label>
                        <input placeholder='E-mail' onChange={(e) => setEmail(e.target.value)} value={email} />
                    </div>
                    <div className='additional-input-field'>
                        <label></label>
                        <input placeholder='Username' onChange={(e) => setUsername(e.target.value)} value={username} />
                    </div>
                    <div className='additional-input-field'>
                        <label></label>
                        <input type={'password'} placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} />
                    </div>
                    <div className='input-field-container2'>
                        <label></label>
                        <input type={'password'} placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                    </div>
                    <button type='submit'>Continue</button>
                </form>
            </div>
        </div>
    )
}

export default SignUpForm
