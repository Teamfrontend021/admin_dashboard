import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./Default_Screen/Dashboard";
import Form_elements from "./components/Form_elements";
import User_interaction from "./components/User_interaction";
import Investment from "./components/Investment";
import Marketing from "./components/Marketing";
import NewsAndBlog from "./components/BlogPosts";
import { Link } from "react-router-dom";
import { Login } from "./Login"; // Import Login component
import { SignUp } from "./SignUp"; // Import SignUp component
import "./App.css";

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<SignUp setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route
                    path="/*"
                    element={
                        isAuthenticated ? (
                            <Layout>
                                <Routes>
                                    <Route path="Dashboard" element={<Dashboard />} />
                                    <Route path="Form-elements" element={<Form_elements />} />
                                    <Route path="User-interaction" element={<User_interaction />} />
                                    <Route path="Investment" element={<Investment />} />
                                    <Route path="Marketing" element={<Marketing />} />
                                    <Route path="BlogPosts" element={<BlogPosts />} />
                                    <Route path="*" element={<Navigate to="/Dashboard" />} />
                                </Routes>
                            </Layout>
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
            </Routes>
        </Router>
    );
}
