import "./createTask.css"
import { useState, useContext } from "react"
import { TokenO } from "../../tokenResponse"
import { db } from "../../api/firebase"
import { collection, addDoc } from "firebase/firestore"
import { FaEdit, FaTrash, FaCalendarAlt, FaTasks, FaLayerGroup, FaPlus } from "react-icons/fa";
import dif from "../../api/dif"
export const categories = ["work", "personal", "study", "shopping", "other"]
export default function CreateTask() {


    
    const { token } = useContext(TokenO)
    const daten = new Date
    let dateNow = `${daten.getFullYear()}-${String(daten.getMonth()+1).padStart(2,"0")}-${String(daten.getDay()+1).padStart(2,"0")}`
    const [task, setTask] = useState({
        date:"" ,
        task: "",
        userId: token.localId,
        done:false,
        category: "other"
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(task)
        if (task.task == "") {
            alert("please fill task field")
            return
        }
        if (token.localId == "") {
            alert("login")
            window.location.href = "/"
        }

        try {
            let task1 = { ...task }
            if(task1.date==""|| dif(task1.date,dateNow,"-")<0){
                task1.date= dateNow
            }

            const add = await addDoc(collection(db, "tasks"), task1)
            setTask({
                ...task,
                task: "",
                userId: token.localId,
            })
            alert("added")
        }
        catch (e) {
            console.log(e)
        }
    }
    return (
        <div className="con">
          <div className="card">
            <form onSubmit={(e) => handleSubmit(e)} className="task-form">
              <div className="input-group">
                <FaCalendarAlt className="icon" />
                <input
                  value={task.date}
                  onChange={(e) => setTask({ ...task, date: e.target.value })}
                  type="date"
                  placeholder="Date"
                  className="input-field"
                />
              </div>
        
              <div className="input-group">
                <FaTasks className="icon" />
                <input
                  value={task.task}
                  onChange={(e) => setTask({ ...task, task: e.target.value })}
                  placeholder="Task"
                  className="input-field"
                />
              </div>
        
              <div className="input-group">
                <FaLayerGroup className="icon" />
                <select
                  onChange={(e) => setTask({ ...task, category: e.target.value })}
                  defaultValue={task.category}
                  className="input-field"
                >
                  <option value="other">Choose Category</option>
                  {categories.map((el, i) => (
                    <option value={el} key={i}>
                      {el}
                    </option>
                  ))}
                </select>
              </div>
        
              <button type="submit" className="submit-btn">
                <FaPlus className="btn-icon" /> Add
              </button>
            </form>
          </div>
        </div>    )
}