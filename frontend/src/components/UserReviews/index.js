import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import * as reviewsActions from '../../store/reviews'
import './userReviews.css'

const UserReviews = () => {
    const dispatch = useDispatch()
    let reviews = useSelector(state => state.reviews.user)
    reviews = Object.values(reviews)
    
    useEffect(() => {
        dispatch(reviewsActions.getUserReviews())
    },[dispatch])
    
    return (
        <div className="single-spot-outer-container user-review-container" style={{height: '100%'}}>
            <div className="main-reviews-container">
                <div className="review-grid-container">
                    {reviews.length > 0 && reviews.map((review, index) => {
                        return (
                            <NavLink to={`/${review.spotId}`} className='user-review-link'>
                            
                                <div className="review-main-body" key={index}>
                                    <div className='review-header'>
                                        <h2>{review.User.firstName} {review.User.lastName}</h2>
                                        <p>{new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(review.updatedAt))}, {new Date(review.updatedAt).getFullYear()} </p>
                                    </div>
                                    <div className='review-body'>
                                        <h3>{review.review}</h3>
                                        {review.ReviewImages.length > 0 && <div className="review-image">

                                            {review.ReviewImages.length > 0 && review.ReviewImages.map((img, index) => {
                                                if (index > 2) return
                                                return (

                                                    <img style={{ height: '100%', width: '100px' }} key={index} src={img.url} alt="review Image" />
                                                )
                                            })}
                                        </div>}
                                    </div>
                                    
                                </div>
                            </NavLink>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default UserReviews
