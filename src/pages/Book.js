import { useNavigate,Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import { useBookContext } from "../hooks/useBookContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { toast } from 'react-toastify';
import { useAuthModalContext } from "../hooks/useAuthModalContext"

const Book = () => {
    const navigate = useNavigate()
    const [ tabLocation, setTabLocation ] = useState("ServiceDetails")
    const { booking, dispatch } = useBookContext()
    const { user,loading } = useAuthContext()
    const { openModal } = useAuthModalContext()

    useEffect(()=>{
        if (user===null && loading===false){
            toast.warning("Please log in and sign up first", {
                position: "top-center",
            })
            openModal()
            navigate('/',{replace: true})
        }

        if (booking && booking.toPage) {
            navigate(`/BookNow/${booking.toPage}`)
            setTabLocation(booking.toPage)
        } else {
            navigate("/BookNow/ServiceDetails")
            setTabLocation("ServiceDetails")
        }
        
    },[navigate,booking,user,loading])

    const changeTabLocation = (destination) => {
        dispatch({type:'UPDATE_BOOKING', payload: {toPage: destination}})
        localStorage.setItem('toPage', JSON.stringify({toPage: destination}))
    }

    return(
        <div>
            <div className="cover-title flex-column">
                <h1 className="flex-row-center">BOOK NOW</h1>
            </div>
            <div className="main-content">
                <div className="row book-navigator">
                    <button
                        disabled={tabLocation==="ServiceDetails"?true:false}
                        className={tabLocation==="ServiceDetails"?"book-navigator-header-focus col-3":"book-navigator-header col-3"}
                        onClick={()=>changeTabLocation("ServiceDetails")}
                    >
                        <h4>Service</h4>
                    </button>
                    <button 
                        disabled={tabLocation==="ServiceDetails"?true:false}
                        className={tabLocation==="TimeSlot"?"book-navigator-header-focus col-3":"book-navigator-header col-3"}
                        onClick={()=>changeTabLocation("TimeSlot")}
                    >
                        <h4>Date & Time</h4>
                    </button>
                    <button 
                        disabled={tabLocation==="TimeSlot" || tabLocation==="ServiceDetails"?true:false}
                        className={tabLocation==="Summary"?"book-navigator-header-focus col-3":"book-navigator-header col-3"}
                        onClick={()=>changeTabLocation("Summary")}
                    >
                        <h4>Summary</h4>
                    </button>
                </div>
                <Outlet context={[changeTabLocation]}/>
            </div>
        </div>
    )
}

export default Book