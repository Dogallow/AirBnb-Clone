import { useEffect } from "react"
import { useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import * as bookingsActions from '../../store/bookings'

const 

Bookings = ({spotId, spot}) => {
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const user = useSelector(state => state.session.user)
    const bookings = useSelector(state => state.bookings.spot)
    const [errors, setErrors] = useState([])

    const dispatch = useDispatch()
    console.log(spotId)
    useEffect(()=> {
        dispatch(bookingsActions.thunk_spotBookings(parseInt(spotId)))
    },[])

    console.log(new Date(startDate).getTime())
    console.log(new Date(endDate).getTime())
    console.log('&&&&&&&&&&&&&&& Bookings in booking component', Object.values(bookings))
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        let validate = []
        setErrors([])
        const months = ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"]

            for (let booking of Object.values(bookings)){
                console.log(booking)
                let bookedEndTime = new Date(booking.endDate.split(' ')[0])
                let bookedEndTimeMs = bookedEndTime.getTime()

                let bookedStartTime = new Date(booking.startDate.split(' ')[0])
                let bookedStartTimeMs = bookedStartTime.getTime()

                let startTime = new Date(startDate)
                let startTimeMs = startTime.getTime()

                let endTime = new Date(endDate)
                let endTimeMs = endTime.getTime()

                console.log('EndTimeMs v bookedEndTimeMs', endTimeMs, bookedEndTimeMs)
                console.log('startTimeMs v startTimeMs', startTimeMs, bookedStartTimeMs)

                if (startTimeMs <= bookedEndTimeMs && startTimeMs >= bookedStartTimeMs) {

                    validate.push("Start date conflicts with an existing booking")
                    
                }

                if (endTimeMs >= bookedStartTimeMs && endTimeMs <= bookedEndTimeMs) {
                    
                    validate.push("End date conflicts with an existing booking")

                }

                if (endTimeMs >= bookedEndTime && startTimeMs <= bookedStartTimeMs){
                    validate.push("This booking overlaps with an existing booking")
                }
                if (validate.length > 0){
                    setErrors(validate)
                    return
                }
            }
        
console.log(validate)
        if (validate.length > 0){
            setErrors(validate)
            return
        } else {

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
    
            const result = await dispatch(bookingsActions.thunkCreateBookings(obj))
            console.log('FRONTEND RESULT %%%%%%%%', result)
            if (result.message){
                    setErrors([result.message])
            } else {
    
                await dispatch(bookingsActions.thunk_spotBookings(spotId))
            }
                
        
        }
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
    console.log('ERRORS########', errors)
    return(
        <>
        <form className="bookings-form" onSubmit={handleSubmit}>
                <ul style={{ listStyleType: 'none', color: 'red', padding:'0px' }} className="">{errors?.map(error => <li>{error}</li>)}</ul>

            <label>Start Date</label>
            <input min={today} type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
            <label>End Date</label>
            <input min={today} type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            <button disabled={user && user.id === spot.ownerId} type="submit">Reserve Booking</button>
        </form>
        </>
    )
}

export default Bookings
