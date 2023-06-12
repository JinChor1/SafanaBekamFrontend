import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faCheck,
    faEnvelope,
} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

const ResetPass = () => {
    const { page, confirmation_code } = useParams() // page: Find, Sent, Change, Success
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ repassword, setRepassword ] = useState("")
    const [ error, setError ] = useState(null)
    const [ isLoading , setIsLoading] = useState(false)
    const { user,loading } = useAuthContext()
    const navigate = useNavigate()

    useEffect(()=>{
        if (user && loading===false){
            navigate('/')
        }
    },[user, loading, navigate])

    const handleSendMail = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        const resetRes = await fetch('/api/patient/reset/1', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                companyId: process.env.REACT_APP_COMPANYID,
                patientEmail: email,
            })
        })
        const json = await resetRes.json()

        if (!resetRes.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if (resetRes.ok){
            setIsLoading(false)
            navigate(`/Reset/Sent/${json.patientEmail}`)
        }
    }

    const handleResetPass = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/patient/reset/2', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                confirmationCode: confirmation_code,
                patientPassword: password,
                patientRePassword: repassword,
            })
        })
        const json = await response.json()

        if (!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok){
            setIsLoading(false)
            navigate(`/Reset/Success/${json.patientEmail}`)
        }
    }

    return(
        <div>
            <div className="cover-title flex-column">
                <h1 className="flex-row-center">Confirmation</h1>
            </div>
            <div className="main-content">
                <div className="confirmation-container">
                    { page === "Find" &&
                        <form className="reset-form" onSubmit={handleSendMail}>
                            <h2>Forgot Password</h2>
                            <label>Email Address:</label>
                            <input 
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                            <button className="button-pill-primary" disabled={isLoading}><p>Forgot Password</p></button>
                            {error && <div className="error">{error}</div> }
                        </form>
                    }
                    { page === "Sent" &&
                        <>
                        <div className="confirmation-icon" data-confirmation-icon="success">
                            <FontAwesomeIcon icon={faEnvelope}/>
                        </div>
                        <h2>Password Reset Requested</h2>
                        <p>We've sent an email to {confirmation_code} to verify your identity.</p>
                        <p>Please check your email inbox or junk mail.</p>
                        </>
                    }
                    { page === "Change" &&
                        <form className="reset-form" onSubmit={handleResetPass}>
                            <h2>Reset Password</h2>
                            <label>Password:</label>
                            <input 
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                            <label>Retype Password:</label>
                            <input 
                                type="password"
                                onChange={(e) => setRepassword(e.target.value)}
                                value={repassword}
                            />
                            <button className="button-pill-primary" disabled={isLoading}><p>Reset Password</p></button>
                            {error && <div className="error">{error}</div> }
                        </form>
                    }
                    { page === "Success" &&
                        <>
                        <div className="confirmation-icon" data-confirmation-icon="success">
                            <FontAwesomeIcon icon={faCheck}/>
                        </div>
                        <h2>Password Reset Successfully</h2>
                        <p>Password of {confirmation_code} has been reset!</p>
                        <p>Please login again to continue.</p>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default ResetPass