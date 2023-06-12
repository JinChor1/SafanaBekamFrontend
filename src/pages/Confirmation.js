import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Skeleton from 'react-loading-skeleton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faCheck,
    faXmark,
    faEnvelope,
} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

const Confirmation = () => {
    const [ confirmation , setConfirmation] = useState(null)
    const [ isLoading , setIsLoading] = useState(true)
    const [ isPending, setIsPending ] = useState(false)
    const { confirmation_code } = useParams()
    const { user,loading } = useAuthContext()
    const navigate = useNavigate()

    useEffect(()=>{
        const fetchConfirmation = async () => {
            setIsLoading(true)
            setIsPending(false)
            const response = await fetch(`/api/patient/confirm/${confirmation_code}`)
            const json = await response.json()

            if (response.ok){
                setConfirmation(json)
            }
            setIsLoading(false)
        }

        if (user && loading===false){
            navigate('/')
        } else {
            if (confirmation_code.includes('EmailAddress:')){
                setIsLoading(false)
                setIsPending(true)
            } else {
                fetchConfirmation()
            }
        }
    },[confirmation_code,user,loading,navigate])

    return(
        <div>
            <div className="cover-title flex-column">
                <h1 className="flex-row-center">Confirmation</h1>
            </div>
            <div className="main-content">
                <div className="confirmation-container">
                    <div className="confirmation-icon" data-confirmation-icon={isLoading?"loading":isPending?"success":confirmation?"success":"failed"}>
                        { isLoading?
                            <Skeleton width={100} height={100} borderRadius={100}/>
                        :
                        <>
                            { isPending?
                                <FontAwesomeIcon icon={faEnvelope}/>
                                :
                                <>
                                    { confirmation?
                                        <FontAwesomeIcon icon={faCheck}/>
                                    :
                                        <FontAwesomeIcon icon={faXmark}/>
                                    }
                                </>
                            }
                        </>
                        }
                    </div>
                    <h2>{isLoading?<Skeleton width={500}/>:isPending?"Verify Your Email":confirmation?'Email Verification Success':'Email Verification Failed'}</h2>
                    <p>{isLoading?<Skeleton width={500}/>:isPending?`We've sent an email to ${confirmation_code.split(':')[1]} to verify your email address and activate the account.`:confirmation?`Account is verified with ${confirmation.patientEmail}.`:'Please use the link sent to the email address.'}</p>
                    <p>{isLoading?<Skeleton width={500}/>:confirmation?`Please login to continue.`:''}</p>

                </div>
            </div>
        </div>
    )
}

export default Confirmation