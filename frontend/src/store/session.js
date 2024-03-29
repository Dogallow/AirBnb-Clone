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
        dispatch(useLogin(currentUser))
        return currentUser
    }
        
        return res.status
    
}

export const restoreUser = () => async dispatch => {
    const res = await csrfFetch('/api/session')

    if(res.ok){
        const user = await res.json();
        if(user === null){
            
            dispatch(useLogin(user))

        }else{
            
            dispatch(useLogin(user.user))
        }
        
        return res
    }
}

export const newUser = (userData) => async dispatch => {
    const { firstName, lastName, email, username, password } = userData
    const res = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            username,
            password
        })
    })

    if (res.ok) {
        const newUser = await res.json();
        dispatch(useLogin(newUser))
        return newUser
    }
} 

export const getLoggedOut = () => async dispatch =>{
    const res = await csrfFetch('/api/session',{
        method:'DELETE'
    })

    if(res.ok){
        dispatch(useLogout())
        return res
    }
}


// REDUCER
const initialState = {user:null}
const sessionReducer = (state = initialState, action) => {
    let newState
    switch(action.type){
        case LOGIN:
            newState = {...state, user: action.user}
            
            
            // newState.user = action.user
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
