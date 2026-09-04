import Nav from "./coms/nav/Nav";
import { Route, Routes } from "react-router-dom";
import Regester from "./pages/Regester"
import ReactRoutes from "./ReactRoutes";
import "./App.css"
export default function App() {
  return (
    <main>
      <Nav/>
      <section>
        <ReactRoutes />
      </section>
    </main>
  )
}