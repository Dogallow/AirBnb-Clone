import { csrfFetch } from "./csrf"

const GET_SPOT_BOOKINGS = 'bookings/GET_SPOT_BOOKINGS'
const CREATE_BOOKING = 'bookings/CREATE_BOOKING'

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

export const thunk_spotBookings = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`)

    if (res.ok) {
        const payload = await res.json()
        // console.log('^^^^^^^^^^^ payload from backend ^^^^^^^^^^^^',payload)
        dispatch(spotBookings(payload))
    }
}

export const thunk_createBookings = ({spotId, startDate, endDate}) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`,{
        method: 'POST',
        body: JSON.stringify({
            startDate,
            endDate
        })
    })

    if (res.ok){
        let result = await res.json()
        result.startDate = result.startDate.split('T').join(' ')
        result.endDate = result.endDate.split('T').join(' ')
        // console.log('$$$$$$$$$$$$$$$$ backend bookings result $$$$$$$$$$$$$$',result)
        dispatch(createBooking(result))
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
    let newState = {...state}
    switch(action.type){
        case GET_SPOT_BOOKINGS:
            let obj = {}
            action.payload.Bookings.forEach(booking => {
                obj[booking.id] = booking
            })
            newState.spot = obj
            return newState
        case CREATE_BOOKING:
            newState.spot = {...newState.spot, [action.payload.id]: action.payload}
            return newState
        default:
            return state
    }
}

export default bookingsReducer
