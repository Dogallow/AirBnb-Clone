import { createContext, useContext, useRef, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import './Modal.css'

const ModalContext = createContext()

export const useModal = () => useContext(ModalContext)


export function Modal  ({ onClose, children }){
    const modalNode = useModal()

    if (!modalNode) return null
    return createPortal(
        <div id="modal">
            <div id="modal-background" onClick={onClose}>
            </div>
            <div id="modal-content">
                {children}
            </div>
        </div>,
        modalNode
    )
}

 const ModalProvider = (props) => {
    const modalRef = useRef()
    const [value, setValue] = useState()

    useEffect(()=>{
        setValue(modalRef.current)
    },[])

    return (
        <>
            <ModalContext.Provider value={value}>
                {props.children}
            </ModalContext.Provider>
            <div ref={modalRef} />

           
        </>
    )
}






export default ModalProvider
