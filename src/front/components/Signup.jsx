import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await resp.json();

    alert(data.msg);
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5">

      <h1>Signup</h1>

      <input className="form-control mb-2" onChange={(e) => setEmail(e.target.value)} placeholder="email" />
      <input className="form-control mb-2" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" />

      <button className="btn btn-primary">Register</button>

    </form>
  );
};