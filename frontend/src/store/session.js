import { csrfFetch } from "./csrf"

// ACTION TYPE CONSTANTS
const LOGIN = 'session/LOGIN'
const LOGOUT = 'session/LOGOUT'


// ACTION CREATORS
export const useLogin = (user) => {
    return {
        type: LOGIN,
        user
    }
}

export const useLogout = () => {
    return {
        type: LOGOUT
    }
}

// THUNK ACTION CREATORS
export const getLoggedIn = (user) => async dispatch => {
    const { credential, password } = user
    const res = await csrfFetch('/api/session', {
        method: "POST",
        body: JSON.stringify({
            credential,
            password
        })
    })

    if(res.ok){
        const currentUser = await res.json()
        console.log(currentUser)
        dispatch(useLogin(currentUser))
    }
}


// REDUCER
const initialState = {user:null}
const sessionReducer = (state = initialState, action) => {
    let newState
    switch(action.type){
        case LOGIN:
            newState = {...state}
            newState.user = action.user
            return newState
        case LOGOUT:
            newState = {...state}
            newState.user = null
            return newState
        default:
            return state
    }
}

export default sessionReducer
