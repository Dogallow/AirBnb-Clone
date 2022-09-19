import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import  ProfileButton  from "./ProfileButton"



const Navigation = ({ isLoaded }) => {
    const userSession = useSelector(state => state.session.user)
   

    if (userSession){

        return isLoaded && (
            <ProfileButton user={userSession} />
        )
    }

    return isLoaded && (
        <ul>
            <li>
                <NavLink exact to='/'>Home</NavLink>
            </li>
            <li>
                <NavLink exact to='/login'>Login</NavLink>
            </li>
            <li>
                <NavLink exact to='/signup'>Signup</NavLink>
            </li>

        </ul>
    )
}

export default Navigation
