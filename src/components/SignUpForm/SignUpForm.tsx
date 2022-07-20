import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { BASE_URL } from "../../config/config";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { setLogginStatus } from "../../store/authSlice";

import "./SignUpForm.css"

interface SignUpFormError {
    username: null | string,
    password: null | string,
    other: null | Array<string>
}


function SignUpForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<SignUpFormError>({
        username: null,
        password: null,
        other: null
    });
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value);
    }

    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }

    function handleSubmint(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let invalidForm = false;
        let currentError: SignUpFormError = {
            username: null,
            password: null,
            other: null
        };
        if (!username) {
            currentError.username = "Username can't be empty!";
            invalidForm = true;
        }
        if (!password) {
            currentError.password = "Password can't be empty!";
            invalidForm = true;
        }
        if (invalidForm) {
            setError(currentError);
            return;
        }

        axios({
            method: 'post',
            url: `${BASE_URL}/auth/signup`,
            withCredentials: true,
            data: { username, password}
        }).then(response => {
            dispatch(setLogginStatus(true));
            navigate("/dashboard/");
        }).catch(error => {
            setError(error.response.data);
            dispatch(setLogginStatus(false));
        })
    }

    return (
        <form className="signup-form" onSubmit={handleSubmint}>
            <div className="signup-form-group">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" autoComplete="off"
                    value={username}
                    onChange={handleUsernameChange}/>
                {error.username && <div className="signup-form-error">{error.username}</div>}
            </div>
            <div className="signup-form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" autoComplete="off"
                    value={password}
                    onChange={handlePasswordChange}/>
                {error.password && <div className="signup-form-error">{error.password}</div>}
            </div>
            {error.other && (
            <div className="signup-form-group">
                {error.other.map((err, index) => (
                    <div key={index} className="signup-form-error">{err}</div>
                ))}
            </div>)}
            <div className="signup-btn-container">
                <button className="btn signup-btn">SignUp</button>
            </div>
        </form>
    );
}

export default SignUpForm;