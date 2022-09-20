import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as spotsActions from '../../store/spots'
import { NavLink, Redirect } from 'react-router-dom'


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
    console.log(spotValues)
    return (
        <div>
            {spotValues.map((spot, index) => {
                console.log('hello')
                return (
                <div key={index} onClick={()=> console.log(spot)}>
                    <NavLink to={`/${spot.id}`}>
                        <h3>{spot.address}</h3>
                        <h3>{spot.city}, {spot.state}</h3>
                    </NavLink>
                </div>
                )
            })}

        </div>
    )
}

export default Home
