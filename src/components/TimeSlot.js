import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { useBookContext } from "../hooks/useBookContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuthAPI } from "../hooks/useAuthAPI"
import { 
    faClock,
    faWallet
} from '@fortawesome/free-solid-svg-icons'
import { ScheduleMeeting } from 'react-schedule-meeting';
import Skeleton from 'react-loading-skeleton'
import ServiceCardSkeleton from "./ServiceCardSkeleton"

const TimeSlot = () => {
    const { booking, dispatch } = useBookContext()
    const [ changeTabLocation ] = useOutletContext()
    const [ service, setService ] = useState(null)
    const [ timeslot, setTimeslot ] = useState([])
    const { callAPI, isLoading, error } = useAuthAPI() 

    useEffect(()=>{
        const fetchServiceDetailsById = async () => {
            const serviceDetails = await callAPI({
                method: "GET",
                apiRoute: `/api/serviceDetails/${booking._id}`,
                payload: ""
            })        
            const timeslotResponse = await callAPI({
                method: "GET",
                apiRoute: `/api/timeSlot`,
                payload: ""
            })        
            
            if (serviceDetails && timeslotResponse) {
                setService(serviceDetails)
                setTimeslot(timeslotResponse)
            } else {   
                changeTabLocation("ServiceDetails")
            }
        }
        
        if (booking) {
            fetchServiceDetailsById()
        }
    },[booking,changeTabLocation,callAPI])

    const selectTimeSlot = (time) => {
        localStorage.setItem('startTime', JSON.stringify({startTime: time.startTime}))
        dispatch({type:'UPDATE_BOOKING', payload: {startTime: time.startTime}})
        changeTabLocation("Summary")
    }

    return(
        <div>
            <h2>Time Slot</h2>
            {!isLoading && service ?
                <div className="d-lg-flex flex-row justify-content-center time-slot-content">
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
                    {/* calendar */}
                    <div className="calendar-timeslot col-lg-8">
                        <ScheduleMeeting
                            borderRadius={10}
                            primaryColor="#212161"
                            availableTimeslots={timeslot}
                            onStartTimeSelect={selectTimeSlot}
                            onSelectedDayChange={console.log}
                            eventDurationInMinutes={60}
                        />
                    </div>
                </div>
                :
                <div className="d-lg-flex flex-row justify-content-center time-slot-content">
                    {/* service card */}
                    <ServiceCardSkeleton notList={true}/>
                    {/* calendar */}
                    <div className="calendar-timeslot col-lg-8">
                        <Skeleton height="450px" borderRadius="10px" className="skeleton-calendar"/>
                    </div>
                </div>
            }
        </div>
      
    )
}

export default TimeSlot