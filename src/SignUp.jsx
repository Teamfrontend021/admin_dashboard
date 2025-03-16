import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./App.css"; // Ensure this file contains styles matching your design
import finance_graph from "./finance-graph.svg";

export function SignUp({ setIsAuthenticated }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
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
                <h1>Create Your Account</h1>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

                    <button type="submit">Register Now</button>
                </form>

                <div className="google-signup">
                    <button className="google-button">
                        Sign-Up with Google
                    </button>
                </div>

                <p>Already have an account? <Link to="/login">Sign in</Link></p>
            </div>
        </div>
    );
}
