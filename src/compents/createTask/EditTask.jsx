import { FaCalendarAlt, FaTasks, FaLayerGroup, FaEdit } from "react-icons/fa";
import {categories} from "./CreateTask"
import {db}from "../../api/firebase"
import {doc, updateDoc} from "firebase/firestore"
import { useState } from "react";
export default function Edit({task1}){
    const [task,setTask]= useState({...task1})
    const handleEdit = async(e)=>{
        e.preventDefault()
        if((task.task==task1.task&&task.date==task1.date&&task.category==task1.category)||task.task==""){
            alert("please edit task")
            return
        }
        try {
          await updateDoc(doc(db,"tasks",task1.id),task)
          alert("updated!")
        }
        catch(e){
            console.log(e)
        }
    }
    return (<div className="con">
    <div className="card">
      <form onSubmit={(e) => handleEdit(e)} className="task-form">
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
            value={task.category}
            onChange={(e) => setTask({ ...task, category: e.target.value })}
            className="input-field"
          >
            <option value="other">Choose Category</option>
            {categories.map((el, i) => (
              <option value={el} key={i} selected={task.category==el}>
                {el}
              </option>
            ))}
          </select>
        </div>
  
        <button type="submit" className="submit-btn">
          <FaEdit className="btn-icon" /> Edit
        </button>
      </form>
    </div>
  </div>)
}