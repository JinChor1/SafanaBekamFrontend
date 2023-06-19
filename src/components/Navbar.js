import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogOut } from '../hooks/useLogOut'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons'
import { useAuthModalContext } from "../hooks/useAuthModalContext"
import { useState } from "react"

const Navbar = () => {
    const { user } = useAuthContext()
    const { openModal } = useAuthModalContext()
    const { logout } = useLogOut()
    const [ isNavOpen, setIsNavOpen] = useState(false)

    const handleAuth = () => {
        if(!user){
            openModal()
        }
        if(user){
            logout()
        }
    }

    const handleBurger = (e) => {
        e.preventDefault()
        
        setIsNavOpen(prevState => prevState?false:true)
    }

    return(
        <header>
            {/* Desktop */}
            <div className="containerNav d-none d-lg-flex">
                <Link to="/">
                    <img src="https://69364-fyp-system.s3.ap-southeast-1.amazonaws.com/blackLogo.png" alt="Main Logo"/>
                </Link>
                <div className="nav">
                    <Link to="/">
                        <h4>Home</h4>
                    </Link>
                    <Link to="/ContactUs">
                        <h4>Contact</h4>
                    </Link>
                    <Link to="/BookNow">
                        <h4>Book Now</h4>
                    </Link>
                    {user?    
                        <Link to="/Profile">
                            <h4>Profile</h4>
                        </Link>
                    :
                        null
                    }
                    <button className='login-button' onClick={handleAuth}>
                        {user?<h4>Logout </h4>:<h4>Sign Up / Login </h4>} <FontAwesomeIcon icon={faUser}/>
                    </button>
                </div>
            </div>
            {/* Mobile (Burger) */}
            <div className="containerNav d-flex d-lg-none">
                <Link to="/">
                    <img src="https://69364-fyp-system.s3.ap-southeast-1.amazonaws.com/blackLogo.png" alt="Main Logo"/>
                </Link>
                <button className='burger-icon' onClick={handleBurger}>
                    <FontAwesomeIcon icon={faBars}/>
                </button>
            </div>
            <div className={isNavOpen?"mobileNavShow d-lg-none":"mobileNavHide d-lg-none"}>
                {/* <Link to="/">
                    <h4>Home</h4>
                </Link>
                <Link to="/ContactUs">
                    <h4>Contact</h4>
                </Link>
                <Link to="/BookNow">
                    <h4>Book Now</h4>
                </Link> */}
                <Link to="/">
                    <h4>Home</h4>
                </Link>
                <Link to="/ContactUs">
                    <h4>Contact</h4>
                </Link>
                <Link to="/BookNow">
                    <h4>Book Now</h4>
                </Link>
                {user?    
                    <Link to="/Profile">
                        <h4>Profile</h4>
                    </Link>
                :
                    null
                }
                <button className='login-button' onClick={handleAuth}>
                    {user?<h4>Logout </h4>:<h4>Sign Up / Login </h4>} <FontAwesomeIcon icon={faUser}/>
                </button>
            </div>
            <div className="coverpage">
            <img src="https://69364-fyp-system.s3.ap-southeast-1.amazonaws.com/coveerpage.png.jpg" alt="coverpage"/>
            </div>
        </header>
    )
}

export default Navbar