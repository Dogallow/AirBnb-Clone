import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import * as sessionActions from '../../store/session'
import './Navigation.css';

const ProfileButton = ({ user }) => {
    const [showMenu, setShowMenu] = useState(false)
    const dispatch = useDispatch()

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true)
    }
    

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
                <button onClick={openMenu}>
                    <span>
                        <i className="fa-solid fa-bars"></i>
                    </span>
                    <span className="user-icon">
                        <i className="fa-solid fa-user"></i>
                    </span>
                </button>
                <div className="menu">
                {showMenu && (
                    <ul className='profile-button-list'>
                        <li className='profile-button-list-item'>{user.username}</li>
                        <li className='profile-button-list-item'>{user.email}</li>
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
