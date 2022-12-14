import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as sessionActions from '../../store/session';
import { useHistory } from 'react-router-dom'
import './LoginForm.css';

const LoginForm = ({ loginSetter }) => {
    const [credential, setCredential] = useState('')
    const [password, setPassword] = useState('')
    const [errorValidation, setErrorValidation] = useState([])
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)

    // if (sessionUser) {
    //     return history.push('/')
    // }



    const handleSubmit = async (e) => {
        e.preventDefault()

        setErrorValidation([])
        const errors = []

        const userInfo = {
            credential,
            password
        }

        await dispatch(sessionActions.getLoggedIn(userInfo))
        .catch(async res => {
            const data = await res.json()
            
            if (data && data.errors) {
                setErrorValidation(data.errors)
                errors = [...data.errors]
            }
            
        })

        if(errors.length === 0){

            loginSetter(false)
        }

        setErrorValidation(errors)
    }
    return (
        <div className='login-component-container'>
            
            <div className="form-container">
                <div className='header-text'>
                    Log In
                </div>
                <form onSubmit={handleSubmit}>

                    <div className='welcome-text'>
                        <h3 style={{ textAlign: 'left' }}>Welcome to Airbnb</h3>
                        <ul style={{ listStyleType: 'none', color: 'red' }}>
                            {errorValidation && errorValidation.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='input-field-container1'>
                        <label htmlFor="credential"></label>
                        <input placeholder='Credential' id="credential" onChange={(e) => setCredential(e.target.value)} value={credential} />
                    </div>
                    <div className='input-field-container2'>
                        <label htmlFor='password'></label>
                        <input type='password' placeholder='Password' id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                    </div>
                    <div>
                        <button type='submit' ><span>Continue</span></button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm
