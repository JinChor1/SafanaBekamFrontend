import { useState } from "react"
import { useLogIn } from "../hooks/useLogIn"
import { Link } from "react-router-dom"

const LoginForm = ({ closeModal, setIsSigningUp }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { login, isLoading, error } = useLogIn() 

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        await login({
            companyId: process.env.REACT_APP_COMPANYID,
            patientEmail: email,
            patientPassword: password
        },closeModal)
    }

    return(
        <div>
            <form className="login-form auth-form" onSubmit={handleSubmit}>
                <h2>Log In</h2>
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
                <button className="button-pill-primary" disabled={isLoading}><p>Log In</p></button>
                {error && <div className="error">{error}</div> }
                <Link to="/Reset/Find/undefined" onClick={closeModal}>
                    <p>Forgot password?</p>
                </Link>
                <Link className="d-lg-none" onClick={()=>setIsSigningUp(true)}>
                    <p>Don't have an account?</p>
                </Link>
            </form>
        </div>
    )
}

export default LoginForm