import { useEffect } from "react"
import { useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import * as bookingsActions from '../../store/bookings'

const 

Bookings = ({spotId, spot}) => {
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const user = useSelector(state => state.session.user)

    const dispatch = useDispatch()
    console.log(spotId)
    useEffect(()=> {
        dispatch(bookingsActions.thunk_spotBookings(parseInt(spotId)))
    },[])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const months = ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"]
        
        let startDateSplitDate = startDate.split('-')
        let startMonth = months[parseInt(startDateSplitDate[1]) - 1]
        let startYear = startDateSplitDate[0]
        let startDay = startDateSplitDate[2]

        let formattedStartDate = [startMonth,' ', startDay,', ', startYear].join('')
        // console.log(formattedStartDate)
        
        let endDateSplitDate = endDate.split('-')
        let endMonth = months[parseInt(endDateSplitDate[1]) - 1]
        let endYear = endDateSplitDate[0]
        let endDay = endDateSplitDate[2]

        let formattedEndDate = [endMonth, ' ', endDay, ', ', endYear].join('')
        // console.log(formattedEndDate)
        
        const obj = {
            spotId: Number(spotId),
            startDate: new Date(formattedStartDate),
            endDate: new Date(formattedEndDate)
        }

        await dispatch(bookingsActions.thunkCreateBookings(obj)).then(() => bookingsActions.thunk_spotBookings(spotId))

        

    
    }
    console.log(user, spot)
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;
    
    console.log(Date(startDate) > Date(endDate))
    return(
        <form className="bookings-form" onSubmit={handleSubmit}>
            <label>Start Date</label>
            <input min={today} type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
            <label>End Date</label>
            <input min={today} type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            <button disabled={user && user.id === spot.ownerId} type="submit">Reserve Booking</button>
        </form>
    )
}

export default Bookings
