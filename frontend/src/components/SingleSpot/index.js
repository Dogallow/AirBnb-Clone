import { Link, Redirect, useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as spotsActions from '../../store/spots'
import * as reviewsActions from '../../store/reviews'
import * as bookingsActions from '../../store/bookings'
import { useEffect } from 'react'
import {CreateReviewModal} from '../CreateReview'
import AddReviewImage from '../AddReviewImage'
import { useState } from 'react'
import './SingleSpot.css'
import Bookings from '../Bookings'
import EditReview from '../EditReview'

const SingleSpot = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const spot = useSelector(state => state.spots.singleSpot)
    const user = useSelector(state => state.session.user)
    
    let stateReviews = useSelector(state => state.reviews.spot)
    const bookings = useSelector(state => state.bookings.spot)
    const history = useHistory()
    const [errorValidation, setErrorValidation] = useState([])
    const [img1, setImg1] = useState('')
    const [img2, setImg2] = useState('')
    const [reviewModal, setReviewModal] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(1)
    const [reviewId, setReviewId] = useState(null)
    const [showInput, setShowInput] = useState(false)
    
    


    // All reviews by a spot's Id
    let reviews = Object.values(stateReviews)

    console.log('selector user', user)
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!! selector spot !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', spot)
    console.log('%%%%%%%%%%%%%%%%%%%%%%%%% Bookings %%%%%%%%%%%%%%%%%%%%%%%%%%', bookings)
    console.log('%%%%%%%%%%%%%%%%%%%%%%%%% reviews %%%%%%%%%%%%%%%%%%%%%%%%%%', reviews)

    let arrOfBookings = Object.values(bookings)


    
    let formattedBookings = arrOfBookings.map(booking => {
        const months = ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"]
        console.log(booking)
        if (booking.startDate.includes('T') || booking.endDate.includes('T')){
            booking.startDate = booking.startDate.split('T').join(' ')
            booking.endDate = booking.endDate.split('T').join(' ')
            
        } 

            let startDate = booking.startDate.split(' ')[0]
            let endDate = booking.endDate.split(' ')[0]
    
            let startDateSplitDate = startDate.split('-')
            let startMonth = months[parseInt(startDateSplitDate[1]) - 1]
            let startYear = startDateSplitDate[0]
            let startDay = startDateSplitDate[2]
    
            let formattedStartDate = [startMonth, ' ', startDay, ', ', startYear].join('')
            // console.log(formattedStartDate)
            
            let endDateSplitDate = endDate.split('-')
            let endMonth = months[parseInt(endDateSplitDate[1]) - 1]
            let endYear = endDateSplitDate[0]
            let endDay = endDateSplitDate[2]
    
            let formattedEndDate = [endMonth, ' ', endDay, ', ', endYear].join('')
            // console.log(formattedEndDate)
            return {
                id: booking.id,
                userId: booking.userId,
                startDate: formattedStartDate,
                endDate: formattedEndDate
            }
        
    })
    // console.log('@@@@@@@@@@@@@@@@ Reviews @@@@@@@@@@@@@@@@@@@@@@@@@', reviews)

    const errors = []

    useEffect(() => {

        dispatch(spotsActions.getOneSpot(spotId)).catch(async data => {
            const error = await data.json()
            // console.log(error.message)


        })
        dispatch(reviewsActions.getSpotReviews(spotId)).catch(async data => {
            const error = await data.json()
            // console.log(error)
            errors.push(error)

        })
        if (user){
            console.log('THIS IS RUNNING *************************************************************************************************************************************')

            dispatch(bookingsActions.thunk_spotBookings(spotId)).catch(async data => {
                console.log(data)
                // const error = await data.json()
                // console.log(error)
                // errors.push(error)
    
            })
        }

       
        
        return () => {
            dispatch(spotsActions.clear())
            dispatch(reviewsActions.clear())
        }
    }, [dispatch])


    // console.log(errors)
    const deleteSpot = async () => {
        const message = await dispatch(spotsActions.deleteSingleSpot(spotId))
        alert(message)
        history.push('/')
    }

    

    const deleteReview = async (id) => {
        
    dispatch(reviewsActions.deleteSingleReview(id)).then(()=> {
        dispatch(spotsActions.getOneSpot(spotId)).catch(async data => {
            const error = await data.json()
            // console.log(error.message)


        })
    })
        
    }



    // const deleteImage = () => {
    //    console.log('Finish CRUD for Reviews first')
    //     { smallAuth && <button onClick={deleteImage}>Delete Image</button> }
    // }
    // console.log('single spot', spot)



    if (!spot.Owner) return null
    let smallAuth
    if (!user) {
        smallAuth = false
    } else {

        smallAuth = (user.id === spot.ownerId) ? true : false
    }

    // console.log('################## Spot selector ####################', !Object.values(spot).length)



    let variant
    let variant2
    let variant3
    let variant4
    let imageCount = spot.SpotImages.length
    if (!spot.SpotImages.length) {
        // console.log('################## Spot selector ####################', spot)
    }
    else
        if (spot.SpotImages.length === 1) {
            variant = 'full'
            // console.log('################## Spot selector ####################', spot, spot.SpotImages.length)
        } else if (spot.SpotImages.length === 2) {
            variant = 'left-main'
            variant2 = 'right-main'
            // console.log('################## Spot selector ####################', spot, spot.SpotImages.length)
        }
        else if (spot.SpotImages.length === 3) {
            variant = 'left-main'
            variant2 = 'right-top-half'
            variant3 = 'right-bottom-half'
        } else if (spot.SpotImages.length === 4) {
            variant = 'left-main'
            variant2 = 'right-top-half'
            variant3 = 'bottom-left-split'
            variant4 = 'bottom-right-split'
        }
        else {
            variant = 'left-main'
            variant2 = 'right-quad'
            // console.log('################## Spot selector ####################', spot, spot.SpotImages.length)

        }

        console.log('Image Count  ^^^^^^^',imageCount)

    let reviewBool = false
        
        if (user){

            reviews.forEach(review => {
                if (review.User.firstName === user.firstName && review.User.lastName === user.lastName){
                    reviewBool = true
                }
            })
        }


    const deleteImage = async (e, spotImageId) => {
        e.preventDefault()
        console.log('In component',spotImageId)
        await dispatch(spotsActions.deleteSpotImageThunk(spotImageId)).then(() => {
            dispatch(spotsActions.getOneSpot(spotId)).catch(async data => {
                const error = await data.json()
                // console.log(error.message)


            })
        })
    }

    const handleDeleteBooking = async (id) => {
        await dispatch(bookingsActions.deleteBookingThunk(id))
    }
    console.log(reviewBool)
    return (
        <div className='single-spot-outer-container' style={{marginBottom:'30px'}}>
            <div className='main-header-container'>
                <div style={{ marginBottom: '4px' }} className="header-details">
                    {spot.name}
                </div>
                <div className="header-sub-details">
                    <p><i className="fa-solid fa-star"></i> {spot.avgRating}</p>
                    <span> ·</span>
                    <p style={{ textDecoration: 'underline' }}>{reviews.length} reviews</p>
                    <span>·</span>
                    <p style={{ textDecoration: 'underline' }}>{spot.city}, {spot.state}, {spot.country}</p>
                </div>
            </div>
            <div className='main-image-container'>
                {spot.SpotImages.length === 0 && (
                    <div className='full' >
                        <img src='https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80' alt="No Image Provided" />

                    </div>
                )}
                {spot.SpotImages.length > 0 && (

                    spot.SpotImages.map((spotImage, index) => {
                        if (index > 4) return
                        if (imageCount <= 2) {
                            if (index === 0) {
                                return (
                                    
                                    <div className={`${variant}`} key={index} >
                                        <img src={spotImage.url} alt="No Image" />
                                        <div  className={user && user.id === spot.ownerId && imageCount !== 1 ? 'delete-logo-container' : ''}>
                                            <div className= 'position-logo-container' onClick={(e) =>{
                                                console.log(spotImage.id)
                                                deleteImage(e, spotImage.id)}}>
                                                <i style={{ color: '#E61E4D'}} class="fa-solid fa-trash fa-lg"></i>
                                            </div>
                                        </div>
                                    </div>
                                    
                                )
                            }



                            return (
                                <div className={`${variant2} index${index}`} key={index}>
                                    <img src={spotImage.url} alt="No Image" />
                                    <div style={{ marginLeft: '-8px', paddingLeft: '8px' }} className={user && user.id === spot.ownerId ? 'delete-logo-container' : ''}>
                                        <div className='position-logo-container' onClick={(e) => {
                                            console.log(spotImage.id)
                                            deleteImage(e, spotImage.id)
                                        }}>
                                            <i style={{ color: '#E61E4D' }} class="fa-solid fa-trash fa-lg"></i>
                                        </div>
                                    </div>
                                </div>
                            )

                        }
                        if (imageCount === 3) {
                            if (index === 0) {
                                return (
                                    <div className={`${variant}`} key={index}>
                                        <img src={spotImage.url} alt="Main Image" />
                                        <div  className={user && user.id === spot.ownerId ? 'delete-logo-container' : ''}>
                                            <div className='position-logo-container' onClick={(e) => {
                                                console.log(spotImage.id)
                                                deleteImage(e, spotImage.id)
                                            }}>
                                                <i style={{ color: '#E61E4D' }} class="fa-solid fa-trash fa-lg"></i>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            if (index === 1) {
                                return (
                                    <div className={`${variant2}`} key={index}>
                                        <img src={spotImage.url} alt='Side Image' />
                                        <div style={{ marginLeft: '-8px', paddingLeft: '8px' }} className={user && user.id === spot.ownerId ? 'delete-logo-container' : ''}>
                                            <div className='position-logo-container' onClick={(e) => {
                                                console.log(spotImage.id)
                                                deleteImage(e, spotImage.id)
                                            }}>
                                                <i style={{ color: '#E61E4D' }} class="fa-solid fa-trash fa-lg"></i>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            return (
                                <div className={`${variant3}`} key={index}>
                                    <img src={spotImage.url} alt="Side Image" />
                                    <div style={{ marginLeft: '-8px', paddingLeft: '8px' }} className={user && user.id === spot.ownerId ? 'delete-logo-container' : ''}>
                                        <div className='position-logo-container' onClick={(e) => {
                                            console.log(spotImage.id)
                                            deleteImage(e, spotImage.id)
                                        }}>
                                            <i style={{ color: '#E61E4D' }} class="fa-solid fa-trash fa-lg"></i>
                                        </div>
                                    </div>
                                </div>
                            )

                        }
                        if (imageCount === 4) {
                            if (index === 0) {
                                return (
                                    <div className={`${variant}`} key={index}>
                                        <img src={spotImage.url} alt="Main Image" />
                                        <div  className={user && user.id === spot.ownerId ? 'delete-logo-container' : ''}>
                                            <div className='position-logo-container' onClick={(e) => {
                                                console.log(spotImage.id)
                                                deleteImage(e, spotImage.id)
                                            }}>
                                                <i style={{ color: '#E61E4D' }} class="fa-solid fa-trash fa-lg"></i>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            if (index === 1) {
                                return (
                                    <div className={`${variant2}`} key={index}>
                                        <img src={spotImage.url} alt='Side Image' />
                                        <div style={{ marginLeft: '-8px', paddingLeft: '8px'}} className={user && user.id === spot.ownerId ? 'delete-logo-container' : ''}>
                                            <div className='position-logo-container' onClick={(e) => {
                                                console.log(spotImage.id)
                                                deleteImage(e, spotImage.id)
                                            }}>
                                                <i style={{ color: '#E61E4D' }} class="fa-solid fa-trash fa-lg"></i>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            if (index === 2) {
                                return (
                                    <div className={`${variant3}`} key={index}>
                                        <img src={spotImage.url} alt='Side Image' />
                                        <div style={{ marginLeft: '-8px', paddingLeft: '8px' }} className={user && user.id === spot.ownerId ? 'delete-logo-container' : ''}>
                                            <div className='position-logo-container' onClick={(e) => {
                                                console.log(spotImage.id)
                                                deleteImage(e, spotImage.id)
                                            }}>
                                                <i style={{ color: '#E61E4D' }} class="fa-solid fa-trash fa-lg"></i>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            return (
                                <div className={`${variant4}`} key={index}>
                                    <img src={spotImage.url} alt="Side Image" />
                                    <div style={{ marginLeft: '-8px', paddingLeft: '8px' }} className={user && user.id === spot.ownerId ? 'delete-logo-container' : ''}>
                                        <div className='position-logo-container' onClick={(e) => {
                                            console.log(spotImage.id)
                                            deleteImage(e, spotImage.id)
                                        }}>
                                            <i style={{ color: '#E61E4D' }} class="fa-solid fa-trash fa-lg"></i>
                                        </div>
                                    </div>
                                </div>
                            )

                        }

                        
                        if (index === 0) {
                            return (
                                <div className={`${variant}`} key={index}>
                                    <img src={spotImage.url} alt="No Image" />
                                    <div style={{ }} className={user && user.id === spot.ownerId ? 'delete-logo-container' : ''}>
                                        <div className='position-logo-container' onClick={(e) => {
                                            console.log(spotImage.id)
                                            deleteImage(e, spotImage.id)
                                        }}>
                                            <i style={{ color: '#E61E4D' }} class="fa-solid fa-trash fa-lg"></i>
                                        </div>
                                    </div>
                                </div>
                            )
                        }



                        return (
                            <div className={`${variant2} index${index}`} key={index} >
                            
                                <img src={spotImage.url} alt="No Image" />
                                <div style={{ marginLeft: '-8px', paddingLeft: '8px' }} className={user && user.id === spot.ownerId ? 'delete-logo-container' : ''}>
                                    <div className='position-logo-container' onClick={(e) => {
                                        console.log(spotImage.id)
                                        deleteImage(e, spotImage.id)
                                    }}>
                                        <i style={{ color: '#E61E4D' }} class="fa-solid fa-trash fa-lg"></i>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
                </div>
                {user && formattedBookings.length > 0 && <h3>Reserved Dates:</h3>}
                <div className='bookings-container'>
            {user && !!formattedBookings.length && formattedBookings.map(booking => {
                console.log('booking Id',booking)
                console.log('user Id', user.id)
                return (
                
                    <p className={user.id == booking.userId ? 'reserved-booking core-booking' : 'default-booking core-booking'}>{booking.startDate.slice(0, 3)} {booking.startDate.split(' ')[1]} {booking.startDate.slice(-4)}  - {booking.endDate.slice(0, 3)} {booking.endDate.split(' ')[1]} {booking.endDate.slice(-4)}{user.id == booking.userId && <span onClick={() =>{
                        console.log(booking.id)
                        handleDeleteBooking(booking.id)
                    }} className='bookings-delete-icon'><i class="fa-solid fa-x"></i></span>}
                    </p>
                
                    
                    )})}
                    </div>
            <div className='main-details-container'>
                <div className='left-details-container'>
                    <div className='details-header'>
                        <h2>{spot.name} hosted by {spot.Owner.firstName}</h2>
                        <span></span>
                    </div>
                    <div className='details-body'>
                        <p className="details-body-sub" style={{ paddingTop: '32px' }}>{spot.description}</p>

                        <p className="details-body-sub" >Average Rating:<i className="fa-solid fa-star"></i> {spot.avgRating}</p>

                        <p className="details-body-sub" >Location: {spot.address} {spot.city}, {spot.state} {spot.country}</p>

                        <p style={{ paddingBottom: '32px' }}>Free Cancellation before Booking Starts</p>
                    </div>
                    

                    <div className='details-body-2'>
                        <div style={{ padding: '32px 0px' }}>
                            <img style={{ height: '26px', width: '123px' }} src='https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg' alt='airco' />
                            <h4>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</h4>
                        </div>
                    </div>

                    <div className='details-body-3'>
                        <div style={{ padding: '32px 0px 48px' }}>
                            <p>{spot.description}</p>
                            <div className="body-button">
                                {smallAuth && <button onClick={() => history.push(`/edit/${spot.id}`)}>Edit Spot</button>}
                                {smallAuth && <button onClick={deleteSpot}>Delete Spot</button>}
                            </div>
                        </div>
                    </div>
                    <h4></h4>
                </div>
                <div className='right-details-container'>
                    <div style={{ padding: '32px 0 24px' }}> </div>
                    <div className="card-container">
                        <div className='card-form'>
                            <div className='form-details'>
                                <h3>${spot.price} <span>night</span></h3>
                                <div className='form-details-right'>
                                    <p><i className="fa-solid fa-star"></i>{spot.avgRating}</p>
                                    <div style={{padding: '0px 5px'}}>•</div>
                                    <p>{spot.numReviews}</p>
                                </div>
                            </div>
                            <div className='form-body'>
                                <Bookings spot={spot} spotId={spot.id}/>
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
                    {reviews.length > 0 && reviews.map((review, index) => {
                        
                        const text = review.review
                        
                        return (
                            <div className="review-main-body" key={index}>
                                <div className='review-header'>
                                    <h2>{review.User.firstName} {review.User.lastName}</h2>
                                    <p>{new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(review.updatedAt))}, {new Date(review.updatedAt).getFullYear()} </p>
                                </div>
                                <div className='review-body'>
                                    {showEditForm && review.id === reviewId ? (
                                        <EditReview spotId={spotId} setShowEditForm={setShowEditForm} id={review.id} review={review.review} stars={review.stars}/>
                                        ) :<h3>{review.review}</h3>}
                                    {review.ReviewImages.length > 0 && <div className="review-image">

                                        {review.ReviewImages.length > 0 && review.ReviewImages.map((img, index) => {
                                            if (index > 2) return
                                            return (

                                                <img style={{ height: '100%', width: '100px' }} key={index} src={img.url} alt="review Image" />
                                            )
                                        })}
                                    </div>}
                                </div>
                                <div className="add-image-delete-review-button">
                                    {user && review.userId === user.id && !showEditForm && <AddReviewImage showInput={showInput} setShowInput={setShowInput} id={review.id} spotId={spotId} />}
                                    {user && review.userId === user.id && !showInput &&  !showEditForm && <button className="delete-review-button" onClick={() => deleteReview(review.id)}>Delete Review</button>}
                                    {user && review.userId === user.id && !showInput && <button className="delete-review-button" onClick={() =>{ 
                                    setShowEditForm(!showEditForm)
                                    setReviewId(review.id)
                                    }}>{!showEditForm ? 'Edit Review' : 'Cancel Edit'}</button>}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="create-review">

                    {user && <button disabled={reviewBool} style={{ marginTop: '50px' }} className={reviewBool ? 'create-review-button-disabled' : 'create-review-button'} onClick={() => setReviewModal(true)}>Create Review</button>}
                    <CreateReviewModal review={review} setReview={setReview} setStars={setStars} stars={stars} spotId={spotId} reviewModal={reviewModal} setReviewModal={setReviewModal} />
                </div>
            </div>
                

        </div>
    )
}

export default SingleSpot

// { user && <Bookings spotId={spotId} userId={user.id} /> }
// {
//     arrOfBookings.length > 0 && formattedBookings.map(booking => {
//         return (
//             <div key={booking.id}>
//                 <p>{booking.startDate} - {booking.endDate}</p>


//             </div>

//         )
//     })
// }
