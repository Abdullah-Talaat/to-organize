import { useContext} from "react"
import {TokenO}from "../tokenResponse"
import Should from "../compents/ShouldLogin"

export default function Home(){
    const {token}= useContext(TokenO)



    console.log(token)
    return token.registered? (
        <h1>home</h1>
    ):<Should/>
}