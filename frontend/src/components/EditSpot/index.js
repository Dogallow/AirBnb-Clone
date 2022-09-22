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
    const [errorValidation, setErrorValidation] = useState([])

    const [imgUrl, setImgUrl] = useState('')
    const [preview, setPreview] = useState(false)

    const history = useHistory()

    if (goHome) {
        setGoHome(false)
        history.push(`/${spotId}`)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setErrorValidation([])
        let err = []

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

        const imgObj = {
            spotId,
            url: imgUrl,
            preview: Boolean(preview)
        }

        dispatch(spotsActions.editSingleSpot(spotId, editObj)).catch(async err => {
            const error = await err.json()
            console.log(error)
            err = ([...error.errors])
        })
        if (imgObj.url && preview.toString()) {
            dispatch(spotsActions.addSingleImage(spotId, imgObj)).catch(async err => {
                const error = await err.json()
                console.log(error)
                err = ([...error.errors])
            })
        }
        setErrorValidation(err)
        // console.log('error Validation', errorValidation)
        // setGoHome(true)

    }
    console.log(errorValidation)
    return (
        <form onSubmit={handleSubmit}>
            <div>
                {errorValidation.length > 0 && (
                    <ul>
                        {errorValidation.map((error, index) => {
                            return (
                                <li key={index}>{error}</li>
                            )
                        })}
                    </ul>
                )}
            </div>
            <div >
                <input style={{ width: '150px', height: '20px' }} onChange={(e) => setAddress(e.target.value)} value={address} />
            </div>
            <div >
                <input style={{ width: '150px', height: '20px' }} onChange={(e) => setCity(e.target.value)} value={city} />
            </div>
            <div >
                <input style={{ width: '150px', height: '20px' }} onChange={(e) => setState(e.target.value)} value={state} />
            </div>
            <div >
                <input style={{ width: '150px', height: '20px' }} onChange={(e) => setCountry(e.target.value)} value={country} />
            </div>
            <div >
                <input style={{ width: '150px', height: '20px' }} onChange={(e) => setLat(e.target.value)} value={lat} />
            </div>
            <div >
                <input style={{ width: '150px', height: '20px' }} onChange={(e) => setLng(e.target.value)} value={lng} />
            </div>
            <div >
                <input style={{ width: '150px', height: '20px' }} onChange={(e) => setName(e.target.value)} value={name} />
            </div>
            <div >
                <input style={{ width: '150px', height: '20px' }} onChange={(e) => setDescription(e.target.value)} value={description} />
            </div>
            <div >
                <input style={{ width: '150px', height: '20px' }} onChange={(e) => setPrice(e.target.value)} value={price} />
            </div>
            <div >
                <input style={{ width: '150px', height: '20px' }} onChange={(e) => setName(e.target.value)} value={name} />
            </div>
            <div>
                Add Image Here:
                <div >
                    <input placeholder='Image Url' style={{ width: '150px', height: '20px' }} onChange={(e) => setImgUrl(e.target.value)} value={imgUrl} />
                </div>
                <div >
                    <select style={{ width: '150px', height: '20px' }} onChange={(e) => setPreview(e.target.value)} value={preview}>
                        <option value='false'>False</option>
                        <option value='true'>True</option>
                    </select>
                </div>
            </div>
            <button type='submit' style={{ width: '150px' }} >Submit</button>
        </form>
    )
}

export default EditSpot
