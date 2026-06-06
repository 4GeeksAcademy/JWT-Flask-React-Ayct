import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { dispatch } = useGlobalReducer();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const data = await resp.json();
        if (resp.ok) {
            sessionStorage.setItem("token", data.token);
            dispatch({ type: "set_token", payload: data.token });
            navigate("/private");
        } else {
            alert(data.msg);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container mt-5">
            <h1>Login</h1>
            <input className="form-control mb-2" onChange={(e) => setEmail(e.target.value)} placeholder="email" />
            <input className="form-control mb-2" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" />
            <button className="btn btn-primary">Login</button>
        </form>
    );
};