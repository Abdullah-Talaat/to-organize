import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Regester from "./pages/Regester"
import Login from "./pages/Login"
import Habits from "./pages/Habits"
import Prayes from "./pages/Prayes"
import Profile from "./pages/Profile"
import ToDo from "./pages/Todo"
export default function ReactRoutes(){
  return (
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/regester" element={<Regester/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/habits"element={<Habits/>}/>
            <Route path="/prayes" element={<Prayes/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/todo" element={<ToDo/>}/>
       </Routes>
    )
}