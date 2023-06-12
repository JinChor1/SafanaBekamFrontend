import { useOutletContext } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faEnvelope,
    faUser,
    faIdCard,
    faVenusMars,
    faPeopleGroup,
    faUserDoctor,
    faPhone,
    faHome,
    faMailBulk,
    faRoute,
    faWarning
} from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from 'react-tooltip'

const Demography = () => {
    const [ profile, setProfile, errorData ] = useOutletContext()

    return(
        <div className="">
            { profile ?
                <form className="profile-form auth-form row" onSubmit={null}>
                    <div className="col-md-5">
                        <label>
                            <FontAwesomeIcon icon={faEnvelope}/> Email Address:
                            {errorData && errorData.includes("patientEmail")?
                                <span 
                                    className="error-text"
                                    data-tooltip-id="warning-tooltip"
                                    data-tooltip-content={"Email address is invalid. Please make sure the format is correct."}
                                > 
                                    <FontAwesomeIcon icon={faWarning} />
                                </span>
                            :
                                null
                            }
                        </label>
                        <p className="error-input">{errorData && errorData.includes("patientEmail")?"Email address is invalid. Please make sure the format is correct.":""}</p>
                        <input 
                            type="email"
                            className={errorData && errorData.includes("patientEmail")?"invalid-input":""}
                            onChange={(e) => setProfile({...profile, patientEmail: e.target.value})}
                            value={profile.patientEmail}
                            placeholder="email@address.com"
                        />
                    </div>
                    <div className="col-md-5">
                        <label>
                            <FontAwesomeIcon icon={faUser}/> Full Name: 
                            {profile.ineligibleField.includes("patientName")?
                                <span 
                                    className="warning-text"
                                    data-tooltip-id="warning-tooltip"
                                    data-tooltip-content={"Full name is required for booking"}
                                > 
                                    <FontAwesomeIcon icon={faWarning} />
                                </span>
                            :
                                null
                            }
                        </label>
                        <input 
                            type="text"
                            onChange={(e) => setProfile({...profile, patientName: e.target.value})}
                            value={profile.patientName?profile.patientName:""}
                            placeholder="Full Name"
                        />
                    </div>

                    <div className="col-md-5">
                        <label>
                            <FontAwesomeIcon icon={faIdCard}/> No MyKad:
                            {errorData && errorData.includes("patientNoMyKad")?
                                <span 
                                    className="error-text"
                                    data-tooltip-id="warning-tooltip"
                                    data-tooltip-content={"NoMyKad is invalid. Please make sure the format is either in 990101-99-1010 or 990101991010."}
                                > 
                                    <FontAwesomeIcon icon={faWarning} />
                                </span>
                            :
                                null
                            }
                            {profile.ineligibleField.includes("patientNoMyKad")?
                                <span 
                                    className="warning-text"
                                    data-tooltip-id="warning-tooltip"
                                    data-tooltip-content={"NoMyKad is required for booking"}
                                > 
                                    <FontAwesomeIcon icon={faWarning} />
                                </span>
                            :
                                null
                            }
                        </label>
                        <p className="error-input">{errorData && errorData.includes("patientNoMyKad")?"NoMyKad is invalid. Please make sure the format is either in 990101-99-1010 or 990101991010.":""}</p>
                        <input 
                            type="text"
                            className={errorData && errorData.includes("patientNoMyKad")?"invalid-input":""}
                            onChange={(e) => setProfile({...profile, patientNoMyKad: e.target.value})}
                            value={profile.patientNoMyKad?profile.patientNoMyKad:""}
                            placeholder="990101-99-1010 or 990101991010"
                        />
                    </div>

                    <div className="col-md-5">
                        <label>
                            <FontAwesomeIcon icon={faVenusMars}/> Sex:
                            {errorData && errorData.includes("patientGender")?
                                <span 
                                    className="error-text"
                                    data-tooltip-id="warning-tooltip"
                                    data-tooltip-content={"Sex is invalid. Please select from the menu."}
                                > 
                                    <FontAwesomeIcon icon={faWarning} />
                                </span>
                            :
                                null
                            }
                            {profile.ineligibleField.includes("patientGender")?
                                <span 
                                    className="warning-text"
                                    data-tooltip-id="warning-tooltip"
                                    data-tooltip-content={"Sex/Gender is required for booking"}
                                > 
                                    <FontAwesomeIcon icon={faWarning} />
                                </span>
                            :
                                null
                            }
                        </label>
                        <p className="error-input">{errorData && errorData.includes("patientGender")?"Sex is invalid. Please select from the menu.":""}</p>
                        <div className="gender-radio-div">
                            <label className="gender-radio male col-5">
                                <input
                                    type="radio"
                                    checked={profile.patientGender?profile.patientGender==="Male":""}
                                    onChange={(e) => setProfile({...profile, patientGender: e.target.value})}
                                    value="Male"
                                />
                                    Male
                            </label>

                            <label className="gender-radio female col-5">
                                <input 
                                    type="radio"
                                    checked={profile.patientGender?profile.patientGender==="Female":""}
                                    onChange={(e) => setProfile({...profile, patientGender: e.target.value})}
                                    value="Female"
                                />
                                    Female
                            </label>
                        </div>
                    </div>

                    <div className="col-md-5">
                        <label>
                            <FontAwesomeIcon icon={faPeopleGroup}/> Race / Ethnicity:
                            {errorData && errorData.includes("patientRace")?
                                <span 
                                    className="error-text"
                                    data-tooltip-id="warning-tooltip"
                                    data-tooltip-content={"Race is invalid. Please select from the menu."}
                                > 
                                    <FontAwesomeIcon icon={faWarning} />
                                </span>
                            :
                                null
                            }
                            {profile.ineligibleField.includes("patientRace")?
                                <span 
                                    className="warning-text"
                                    data-tooltip-id="warning-tooltip"
                                    data-tooltip-content={"Race/ethnicity is required for booking"}
                                > 
                                    <FontAwesomeIcon icon={faWarning} />
                                </span>
                            :
                                null
                            }
                        </label>
                        <p className="error-input">{errorData && errorData.includes("patientRace")?"Race is invalid. Please select from the menu.":""}</p>
                        <select
                            className={errorData && errorData.includes("patientRace")?"invalid-input":""}
                            onChange={(e) => setProfile({...profile, patientRace: e.target.value})}
                            value={profile.patientRace?profile.patientRace:""}
                        >
                            <option value="" disabled>Select ethnicity...</option>
                            <option value="Malay">Malay</option>
                            <option value="Kadazan Dusun">Kadazan Dusun</option>
                            <option value="Bajau">Bajau</option>
                            <option value="Murut">Murut</option>
                            <option value="Iban">Iban</option>
                            <option value="Bidayuh">Bidayuh</option>
                            <option value="Melanau">Melanau</option>
                            <option value="Other Bumiputera">Other Bumiputera</option>
                            <option value="Chinese">Chinese</option>
                            <option value="Indian">Indian</option>
                            <option value="Other Malaysian Citizen">Other Malaysian Citizen</option>
                        </select>
                    </div>

                    <div className="col-md-5">
                        <label>
                            <FontAwesomeIcon icon={faUserDoctor}/> Occupation:
                            {errorData && errorData.includes("patientOccupation")?
                                <span 
                                    className="error-text"
                                    data-tooltip-id="warning-tooltip"
                                    data-tooltip-content={"Occupation is invalid. Please select from the menu."}
                                > 
                                    <FontAwesomeIcon icon={faWarning} />
                                </span>
                            :
                                null
                            }
                            {profile.ineligibleField.includes("patientOccupation")?
                                <span 
                                    className="warning-text"
                                    data-tooltip-id="warning-tooltip"
                                    data-tooltip-content={"Occupation is required for booking"}
                                > 
                                    <FontAwesomeIcon icon={faWarning} />
                                </span>
                            :
                                null
                            }
                        </label>
                        <p className="error-input">{errorData && errorData.includes("patientOccupation")?"Occupation is invalid. Please select from the menu.":""}</p>
                        <select
                            className={errorData && errorData.includes("patientOccupation")?"invalid-input":""}
                            onChange={(e) => setProfile({...profile, patientOccupation: e.target.value})}
                            value={profile.patientOccupation?profile.patientOccupation:""}
                        >
                            <option value="" disabled>Select occupation...</option>
                            <option value="Agriculture">Agriculture</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Finance">Finance</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Education">Education</option>
                            <option value="Health care">Health care</option>
                            <option value="Information services">Information services</option>
                            <option value="Data processing">Data processing</option>
                            <option value="Food services">Food services</option>
                            <option value="Hotel services">Hotel services</option>
                            <option value="Legal services">Legal services</option>
                            <option value="Publishing">Publishing</option>
                            <option value="Military">Military</option>
                            <option value="Other">Other</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                    </div>

                    <div className="col-md-5">
                        <label>
                            <FontAwesomeIcon icon={faPhone}/> Phone:
                            {errorData && errorData.includes("patientPhone")?
                                <span 
                                    className="error-text"
                                    data-tooltip-id="warning-tooltip"
                                    data-tooltip-content={"Phone number is invalid. Please make sure the format is either in '012345678' or '+6012345678'."}
                                > 
                                    <FontAwesomeIcon icon={faWarning} />
                                </span>
                            :
                                null
                            }
                            {profile.ineligibleField.includes("patientPhone")?
                                <span 
                                    className="warning-text"
                                    data-tooltip-id="warning-tooltip"
                                    data-tooltip-content={"Phone number is required for booking"}
                                > 
                                    <FontAwesomeIcon icon={faWarning} />
                                </span>
                            :
                                null
                            }
                        </label>
                        <p className="error-input">{errorData && errorData.includes("patientPhone")?"Phone number is invalid. Please make sure the format is either in '012345678' or '+6012345678'.":""}</p>
                        <input 
                            type="text"
                            className={errorData && errorData.includes("patientPhone")?"invalid-input":""}
                            onChange={(e) => setProfile({...profile, patientPhone: e.target.value})}
                            value={profile.patientPhone?profile.patientPhone:""}
                            placeholder="0123456789 or +60123456789"
                        />
                    </div>

                    <div className="col-md-5">
                        <label>
                            <FontAwesomeIcon icon={faHome}/> Physical Address:
                            {profile.ineligibleField.includes("patientAddress")?
                                <span 
                                    className="warning-text"
                                    data-tooltip-id="warning-tooltip"
                                    data-tooltip-content={"Physical address is required for booking"}
                                > 
                                    <FontAwesomeIcon icon={faWarning} />
                                </span>
                            :
                                null
                            }
                        </label>
                        <input 
                            type="text"
                            onChange={(e) => setProfile({...profile, patientAddress: e.target.value})}
                            value={profile.patientAddress?profile.patientAddress:""}
                            placeholder="Physical Address"
                        />
                    </div>

                    <div className="col-md-5">
                        <label>
                            <FontAwesomeIcon icon={faMailBulk}/> Postcode:
                            {errorData && errorData.includes("patientPostcode")?
                                <span 
                                    className="error-text"
                                    data-tooltip-id="warning-tooltip"
                                    data-tooltip-content={"Postcode is invalid, please make sure it matches with provided state and formatted as 'XXXXX'."}
                                > 
                                    <FontAwesomeIcon icon={faWarning} />
                                </span>
                            :
                                null
                            }
                            {profile.ineligibleField.includes("patientPostcode")?
                                <span 
                                    className="warning-text"
                                    data-tooltip-id="warning-tooltip"
                                    data-tooltip-content={"Address' postcode is required for booking"}
                                > 
                                    <FontAwesomeIcon icon={faWarning} />
                                </span>
                            :
                                null
                            }
                        </label>
                        <p className="error-input">{errorData && errorData.includes("patientPostcode")?"Postcode is invalid, please make sure it matches with provided state and formatted as 'XXXXX'.":""}</p>
                        <input 
                            type="text"
                            className={errorData && errorData.includes("patientPostcode")?"invalid-input":""}
                            onChange={(e) => setProfile({...profile, patientPostcode: e.target.value})}
                            value={profile.patientPostcode?profile.patientPostcode:""}
                            placeholder="XXXXX"
                        />
                    </div>

                    <div className="col-md-5">
                        <label>
                            <FontAwesomeIcon icon={faRoute}/> State:
                            {errorData && errorData.includes("patientState")?
                                <span 
                                    className="error-text"
                                    data-tooltip-id="warning-tooltip"
                                    data-tooltip-content={"State is invalid. Please select from the menu."}
                                > 
                                    <FontAwesomeIcon icon={faWarning} />
                                </span>
                            :
                                null
                            }
                            {profile.ineligibleField.includes("patientState")?
                                <span 
                                    className="warning-text"
                                    data-tooltip-id="warning-tooltip"
                                    data-tooltip-content={"Address' state is required for booking"}
                                > 
                                    <FontAwesomeIcon icon={faWarning} />
                                </span>
                            :
                                null
                            }
                        </label>
                        <p className="error-input">{errorData && errorData.includes("patientState")?"State is invalid. Please select from the menu.":""}</p>
                        <select
                            className={errorData && errorData.includes("patientState")?"invalid-input":""}
                            onChange={(e) => setProfile({...profile, patientState: e.target.value})}
                            value={profile.patientState?profile.patientState:""}
                        >
                            <option value="" disabled>Select state...</option>
                            <option value="Johor">Johor</option>
                            <option value="Kedah">Kedah</option>
                            <option value="Kelantan">Kelantan</option>
                            <option value="Melaka">Malacca</option>
                            <option value="Negeri Sembilan">Negeri Sembilan</option>
                            <option value="Pahang">Pahang</option>
                            <option value="Perak">Perak</option>
                            <option value="Perlis">Perlis</option>
                            <option value="Sabah">Sabah</option>
                            <option value="Sarawak">Sarawak</option>
                            <option value="Selangor">Selangor</option>
                            <option value="Terengganu">Terengganu</option>
                            <option value="Wp Kuala Lumpur">Kuala Lumpur</option>
                            <option value="Wp Labuan">Labuan</option>
                            <option value="Wp Putrajaya">Putrajaya</option>
                        </select>
                    </div>
                    {/* <button className="button-pill-primary" disabled={isLoading}><p>Sign Up</p></button>
                    {error && <div className="error">{error}</div> }
                    {error && <div className="error">{error}</div>} */}
                </form>
            :
                null
            }

            <Tooltip id="warning-tooltip"/>
        </div>
        
    )
}

export default Demography