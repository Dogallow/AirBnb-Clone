import { useEffect } from "react"
import { useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import * as bookingsActions from '../../store/bookings'

const Bookings = ({spotId}) => {
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const dispatch = useDispatch()

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
        console.log(formattedStartDate)
        
        let endDateSplitDate = endDate.split('-')
        let endMonth = months[parseInt(endDateSplitDate[1]) - 1]
        let endYear = endDateSplitDate[0]
        let endDay = endDateSplitDate[2]

        let formattedEndDate = [endMonth, ' ', endDay, ', ', endYear].join('')
        console.log(formattedEndDate)
        
        const obj = {
            spotId: Number(spotId),
            startDate: new Date(formattedStartDate),
            endDate: new Date(formattedEndDate)
        }

        await dispatch(bookingsActions.thunk_createBookings(obj))

        

        
    }
    return(
        <form onSubmit={handleSubmit}>
            <label>Start Date</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
            <label>End Date</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            <button type="submit">Submit</button>
        </form>
    )
}

export default Bookings
