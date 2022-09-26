import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as spotsActions from '../../store/spots'
import { NavLink } from 'react-router-dom'


const MySpots = () => {
const dispatch = useDispatch()
let spots = useSelector(state => state.spots.allSpots)

    spots = Object.values(spots)
    
    useEffect(() => {
        dispatch(spotsActions.currentSpots())
    },[dispatch])
    
    if(!spots) return null
    return (
        <div>
            {spots.map((spot, index) => {
                return (
                    <div key={index}>
                        <NavLink to={`/${spot.id}`}>
                            {spot.address}
                        </NavLink>
                    </div>
                )
            })}
        </div>
    )
}

export default MySpots
