
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

import { BASE_URL } from "../../config/config";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

import "./NavBar.css";

function NavBar() {
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            const res = await axios({
                method: "post",
                url: `${BASE_URL}/auth/logout`,
                withCredentials: true
            });
            navigate("/auth/login");
        } catch (error: any) {
            console.error(error);
            if (error.response.status === 401) {
                navigate("/auth/login");
            }
        }
    }

    return (
        <div>
            <nav className="main-navbar">
                <ul>
                    <li>
                        <NavLink
                            to="/dashboard/"
                            className={({ isActive }) => isActive ? "main-navbar-link main-navbar-link-active" : "main-navbar-link"}
                        >
                            Chat
                        </NavLink>
                        <NavLink
                            to="/dashboard/personas"
                            className={({ isActive }) => isActive ? "main-navbar-link main-navbar-link-active" : "main-navbar-link"}
                        >
                            Patients
                        </NavLink>
                        <NavLink
                            to="/dashboard/explore"
                            className={({ isActive }) => isActive ? "main-navbar-link main-navbar-link-active" : "main-navbar-link"}
                        >
                            Explore
                        </NavLink>
                    </li>
                    <li className="navbar-rightside">
                        <ThemeToggle />
                        <div className="dropdown-container">
                            <div className="dropdown-btn"><i className="fa-solid fa-user"></i></div>
                            <div className="dropdown-content">
                                <div onClick={handleLogout}>Logout</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default NavBar;