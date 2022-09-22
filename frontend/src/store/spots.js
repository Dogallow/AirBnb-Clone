
import { csrfFetch } from "./csrf"
const ALL_SPOTS = 'spots/ALL_SPOTS'
const CREATE_SPOT = 'spots/CREATE_SPOT'
const ONE_SPOT = 'spots/ONE_SPOT'
const EDIT_SPOT = 'spots/EDIT_SPOT'
const DELETE_SPOT = 'spots/DELETE_SPOT'
const ADD_IMAGE = 'spots/ADD_IMAGE'
const MY_SPOTS = 'spots/MY_SPOTS'
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

export const currentSpots = () => async dispatch => {
    const res = await csrfFetch('/api/spots/current')

    if (res.ok) {
        const { spots } = await res.json()
        console.log(spots)
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
    console.log('hello', res)

    if (res.ok){
        const result = await res.json()
        console.log('result ./store/spots',result)
        // dispatch(addImage(result))
    }
}

export const deleteSingleSpot = (id) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${id}`, {
        method: 'DELETE'
    })

    if (res.ok){
        const deleted = await res.json();
        console.log(deleted.message)
        dispatch(deleteSpot(id))
        return deleted.message
    }
}

export const editSingleSpot = (id, editedData) => async dispatch => {
    console.log(id, editedData)
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
        console.log(spot)
        dispatch(editSpot(spot))
        return spot
    }
}

export const getOneSpot = (id) => async dispatch => {
    
    const res = await csrfFetch(`/api/spots/${id}`)

    if(res.ok){
        const spot = await res.json()
        console.log(spot)
        dispatch(oneSpot(spot))
    }
}

export const getAllSpots= () => async dispatch => {
    const res = await csrfFetch('/api/spots')

    if(res.ok){
        const spots = await res.json()
        console.log(spots)
        dispatch(allSpots(spots.Spots))
        console.log(spots.Spots)
        
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
    console.log(res)
    if(res.ok){
        const spot = await res.json()
        // dispatch(createSpot(spot))
        console.log(spot)
        return spot
    }
    
}



const initialState = {
    allSpots: {},
    singleSpot: {
        
    }
}
const spotsReducer = (state=initialState, action) => {
    let newState
    switch (action.type){
        case CLEAR:
            return initialState
        case ALL_SPOTS: 
            newState = {...state, allSpots:{...state.allSpots}}
            action.spots.forEach((spot) => {
                if(spot.avgRating){
               spot.avgRating = spot.avgRating.toFixed(2)
            }
                newState.allSpots[spot.id] = spot
            })
            console.log(newState)
            return newState
        case MY_SPOTS:
            newState = {...state, allSpots:{}}
            console.log(action.spots)
            action.spots.forEach((spot) => {
                newState.allSpots[spot.id] = spot
            })
            console.log(newState)
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
            console.log('state of single spot',newState.singleSpot)
            
            return newState
        case EDIT_SPOT:
            newState = {...state, singleSpot: {...state.singleSpot, ...action.spot}}
            
            console.log('EDIT_SPOT', action.spot)
            
            return newState
        case DELETE_SPOT: 
            newState = {...state, allSpots: {...state.allSpots}}
            console.log('delete reducer', newState.allSpots[action.id])
            delete newState.allSpots[action.id]
            console.log('post Delete reducer', newState.allSpots[action.id])
            return newState
        case ADD_IMAGE:
            newState = {...state, singleSpot:{...state.singleSpot, SpotImages:[...state.SpotImages]}}
            newState.singleSpot.SpotImages = [...state.singleSpot.SpotImages, action.img]
            console.log('how is code reaching here')
            return newState

        default: 
        console.log("default case reducer", state)
        return state
    }
}

export default spotsReducer
