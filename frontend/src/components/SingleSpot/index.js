import { Link, Redirect, useParams,useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as spotsActions from '../../store/spots'
import * as reviewsActions from '../../store/reviews'
import { useEffect } from 'react'
import CreateReview from '../CreateReview'
import AddReviewImage from '../AddReviewImage'
import { useState } from 'react'
import './SingleSpot.css'

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
        console.log('single spot',spot)
        
        
        
        if(!spot.Owner)return null
        let smallAuth
        if(!user){
            smallAuth = false
        }else{

            smallAuth = (user.id === spot.ownerId) ? true : false
        }
        console.log(smallAuth)
        return (
            <div className='single-spot-outer-container'>
                <div className='main-header-container'></div>
                <div className='main-image-container'>
                    { spot.SpotImages.length > 0 && (
                        spot.SpotImages.map((spotImage, index) => {
                            if(index > 5) return
                            if(index === 0){
                                return (
                                    <div className='left-image-container-main' key={index}>
                                        <img   src={spotImage.url} alt="No Image" />

                                    </div>
                                )
                            }
                            return (
                                <div className={`right-image-container-quad index${index}`} key={index}>
                                    <img src={spotImage.url} alt="No Image" />
                                
                                </div>
                            )
                        })
                    )}
                </div>
                <div className='main-details-container'>
                    <div className='left-details-container'>
                        <div className='details-header'>
                            <h3>{spot.name} hosted by {spot.Owner.firstName}</h3>
                            
                        </div>
                        <div className='details-body'>
                            <p>{spot.description}</p>

                            <p>Average Rating:<i className="fa-solid fa-star"></i> {spot.avgRating}</p>

                            <p>Location: {spot.city}, {spot.state} {spot.country}</p>

                            <p>Free Cancellation before Booking Starts</p>
                        </div>

                        <div className='details-body-2'>
                            <img src='https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg' alt='airco'/>
                            <h4>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</h4>                            
                        </div>

                        <div className='details-body-3'>
                            <p>{spot.description}</p>
                        </div>
                        <h4></h4>
                        {smallAuth && <button onClick={() => history.push(`/edit/${spot.id}`)}>Edit Spot</button>}
                        {smallAuth && <button onClick={deleteSpot}>Delete Spot</button>}
                    </div>
                    <div className='right-details-container'>
                        <div className="card-container">
                            <div className='form'>
                                <div className='form-details'>
                                    <h3>${spot.price}night</h3>
                                    <div className='form-details-right'>
                                        <p><i className="fa-solid fa-star"></i>{spot.avgRating}</p>
                                        •
                                    <p>{spot.numReviews}</p>
                                    </div>
                                </div>
                                <div className='form-body'>

                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                    
                <div className='main-reviews-container'>
                    <div className='review-title'>
                        
                        <h1><i className="fa-solid fa-star"></i>{spot.avgRating} • {spot.numReviews} Reviews</h1>
                    </div>
                    {reviews.length === 0 && (null)}
                    <div className='review-grid-container'>
                        {reviews.length > 0  && reviews.map((review, index) => {
                            return (
                                <div key={index}>
                                    <div className='review-header'>
                                        <h2>{review.User.firstName} {review.User.lastName}</h2>
                                        <p>{review.updatedAt}</p>
                                    </div>
                                    <div className='review-body'>
                                        <h3>{review.review}</h3>
                                        {review.ReviewImages.length > 0 && review.ReviewImages.map((img, index) => {
                                            return (
                                                
                                                <img style={{height:'100px', width:'100px'}} key={index} src={img.url} alt="review Image" />
                                                )
                                            })}
                                    </div>
                                    {user && review.userId === user.id && <AddReviewImage id={review.id} spotId={spotId}/>}
                                    {user && review.userId === user.id && <button onClick={()=>deleteReview(review.id)}>Delete Review</button>}
                                </div>
                            )
                        })}
                    </div>
                    {user && <CreateReview spotId={spotId} />}
                </div>
                    
                
        </div>
    )
}

export default SingleSpot
