import {signInWithEmailAndPassword} from "firebase/auth"
import {auth} from "../api/firebase"
import { useState, useEffect, useContext } from "react"
import { TokenO } from "../tokenResponse"
import "../styles/form.css"

export default function Login() {
    const [user,setUser] = useState({
        email:"",
        password:""
    })
    const [loe,setLoe]= useState({
        load:false,
        e:""
    })
    const {setToken,token}= useContext(TokenO)

    useEffect(() => {
        if(token && token.registered){
            window.location.href="/"
        }
    }, [token])

    const handleSbumit = async (e)=> {
        e.preventDefault();
        if(user.email ===""|| user.password===""){
            alert("please fill all fields")
            return
        }

        setLoe({load:true})
        try {
           const userCredential = await signInWithEmailAndPassword(auth,user.email,user.password)
           console.log(userCredential)
           setToken(userCredential._tokenResponse)
           localStorage.setItem("Otoken",JSON.stringify(userCredential._tokenResponse))
           alert("login success")
           window.location.href="/"
           setLoe({load:false})

        }
        catch(e){
            setLoe({load:false,e:"email or password is wrong"})
        }
    }

    return (
        <main className="f-m">
            <form className="f-f" onSubmit={(e) => handleSbumit(e)} style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px"
            }}>
                <h1>Login</h1>
                <input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} type="email" placeholder="Email" />
                <input value={user.password} onChange={(e) => {
                    setUser({ ...user, password: e.target.value })
                }} type="password" placeholder="Password" />
            
                <label>{loe.load && <h3>loading</h3>}</label>
                <label style={{
                    color: "red",
                    fontSize: "13px"
                }}>{loe.e && <h3>{loe.e}</h3>}</label>
                <button type="submit">Login</button>
            </form>
        </main>
    )
}
