import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as sessionActions from '../../store/session'
import { useHistory } from 'react-router-dom'

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
        <div>
            <ul>
                {errors && (errors.map((err, index) => (
                    <li key={index}>{err}</li>
                )))}
            </ul>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name</label>
                    <input onChange={(e) => setFirstName(e.target.value)} value={firstName}/>
                </div>
                <div>
                    <label>Last Name</label>
                    <input onChange={(e) => setLastName(e.target.value)} value={lastName} />
                </div>
                <div>
                    <label>E-mail</label>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                <div>
                    <label>Username</label>
                    <input onChange={(e) => setUsername(e.target.value)} value={username} />
                </div>
                <div>
                    <label>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default SignupFormPage
