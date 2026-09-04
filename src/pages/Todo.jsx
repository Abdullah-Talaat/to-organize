import { useContext } from "react"
import { TokenO } from "../tokenResponse"
import { useState } from "react"
import Should from "../compents/ShouldLogin"
import CreateTask, { categories } from "../compents/createTask/CreateTask"
import "../styles/todo.css"
import { FaEdit, FaTrash } from "react-icons/fa"

import TasksE from "../api/getMyTasks"
export default function ToDo() {
  const daten = new Date
    let dateNow = `${daten.getFullYear()}-${String(daten.getMonth()+1).padStart(2,"0")}-${String(daten.getDay()).padStart(2,"0")}`
    


  const { token } = useContext(TokenO)
  const [openC, setOpenC] = useState(false)
  const [category, setCategory] = useState([])
  return token.registered ? (
    <div className="main">
      <div>{openC && <CreateTask />}</div>
      <h1>to-do list</h1>
      <button className="createTask" onClick={() => setOpenC(!openC)}>add task</button>
      <button style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        zIndex: "2",
        display: openC ? "block" : "none",
        border: "none",
        color:"#fff",
        outline: "none",
        background: "red"
      }} onClick={() => setOpenC(!openC)}>×</button>
      <div className="categories">
        {categories.map((cat, i) => (<button key={i} onClick={() => !category.includes(cat) ? setCategory([...category, cat]) : setCategory(category.filter((c) => c !== cat))}
          style={{
            background: category.includes(cat) ? "#2563eb" : "#f0f0f0",
            color: category.includes(cat) ? "white" : "black",
          }} >{cat}</button>))}
      </div>
      <TasksE cats={category} now={dateNow}></TasksE>
    </div>
  ) : <Should />
}