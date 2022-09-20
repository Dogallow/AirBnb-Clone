
import { csrfFetch } from "./csrf"
const ALL_SPOTS = 'spots/ALL_SPOTS'
const CREATE_SPOT = 'spots/CREATE_SPOT'
const ONE_SPOT = 'spots/ONE_SPOT'
const EDIT_SPOT = 'spots/EDIT_SPOT'


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

    if(res.ok){
        const spot = await res.json()
        dispatch(createSpot(spot))
        console.log(spot)
        return spot
    }
    
}



const initialState = {
    allSpots: {},
    singleSpot: {
        SpotImages:[],
        Owner: {}
    }
}
const spotsReducer = (state=initialState, action) => {
    let newState
    switch (action.type){
        case ALL_SPOTS: 
            newState = {...state, allSpots:{...state.allSpots}}
            action.spots.forEach((spot) => {
                newState.allSpots[spot.id] = spot
            })
            console.log(newState)
            return newState
        case CREATE_SPOT:
            newState = {...state}
            newState.allSpots = [...state.allSpots, action.spot]
            return newState
        case ONE_SPOT:
            newState = {...state, singleSpot:{...state.singleSpot}}
            newState.singleSpot = action.spot
            console.log('state of single spot',newState.singleSpot)
            return newState
        case EDIT_SPOT:
            newState = {...state, singleSpot: {...state.singleSpot}}
            newState.singleSpot = action.spot
            return newState
        default: 
        return state
    }
}

export default spotsReducer
