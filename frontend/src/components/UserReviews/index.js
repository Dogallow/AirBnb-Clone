import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as reviewsActions from '../../store/reviews'

const UserReviews = () => {
    const dispatch = useDispatch()
    let reviews = useSelector(state => state.reviews.user)
    reviews = Object.values(reviews)
    
    useEffect(() => {
        dispatch(reviewsActions.getUserReviews())
    },[dispatch])
    
    return (
        <div>
            {reviews.map((review, index) => {
                return (
                    <div key={index}>
                    <p>{review.review}</p>
                    <p>Location: {review.Spot.address} {review.Spot.city}, {review.Spot.state}</p>
                    
                    </div>
                )
            })}
        </div>
    )
}

export default UserReviews
