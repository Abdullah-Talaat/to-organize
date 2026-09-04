import { useContext} from "react"
import {TokenO}from "../tokenResponse"

import Should from "../compents/ShouldLogin"

export default function Profile() {
    const {token}= useContext(TokenO)

    return token.registered? (
        <h1>profile</h1>
    ):<Should/>
}