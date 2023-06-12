import { useOutletContext } from "react-router-dom"
import HealthCheckbox from "./HealthCheckbox"

const HealthBg = () => {
    const [ profile, setProfile ] = useOutletContext()

    return(
        <div className="">
            <form className="profile-form auth-form row">
                {profile && Object.keys(profile.healthBackground).map((disease) => (
                    <div key={disease} className="disease-container col-md-5">
                        <h4>{profile.healthBackground[disease].displayName}:</h4>
                        <HealthCheckbox statePassed={[ profile, setProfile ]} diseaseField={disease}/>
                    </div>
                ))}
                
                
                {/* <button className="button-pill-primary" disabled={isLoading}><p>Sign Up</p></button>
                {error && <div className="error">{error}</div> }
                {error && <div className="error">{error}</div>} */}
            </form>
        </div>
        
    )
}

export default HealthBg