import { useAuthContext } from "./useAuthContext"
import { useBookContext } from "./useBookContext"
import { toast } from 'react-toastify';

export const useLogOut = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: dispatchBook } = useBookContext()

    const logout =  async (req) => {
        // remove from local storage
        localStorage.removeItem('user')
        localStorage.removeItem('booking')
        localStorage.removeItem('toPage')
        localStorage.removeItem('startTime')

        // remove from react context
        dispatch({type:'LOGOUT'})
        dispatchBook({type:'REMOVE_BOOKING'})

        toast.warning("Logged out!", {
            position: "top-center",
        })
    }

    return { logout }
}