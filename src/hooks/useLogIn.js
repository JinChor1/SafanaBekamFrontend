import { useState } from "react";
import { useAuthContext } from "./useAuthContext"
import { toast } from 'react-toastify';

export const useLogIn = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login =  async (req,closeModal) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('https://safanabekam-backend.onrender.com/api/patient/login', {
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
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type:'LOGIN', payload: json})
            setIsLoading(false)
            toast.success("Login successful!", {
                position: "top-center",
            })
            closeModal()
        }
    }

    return { login, isLoading, error }
}