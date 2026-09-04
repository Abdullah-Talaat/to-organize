import "./nav.css"
import { NavLink } from "react-router-dom"
import { useState, useEffect, useContext } from "react";
import { TokenO } from "../../tokenResponse";
import { signOut } from "firebase/auth"
import { auth } from "../../api/firebase"
export default function Nav() {
    const { token, setToken } = useContext(TokenO)
    const routes = token.registered ? [
        {
            to: "/",
            name: "Home"
        },
        {
            to: "/habits",
            name: "Habits"
        },
        {
            to: "/prayes",
            name: "Prayes"
        },
        {
            to: "/profile",
            name: "Profile"
        },
        {
            to: "/todo",
            name: "To-do list"
        }
    ] : [
        {
            to: "/",
            name: "Home"
        },
        {
            to: "/regester",
            name: "Regester"
        },
        {
            to: "/login",
            name: "Login"
        },
        {
            to: "/habits",
            name: "Habits"
        },
        {
            to: "/prayes",
            name: "Prayes"
        },
        {
            to: "/profile",
            name: "Profile"
        },
        {
            to: "/todo",
            name: "To-do list"
        }
    ]

    const logout = async () => {
        const d = prompt("write 'out' to sign out")
        if (d !== 'out') return;
        try {
            await signOut(auth)
            setToken({})
            localStorage.removeItem("Otoken")
            alert("sign out")
            window.location.href = "/login"
        }
        catch (e) {
            console.log(e.code)
        }
    }


    const [isOpen, setIsOpen] = useState(true);

    // إغلاق تلقائي في الشاشات الصغيرة
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsOpen(false);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
        
        <nav className={isOpen ? "sidebar open" : "sidebar"}>

            <div className="top">
                <h2 className="logo">{isOpen && "ToOrganize"}</h2>

                    </div>

            <ul className="menu">
                {routes.map((route, index) => (
                    <li key={index}>
                        <NavLink
                            to={route.to}
                            className={({ isActive }) =>
                                isActive ? "link active" : "link"
                            }
                        >
                            {isOpen ? route.name : route.name.charAt(0)}
                        </NavLink>
                    </li>
                ))}
                {token.registered && <li onClick={logout} className="logout">sign out</li>}
            </ul>

        </nav>
        <button
                    className="toggle-btn"
                    style={{color:"black"}}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {"->"}
                </button>
        </>
    );
}