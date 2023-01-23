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

    const [imgUrl, setImgUrl] = useState('')
    const [preview, setPreview] = useState(true)

    // console.log(spots)

    if (isSubmitted) {
        setIsSubmitted(false)
        history.push('/')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        let validate = []
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
            lat: parseFloat(lat) || 0,
            lng: parseFloat(lng) || 0,
            name,
            description,
            price: parseFloat(price)
        }
        
        if (!address){
            validate = [...validate, 'Spot must have a valid address']
        }

        if (!city){
            validate = [...validate, 'Spot must have a valid city']
        }

        if (!state){
            validate = [...validate, 'Spot must have a valid state']
        }

        if (!country){
            validate = [...validate, 'Spot must have a valid country']
        }

        if (!name) {
            validate = [...validate, 'Spot must have a valid name']
        }

        if (!price) {
            validate = [...validate, 'Spot must have a valid price']
        }
        let imgObj = {}

        imgObj = {

            url: imgUrl,
            preview: Boolean(preview)
        }
        if (!imgObj.url){
            validate = [...validate, 'Must have an Image Url']
            setErrors(validate)
            
        } else
        if (!imgObj.url.endsWith('.png') || !imgObj.url.endsWith('.jpg') || !imgObj.url.endsWith('.jpeg') || !imgObj.url.endsWith('.webp')){
            validate = [...validate, 'Image address must end with .png, .jpg, .jpeg, .webp']
            setErrors(validate)
            
        }
        if (validate.length > 0){
            setErrors(validate)
            return
        }
        const success = await dispatch(spotsActions.createNewSpot(newSpot)).catch(async err => {
            const error = await err.json()
            // console.log(error.errors)
            if (error && error.errors) {
                
                validate = [...validate, ...error.errors]
            }

        })
        

        if (imgObj.url) {
            await dispatch(spotsActions.addSingleImage(success.id, imgObj)).catch(async err => {
                const error = await err.json()
                // console.log('', error)
                validate = [...validate, ...error.errors]

            })
        }

        if (success && validate.length === 0) {
            setIsSubmitted(true)
        }

        setErrors(validate)
    }


    return (
        <div className='signup-component-container' >

            <div className="signup-form-container">
            <div className='header-text'>
            Create Spot
            </div>
                <form onSubmit={handleSubmit} >
                    <div className='welcome-text'>
                    <h3 style={{ textAlign: 'left' }}>Welcome to Airbnb</h3>
                    </div>
                    <ul style={{ listStyleType: 'none', color: 'red' }}>
                        {errors && (errors.map((err, index) => (
                            <li key={index}>{err}</li>
                        )))}
                    </ul>
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
                        <input placeholder='Enter a description' onChange={(e) => setDescription(e.target.value)} value={description} />
                    </div>
                    <div className='input-field-container2'>
                        <input type={'number'} placeholder='Price' onChange={(e) => setPrice(e.target.value)} value={price} />
                    </div>

                    <div className='add-image-component-container'>
                        Add Image Here:
                        <div className='add-image-beginning-input-field'>
                            <input placeholder='Image Url' onChange={(e) => setImgUrl(e.target.value)} value={imgUrl} />
                        </div>

                    </div>

                    <button type='submit'>Continue</button>
                </form>
            </div>
        </div>
    )
}

export default NewSpot
