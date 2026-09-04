import { db } from "./firebase";
import { collection, where, deleteDoc, onSnapshot, query, doc, updateDoc } from "firebase/firestore";
import { useState, useContext, useEffect } from "react";
import { TokenO } from "../tokenResponse";
import { data } from "react-router-dom";
import { toT } from "./dif";
import dif from "./dif"
import "../styles/tasks.css"
import { FaEdit, FaTrash } from "react-icons/fa"
import Edit from "../compents/createTask/EditTask"

export default function TasksE({ cats, now }) {
    async function done(task, b) {
        const { id, ...rest } = task;
        const taskRef = doc(db, "tasks", id);
        await updateDoc(taskRef, { ...rest, done: b });
    }
    async function deleteTask(id) {
        const d = prompt("write 'd' to delete")
        if (d !== 'd') return;
        await deleteDoc(doc(db, "tasks", id))
        alert("deleted")
    }
    const { token } = useContext(TokenO)
    const [tasks, setTasks] = useState([])
    const [edit, setEdit] = useState({ task: {}, open: false })
    useEffect(() => {
        const q = query(
            collection(db, "tasks"),
            where("userId", "==", token.localId)
        )

        const unsub = onSnapshot(q, (snap) => {

            let data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            if (cats.length > 0) {
                let filtered = []
                cats.map((cat) => {
                    let f = data.filter(task => task.category === cat)
                    filtered = [...filtered, ...f]
                })
                setTasks(filtered)
            }
            else {
                setTasks(data)
            }

        })
        return () => unsub()
    }, [cats])
    console.log(tasks)
    return (
        <>
            {edit.open && <Edit task1={edit.task} />}
            <button style={{
                position: "fixed",
                top: "10px",
                right: "10px",
                zIndex: "2",
                display: edit.open ? "block" : "none",
                border: "none",
                color:"#fff",
                outline: "none",
                background: "red"
            }} onClick={() => setEdit({ ...edit, open: !edit.open })}>×</button>
            <h5>pending tasks {tasks.filter(task=>!task.done).length}</h5>
            <div className="tasks">
                {tasks.filter(task=>!task.done).length > 0 ? tasks.filter(task=>!task.done).map((task) => (
                    <div className="task" key={task.id}>
                        <span className={`taskName ${task.done && "done"}`} >{task.task}</span>

                        <div className="info">
                            <span className="date">{toT(dif(now, task.date) + 1)}</span>
                            <span className="category">{task.category}</span>
                        </div>

                        <div className="actions">
                            <FaEdit className="editIcon" onClick={() => setEdit({ task: task, open: !edit.open })} />
                            <FaTrash className="deleteIcon" onClick={() => deleteTask(task.id)} />
                            <input type="checkbox" className="doneCheckbox" checked={task.done} onChange={(e) => done(task, e.target.checked)} />
                        </div>
                    </div>
                )) : "no tasks yet in this section"}
            </div>
            <hr />
            <h5>completed tasks {tasks.filter(task=>task.done).length}</h5>
            <div className="tasks">
                {tasks.filter(task=>task.done).length > 0 ? tasks.filter(task=>task.done).map((task) => (
                    <div className="task" key={task.id}>
                        <span className={`taskName ${task.done && "done"}`} >{task.task}</span>

                        <div className="info">
                            <span className="date">{toT(dif(now, task.date) + 1)}</span>
                            <span className="category">{task.category}</span>
                        </div>

                        <div className="actions">
                            <FaEdit className="editIcon" onClick={() => setEdit({ task: task, open: !edit.open })} />
                            <FaTrash className="deleteIcon" onClick={() => deleteTask(task.id)} />
                            <input type="checkbox" className="doneCheckbox" checked={task.done} onChange={(e) => done(task, e.target.checked)} />
                        </div>
                    </div>
                )) : "no tasks yet in this section"}
            </div>
        </>
    )
}