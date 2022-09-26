import { useState } from 'react'
import * as reviewsActions from '../../store/reviews'
import { useDispatch } from 'react-redux'
import './AddReviewImage.css'

const AddReviewImage = ({ id, spotId }) => {
    const [showInput, setShowInput] = useState(false)
    const [url, setUrl] = useState('')
    const [validateErrors, setValidateErrors] = useState([])
    const dispatch = useDispatch()
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const obj = {
            reviewId: id,
            url
        }
        setValidateErrors([])
        const validate = []
       
            dispatch(reviewsActions.addSingleReviewImage(obj)).catch(async data => {
            const errors = await data.json()
            validate.push(errors.message)
            setValidateErrors(validate)
            
        }).then(() => dispatch(reviewsActions.getSpotReviews(spotId)))
        setShowInput(!showInput)
        setUrl('')
        // dispatch(reviewsActions.addSingleReviewImage(obj)).catch(async data => {
        //     const errors = await data.json()
        //     validate.push(errors.message)
        //     setValidateErrors(validate)
        //     console.log(validateErrors)
        // })
        // dispatch(reviewsActions.getSpotReviews(spotId))
    }
    
    return(
        <div className='add-review-image-container'>
            {validateErrors.length > 0 && (
                <ul>
                {validateErrors.map((err, index) => {
                    return <li key={index}>{err}</li>
                })}
                </ul>
            )}
            <button className='add-review-image-button' onClick={() =>setShowInput(!showInput)}>Add Image</button>
            {showInput && (
                <form className='add-review-image-form' onSubmit={handleSubmit}>
                    <input className='add-review-image-input' placeholder='url' onChange={(e) => setUrl(e.target.value)} value={url}/>
                    <button type='submit'>Submit</button>
                </form>
            )}
        </div>
    )
}
export default AddReviewImage
