import { NavLink, useLocation, useParams } from "react-router-dom"
import LoginFormModal from "../LoginFormModal"
import SignUpFormModal from "../SignupFormModal"
import { useEffect, useState } from "react"
import * as sessionActions from "../../store/session"
import { useDispatch } from "react-redux"

const DefaultProfileButton = ( {flag, flagFunc} ) => {
    const [showMenu, setShowMenu] = useState(false)
    const dispatch = useDispatch()
    

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true)
    }
    
   


    useEffect(() => {
        if (!showMenu) return

        const closeMenu = () => {
            console.log('closeMenu function fired')
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

  const testClick = () => {
    
  }
  
    
console.log('default profile button fired')

    return (
       

                    <div className="navbar-menu-button">
                        <button onClick={openMenu} >
                            <span>
                                <i className="fa-solid fa-bars"></i>
                            </span>
                            <span className="user-icon">
                                <i className="fa-solid fa-user"></i>
                            </span>

                            <div className="menu-position">

                                {showMenu && (
                                    <ul className='profile-button-list'>
                                        
                                        <li className='profile-button-list-item link-item' onClick={flagFunc}>
                                           Login Form 
                                        </li>
                                        <li className='profile-button-list-item link-item' onClick={testClick}>
                                            <SignUpFormModal />
                                        </li>
                                        <li className='profile-button-list-item link-item'>
                                            <button onClick={loginDemo}>Demo User</button>
                                        </li>
                                    </ul>
                                )}

                            </div>
                        </button>
                    </div>





                    
   

    )
}

export default DefaultProfileButton
