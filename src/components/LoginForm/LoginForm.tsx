import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { BASE_URL } from "../../config/config";
import { checkAuth, selectLogginStatus, setLogginStatus } from "../../store/authSlice";
import { AppDispatch, RootState } from "../../store/store";

import "./LoginForm.css"

interface LogginFormError {
    username: null | string,
    password: null | string,
    other: null | Array<string>
}


function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<LogginFormError>({
        username: null,
        password: null,
        other: null
    });
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const isLogged = useSelector<RootState>(selectLogginStatus);


    useEffect(() => {
        dispatch(checkAuth());
    }, []);

    useEffect(() => {
        if (isLogged) {
            navigate("/dashboard/");
        }
    }, [isLogged]);

    function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value);
    }

    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }

    function handleSubmint(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let invalidForm = false;
        let currentError: LogginFormError = {
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

        axios.post(`${BASE_URL}/auth/login`, {
            username, password
        }).then((response: any) => {
            dispatch(setLogginStatus(true));
            navigate("/dashboard");
        }).catch((error: any) => {
            setError(error.response.data);
            dispatch(setLogginStatus(false));
        })
    }

    return (
        <form className="login-form" onSubmit={handleSubmint}>
            <div className="login-form-group">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" autoComplete="off"
                    value={username}
                    onChange={handleUsernameChange}/>
                {error.username && <div className="login-form-error">{error.username}</div>}
            </div>
            <div className="login-form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" autoComplete="off"
                    value={password}
                    onChange={handlePasswordChange}/>
                {error.password && <div className="login-form-error">{error.password}</div>}
            </div>
            {error.other && (
            <div className="login-form-group">
                {error.other.map((err, index) => (
                    <div key={index} className="signup-form-error">{err}</div>
                ))}
            </div>)}
            <div className="login-btn-container">
                <button className="btn login-btn">Login</button>
            </div>
        </form>
    );
}

export default LoginForm;