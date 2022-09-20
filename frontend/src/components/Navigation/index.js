import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import  ProfileButton  from "./ProfileButton"
import "./Navigation.css"
import LoginFormModal from "../LoginFormModal"
import SignUpFormModal from "../SignupFormModal"
import { useEffect } from "react"


const Navigation = ({ isLoaded }) => {
    const userSession = useSelector(state => state.session.user)
   
    console.log('UserSession',userSession)
    useEffect(()=> {

    },[userSession])
    
    if (userSession){
        return isLoaded && (
            <>
                
                <ProfileButton user={userSession} />
            </>
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
                        <LoginFormModal />
                    </li>
                    <li className="link-item">
                        <SignUpFormModal />
                    </li>

                </ul>
            </div>
        </div>
    )
}

export default Navigation
