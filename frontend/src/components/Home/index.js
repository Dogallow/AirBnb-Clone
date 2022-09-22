import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as spotsActions from '../../store/spots'
import { NavLink, Redirect } from 'react-router-dom'
import './Home.css'


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
    console.log('Spot Values ./Home/index.js',spotValues)
    return (
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
                                <h3>{spot.address}</h3>
                                <h3>{spot.city}, {spot.state}</h3>
                            </NavLink>
                        </div>
                        
                </div>
                )
            })}

        </div>
    )
}

export default Home
