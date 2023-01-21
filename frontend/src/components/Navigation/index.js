import { useSelector, useDispatch } from "react-redux"
import { NavLink, useLocation, useParams } from "react-router-dom"
import ProfileButton from "./ProfileButton"
import "./Navigation.css"
import LoginFormModal from "../LoginFormModal"
import SignUpFormModal from "../SignupFormModal"
import { useEffect, useState } from "react"
import * as sessionActions from "../../store/session"
import image from '../../image/logo.png'
import DefaultProfileButton from "./DefaultProfileButton"


const Navigation = ({ isLoaded, setSearchResults, searchResults, searchFilter, setSearchFilter }) => {
    const userSession = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const location = useLocation()
    const [navBarWidth, setNavbarWidth] = useState()
    const [signupModal, setSignupModal] = useState(false)
    const [loginModal, setLoginModal] = useState(false)
    const [flag, setFlag] = useState(false)





    useEffect(() => {

        if (!(location.pathname === '/')) {
            setNavbarWidth('narrow')
        } else {
            setNavbarWidth('')
        }
    }, [userSession, location])

    if (userSession) {
        return isLoaded && (
            <>

                <ProfileButton setSearchResults={setSearchResults} searchResults={searchResults} navBarWidth={navBarWidth} user={userSession} searchFilter={searchFilter} setSearchFilter={setSearchFilter} />
            </>
        )
    }

    const loginDemo = () => {
        dispatch(sessionActions.getLoggedIn({
            credential: "Demo1",
            password: "demo1password"
        }))
    }

    const changeFlag = () => {
        setFlag(!flag)
    }

    const changeLoginModal = () => {
        setLoginModal(!loginModal)
    }

    const changeSignupModal = () => {
        setSignupModal(!signupModal)
    }



    return isLoaded && (
        <div className="outer-nav-container">
            <div className={`navbar-main-container ${navBarWidth}`}>
                <NavLink className="navbar-icon-container-default" style={{ textDecoration: "none" }} exact to="/">
                    <div className="navbar-icon-container">
                        <img src={image} alt="spaceship" />

                        <div className="navbar-icon-text">
                            <h1 >Aerobnb</h1>
                        </div>
                    </div>
                </NavLink>
                {window.location.href[window.location.href.length - 1] === '/' && <div className="search-input-container">
                    <div className="search-select-input-section">
                        <select className={searchFilter === 'price' ? "search-select-component-price" : "search-select-component"} value={searchFilter} onChange={(e) => {
                            setSearchResults('')
                            setSearchFilter(e.target.value)
                        }
                        }>
                            <option value={'address'}>Address</option>
                            <option value={'city'}>City</option>
                            <option value={'state'}>State</option>
                            <option value={'country'}>Country</option>
                            <option value={'price'}>Price</option>
                        </select>
                    </div>
                    <div className="search-seperator"><span>|</span></div>
                    <div className="search-input-section">
                        {searchFilter === 'price' ? (
                            <>
                                <p>{searchResults ? `$${searchResults}` : ''}</p>
                                <input className="search-input-component" defaultValue={250} step={250} min={250} max={2000} placeholder='Price' type='range' onChange={(e) => setSearchResults(e.target.value)} value={searchResults} />
                            </>
                        )
                            :
                            <input className='search-input-price-section' type={searchFilter !== 'price' ? 'text' : 'number'} value={searchResults} onChange={(e) => setSearchResults(e.target.value)} />
                        }
                    </div>
                </div>}
                <div className="navbar-menu-links">
                    <div className="link-container">
                        <ul>
                            <li className="link-item">
                                <NavLink className={"navbar-menu-links link"} style={{ textDecoration: "none" }} exact to='/'>Home</NavLink>
                            </li>
                            <li className="link-item">
                                <LoginFormModal loginSetter={setLoginModal} loginModal={loginModal} changeLoginModal={changeLoginModal} />
                            </li>
                            <li className="link-item">
                                <SignUpFormModal signupSetter={setSignupModal} signupModal={signupModal} changeSignupModal={changeSignupModal} />
                            </li>

                        </ul>
                        <DefaultProfileButton changeLoginModal={changeLoginModal} changeSignupModal={changeSignupModal} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navigation
