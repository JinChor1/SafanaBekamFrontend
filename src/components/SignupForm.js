import { useState } from "react"
import { useSignUp } from "../hooks/useSignUp"
import { Link } from "react-router-dom"

const SignupForm = ({ closeModal ,setIsSigningUp}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("")
    const { signup, isLoading, error } = useSignUp()

    const handleSubmit = async (e) => {
        e.preventDefault() 

        await signup({
            companyId: process.env.REACT_APP_COMPANYID,
            patientEmail: email,
            patientPassword: password,
            patientRePassword: rePassword
        },closeModal)
    }

    return(
        <div>
            <form className="signup-form-1 auth-form" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <label>Email Address:</label>
                <input 
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <label>Password:</label>
                <input 
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <label>Retype Password:</label>
                <input 
                    type="password"
                    onChange={(e) => setRePassword(e.target.value)}
                    value={rePassword}
                />
                <button className="button-pill-primary" disabled={isLoading}><p>Sign Up</p></button>
                {/* {error && <div className="error">{error}</div> } */}
                {error && <div className="error">{error}</div>}
                <Link className="d-lg-none" onClick={()=>setIsSigningUp(true)}>
                    <p>Already have an account?</p>
                </Link>
            </form>
        </div>
    )
}

export default SignupForm