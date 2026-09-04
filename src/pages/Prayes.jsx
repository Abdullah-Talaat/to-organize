import { useContext} from "react"
import {TokenO}from "../tokenResponse"

import Should from "../compents/ShouldLogin"


export default function Prayes() {
    const {token}= useContext(TokenO)

    return token.registered? (
        <h1>prayes</h1>
    ):<Should/>
}