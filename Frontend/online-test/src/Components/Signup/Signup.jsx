import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post("http://localhost:5000/api/auth/signup", {
                name,
                email,
                password,
            });

            if (response.status === 201) {
                navigate("/login");
            } else {
                setError(response.data.message || "Signup failed");
            }
        } catch (error) {
            setError(error.response?.data?.message || "An error occurred");
        }

        setLoading(false);
        setName("");
        setEmail("");
        setPassword("");
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>Full Name:</label>
                <input
                    type="text"
                    placeholder="Enter full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label>Email:</label>
                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Password:</label>
                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Signing Up..." : "Sign Up"}
                </button>
            </form>
            <p>Already have an account? <a href="/login">Login</a></p>
        </div>
    );
};

export default Signup;
