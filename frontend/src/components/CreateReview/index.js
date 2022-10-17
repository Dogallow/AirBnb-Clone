import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Modal } from '../../context/Modal'

import * as reviewsActions from '../../store/reviews'
import * as spotsActions from '../../store/spots'

import './CreateReview.css'

const CreateReview = ({ spotId, setReviewModal }) => {
    const [showForm, setShowForm] = useState(false)
    const [review, setReview] = useState('')
    const [stars, setStars] = useState('')
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()

    const handleSubmit =async (e) => {
        e.preventDefault()

        setErrors([])
        let validate = []

        const obj = {
            review,
            stars: Number(stars)
        }
        await dispatch(reviewsActions.createSingleReview(spotId, obj)).catch(async (data) => {
            const error = await data.json()
            validate.push(error.message)
            
            setErrors(validate)
        }).then(() => dispatch(reviewsActions.getSpotReviews(spotId))).then(() => dispatch(spotsActions.getOneSpot(spotId)))
        
        console.log('validate array((((((((((())))))))))))))', validate)
        if(validate.length === 0){
            setReviewModal(false)

            setReview('')
            setStars('')
        }
        
    }

    return (
        <div className="create-review-form-container" style={{ paddingBottom: '25px' }}>
            
        <ul style={{ listStyleType: 'none', color: 'red',width: '80%' }}>
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



export const CreateReviewModal = ({spotId, reviewModal, setReviewModal }) => {
    const [showModal, setShowModal] = useState(false)
    
    return (
        <>
        {reviewModal && (
            <Modal onClose={()=>setReviewModal(false)}>
            <CreateReview  spotId={spotId} setReviewModal={setReviewModal}/>
            </Modal>
            )}
        </> 
            )
}

export default CreateReviewModal
        
