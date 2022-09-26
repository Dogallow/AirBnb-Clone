import { useSelector, useDispatch } from "react-redux"
import { NavLink, useLocation, useParams } from "react-router-dom"
import  ProfileButton  from "./ProfileButton"
import "./Navigation.css"
import LoginFormModal from "../LoginFormModal"
import SignUpFormModal from "../SignupFormModal"
import { useEffect, useState } from "react"
import * as sessionActions from "../../store/session"
import image from '../../image/logo.png'
import DefaultProfileButton from "./DefaultProfileButton"


const Navigation = ({ isLoaded }) => {
    const userSession = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const location = useLocation()
    const [navBarWidth, setNavbarWidth] =  useState()
    const [flag, setFlag] = useState(false)
    const [loginModal, setLoginModal] = useState(false)
    
    
    
   
   
    useEffect(()=> {
      
        if(!(location.pathname === '/')){
            setNavbarWidth('narrow')
        } else {
            setNavbarWidth('')
        }
    },[userSession, location])
    
    if (userSession){
        return isLoaded && (
            <>
                
                <ProfileButton navBarWidth={navBarWidth} user={userSession} />
            </>
        )
    }

    const loginDemo = () => {
        dispatch(sessionActions.getLoggedIn({
            credential: "Demo1",
            password: "demo1password"
        }))
    }

    const changeFlag= () => {
        setFlag(!flag)
    }

    const changeLoginModal = () => {
        setLoginModal(!loginModal)
    }
    
   

    return isLoaded && (
        <div className="outer-nav-container">
            <div className={`navbar-main-container ${navBarWidth}`}>
            <NavLink className="navbar-icon-container" style={{ textDecoration: "none" }} exact to="/">
                <div className="navbar-icon-container">
                        <img src={image} alt="spaceship" />
                        
                        <div className="navbar-icon-text">
                        <h1 >Aerobnb</h1>
                        </div>
                        </div>
            </NavLink>
            
        <div className="navbar-menu-links">
            <div className="link-container">
                <ul>
                    <li className="link-item">
                        <NavLink className={"navbar-menu-links link"} style={{ textDecoration: "none" }} exact to='/'>Home</NavLink>
                    </li>
                    <li className="link-item">
                                <LoginFormModal loginModal={loginModal} changeLoginModal={changeLoginModal} />
                    </li>
                    <li className="link-item">
                                <SignUpFormModal flag={flag} flagFunc={changeFlag} />
                    </li>

                </ul>
                        <DefaultProfileButton changeLoginModal={changeLoginModal}  flagFunc={changeFlag}/>
            </div>
        </div>
            </div>
        </div>
    )
}

export default Navigation
