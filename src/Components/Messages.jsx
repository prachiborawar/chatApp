import { useState, useEffect, useContext, useRef } from "react";
import { Chat } from "../Context/ChatContext";


export default function Messages({ id, message }) {

    const { currentUserId } = useContext(Chat)

    const [side, setSide] = useState(false)


    const ref = useRef()
    useEffect(() => {
        ref.current?.scrollIntoView({ behaviour: "smooth" })
    }, [message])

    useEffect(() => {

        if (id === currentUserId) {
            setSide(true)
        } else {
            setSide(false)
        }

    }, [currentUserId])

    return (
        <div ref={ref}>
            {(side)
                ?
                <>
                    <div className="w-full h-auto my-3 ">
                        <div className="max-w-[30vw] max-h-[80vh] overflow-hidden bg-[#3930d8] inline-block text-white p-3 px-6 rounded-3xl float-right mr-4">
                            <div  className="break-words text-justify text-md">
                                {message}
                            </div>
                        </div>
                        <div className="clear-both"></div>
                    </div>
                </>
                :
                <>
                    <div className="w-full h-auto my-3">
                        <div className="max-w-[30vw] max-h-[80vh] overflow-hidden bg-[#ebf4fb] inline-block text-black p-3 px-6 rounded-3xl ml-4">
                            <div className=" break-words text-justify text-md">
                                {message}
                            </div>
                        </div>
                    </div>
                </>}
        </div>
    )

}