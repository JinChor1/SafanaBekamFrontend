import { useEffect, useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { useBookContext } from "../hooks/useBookContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faClock,
    faWallet,
    faEnvelope,
    faUser,
    faPhone,
    faCalendar
} from '@fortawesome/free-solid-svg-icons'
import { useAuthAPI } from "../hooks/useAuthAPI"
import { toast } from 'react-toastify'
import Skeleton from 'react-loading-skeleton'
import ServiceCardSkeleton from "./ServiceCardSkeleton"

const Summary = () => {
    const { booking, dispatch } = useBookContext()
    const [ changeTabLocation ] = useOutletContext()
    const [ service, setService ] = useState(null)
    const [ userDetails, setUserDetails ] = useState(null)
    const [ cart, setCart ] = useState(null)
    const { callAPI, isLoading, error } = useAuthAPI()
    const navigate = useNavigate()

    useEffect(()=>{
        const fetchServiceDetailsById = async () => {
            const serviceDetails = await callAPI({
                method: "GET",
                apiRoute: `/api/serviceDetails/${booking._id}`,
                payload: ""
            })        
            const userDetails = await callAPI({
                method: "GET",
                apiRoute: `/api/patient/profile`,
                payload: ""
            })        
            
            if (serviceDetails && userDetails) {
                setService(serviceDetails)
                setUserDetails(userDetails)
                setCart({
                    serviceId: booking._id,
                    bookingDate: {
                        startTime: booking.startTime
                    },
                    bookingStatus: "Active",
                    bookingNotes: ""
                })
            } else {
                changeTabLocation("ServiceDetails")
            }
        }
            
        if (booking) {
            if (booking.startTime==null){
                changeTabLocation("TimeSlot")
            } else {
                fetchServiceDetailsById()
            }
        }
    },[booking,changeTabLocation,callAPI])

    const addBooking = async () => {
        const response = await callAPI({
            method: 'POST',
            apiRoute: `/api/timeSlot`,
            payload: cart
        })
        
        if (response){
            localStorage.removeItem('booking')
            localStorage.removeItem('toPage')
            localStorage.removeItem('startTime')
            dispatch({type:'REMOVE_BOOKING'})
            navigate(`/Profile/Treatment_Record`)
            toast.success("Service booked successfully!", {
                position: "top-center",
            })
        }
    }

    return(
        <div>
            <h2>Summary</h2>
            {service && booking && !isLoading ?
                <div className="d-lg-flex flex-row justify-content-center time-slot-content">
                    {/* summary */}
                    <div className="col-lg-8">
                        <div className="summary-content">
                            <h4><FontAwesomeIcon icon={faUser}/> Name : <span>{userDetails.patientName}</span></h4>
                            <h4><FontAwesomeIcon icon={faEnvelope}/> Email : <span>{userDetails.patientEmail}</span></h4>
                            <h4><FontAwesomeIcon icon={faPhone}/> Phone : <span>{userDetails.patientPhone}</span></h4>
                            <div className="horizantal-line"></div>
                            <h4><FontAwesomeIcon icon={faClock}/> Time : <span>{new Date(booking.startTime.toString()).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</span></h4>
                            <h4><FontAwesomeIcon icon={faCalendar}/> Date : <span>{new Date(booking.startTime.toString()).toLocaleString('en-NZ', { day: "numeric", month: "short", year: "numeric"})}</span></h4>
                        </div>
                        <div className="confirm-book-button-div">
                            <button className="button-primary" disabled={isLoading} onClick={addBooking}>{isLoading?<h3>Loading...</h3>:<h3>Confirm Booking</h3>}</button>
                        </div>
                    </div>

                    {/* service card */}
                    <div className="service-card col-3 d-none d-lg-flex">
                        <div className="row service-card-header">
                            <img src={service.servicePic} alt="serviceDetailsPic"/>
                        </div>
                        <div className="row service-card-content">
                            <h3>{service.serviceName}</h3><br/>
                            <p>{service.serviceDesc}</p>
                        </div>
                        <div className="row service-card-footer">
                            <div className='col-6'>
                                <strong><FontAwesomeIcon icon={faWallet}/> RM {service.servicePrice}</strong>
                            </div>
                            <div className='col-6 text-right'>
                                <strong><FontAwesomeIcon icon={faClock} size='sm'/> {service.serviceDuration} Hour </strong>
                            </div>
                            <br/><br/>
                        </div>
                    </div>
                </div>
            : 
                <div className="d-lg-flex flex-row justify-content-center time-slot-content">
                    {/* summary */}
                    <div className="col-lg-8">
                        <div className="summary-content">
                            <h4><Skeleton/></h4>
                            <h4><Skeleton/></h4>
                            <h4><Skeleton/></h4>
                            <div className="horizantal-line-skeleton "></div>
                            <h4><Skeleton/></h4>
                            <h4><Skeleton/></h4>
                        </div>
                        <div className="confirm-book-button-div">
                        <Skeleton/>
                        </div>
                    </div>
                    {/* service card */}
                    <ServiceCardSkeleton notList={true}/>
                </div>
            }
        </div>
      
    )
}

export default Summary