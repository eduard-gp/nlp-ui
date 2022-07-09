import { SignUpForm } from "../../components";

function SignUpPage() {
    return (
        <div>
            <div className="form-page-container">
                <div className="form-page-inner-container">
                    <h1>MedChat</h1>
                    <SignUpForm />
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;