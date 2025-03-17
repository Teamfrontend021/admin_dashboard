import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./App.css"; 
import finance_graph from "./finance-graph.svg";

export function Login({ setIsAuthenticated }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error);

            localStorage.setItem("token", data.token);
            setIsAuthenticated(true);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-left">
                <h2>Welcome to <span className="brand-name">NEXVEST</span></h2>
                <p>Your Next Big Investment Starts Here.</p>
                <img src={finance_graph} alt="Finance Graph" className="finance-graph" />
            </div>

            <div className="auth-right">
                <h1>Login</h1>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    
                    <button type="submit">Login</button>
                </form>

                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>

            </div>
        </div>
    );
}
