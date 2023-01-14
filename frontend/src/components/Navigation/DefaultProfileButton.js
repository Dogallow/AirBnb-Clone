import { NavLink, useLocation, useParams } from "react-router-dom"
import LoginFormModal from "../LoginFormModal"
import SignUpFormModal from "../SignupFormModal"
import { useEffect, useState } from "react"
import * as sessionActions from "../../store/session"
import { useDispatch } from "react-redux"

const DefaultProfileButton = ( { changeSignupModal, changeLoginModal} ) => {
    const [showMenu, setShowMenu] = useState(false)
    const dispatch = useDispatch()
    

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true)
    }
    
   


    useEffect(() => {
        if (!showMenu) return

        const closeMenu = () => {
            
              setShowMenu(false)
        }
        
        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);

    }, [showMenu])


    const loginDemo = () => {
        dispatch(sessionActions.getLoggedIn({
            credential: "Demo1",
            password: "demo1password"
        }))
    }


  
    


    return (
       

                    <div className="navbar-menu-button">
                        <button onClick={openMenu} >
                            <span>
                                <i className="fa-solid fa-bars"></i>
                            </span>
                            <span className="user-icon">
                                <i className="fa-solid fa-user fa-lg"></i>
                            </span>

                            <div className="menu-position">

                                {showMenu && (
                                    <ul className='profile-button-list'>
                                        
                            <li className='profile-button-list-item special' onClick= {changeLoginModal}>
                                           Login 
                                        </li>
                            <li className='profile-button-list-item special' onClick={changeSignupModal}>
                                            Signup
                                        </li>
                            <li className='profile-button-list-item special' onClick={loginDemo}>
                                            Demo Login
                                        </li>
                                    </ul>
                                )}

                            </div>
                        </button>
                    </div>





                    
   

    )
}

export default DefaultProfileButton
