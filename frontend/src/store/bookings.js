import { csrfFetch } from "./csrf"

const GET_SPOT_BOOKINGS = 'bookings/GET_SPOT_BOOKINGS'
const CREATE_BOOKING = 'bookings/CREATE_BOOKING'
const DELETE_BOOKING = 'bookings/DELETE_BOOKING'

 const spotBookings = (payload) => {
    return {
        type: GET_SPOT_BOOKINGS,
        payload
    }
}

const createBooking = ( payload ) => {
    return {
        type: CREATE_BOOKING,
        payload
    }
}

const deleteBookingActionCreator = (id) => {
    return {
        type: DELETE_BOOKING,
        payload: id
    }
}

export const thunk_spotBookings = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`)

    if (res.ok) {
        const payload = await res.json()

        dispatch(spotBookings(payload))
    }
}

export const thunkCreateBookings = ({spotId, startDate, endDate}) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`,{
        method: 'POST',
        body: JSON.stringify({
            startDate,
            endDate
        })
    })

    if (res.ok){
        let result = await res.json()

        if (result.message){

            return result
        }else{

            result.startDate = result?.startDate.split('T').join(' ')
            result.endDate = result?.endDate.split('T').join(' ')

            dispatch(createBooking(result))
        }
    }
}

export const deleteBookingThunk = (id) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${id}`, {
        method: 'DELETE'
    })

    if (response.ok){
        let message = await response.json()
        dispatch(deleteBookingActionCreator(id))
    }
}



// const initialState = {
//     user: {
//         [bookingId]: {
//             bookingData,
//             Spot: {
//                 spotData,
//             },
//         },
//         optionalOrderedList: [],
//     },
//     // Note here that your responses can actually be different here as well.
//     // HINT: What information should you see if you own this spot? (Refer to API Docs).
//     spot: {
//         [bookingId]: {
//             bookingData,
//         },
//         optionalOrderedList: [],
//     },
// }
const initialState = {
    user: {
        
    },
    // Note here that your responses can actually be different here as well.
    // HINT: What information should you see if you own this spot? (Refer to API Docs).
    spot: {
        
    },
}
const bookingsReducer = (state = initialState, action) => {
    let newState = {}

    switch(action.type){
        case GET_SPOT_BOOKINGS:
            newState = {...state}
            let obj = {}
            action.payload.Bookings.forEach(booking => {
                
                obj[booking.id] = booking
            })
            newState.spot = obj
            
            return newState
        case CREATE_BOOKING:
            newState = {...state}
            newState.spot = {...newState.spot, [action.payload.id]: action.payload}
            return newState
        case DELETE_BOOKING:
            newState = {...state}
            delete newState.spot[action.payload]
            newState.spot = {...state.spot}
            return newState
        default:
            return state
    }
}

export default bookingsReducer
