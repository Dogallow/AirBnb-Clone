// import { csrfFetch } from "./csrf"

// const SIGNUP = 'users/SIGNUP'

// export const signUp = (user) => {
//     return {
//         type: SIGNUP,
//         user
//     }
// }


// // REDUX THUNK CREATOR
// export const newUser = (userData) => async dispatch => {
//     const {firstName, lastName, email, username, password} = userData
//     const res = await csrfFetch('/api/users', {
//         method: 'POST',
//         body: JSON.stringify({
//             firstName,
//             lastName,
//             email,
//             username,
//             password
//         })
//     })

//     if (res.ok) {
//         const newUser = await res.json();
//         dispatch(signUp(newUser))
//         return newUser
//     }
// } 


// const initialState = { users:null } 
// const usersReducer = (state = initialState, action) => {
//     let newState
//     switch(action.type){
//         case SIGNUP:
//             newState = {...state, users:{...state.user}}
//             newState.user = {...state.user, [action.user.id]:action.user}
//             return newState
//         default:
//             return state
//     }
// }

// export default usersReducer
