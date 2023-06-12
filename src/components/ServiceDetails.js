import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faClock,
    faWallet
} from '@fortawesome/free-solid-svg-icons'
import { useBookContext } from "../hooks/useBookContext"
import { useOutletContext } from 'react-router-dom'

const ServiceDetails = ({service}) => {
    const { dispatch } = useBookContext()
    const [ changeTabLocation ] = useOutletContext()

    const selectService = (service) => {
        localStorage.setItem('booking', JSON.stringify({_id: service._id}))
        dispatch({type:'ADD_BOOKING', payload: {_id: service._id}})
        changeTabLocation("TimeSlot")
    }

    return(
        <div className="service-card col-lg-3">
            <div className="row service-card-header">
                <img src={service.servicePic} alt="serviceDetailsPic"/>
            </div>
            <div className="row service-card-content">
                <h3>{service.serviceName}</h3><br/>
                <p>{service.serviceDesc}</p>
                {/* <div className="service-card-spacing">
                    <p><FontAwesomeIcon icon={faClock} size='sm'/> Duration: </p>
                    <p>{service.serviceDuration} Hour</p> 
                </div> */}
            </div>
            <div className="row service-card-footer">
                <div className='col-6'>
                    <strong><FontAwesomeIcon icon={faWallet}/> RM {service.servicePrice}</strong>
                </div>
                <div className='col-6 text-right'>
                    <strong><FontAwesomeIcon icon={faClock} size='sm'/> {service.serviceDuration} Hour </strong>
                </div>
                <div className="book-button-div col-12">
                    <button 
                        className='button-primary'
                        onClick={()=>{selectService(service)}}
                    >
                        <h3>Book</h3>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ServiceDetails