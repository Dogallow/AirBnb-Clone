import { csrfFetch } from "./csrf"

const GET_USER_REVIEWS = 'reviews/GET_USER_REVIEWS'
const GET_SPOT_REVIEWS = 'reviews/GET_SPOT_REVIEWS'


const userReviews = (reviews) => {
    return {
        type: GET_USER_REVIEWS,
        reviews
    }
}

const spotReviews = (reviews) => {
    return {
        type: GET_SPOT_REVIEWS,
        reviews
    }
}

export const getUserReviews = () => async dispatch => {
    const res = await csrfFetch('./api/reviews/current')

    if (res.ok) {
        const {Reviews} = await res.json()
        console.log(Reviews)
        dispatch(userReviews(Reviews))
        
    }
}

export const getSpotReviews = (id) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${id}/reviews`)

    if (res.ok) {
        const { Reviews } = await res.json()
        console.log('reviews based on spot', Reviews)
        dispatch(spotReviews(Reviews))
    }
}


const initialState = {
    spot: {
        
    },
    user: {
        
    }
}
const reviewReducer = (state = initialState, action) => {
    let newState 
    switch(action.type){
        case GET_USER_REVIEWS:
            newState = {...state, user:{}}
            action.reviews.forEach(review => {
                newState.user[review.id] = { 
                    User: review.User,
                    Spot: review.Spot,
                    ...review
                }
            })
            console.log('GET_USER_REVIEWS REDUCER', newState)
            return newState
        case GET_SPOT_REVIEWS:
            newState = {...state, spot: {}}
            action.reviews.forEach(review => {
                newState.spot[review.id] = {
                    User: review.User,
                    ReviewImages: review.ReviewImages,
                    ...review
                }
            })
            return newState
        default:
            return state
    }
}

export default reviewReducer
