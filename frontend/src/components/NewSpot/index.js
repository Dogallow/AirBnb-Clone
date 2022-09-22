import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as spotsActions from '../../store/spots'

const NewSpot = () => {
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [errors, setErrors] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    const spots = useSelector(state => state.spots.allSpots)
    
    // console.log(spots)
    
    if (isSubmitted) {
        setIsSubmitted(false)
        history.push('/')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
            setErrors([])
        // if (password === confirmPassword) {
        //     const newUser = {
        //         firstName,
        //         lastName,
        //         email,
        //         username,
        //         password
        //     }

        const newSpot = {
            address,
            city,
            state,
            country,
            lat: parseFloat(lat),
            lng: parseFloat(lng),
            name,
            description,
            price: parseFloat(price)
        }
        console.log(newSpot)
    
        
        const success = await dispatch(spotsActions.createNewSpot(newSpot)).catch(async err => {
                const error = await err.json()
                console.log(error.errors)
                if (error && error.errors) setErrors(error.errors)

            })
            console.log('success', success)
            
            if (success){
                setIsSubmitted(true)
            }
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
                        <input placeholder='Address' onChange={(e) => setAddress(e.target.value)} value={address} />
                    </div>
                    <div className='additional-input-field'>
                        <label></label>
                        <input placeholder='city' onChange={(e) => setCity(e.target.value)} value={city} />
                    </div>
                    <div className='additional-input-field'>
                        <label></label>
                        <input placeholder='state' onChange={(e) => setState(e.target.value)} value={state} />
                    </div>
                    <div className='additional-input-field'>
                        <label></label>
                        <input placeholder='Country' onChange={(e) => setCountry(e.target.value)} value={country} />
                    </div>
                    <div className='additional-input-field'>
                        <label></label>
                        <input type={'number'} placeholder='Latitude' onChange={(e) => setLat(e.target.value)} value={lat} />
                    </div>
                    <div className='additional-input-field'>
                        <label></label>
                        <input type={'number'} placeholder='Longitude' onChange={(e) => setLng(e.target.value)} value={lng} />
                    </div>
                    <div className='additional-input-field'>
                        <label></label>
                        <input placeholder='Name' onChange={(e) => setName(e.target.value)} value={name} />
                    </div>
                    <div className='additional-input-field'>
                        <input placeholder='Enter a description' onChange={(e) => setDescription(e.target.value)} value={description}/>
                    </div>
                    <div className='input-field-container2'>
                        <input type={'number'} placeholder='Price' onChange={(e) => setPrice(e.target.value)} value={price}/>
                    </div>
                    <button type='submit'>Continue</button>
                </form>
            </div>
        </div>
    )
}

export default NewSpot
