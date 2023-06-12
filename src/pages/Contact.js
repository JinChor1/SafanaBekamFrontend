import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faFacebookSquare,
    faWhatsappSquare,
} from '@fortawesome/free-brands-svg-icons'
import { 
    faPhone,
    faLocationDot
} from '@fortawesome/free-solid-svg-icons'
import Skeleton from 'react-loading-skeleton'

const Contact = () => {
    const [address, setAddress] = useState("")
    const [facebookLink, setFacebookLink] = useState("")
    const [whatsAppLink, setWhatsAppLink] = useState("")
    const [phoneNo, setphoneNo] = useState("")
    const [lat, setLat] = useState("")
    const [lng, setLng] = useState("")
    const googleEmbedPublicKey = "AIzaSyCHWYWN14Dm_oKiMTObkKCWKBObXJ9rWQk"

    useEffect(()=>{
        const fetchCompanyDetails = async () => {
            const response = await fetch(`/api/companyDetails/${process.env.REACT_APP_COMPANYID}`) //temporary
            const json = await response.json()

            if (response.ok){
                setAddress(json.contactUsDetails.Address)
                setFacebookLink(json.contactUsDetails.facebookLink)
                setWhatsAppLink(json.contactUsDetails.whatsAppLink)
                setphoneNo(json.contactUsDetails.phoneNumber)
                setLat(json.contactUsDetails.lat)
                setLng(json.contactUsDetails.lng)
            }
        }
        fetchCompanyDetails()
    },[])

    return(
        <div>
            <div className="cover-title flex-column">
                <h1 className="flex-row-center">CONTACT US</h1>
            </div>
            <div className="row contact-row main-content">
                <div className="col-5 contact-container-left">
                    <iframe
                        title='google-embed-map'
                        className='google-embed-map'
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps/embed/v1/place?key=${googleEmbedPublicKey}&q=${lat},${lng}`}
                    >
                    </iframe>
                </div>
                <div className="vertical-line-container"><div className="vertical-line"></div></div>
                <div className="col-5 contact-container">
                    <div className="contact-link-row">
                        {facebookLink?<a className="contact-link" target="_blank" href={facebookLink} rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookSquare}/></a>:<Skeleton className="contact-link" width={300}/>}
                        {whatsAppLink?<a className="contact-link" target="_blank" href={whatsAppLink} rel="noopener noreferrer"><FontAwesomeIcon icon={faWhatsappSquare}/></a>:""}
                        {phoneNo?<p className="contact-phone"><span className="contact-icon"><FontAwesomeIcon icon={faPhone}/></span>{phoneNo}</p>:""}
                    </div>
                    {address?<p className="contact-address"><span className="contact-icon"><FontAwesomeIcon icon={faLocationDot}/></span>{address}</p>:<Skeleton className="contact-address" width={500}/>}
                </div>
            </div>
        </div>
    )
}

export default Contact