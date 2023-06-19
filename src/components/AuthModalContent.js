import { useState } from "react"
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

const AuthModalContent = ({ closeModal }) => {
    const [isSigningUp,setIsSigningUp] = useState(false)

    const handleClick = () => {
        setIsSigningUp(!isSigningUp) 
    }

    return(
        <div className="d-flex auth-modal-container">
            <div className="col">
                {!isSigningUp?
                    <LoginForm closeModal={closeModal} setIsSigningUp={setIsSigningUp}/>
                :
                    <SignupForm closeModal={closeModal} setIsSigningUp={setIsSigningUp}/>

                }
            </div>
            <div className="col-4 switch-auth-panel d-none d-lg-flex flex-column">
                <img src="https://69364-fyp-system.s3.ap-southeast-1.amazonaws.com/whiteLogo.png" alt="panelimg"/>
                {isSigningUp?<p>Have an account?</p>:<p>Don't have an account?</p>}
                <button className="button-pill-secondary" onClick={handleClick}>
                    {isSigningUp?
                        <p>Log In</p>
                    :
                        <p>Sign Up</p>
                    }
                </button>
            </div>
        </div>
    )
}

export default AuthModalContent