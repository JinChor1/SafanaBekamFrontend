import { AuthModalContext } from "../context/AuthModalContext"
import { useContext } from "react"

export const useAuthModalContext = () => {
    const context = useContext(AuthModalContext)

    if (!context) {
        throw Error("useAuthModalContext must be used inside AuthModalContextProvider")
    }

    return context
}