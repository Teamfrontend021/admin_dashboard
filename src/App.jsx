import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./Default_Screen/Dashboard";
import Form_elements1 from "./components/screens/Form_elements1";
import Form_elements2 from "./components/screens/Form_elements2";
import User_interaction from "./components/screens/User_interaction";
import Investment from "./components/screens/Investment";
import Marketing from "./components/screens/Marketing";
import BlogPosts from "./components/screens/BlogPosts";
import { Login } from "./Login"; // Ensure correct path
import { SignUp } from "./SignUp"; // Ensure correct path
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
        {/* Public Routes */}
        <Route path="/signup" element={<SignUp setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

        {/* Protected Routes */}
        <Route element={isAuthenticated ? <Layout /> : <Navigate to="/login" />} >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/form-elements1" element={<Form_elements1 />} />
            <Route path="/form-elements2" element={<Form_elements2 />} />
            <Route path="/user-interaction" element={<User_interaction />} />
            <Route path="/investment" element={<Investment />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/news-and-blog" element={<BlogPosts />} />
        </Route>

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
</Router>
    );
}
