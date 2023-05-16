import React, {useState} from "react";
import {useDispatch} from 'react-redux'
import {editReviewThunk} from '../../store/reviews'
import * as spotsActions from '../../store/spots'

function EditReview ({review, stars, id, setShowEditForm, spotId}){
    const dispatch = useDispatch()

    const [editReviewText, setEditReviewText] = useState(review)
    const [editStars, setEditStars] = useState(stars)
    

    const editReview = async (e) => {
        e.preventDefault()

        const obj = {
            review: editReviewText,
            stars: Number(editStars)
        }

        await dispatch(editReviewThunk(id, obj)).then(() => {
            dispatch(spotsActions.getOneSpot(spotId)).catch(async data => {
                const error = await data.json()
            })
        })
        setShowEditForm(false)
    };
    
    let starCount;
    if (editStars == 1) {
        starCount = (
            <>

                <i style={{ color: 'red' }} class="fa-solid fa-star"></i>
                <i style={{ color: 'gray' }} class="fa-solid fa-star"></i>
                <i style={{ color: 'gray' }} class="fa-solid fa-star"></i>
                <i style={{ color: 'gray' }} class="fa-solid fa-star"></i>
                <i style={{ color: 'gray' }} class="fa-solid fa-star"></i>
            </>
        );
    } else if (editStars == 2) {
        starCount = (
            <>

                <i style={{ color: 'red' }} class="fa-solid fa-star"></i>
                <i style={{ color: 'red' }} class="fa-solid fa-star"></i>
                <i style={{ color: 'gray' }} class="fa-solid fa-star"></i>
                <i style={{ color: 'gray' }} class="fa-solid fa-star"></i>
                <i style={{ color: 'gray' }} class="fa-solid fa-star"></i>
            </>
        );
    } else if (editStars == 3) {
        starCount = (
            <>

                <i style={{ color: 'red' }} class="fa-solid fa-star"></i>
                <i style={{ color: 'red' }} class="fa-solid fa-star"></i>
                <i style={{ color: 'red' }} class="fa-solid fa-star"></i>
                <i style={{ color: 'gray' }} class="fa-solid fa-star"></i>
                <i style={{ color: 'gray' }} class="fa-solid fa-star"></i>
            </>
        );
    } else if (editStars == 4) {
        starCount = (
            <>

                <i style={{ color: 'red' }} class="fa-solid fa-star"></i>
                <i style={{ color: 'red' }} class="fa-solid fa-star"></i>
                <i style={{ color: 'red' }} class="fa-solid fa-star"></i>
                <i style={{ color: 'red' }} class="fa-solid fa-star"></i>
                <i style={{ color: 'gray' }} class="fa-solid fa-star"></i>
            </>
        );
    } else if (editStars == 5) {
        starCount = (
            <>

                <i style={{ color: 'red' }} class="fa-solid fa-star"></i>
                <i style={{ color: 'red' }} class="fa-solid fa-star"></i>
                <i style={{ color: 'red' }} class="fa-solid fa-star"></i>
                <i style={{ color: 'red' }} class="fa-solid fa-star"></i>
                <i style={{ color: 'red' }} class="fa-solid fa-star"></i>
            </>
        );
    };

    return (
        <form className='create-review-form' onSubmit={editReview}>
            <div className='form-textarea-input'>
                <textarea placeholder="Please leave a review" className="create-review-textarea" onChange={(e) => setEditReviewText(e.target.value)} value={editReviewText} />
            </div>
            <div className='textarea-and-count-container'>

                <div className="star-count-container">
                    {starCount}
                </div>
                <div className='form-textarea-input'>
                    <input step={1} min={1} max={5} placeholder='stars' type='range' onChange={(e) => setEditStars(e.target.value)} value={editStars} />
                </div>
            </div>
            <button className='create-review-button' type='submit'>Submit</button>
        </form>
    );
};

export default EditReview;
