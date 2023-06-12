import { useCallback, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext"
import { useLogOut } from '../hooks/useLogOut'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useAuthModalContext } from "../hooks/useAuthModalContext"


export const useAuthAPI = () => {
    const [error, setError] = useState(null)
    const [errorData, setErrorData] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { user,loading } = useAuthContext()
    const { logout } = useLogOut()
    const navigate = useNavigate()
    const { openModal } = useAuthModalContext()

    const callAPI =  useCallback(async (req) => {
        if (user===null && loading===false){
            toast.warning("Please log in and sign up first", {
                position: "top-center",
            })
            openModal()
            navigate("/")
            return null
        }

        setIsLoading(true)
        setError(null)
        setErrorData(null)

        // req.method
        // req.apiRoute
        // req.payload
        if (user) {
            const response = await fetch(`https://safanabekam-backend.onrender.com${req.apiRoute}`, {
                method: req.method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: req.method==="GET"?null:JSON.stringify(req.payload)
            })

            const json = await response.json()

            if (response.ok){
                setIsLoading(false)
                return json
            } else {
                // unauthorized
                if (response.status === 401) {
                    toast.error("Authorisation expired. Please log in again.", {
                        position: "top-center",
                    })
                    logout()
                    return null
                }
                setIsLoading(false)
                setError(json.error)
                setErrorData(json.errorData)
                toast.error(json.error, {
                    position: "top-center",
                })
                return null
            }
        }
    },[user,loading])

    return { callAPI, isLoading, error, errorData, setErrorData }
}