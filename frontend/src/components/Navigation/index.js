import { useSelector, useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"
import  ProfileButton  from "./ProfileButton"
import "./Navigation.css"
import LoginFormModal from "../LoginFormModal"
import SignUpFormModal from "../SignupFormModal"
import { useEffect } from "react"
import * as sessionActions from "../../store/session"


const Navigation = ({ isLoaded }) => {
    const userSession = useSelector(state => state.session.user)
    const dispatch = useDispatch()
   
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

    const loginDemo = () => {
        dispatch(sessionActions.getLoggedIn({
            credential: "Demo1",
            password: "demo1password"
        }))
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
                    <li className="link-item">
                        <button onClick={loginDemo}>Demo User</button>
                    </li>

                </ul>
            </div>
        </div>
    )
}

export default Navigation
