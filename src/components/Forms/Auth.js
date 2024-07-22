import apiClient from "../../Services/ApiClient/apiClient.mjs";
import { useState } from "react";

import {useFormInput} from "../../hooks/useFormInput";

import './Auth.css';

import { useNavigate, Link } from "react-router-dom";

import { sendTokenToServer } from "../../Services/Google/firebase.mjs"

export function Login() {
    const [isLoading, setLoading] = useState(false);
    const usernameInput = useFormInput('', isLoading);
    const passwordInput = useFormInput('', isLoading);
    const navigate = useNavigate();

    async function handleLoginClick() {
        setLoading(true);
        const isLogged = await apiClient.login({username: usernameInput.value, password: passwordInput.value});

        if (isLogged) {
            usernameInput.clear();
            passwordInput.clear();
            
            await sendTokenToServer();
            navigate("/channels/my");
        }
        setLoading(false);
    }

    return (
        <div className="auth container columns center">
            <h1 className="title">Iniciar sesión</h1>
            <input placeholder="Username" {...usernameInput} />
            <input placeholder="Password" type="password" {...passwordInput} />
            <button className="accept_btn" disabled={isLoading} onClick={handleLoginClick}>Iniciar sesión</button>
            <Link to={"/register"}>Registrarse</Link>
            {isLoading && <p className="loading_text">Loading...</p>}
        </div>
    );
}

export function Register() {
    const [isLoading, setLoading] = useState(false);
    const usernameInput = useFormInput('', isLoading);
    const passwordInput = useFormInput('', isLoading);
    const confirmPasswordInput = useFormInput('', isLoading);
    const navigate = useNavigate();

    async function handleClick() {
        setLoading(true);
        
        const registerPayload = {
            username: usernameInput.value,
            password: passwordInput.value,
            repeat_password: confirmPasswordInput.value
        };
        const isLogged = await apiClient.register(registerPayload);
        
        if (isLogged) {
            usernameInput.clear();
            passwordInput.clear();
            confirmPasswordInput.clear();

            await sendTokenToServer();
            navigate("/channels/my");
        }
        setLoading(false);
    }

    return (
        <div className="auth container columns center">
            <h1 className="title">Registrarse</h1>
            <input id="r_username" placeholder="Username" {...usernameInput} />
            <input id="r_password" placeholder="Password" type="password" {...passwordInput} />
            <input id="r_password2" placeholder="Confirm Password" type="password" {...confirmPasswordInput} />
            <button className="accept_btn" disabled={isLoading} onClick={handleClick}>Registrarse</button>
            <Link to={"/login"}>Iniciar sesión</Link>
            {isLoading && <p className="loading_text">Loading...</p>}
        </div>
    );
}


export function Logout() {
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleClick() {
        setLoading(true);
        const loggedOut = await apiClient.logout();

        if (loggedOut) {
            navigate("/login");
        }
        setLoading(false);
    }

    return (
        <div className="auth container columns center">
            <h1 className="title">Cerrar sesión</h1>
            <span className="title">Seguro?</span>
            <button className="accept_btn" disabled={isLoading} onClick={handleClick}>Cerrar sesión</button>
            {isLoading && <p className="loading_text">Loading...</p>}
        </div>
    );
}
