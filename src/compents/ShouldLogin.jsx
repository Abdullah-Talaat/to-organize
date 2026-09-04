import { Link } from "react-router-dom";

export default function Should() {
    return (
        <>
        <h1>please Login first</h1>
        <Link to="/regester">Regester</Link>
        <p>or</p>
        <Link to="/login">Login</Link>
        </>
    )
}