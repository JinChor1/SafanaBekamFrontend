import { useEffect, useState } from "react"
import ServiceDetails from "../components/ServiceDetails"
import { useAuthAPI } from "../hooks/useAuthAPI"
import ServiceCardSkeleton from "./ServiceCardSkeleton"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWarning } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const ServiceList = () => {
    const [services, setServices] = useState([])
    const { callAPI, isLoading, error } = useAuthAPI() 

    useEffect(()=>{
        const fetchServiceDetails = async () => {
            const serviceDetails = await callAPI({
                method: "GET",
                apiRoute: "/api/serviceDetails",
                payload: ""
            })        
            
            if (serviceDetails) {
                setServices(serviceDetails)
            }
        }
        
        fetchServiceDetails()
    },[callAPI])

    return(
        <div>
            <h2>Cupping Services</h2>
            { !isLoading && services ?
                <div>
                    {services.warning?
                        <div className="booking-ineligible">
                            <h4><FontAwesomeIcon icon={faWarning} className="color-warning"/> {services.warning} <FontAwesomeIcon icon={faWarning} className="color-warning"/></h4>
                            <Link to="/Profile" className="button-profile flex-row-center margin-x-auto"><strong>Go to profile</strong></Link>
                        </div>
                    :
                        <div className="d-lg-flex flex-row justify-content-center flex-wrap">
                            {services && services.map((service)=>(
                                <ServiceDetails key={service._id} service={service}></ServiceDetails>
                            ))}
                        </div>
                    }
                </div>
                
            :
                <div className="d-lg-flex flex-row justify-content-center flex-wrap">
                    <ServiceCardSkeleton/>
                    <ServiceCardSkeleton/>
                    <ServiceCardSkeleton/>
                    <ServiceCardSkeleton/>
                    <ServiceCardSkeleton/>
                    <ServiceCardSkeleton/>
                </div>
            }
            
        </div>
      
    )
}

export default ServiceList