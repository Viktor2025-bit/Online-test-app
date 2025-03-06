import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Dashboard as DashboardIcon, 
    MenuBook, 
    Assessment, 
    ExitToApp 
} from "@mui/icons-material";
import "./Dashboard.css";
import { MdOutlineIntegrationInstructions } from "react-icons/md";
import { FaRegNoteSticky } from "react-icons/fa6";

const Dashboard = () => {
    const navigate = useNavigate();
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    return (
        <div className="dashboard-container">
            {/* Sidebar Navigation */}
            <aside className="sidebar">
                <h2><DashboardIcon /> Dashboard</h2>
                <ul>
                    <li onClick={() => navigate("/home")}><MenuBook /> Home</li>
                    <li onClick={() => navigate("/results")}><Assessment /> Results</li>
                    <li onClick={() => navigate("/TestPage")}><FaRegNoteSticky /> Test</li>
                    <li onClick={() => navigate("/TestInstructions")}><MdOutlineIntegrationInstructions />Instructions</li>
                    <li onClick={() => navigate("/logout")}><ExitToApp /> Logout</li>

                </ul>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <h1>Welcome to Your Dashboard</h1>
                <p>Please select a test from the Test section to begin.</p>
                <div className="test-list">
                    {tests.map((test) => (
                        <div key={test.id} className="test-card">
                            <MenuBook className="icon" />
                            <h3>{test.name}</h3>
                            <button onClick={() => navigate(`/start-test/${test.id}`)}>Start Test</button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;

