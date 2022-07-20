import { Link } from "react-router-dom";
import { ThemeToggle } from "../../components";

import "./WelcomePage.css";

function WelcomePage() {
    return (
        <div>
            <nav className="welcome-navbar">
                <ul>
                    <li className="toggle-container">
                        <ThemeToggle />
                    </li>
                    <li>
                        <Link to="/auth/login" className="nav-login-btn">Login</Link>
                    </li>
                    <li>
                        <Link to="/auth/signup" className="nav-signup-btn">SignUp</Link>
                    </li>
                </ul>
            </nav>
            <section className="welcome-main-container">
                <div className="welcome-inner-container">
                    <h1>MedChat</h1>
                    <p>
                        An online environment where medical students can talk with a virtual patient in order to develop interpersonal skills in a safe and professional manner.
                    </p>
                    <div className="icons-container">
                        <i className="fa-solid fa-user-doctor"></i>
                        <i className="fa-solid fa-comment-medical"></i>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default WelcomePage;