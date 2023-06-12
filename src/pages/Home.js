import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Skeleton from 'react-loading-skeleton'

const Home = () => {
    const [aboutUsDesc,setAboutUsDesc] = useState("")
    // const [galleryList,setGalleryList] = useState("")
    // const [reviewList,setReviewList] = useState("")

    useEffect(()=>{
        const fetchCompanyDetails = async () => {
            const response = await fetch(`https://safanabekam-backend.onrender.com/api/companyDetails/${process.env.REACT_APP_COMPANYID}`) //temporary
            const json = await response.json()

            if (response.ok){
                setAboutUsDesc(json.aboutUsDesc)
            }
        }
        fetchCompanyDetails()
    },[])

    return(
        <div>
            <div className="cover-title flex-column">
                <h1 className="flex-row-center">CUPPING THERAPY CLINIC</h1>
                <Link to="/BookNow" className="button-primary flex-row-center margin-x-auto"><strong>Book Now</strong></Link>
            </div>
            <div className="main-content flex-column">
                <div className="main-sub-content flex-column">
                    <h2 className="flex-row-center">About Us</h2>
                    <p className="flex-row-center">{aboutUsDesc || <Skeleton count={5} containerClassName="skeleton-flex"/>}</p>
                </div>
                {/* <div className="main-sub-content flex-column">
                    <h2 className="flex-row-center">Gallery</h2>
                </div>
                <div className="main-sub-content flex-column">
                    <h2 className="flex-row-center">Review</h2>
                </div> */}
            </div>

        </div>
    )
}

export default Home