import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import * as sessionActions from '../../store/session'
import './Navigation.css';
import { NavLink, Redirect, useHistory } from 'react-router-dom'
import image from '../../image/logo.png'

const ProfileButton = ({ user, navBarWidth, setSearchResults, searchResults, searchFilter, setSearchFilter }) => {
    const [showMenu, setShowMenu] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true)
    }
    let currentUser = user.user || user
 
    console.log(window.location.href[window.location.href.length - 1])
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
                <NavLink style={{textDecoration: 'none'}} exact to="/" className="navbar-icon-container" onClick={() => setSearchResults('')}>
            <div className="navbar-icon-container">
                
                    <img src={image} alt="spaceship"/>
                
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
            <div className='navbar-menu-container'>
                <span>
                        <NavLink className={"navbar-menu-links"} style={{ textDecoration: "none" }} exact to='/' onClick={() => setSearchResults('')}>Home</NavLink>
                </span>
                <span>
                    <NavLink className={"navbar-menu-links"} to="/newSpot">Create New Spot</NavLink>
                </span>
                
                    <div className="navbar-menu-button">
                        <button onClick={openMenu} className="navbar-menu-button-component">
                    <span>
                        <i className="fa-solid fa-bars"></i>
                    </span>
                    <span className="user-icon">
                        <i style={{color: 'red'}} className="fa-solid fa-user fa-lg"></i>
                    </span>

                    <div className="menu-position">
                    
                            {showMenu && currentUser && (
                                <ul className='profile-button-list'>
                                    <li className='profile-button-list-item'>{currentUser.username}</li>
                                    <li className='profile-button-list-item'>{currentUser.email}</li>
                                    <li className='profile-button-list-item special' onClick={goToMySpots}>
                                    MySpots
                                    </li>
                                    <li className='profile-button-list-item special' onClick={goToMyReviews}>
                                    MyReviews
                                    </li>
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
