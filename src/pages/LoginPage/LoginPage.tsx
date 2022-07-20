import { LoginForm } from "../../components";

import "./LoginPage.css";

function LoginPage() {
    return (
        <div className="form-page-container">
            <div className="form-page-inner-container">
                <h1>MedChat</h1>
                <LoginForm />
            </div>
        </div>
    )
}

export default LoginPage;