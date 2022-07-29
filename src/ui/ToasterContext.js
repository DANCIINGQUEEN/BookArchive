import React, {useState} from 'react'
import {Toaster} from "./index";

const ToasterContext = React.createContext({  //초기상태의 context
    toasts: [],
    setToasts: () => {

    }
})

const ToasterProvider = (props) => {

    const [toasts, setToasts] = useState([])

    const addToast = (text) => {
        setToasts((prevToasts) => [text, ...prevToasts])
        //기존에 있던(prev)를 text 에 넣어줌
        setTimeout(() => {
            setToasts((prevToasts) => prevToasts.slice(0, prevToasts.length - 1))
        }, 3000)
    }
    return (
        <ToasterContext.Provider value={{toasts, addToast}}>

            <>
                {props.children}
                <Toaster toasts={toasts}/>
            </>
        </ToasterContext.Provider>

    )

}

export {ToasterProvider, ToasterContext};