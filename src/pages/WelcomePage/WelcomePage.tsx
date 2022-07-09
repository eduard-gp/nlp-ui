import { Link } from "react-router-dom";

import "./WelcomePage.css";

function WelcomePage() {
    return (
        <div>
            <nav className="welcome-navbar">
                <ul>
                    <li>
                        <Link to="/auth/login" className="nav-login-btn">Login</Link>
                    </li>
                    <li>
                        <Link to="/auth/signup" className="nav-signup-btn">SignUp</Link>
                    </li>
                </ul>
            </nav>
            <section className="welcome-main-container">
                <div className="Welcome-inner-container">
                    Welcome page
                </div>
            </section>
        </div>
    );
}

export default WelcomePage;