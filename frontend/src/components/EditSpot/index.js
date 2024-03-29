import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import * as spotsActions from '../../store/spots'
import './EditSpot.css'
import { csrfFetch } from '../../store/csrf';

const EditSpot = () => {
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots.singleSpot);
    const dispatch = useDispatch();
    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [country, setCountry] = useState(spot.country);
    const [lat, setLat] = useState(spot.lat);
    const [lng, setLng] = useState(spot.lng);
    const [name, setName] = useState(spot.name);
    const [description, setDescription] = useState(spot.description);
    const [price, setPrice] = useState(spot.price);
    const [goHome, setGoHome] = useState(false);
    const [errorValidation, setErrorValidation] = useState([]);
    const [imgUrl, setImgUrl] = useState(null);
    const [preview, setPreview] = useState(false);
    const history = useHistory();
    
    useEffect( () => {
        const anon = async () => {
            await dispatch(spotsActions.getOneSpot(spotId))
        };
        anon()
    },[dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        

        await setErrorValidation([]);
        let validate = [];

        let latitude = null
        let longitude = null
        let data = await csrfFetch('/api/spots/getCoordinates', {
                method: "POST",
                body: JSON.stringify({address, city, state, country})
            })
        
        let result = await data.json()

        if (result.error){
            console.log(result.error)
            validate.push(result.error)
        }else {

            console.log(`THIS IS THE COORDINATES RETURNED TO THE FRONTEND: `, result.latitude, result.longitude)
            latitude = result.latitude
            longitude = result.longitude
        }
        
        const editObj = {
            address,
            city,
            state,
            country,
            lat: latitude || 0,
            lng: longitude || 0,
            name,
            description,
            price: parseFloat(price)
        };

        const imgObj = {
            spotId,
            url: imgUrl,
            preview: Boolean(preview)
        };
        

        let fetch =  await dispatch(spotsActions.editSingleSpot(spotId, editObj)).catch(async err => {
            const error = await err.json();
            validate = [...error.errors];
        });
        
        
        let fetch2;
        if (imgObj.url && preview.toString()) {
        fetch2 = await  dispatch(spotsActions.addSingleImageAWS(spotId, imgObj)).catch(async err => {
                const error = await err.json();
                
                validate = [...error.errors];
            })
        };
        
        
        if(validate.length === 0){
            
            history.push(`/${spotId}`);
        };
        

        setErrorValidation(validate);
    };

    let bool = true;
    if (spot){
        if (spot.SpotImages?.length >= 5){
            bool = false;
        };
    };

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImgUrl(file);
    };
    
    return (
        <div className='edit-spot-component-container' style={{height: '100%'}}>
            <div className='edit-form-container'>
                <div className='edit-form-header-text'>
                    <h1>Edit Form</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div >
                        {errorValidation.length > 0 && (
                            <ul style={{listStyleType: 'none', color:'red'}}>
                                {errorValidation.map((error, index) => {
                                    return (
                                        <li key={index}>{error}</li>
                                    )
                                })}
                            </ul>
                        )}
                    </div>
                    <div className='edit-spot-beginning-input-field'>
                        <input placeholder='Address' onChange={(e) => setAddress(e.target.value)} value={address} />
                    </div>
                    <div className='edit-spot-middle-input-field'>
                        <input placeholder='City' onChange={(e) => setCity(e.target.value)} value={city} />
                    </div>
                    <div className='edit-spot-middle-input-field'>
                        <input placeholder='State' onChange={(e) => setState(e.target.value)} value={state} />
                    </div>
                    <div className='edit-spot-middle-input-field'>
                        <input placeholder='Country' onChange={(e) => setCountry(e.target.value)} value={country} />
                    </div>
                    {/*<div className='edit-spot-middle-input-field'>
                        <input placeholder='Latitude' onChange={(e) => setLat(e.target.value)} value={lat} />
                    </div>
                    <div  className='edit-spot-middle-input-field'>
                        <input placeholder='Longitude' onChange={(e) => setLng(e.target.value)} value={lng} />
                    </div>*/}
                    <div  className='edit-spot-middle-input-field'>
                        <input placeholder='Name' onChange={(e) => setName(e.target.value)} value={name} />
                    </div>
                    <div className='edit-spot-middle-input-field'>
                        <input placeholder='Description' onChange={(e) => setDescription(e.target.value)} value={description} />
                    </div>
                    <div className='edit-spot-middle-input-field'>
                        <input placeholder='Price' onChange={(e) => setPrice(e.target.value)} value={price} />
                    </div>
                    {spot && bool && <div className='add-image-component-container'>
                    Add Image Here:
                    <div className='add-image-beginning-input-field'>
                        <input type='file' onChange={updateFile} />
                    </div>
                    <div className='add-image-ending-select-field'>
                        <label>Preview:</label>
                        <select onChange={(e) => setPreview(e.target.value)} value={preview}>
                            <option value='false'>False</option>
                            <option value='true'>True</option>
                        </select>
                    </div>
                </div>}
                <div className='edit-spot-button'>
                    <button type='submit'  >Submit</button>
                </div>
                </form>
            </div>
        </div>
    );
};

export default EditSpot;
