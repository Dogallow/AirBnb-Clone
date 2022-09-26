import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import * as sessionActions from '../../store/session'
import './Navigation.css';
import { NavLink, Redirect, useHistory } from 'react-router-dom'
import image from '../../image/logo.png'

const ProfileButton = ({ user, navBarWidth }) => {
    const [showMenu, setShowMenu] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true)
    }
    let currentUser = user.user || user
 
    
    // console.log('current User',currentUser.user)
    
    

    useEffect(() => {
        if(!showMenu) return

        const closeMenu = () => {
            setShowMenu(false)
        }

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);

    },[showMenu])

    const logout = (e) => {
        e.preventDefault()
        dispatch(sessionActions.getLoggedOut())
        history.push('/')
    }

    const goToMySpots = () => {
        return  history.push('/mySpots') 
    }

    const goToMyReviews = () => {
        return  history.push('/myReviews') 
    }
    
    
    return (
        <div className="outer-nav-container">
        <div className={`navbar-main-container ${navBarWidth}`}>
                <NavLink style={{textDecoration: 'none'}} exact to="/" className="navbar-icon-container">
            <div className="navbar-icon-container">
                
                    <img src={image} alt="spaceship"/>
                
                <div className="navbar-icon-text">
                    <h1 >Aerobnb</h1>
                </div>
            </div>
                </NavLink>

            <div className='navbar-menu-container'>
                <span>
                    <NavLink className={"navbar-menu-links"} style={{ textDecoration: "none" }} exact to='/'>Home</NavLink>
                </span>
                <span>
                    <NavLink className={"navbar-menu-links"} to="/newSpot">Create New Spot</NavLink>
                </span>
                
                    <div className="navbar-menu-button">
                <button onClick={openMenu} >
                    <span>
                        <i className="fa-solid fa-bars"></i>
                    </span>
                    <span className="user-icon">
                        <i className="fa-solid fa-user"></i>
                    </span>

                    <div className="menu-position">
                    
                            {showMenu && currentUser && (
                                <ul className='profile-button-list'>
                                    <li className='profile-button-list-item'>{currentUser.username}</li>
                                    <li className='profile-button-list-item'>{currentUser.email}</li>
                                    <li className='profile-button-list-item special' onClick={logout}>
                                        Logout
                                    </li>
                                   
                                </ul>
                            )}
                            
                    </div>
                </button>
                    </div>
                </div>
            </div>
        </div>
       
    )
}

export default ProfileButton
