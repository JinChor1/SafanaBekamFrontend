import { useState } from "react";
import { useAuthContext } from "./useAuthContext"
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"

export const useSignUp = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const navigate = useNavigate()
    
    const signup =  async (req, closeModal) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/patient/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(req)
        })
        const json = await response.json()

        if (!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok){

            // *** (updated 11 june for email confirmation) ***
            // // save the user to local storage
            // localStorage.setItem('user', JSON.stringify(json))
            // dispatch({type:'LOGIN', payload: json})

            setIsLoading(false)
            navigate(`/Confirm/EmailAddress:${json.patientEmail}`)
            closeModal()
        }
    }

    return { signup, isLoading, error }
}