import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as spotsActions from '../../store/spots'
import { NavLink, Redirect } from 'react-router-dom'
import './Home.css'
import Footer from '../../Footer'
import { PageNumber } from './PageNumber'


const Home = ({searchResults, searchFilter}) => {
    const dispatch = useDispatch()
    const spots = useSelector(state => state.spots.allSpots)
    const spotsObj = useSelector(state => state.spots)

    const [pageNumber, setPageNumber] = useState(1)

    const spotValues = Object.values(spots)
    console.log('SPOT PAGE ----------------->', spotsObj.page)
    let spotCount = spotsObj.spotCount
    let pageSize = spotsObj.size

    let pageCount = []
    let page = Math.ceil(spotCount / pageSize)
    for (let i = 1; i <= page; i++){
        pageCount.push(i)
    }
    console.log(pageCount)
    console.log(spotCount, spotsObj, page)
    // pageCount = pageCount.map((count, index) => index + 1)
    
    console.log('CURRENT PAGE NUMBER WITHIN THE COMPONENT', pageNumber)
    useEffect(() => {
        dispatch(spotsActions.getAllSpots(pageNumber))
        
        
    }, [dispatch, pageNumber])

    console.log(searchResults.length)
    let querySpots = false

    if (searchResults.length > 0){
        let results = []
        let length = searchResults.length
        
            querySpots = spotValues.filter(spot =>{ 
                if (searchFilter === 'price'){
                    return spot.price <= searchResults
                }else{
                    return spot[searchFilter].slice(0,length).toLowerCase() === searchResults.toLowerCase()
                }
            
            })
            if (querySpots.length === 0){
                return <h1>No Results Found...</h1>
            } else {
                querySpots = querySpots.map((spot, index, array) => {
                    console.log('array')
                    if (array.length === 0) return <h1>No Results Found...</h1>
                    return (
                        <div className='image-container' key={index} >

                            {(spot.previewImage === "No Image provided")
                                ? (<div className="preview-image-container egg">
                                    <NavLink to={`/${spot.id}`}>
                                        <img src='https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80' alt={spot.description} />
                                    </NavLink>
                                </div>)
                                : (
                                    <div className="preview-image-container">
                                        <NavLink to={`/${spot.id}`}>
                                            <img src={spot.previewImage} alt={spot.description} />
                                        </NavLink>
                                    </div>
                                )}
                            <div className="spot-details-container">
                                <NavLink to={`/${spot.id}`}>
                                    <div className="spot-details-address-rating">
                                        <h4>{spot.city}, {spot.state}</h4>
                                        <h4><i className="fa-solid fa-star"></i>{spot.avgRating ? spot.avgRating : 'New'}</h4>
                                    </div>
                                    <div className='spot-details'>

                                        <h4 className='spot-details-inner-text'>Available</h4>
                                        <h4>${spot.price} night</h4>
                                    </div>
                                </NavLink>
                            </div>

                        </div>
                    )
                })
            } 
            
        
    }

    console.log(spotValues)
    
    if(!spotValues) return (<p>Loading...</p>)

    const changePage = async (e) => {
        e.preventDefault()
        setPageNumber(Number(e.target.innerText))
        console.log('CURRENT target ******************>',Number(e.target.innerText))
        console.log('CURRENT PAGE ******************>',pageNumber)
        await dispatch(spotsActions.getAllSpots(pageNumber))
    }
    
    return (
        <>
        
        
            <div className="images-main-container">
                
                {querySpots ? querySpots : 
                
                    spotValues.map((spot, index) => {
                        return (
                            <div className='image-container' key={index} >
        
                            {(spot.previewImage === "No Image provided") 
                                ? (<div className="preview-image-container egg">
                                        <NavLink to={`/${spot.id}`}>
                                            <img src='https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80' alt={spot.description} />
                                        </NavLink>
                                    </div>)
                                : (
                                    <div className="preview-image-container">
                                        <NavLink to={`/${spot.id}`}>
                                            <img src={spot.previewImage} alt={spot.description} />
                                        </NavLink>
                                    </div>
                                    )}
                                <div className="spot-details-container">
                                    <NavLink to={`/${spot.id}`}>
                                        <div className="spot-details-address-rating">
                                        <h4>{spot.city}, {spot.state}</h4>
                                            <h4><i className="fa-solid fa-star"></i>{spot.avgRating ? spot.avgRating : 'New'}</h4>
                                        </div>
                                        <div className='spot-details'>
                                        
                                            <h4 className='spot-details-inner-text'>Available</h4>
                                        <h4>${spot.price} night</h4>
                                        </div>
                                    </NavLink>
                                </div>
                                
                        </div>
                        )
                    })
                }
                </div>
        
            <div className='page-button-wrapper'>
                <div className='page-button-container'>
                    {pageCount.map(page => <span onClick={changePage} className='page-button'>{page}</span>)}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home
