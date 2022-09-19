import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import  ProfileButton  from "./ProfileButton"
import "./Navigation.css"


const Navigation = ({ isLoaded }) => {
    const userSession = useSelector(state => state.session.user)
   

    if (userSession){

        return isLoaded && (
            <ProfileButton user={userSession} />
        )
    }

    return isLoaded && (
        <div className="main-container">
            <div className="link-container">
                <ul>
                    <li className="link-item">
                        <NavLink style={{ textDecoration: "none" }} exact to='/'>Home</NavLink>
                    </li>
                    <li className="link-item">
                        <NavLink style={{ textDecoration: "none" }} to='/login'>Login</NavLink>
                    </li>
                    <li className="link-item">
                        <NavLink style={{ textDecoration: "none", color:"#222222"}} to='/signup'>Signup</NavLink>
                    </li>

                </ul>
            </div>
        </div>
    )
}

export default Navigation
