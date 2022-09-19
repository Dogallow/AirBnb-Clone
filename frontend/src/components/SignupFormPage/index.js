import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as sessionActions from '../../store/session'
import { useHistory } from 'react-router-dom'
import './SignupForm.css'

const SignupFormPage = () => {
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

    if(session){
        history.push('/')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(password === confirmPassword) {
            setErrors([])
            const newUser = {
                firstName,
                lastName,
                email,
                username,
                password
            }
    
            return dispatch(sessionActions.newUser(newUser)).catch(async err =>{
                const error = await err.json()
                if (error && error.errors) setErrors(error.errors)

            })
        }
        return setErrors(['password and confirm password must match'])
    }
    
    return (
        <div className='signup-component-container'>
        
            <ul>
                {errors && (errors.map((err, index) => (
                    <li key={index}>{err}</li>
                )))}
            </ul>
            <div className="signup-form-container">
                <div className='header-text'>
                    Sign up
                </div>
                <form onSubmit={handleSubmit} >
                    <div className='welcome-text'>
                        <h3 style={{ textAlign: 'left' }}>Welcome to Airbnb</h3>
                    </div>
                    <div className='input-field-container1'>
                        <label></label>
                        <input placeholder='FirstName'  onChange={(e) => setFirstName(e.target.value)} value={firstName}/>
                    </div>
                    <div className='additional-input-field'>
                        <label></label>
                        <input placeholder='LastName' onChange={(e) => setLastName(e.target.value)} value={lastName} />
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
                        <input placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} />
                    </div>
                    <div className='input-field-container2'>
                        <label></label>
                        <input placeholder='Confirm Password'  onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                    </div>
                    <button type='submit'>Continue</button>
                </form>
            </div>
        </div>
    )
}

export default SignupFormPage
