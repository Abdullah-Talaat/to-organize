import { createUserWithEmailAndPassword, validatePassword, getAuth } from "firebase/auth"
import { auth, app } from "../api/firebase"
import { useState,useContext, useEffect } from "react"
import { TokenO } from "../tokenResponse"
import "../styles/form.css"
export default function Regester() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const {setToken,token}= useContext(TokenO)
    useEffect(() => {
        if(token && token.registered){
            window.location.href="/"
        }
    }, [token])
    const [vaild, setValid] = useState(false)
    
    const [loe, setLoe] = useState({
        load: false,
        e: ""
    })
    const checkPaaword = async (password) => {
        const status = await validatePassword(getAuth(app), password);
        setValid(status.isValid)
        
    }
    const handleSbumit = async (e) => {
        e.preventDefault();
        checkPaaword(user.password)
        if(user.email ==="" || vaild==false){
            alert("please fill all fields")
            return
        }


            setLoe({ load: true })
            try {
                const userCredential = await createUserWithEmailAndPassword(auth,user.email, user.password)
                setToken(userCredential._tokenResponse)
                localStorage.setItem("Otoken",JSON.stringify(userCredential._tokenResponse))
                alert("regester success")
                window.location.href="/"
                console.log(userCredential)
                setLoe({ load: false})
            }
            catch (e) {
                console.log(e.code)
                setLoe({ load: false, e: e.code })
            }
        }
    return (
        <main className="f-m">

            <form className="f-f" onSubmit={(e) => handleSbumit(e)} style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px"
            }}>
                <h1>Regster</h1>
                <input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} type="email" placeholder="Email" />
                <input value={user.password} onChange={(e) => {
                    setUser({ ...user, password: e.target.value })
                    checkPaaword(e.target.value)
                }} type="password" placeholder="Password"
                    className={!vaild&&"input-e"}
                />
                <label style={{
                    color: "red",
                    fontSize: "13px"
                }} htmlFor="password">{!vaild && "password must be strong"}</label>
                <label>{loe.load && <h3>loading</h3>}</label>
                <label style={{
                    color: "red",
                    fontSize: "13px"
                }}>{loe.e && <h3>error {loe.e.split("/")[1]}</h3>}</label>
                <button type="submit">regester</button>
            </form>
        </main>
    )
}