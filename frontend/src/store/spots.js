
import { csrfFetch } from "./csrf"
const ALL_SPOTS = 'spots/ALL_SPOTS'
const CREATE_SPOT = 'spots/CREATE_SPOT'
const ONE_SPOT = 'spots/ONE_SPOT'
const EDIT_SPOT = 'spots/EDIT_SPOT'
const DELETE_SPOT = 'spots/DELETE_SPOT'
const ADD_IMAGE = 'spots/ADD_IMAGE'
const MY_SPOTS = 'spots/MY_SPOTS'
const SPOT_IMAGE = 'spots/SPOT_IMAGE'
const CLEAR = 'spots/CLEAR'

export const clear = () => {
    return {
        type: CLEAR
    }
}
const deleteSpot = (id) => {
    return {
        type: DELETE_SPOT,
        id
    }
}

const allSpots = (spots) => {
    return {
        type: ALL_SPOTS,
        spots
    }
}

const deleteSpotImageActionCreator = (imageId) => {
    return {
        type: SPOT_IMAGE,
        payload: imageId
    }
}

const createSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    }
}

const oneSpot = (spot) => {
    return {
        type: ONE_SPOT,
        spot
    }
}

const editSpot = (spot) => {
    return {
        type: EDIT_SPOT,
        spot
    }
}

const addImage = (img) => {
    return {
        type: ADD_IMAGE,
        img
    }
}

const mySpots = (spots) => {
    return {
        type: MY_SPOTS,
        spots
    }
}

export const deleteSpotImageThunk = (spotImageId) => async dispatch => {

    const response = await csrfFetch(`/api/spot-images/${spotImageId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
    const res = await response.json()

    dispatch(deleteSpotImageActionCreator(spotImageId))
    }
}

export const currentSpots = () => async dispatch => {
    const res = await csrfFetch('/api/spots/current')

    if (res.ok) {
        const { spots } = await res.json()
        
        dispatch(mySpots(spots))
        return spots
    }
}

export const addSingleImage = (id, dataObj) => async dispatch =>{
    const { spotId, url, preview} = dataObj
    const res = await csrfFetch(`/api/spots/${id}/images`, {
        method: "POST",
        body: JSON.stringify({
            spotId,
            url,
            preview
        })
    })
    

    if (res.ok){
        const result = await res.json()
        
        // dispatch(addImage(result))
    }
}

export const addSingleImageAWS = (id, dataObj) => async dispatch => {
    const {spotId, url, preview} = dataObj

    const formData = new FormData()
    if (url) {
        formData.append('spotId', spotId)
        formData.append('url', url)
        formData.append('preview', preview)
    }
    const res = await csrfFetch(`/api/spots/${id}/images`, {
        method: 'POST',
        headers: {
            "Content-Type": "multipart/form-data"
        },
        body: formData
    })

    if (res.ok){
        const data = await res.json()

    }

}

export const deleteSingleSpot = (id) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${id}`, {
        method: 'DELETE'
    })

    if (res.ok){
        const deleted = await res.json();
        
        dispatch(deleteSpot(id))
        return deleted.message
    }
}

export const editSingleSpot = (id, editedData) => async dispatch => {
    
    const {address, city, state, country, lat, lng, name, description, price} = editedData
    const res = await csrfFetch(`/api/spots/${id}`,{
        method: "PUT",
        body: JSON.stringify({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        })
    })

    if(res.ok) {
        const spot = await res.json()
        
        dispatch(editSpot(spot))
        return spot
    }
}

export const getOneSpot = (id) => async dispatch => {
    
    const res = await csrfFetch(`/api/spots/${id}`)

    if(res.ok){
        const spot = await res.json()
        
        dispatch(oneSpot(spot))
    }
}

export const getAllSpots= (page) => async dispatch => {
    if (!page) {page = 1}
    const res = await csrfFetch(`/api/spots/?page=${page}`)

    if(res.ok){
        const spots = await res.json()

        dispatch(allSpots(spots))
        
        
    }
}

export const createNewSpot = (formData) => async dispatch => {
    const {address, city, state, country, lat, lng, name, description, price} = formData
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        })
    })
    
    if(res.ok){
        const spot = await res.json()
        // dispatch(createSpot(spot))
        
        return spot
    }
    
}



const initialState = {
    allSpots: {},
    singleSpot: {
        
    },
    spotCount: null,
    size: null,
    page: null
}
const spotsReducer = (state=initialState, action) => {
    let newState
    switch (action.type){
        case SPOT_IMAGE:
            newState = {...state}

            return state
        case CLEAR:
            return initialState
        case ALL_SPOTS: 
            newState = {...state, allSpots:{}}
            action.spots.Spots.forEach((spot) => {
                if(spot.avgRating){
                spot.avgRating = spot.avgRating.toFixed(2)
            }
                newState.allSpots[spot.id] = spot
            })
            newState.spotCount = action.spots.spotCount
            newState.size = action.spots.size
            newState.page = action.spots.page
            return newState
        case MY_SPOTS:
            newState = {...state, allSpots:{}}
            
            action.spots.forEach((spot) => {
                newState.allSpots[spot.id] = spot
            })
           
            return newState
        case CREATE_SPOT:
            newState = {...state, ...state.allSpots}
            // newState.allSpots = [...state.allSpots, action.spot]
            return newState
        case ONE_SPOT:
            newState = {...state, singleSpot:{...state.singleSpot}}
            
            if(action.spot.avgRating){
                action.spot.avgRating = action.spot.avgRating.toFixed(2)
            }
            newState.singleSpot = action.spot
            
            
            return newState
        case EDIT_SPOT:
            newState = {...state, singleSpot: {...state.singleSpot, ...action.spot}}
            
            
            
            return newState
        case DELETE_SPOT: 
            newState = {...state, allSpots: {...state.allSpots}}
            
            delete newState.allSpots[action.id]
            
            return newState
        case ADD_IMAGE:
            newState = {...state, singleSpot:{...state.singleSpot, SpotImages:[...state.SpotImages]}}
            newState.singleSpot.SpotImages = [...state.singleSpot.SpotImages, action.img]
            
            return newState

        default: 
        
        return state
    }
}

export default spotsReducer
