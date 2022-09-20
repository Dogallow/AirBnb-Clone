import { Link, Redirect, useParams,useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as spotsActions from '../../store/spots'
import { useEffect } from 'react'

const SingleSpot = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const spot = useSelector(state => state.spots.singleSpot)
    const user = useSelector(state => state.session.user)
    const history = useHistory()
    
    console.log('selector user',user)
    console.log('selector spot',spot)

    const smallAuth = user.id === spot.ownerId
    console.log(smallAuth)
    
    useEffect(()=> {
        dispatch(spotsActions.getOneSpot(spotId))
    }, [])

    const deleteSpot = async () =>{
        const message = await dispatch(spotsActions.deleteSingleSpot(spotId))
        alert(message)
        history.push('/')
    }

    // const deleteImage = () => {
    //    console.log('Finish CRUD for Reviews first')
    //     { smallAuth && <button onClick={deleteImage}>Delete Image</button> }
    // }
    console.log(spot.SpotImages)
    
    if(!spot.Owner)return <div>Loading...</div>
    return (
        <div>
            <h3>Address: {spot.address}</h3>
            <h2>Owner: {spot.Owner.firstName}  {spot.Owner.lastName}</h2>
            <h4>Average Rating: {spot.avgRating}</h4>
            {smallAuth && <button onClick={() => history.push(`/edit/${spot.id}`)}>Edit Spot</button>}
            {smallAuth && <button onClick={deleteSpot}>Delete Spot</button>}
            { spot.SpotImages.length > 0 && (
                spot.SpotImages.map((spotImage, index) => {
                    return (
                        <div key={index}>
                        <img src={spotImage.url} alt="No Image" />
                        
                        </div>
                    )
                })
            )}
        </div>
    )
}

export default SingleSpot
