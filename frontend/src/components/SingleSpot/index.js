import { Link, Redirect, useParams,useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as spotsActions from '../../store/spots'
import * as reviewsActions from '../../store/reviews'
import { useEffect } from 'react'
import CreateReview from '../CreateReview'
import AddReviewImage from '../AddReviewImage'
import { useState } from 'react'


const SingleSpot = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const spot = useSelector(state => state.spots.singleSpot)
    const user = useSelector(state => state.session.user)
    let reviews = useSelector(state => state.reviews.spot)
    const history = useHistory()
    const [errorValidation, setErrorValidation] = useState([])


    // All reviews by a spot's Id
    reviews = Object.values(reviews)
    
    console.log('selector user',user)
    console.log('selector spot',spot)

    const smallAuth = user.id === spot.ownerId
    console.log(smallAuth)
    console.log(reviews)
    
    const errors = []
    useEffect(()=> {
        dispatch(spotsActions.getOneSpot(spotId)).catch(async data => {
            const error = await data.json()
            console.log(error.message)
            
            
        })
        dispatch(reviewsActions.getSpotReviews(spotId)).catch(async data => {
            const error = await data.json()
            console.log(error)
            errors.push(error)

        })
        
       return () => {
        dispatch(spotsActions.clear())
        dispatch(reviewsActions.clear())
       }
    }, [dispatch])
    console.log(errors)
    const deleteSpot = async () =>{
        const message = await dispatch(spotsActions.deleteSingleSpot(spotId))
        alert(message)
        history.push('/')
    }

    const deleteReview = async (id) => {
        dispatch(reviewsActions.deleteSingleReview(id))
    }

    // const deleteImage = () => {
    //    console.log('Finish CRUD for Reviews first')
    //     { smallAuth && <button onClick={deleteImage}>Delete Image</button> }
    // }
    console.log(spot)

    
    
    if(!spot.address)return null
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
                        <img style={{height:'100px', width:'100px'}} src={spotImage.url} alt="No Image" />
                        
                        </div>
                    )
                })
            )}
            <div>
            Reviews
            {reviews.length === 0 && (<h2>There are no reviews for this location</h2>)}
             {reviews.length > 0  && reviews.map((review, index) => {
                return (
                    <div key={index}>
                        <h2>{review.User.firstName} {review.User.lastName}</h2>
                        <h3>{review.review}</h3>
                        {review.ReviewImages.length > 0 && review.ReviewImages.map((img, index) => {
                            return (
                                
                                <img style={{height:'100px', width:'100px'}} key={index} src={img.url} alt="review Image" />
                                )
                            })}
                        {review.userId === user.id && <AddReviewImage id={review.id} spotId={spotId}/>}
                        {review.userId === user.id && <button onClick={()=>deleteReview(review.id)}>Delete Review</button>}
                    </div>
                )
             })}
             <CreateReview spotId={spotId} />
                
            </div>
        </div>
    )
}

export default SingleSpot
