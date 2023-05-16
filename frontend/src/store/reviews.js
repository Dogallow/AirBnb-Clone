
import { csrfFetch } from "./csrf"

const GET_USER_REVIEWS = 'reviews/GET_USER_REVIEWS'
const GET_SPOT_REVIEWS = 'reviews/GET_SPOT_REVIEWS'
const CREATE_REVIEW = 'reviews/CREATE_REVIEW'
const ADD_REVIEWIMAGE = 'reviews/ADD_REVIEWIMAGE'
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'
const EDIT_REVIEW = 'reviews/EDIT_REVIEW'
const CLEAR = 'reviews/CLEAR'

export const clear = () => {
    return {
        type: CLEAR
    }
}

    const editReviewActionCreator = (payload) => {
        return {
            type: EDIT_REVIEW,
            payload
        }
    }

const deleteReview = (id) => {
    return {
        type: DELETE_REVIEW,
        id
    }
}

const addReviewImage = () => {
    return {
        type: ADD_REVIEWIMAGE,

    }
}

const createReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}


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

export const deleteSingleReview = (reviewId) => async dispatch => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    })

    if (res.ok) {
        const message = await res.json()
        
        dispatch(deleteReview(reviewId))
    }
}

export const editReviewThunk = (reviewId, obj) => async dispatch => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        body: JSON.stringify(obj)
    })

    if (res.ok){
        const newReview = await res.json()
        dispatch(editReviewActionCreator(newReview))
    }
}

export const addSingleReviewImage = ({reviewId, url}) => async dispatch => {
        const res = await csrfFetch(`/api/reviews/${reviewId}/images`, {
            method: "POST",
            body: JSON.stringify({
                url
            })
        })

        if(res.ok){
            const result = await res.json()
            
        }
}

export const createSingleReview = (id, dataObj) => async dispatch => {
    const {review, stars} = dataObj
    const res = await csrfFetch(`/api/spots/${id}/reviews`, {
        method: "POST",
        body: JSON.stringify({
            review,
            stars
        })
    })

    if(res.ok) {
        const review = await res.json()
        
        // dispatch(createReview(review))
    }
}

export const getUserReviews = () => async dispatch => {
    const res = await csrfFetch('./api/reviews/current')

    if (res.ok) {
        const {Reviews} = await res.json()
        
        dispatch(userReviews(Reviews))
        
    }
}

export const getSpotReviews = (id) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${id}/reviews`)

    if (res.ok) {
        const { Reviews } = await res.json()
        
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
        case CLEAR:
            return initialState
        case GET_USER_REVIEWS:
            newState = {...state, user:{}}
            action.reviews.forEach(review => {
                newState.user[review.id] = { 
                    User: review.User,
                    Spot: review.Spot,
                    ...review
                }
            })
            
            return newState
        case GET_SPOT_REVIEWS:
            newState = {...state, spot: {...state.spot}}
            action.reviews.forEach(review => {
                newState.spot[review.id] = {
                    User: review.User,
                    ReviewImages: review.ReviewImages,
                    ...review
                }
            })
            return newState
        case EDIT_REVIEW:
            
            newState = {...state}
            newState.spot[action.payload.id] = {...state.spot[action.payload.id], ...action.payload}
            return newState
        case DELETE_REVIEW: 
            newState = {...state, spot: {...state.spot}}
            delete newState.spot[action.id]
            return newState
        default:
            return state
    }
}

export default reviewReducer
