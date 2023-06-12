import { useEffect, useState } from "react"
import { Outlet,useNavigate,useLocation } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faEnvelope,
    faUser,
    faPhone,
    faCircleInfo
} from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from 'react-tooltip'
import { useAuthAPI } from "../hooks/useAuthAPI"
import { toast } from 'react-toastify'
import Skeleton from 'react-loading-skeleton'

const Profile = () => {
    const [ profile, setProfile ] = useState(null)
    const [ profileDraft, setProfileDraft ] = useState(null)
    const pathName = useLocation().pathname
    const [ tabLocation, setTabLocation ] = useState(pathName.includes("Health_Background")?
        "Health_Background":pathName.includes("Treatment_Record")?
            "Treatment_Record":""
        )
    const navigate = useNavigate()
    const { callAPI, isLoading, error, errorData, setErrorData } = useAuthAPI() 
    
    useEffect(()=>{
        const fetchPatientDetails = async () => {
            const userDetails = await callAPI({
                method: "GET",
                apiRoute: `/api/patient/profile`,
                payload: ""
            })

            if (userDetails){
                setProfile(userDetails)
                setProfileDraft(userDetails)
            }
        }
        fetchPatientDetails()
    },[callAPI])
    
    const changeTabLocation = (destination) => {
        setTabLocation(destination)
        navigate(`/Profile/${destination}`)
    }

    const resetDraft = () => {
        setProfileDraft(profile)
        setErrorData(null)
    }

    const updateProfile = async () => {
        // const toastUpdate = toast.loading("Updating profile...",{
        //     position: "bottom-right",
        // })

        const userUpdate = await callAPI({
            method: "PATCH",
            apiRoute: `/api/patient/update`,
            payload: profileDraft
        })

        if (userUpdate) {
            setProfile(userUpdate)
            setProfileDraft(userUpdate)
            // toast.update(toastUpdate, {
            //     render: "Profile updated successfully!", 
            //     type: "success", 
            //     isLoading: false,
            //     autoClose: 5000,
            //     closeButton: true,
            // })
            toast.success("Profile updated successfully!", {
                position: "top-center",
            })
        }
    }

    return(
        <div>
            { profile ?
                <div>
                    <div className="cover-title-primary flex-row">
                        <img src="https://picsum.photos/200/300" alt="profilePic" className="profile-picture"/>
                        <div className="profile-details">
                            <h3><FontAwesomeIcon icon={faUser}/> {profile.patientName?profile.patientName:"Set Name"}</h3>
                            <p><FontAwesomeIcon icon={faEnvelope}/> {profile.patientEmail?profile.patientEmail:"Set Email"}</p>
                            <p><FontAwesomeIcon icon={faPhone}/> {profile.patientPhone?profile.patientPhone:"Set Phone Number"}</p>
                            <div className="row">
                                {/* account status */}
                                {profile.patientStatus === "Active"?
                                    <div className="status-success col">
                                        <p>Active</p>
                                    </div>   
                                :
                                    <div 
                                        className="status-error col"
                                        data-tooltip-id="ineligible-tooltip"
                                        data-tooltip-content={"Account is deactivated, please contact admin"}
                                    >
                                        <p>Inactive <FontAwesomeIcon icon={faCircleInfo}/></p>
                                    </div>
                                }
                                {/* account eligible */}
                                {profile.patientEligible?
                                    <div className="status-success col">
                                        <p>Eligible</p>
                                    </div>   
                                :
                                    <div 
                                        className="status-error col" 
                                        data-tooltip-id="ineligible-tooltip"
                                        data-tooltip-content={"Account's demography details need to be completed."}
                                    >
                                        <p>Ineligible <FontAwesomeIcon icon={faCircleInfo}/></p>
                                    </div>
                                }
                            </div>
                            
                        </div>
                    </div>
                    <div className="main-content-profile">
                        <div className="tab-navigator">
                            <div className="tab-navigator-header">
                                <button 
                                    onClick={()=>changeTabLocation("")}
                                    className={tabLocation===""?"tab-navigator-button-focus":"tab-navigator-button"}
                                >
                                    <h3>Demography</h3>
                                </button>
                                <button 
                                    onClick={()=>changeTabLocation("Health_Background")}
                                    className={tabLocation==="Health_Background"?"tab-navigator-button-focus":"tab-navigator-button"}
                                >
                                    <h3>Health Background</h3>
                                </button>
                                <button 
                                    onClick={()=>changeTabLocation("Treatment_Record")}
                                    className={tabLocation==="Treatment_Record"?"tab-navigator-button-focus":"tab-navigator-button"}
                                >
                                    <h3>Treatment Record</h3>
                                </button>
                            </div>
                            <div className="tab-navigator-body">
                                <Outlet context={[profileDraft, setProfileDraft, errorData]}/>
                            </div>
                        </div>
                    </div>
                    { JSON.stringify(profile) !== JSON.stringify(profileDraft) ?
                        <div className="bottom-confirm-bar">
                            <h4>Profile changed *Draft*</h4>
                            <div className="bottom-confirm-button">
                                { !isLoading ?
                                    <div>
                                        <button 
                                            className="button-error"
                                            onClick={resetDraft}
                                        >
                                            <h5>Reset</h5>
                                        </button>
                                        <button 
                                            className="button-success"
                                            onClick={updateProfile}
                                        >
                                            <h5>Update</h5>
                                        </button>
                                    </div>      
                                    :
                                    <div>
                                        <h5>Loading...</h5>
                                    </div>
                                }
                                
                            </div>
                        </div>
                    : 
                        null 
                    }
                </div>
            :
                <div>
                    <div className="cover-title-primary flex-row">
                        <Skeleton 
                            className="profile-picture" 
                            width="250px" 
                            height="275px" 
                            borderRadius="20px"
                        />
                        <div className="profile-details skeleton-flex">
                            <h3><Skeleton width="200px"/></h3>
                            <p><Skeleton width="200px"/></p>
                            <p><Skeleton width="200px"/></p>
                        </div>
                    </div>
                    <div className="main-content-profile">
                        <Skeleton 
                            width= "100%" 
                            height= "653px" 
                            borderRadius="20px"
                        />
                    </div>
                    <br/>
                </div>
            }
            <Tooltip id="ineligible-tooltip"/>
        </div>
    )
}

export default Profile