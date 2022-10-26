import { useState } from "react";
import { createContext } from "react";

export const Context = createContext();

export default function MyContext(props){

    const [ adminId , setAdminId ] = useState(null)
    const [ adminName , setAdminName ] = useState(null)

    function getUserId(id , name){
        setAdminId(id)
        setAdminName(name)
    }
    
    return(
        <Context.Provider value={{getUserId , adminId , adminName}}>
            {props.children}
        </Context.Provider>
    )
}