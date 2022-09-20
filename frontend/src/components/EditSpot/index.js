import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import * as spotsActions from '../../store/spots'

const EditSpot = () => {
    const { spotId } = useParams()
    const spot = useSelector(state => state.spots.singleSpot)
    const dispatch = useDispatch()
    const [address, setAddress] = useState(spot.address)
    const [city, setCity] = useState(spot.city)
    const [state, setState] = useState(spot.state)
    const [country, setCountry] = useState(spot.country)
    const [lat, setLat] = useState(spot.lat)
    const [lng, setLng] = useState(spot.lng)
    const [name, setName] = useState(spot.name)
    const [description, setDescription] = useState(spot.description)
    const [price, setPrice] = useState(spot.price)
    const [goHome, setGoHome] = useState(false)
    
    const history = useHistory()
    
    if(goHome){
        setGoHome(false)
        history.push(`/`)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const editObj = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        }
        setGoHome(true)
        return dispatch(spotsActions.editSingleSpot(spotId, editObj))
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <div >
                <input style={{ width: '150px', height: '20px' }} onChange={(e)=> setAddress(e.target.value)} value={address}/>
            </div>
            <div >
                <input style={{ width: '150px', height: '20px' }} onChange={(e)=> setCity(e.target.value)} value={city}/>
            </div>
            <div >
                <input style={{ width: '150px', height: '20px' }} onChange={(e)=> setState(e.target.value)} value={state}/>
            </div>
            <div >
                <input style={{ width: '150px', height: '20px' }} onChange={(e)=> setCountry(e.target.value)} value={country}/>
            </div>
            <div >
                <input style={{ width: '150px', height: '20px' }} onChange={(e)=> setLat(e.target.value)} value={lat}/>
            </div>
            <div >
                <input style={{ width: '150px', height: '20px' }} onChange={(e)=> setLng(e.target.value)} value={lng}/>
            </div>
            <div >
                <input style={{ width: '150px', height: '20px' }} onChange={(e)=> setName(e.target.value)} value={name}/>
            </div>
            <div >
                <input style={{ width: '150px', height: '20px' }} onChange={(e)=> setDescription(e.target.value)} value={description}/>
            </div>
            <div >
                <input style={{ width: '150px', height: '20px' }} onChange={(e)=> setPrice(e.target.value)} value={price}/>
            </div>
            <div >
                <input style={{ width: '150px', height: '20px' }} onChange={(e)=> setName(e.target.value)} value={name}/>
            </div>
            <button type='submit' style={{width: '150px'}} >Submit</button>
        </form>
        )
    }
    
export default EditSpot
