import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import * as sessionActions from '../../store/session'
import './Navigation.css';
import { NavLink } from 'react-router-dom'

const ProfileButton = ({ user }) => {
    const [showMenu, setShowMenu] = useState(false)
    const dispatch = useDispatch()

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true)
    }
    let currentUser = user.user || user
 
    console.log('profile button user', user)
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
    }

    
    
    return (
        <div className="profile-button-container">
        
            <div className='icon-button-container'>
                <span>
                    <NavLink style={{ textDecoration: "none" }} exact to='/'>Home</NavLink>
                </span>
                <span>
                    <NavLink to="/newSpot">Create New Spot</NavLink>
                </span>
                <button onClick={openMenu}>
                    <span>
                        <i className="fa-solid fa-bars"></i>
                    </span>
                    <span className="user-icon">
                        <i className="fa-solid fa-user"></i>
                    </span>
                </button>
                <div className="menu">
                {showMenu && currentUser && (
                    <ul className='profile-button-list'>
                        <li className='profile-button-list-item'>{currentUser.username}</li>
                        <li className='profile-button-list-item'>{currentUser.email}</li>
                        <li className='profile-button-list-item' onClick={logout}>
                            Logout
                        </li>
                    </ul>
                )}
                    </div>
                </div>
            </div>
            
       
    )
}

export default ProfileButton
