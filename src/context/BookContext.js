import { createContext, useEffect, useReducer } from "react"

export const BookContext = createContext()

export const bookContextReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_BOOKING': 
            return {
                booking: action.payload
            }
        case 'UPDATE_BOOKING': 
            return {
                booking: {...state.booking, ...action.payload}
            }
        case 'REMOVE_BOOKING': 
            return {
                booking: null
            }
        default:
            return state
    }
}

export const BookContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(bookContextReducer, {
        booking: null // initial value
    })
    
    useEffect(()=>{
        const booking = JSON.parse(localStorage.getItem('booking'))
        const toPage = JSON.parse(localStorage.getItem('toPage'))
        const startTime = JSON.parse(localStorage.getItem('startTime'))

        if (booking){
            dispatch({ type: 'ADD_BOOKING', payload: booking })
        }
        if (toPage){
            dispatch({ type: 'UPDATE_BOOKING', payload: toPage })
        }
        if (startTime){
            dispatch({ type: 'UPDATE_BOOKING', payload: startTime })
        }
    },[])

    // dispatch({type: 'SET_TEST', payload: [{},{}]}) <-- action
    console.log('bookcontext: ', state)

    return(
        <BookContext.Provider value={{...state,dispatch}}>
            { children }
        </BookContext.Provider>
    )
}
