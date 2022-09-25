import { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as reviewsActions from '../../store/reviews'
import './CreateReview.css'

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
        <div className="create-review-form-container" style={{ paddingBottom: '25px' }}>
            
        <ul style={{ listStyleType: 'none', color: 'red' }}>
            {errors.length > 0 && (
                errors.map((err, index) => (
                        <li key={index}>{err}</li>
                        ))
                        )}
            </ul>
            <div>
                Leave a Review Here:
            </div>
            {
                <form className='create-review-form' onSubmit={handleSubmit}>
                    <div className='form-textarea-input'>
                        <textarea placeholder="Please leave a review" className="create-review-textarea"   onChange={(e) => setReview(e.target.value)} value={review} />
                        <input  placeholder='stars' type='number' onChange={(e) => setStars(e.target.value)} value={stars} />
                    </div>
                    <button className='create-review-button'  type='submit'>Submit</button>
                </form>
            }
        </div>
    )
}

export default CreateReview
