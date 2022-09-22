import { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as reviewsActions from '../../store/reviews'

const CreateReview = ({ spotId }) => {
    const [showForm, setShowForm] = useState(false)
    const [review, setReview] = useState('')
    const [stars, setStars] = useState('')
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()

        setErrors([])
        let validate = []

        const obj = {
            review,
            stars: Number(stars)
        }

        dispatch(reviewsActions.createSingleReview(spotId, obj)).catch(async (data) => {
            const error = await data.json()
            validate.push(error.message)
            console.log(validate)
            setErrors(validate)
        }).then(() => dispatch(reviewsActions.getSpotReviews(spotId)))


    }

    return (
        <div style={{ paddingBottom: '50px' }}>
            <button onClick={() => setShowForm(!showForm)}>Create Review</button>
            {errors.length > 0 && (
                errors.map((err, index) => (
                    <ul key={index}>
                        <li>{err}</li>
                    </ul>
                ))
            )}
            {showForm && (
                <form onSubmit={handleSubmit}>
                    <textarea style={{ height: '50px', width: '200px' }} placeholder='review' onChange={(e) => setReview(e.target.value)} value={review} />
                    <input style={{ height: '50px', width: '60px' }} placeholder='stars' type='number' onChange={(e) => setStars(e.target.value)} value={stars} />
                    <button style={{ height: '30px', width: '200px' }} type='submit'>Submit</button>
                </form>
            )}
        </div>
    )
}

export default CreateReview
