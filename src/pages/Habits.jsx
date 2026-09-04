import { useContext, useState} from "react"
import {TokenO}from "../tokenResponse"
import "../styles/habits.css"
import Should from "../compents/ShouldLogin"
import { today } from "../api/dif"
import { collection } from "firebase/firestore"
import { addDoc } from "firebase/firestore"
import {db}from "../api/firebase.js"

export default function Habits() {
    const {token}= useContext(TokenO)

    const [habit,setHabit] = useState({
        name:"",
        days:90,
        userId:token.id,
        date:today,
        resson:""
    })
    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(habit.name ==""||habit.days==null||habit.days<7){
            alert('please fill fields correctly')
            return
        }
        let allDays =[]
        for(let i = 1;i<=habit.days;i++){
            allDays.push({
                done:false,
                day:i,
                note:""
            })
        }
       const habitData = {
            ...habit,
            allDays:allDays,

        }
     try{
        const add = await addDoc(collection(db,"habits"),
        habitData )
        setHabit({
            name:"",
            days:90,
            userId:token.id,
            date:today,
            resson:""
        })
     }catch(err){
        console.log(err)
     }
    

    }
    return token.registered? (
        <main className="h-m">
            <h1>habits</h1>
            <form className="h-f" onSubmit={handleSubmit}>
                <h2>bulid habit</h2>
                <input 
                value={habit.name}
                onChange={(e)=>setHabit({...habit,name:e.target.value})}
                type="text" placeholder="habit name"></input>
                <input type="text" placeholder="resson (optional)"
                value={habit.resson}
                onChange={(e)=>setHabit({...habit,resson:e.target.value})}
                />
                
                <input 
                value={habit.days}
                onChange={(e)=>setHabit({...habit,days:e.target.value})}
                type="number" placeholder="days"/>
                <button type="submit">submit</button>
            </form>
        </main>
    ):<Should/>
}