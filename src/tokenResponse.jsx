import { createContext, useState } from "react";
export const TokenO = createContext()
export default function TokenR({children}){
    const LToken = JSON.parse(localStorage.getItem("Otoken")) ||{}
    const [token, setToken] = useState(LToken)

    return(
        <TokenO.Provider value={{token,setToken}}>
           {children}
        </TokenO.Provider>
    )
}