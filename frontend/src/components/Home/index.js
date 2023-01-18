import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as spotsActions from '../../store/spots'
import { NavLink, Redirect } from 'react-router-dom'
import './Home.css'
import Footer from '../../Footer'


const Home = () => {
    const dispatch = useDispatch()
    const spots = useSelector(state => state.spots.allSpots)

    const spotValues = Object.values(spots)
    
    useEffect(() => {
         dispatch(spotsActions.getAllSpots())

         
    }, [dispatch])
    
    // const singleSpot = () => {
    //     return <Redirect to={`${/}`}/>
    // }
    
    
    if(!spotValues) return (<p>Loading...</p>)
    
    return (
        <>
        <div className="images-main-container">
            
            {spotValues.map((spot, index) => {
                return (
                    <div className='image-container' key={index} >

                     {(spot.previewImage === "No Image provided") 
                        ? (<div className="preview-image-container egg">
                                <NavLink to={`/${spot.id}`}>
                                    <img src='https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80' alt={spot.description} />
                                </NavLink>
                            </div>)
                        : (
                            <div className="preview-image-container">
                                <NavLink to={`/${spot.id}`}>
                                    <img src={spot.previewImage} alt={spot.description} />
                                </NavLink>
                            </div>
                            )}
                        <div className="spot-details-container">
                            <NavLink to={`/${spot.id}`}>
                                <div className="spot-details-address-rating">
                                <h4>{spot.city}, {spot.state}</h4>
                                    <h4><i className="fa-solid fa-star"></i>{spot.avgRating ? spot.avgRating : 'New'}</h4>
                                </div>
                                <div className='spot-details'>
                                
                                    <h4 className='spot-details-inner-text'>Available</h4>
                                <h4>${spot.price} night</h4>
                                </div>
                            </NavLink>
                        </div>
                        
                </div>
                )
            })}
            </div>
            <Footer />
        </>
    )
}

export default Home
