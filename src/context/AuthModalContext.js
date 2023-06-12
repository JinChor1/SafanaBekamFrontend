import { createContext, useState } from "react"
import Modal from 'react-modal'
import AuthModalContent from '../components/AuthModalContent'

export const AuthModalContext = createContext()

export const AuthModalContextProvider = ({children}) => {
    const [ modalIsOpen, setModalIsOpen ] = useState(false)

    const openModal = () => {
        setModalIsOpen(true)
    }
    const afterOpenModal = () => {

    }
    const closeModal = () => {
        setModalIsOpen(false)
    }

    return(
        <AuthModalContext.Provider value={{openModal,closeModal}}>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                className="authModal"
                overlayClassName="authOverlay"
                contentLabel="Auth Modal"
                shouldCloseOnOverlayClick={true}
            >
                <AuthModalContent closeModal={closeModal}/>
            </Modal>
            { children }
        </AuthModalContext.Provider>
    )
}
