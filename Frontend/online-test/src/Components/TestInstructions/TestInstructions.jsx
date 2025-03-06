import React from 'react'
import { useNavigate } from "react-router-dom"
import "./TestInstructions.css"

const TestInstructions = () => {
    const navigate = useNavigate()

    const startTest = () => {
        navigate("/TestPage")
    }
  return (
    <div className='instructions-container'>
        <h2>Test Instructions</h2>
        <div className='instructions'>
            <ul>
                <li>The test consists of multiple-choice questions</li>
                <li>You have 60 minuites to complete the test.</li>
                <li>Each question has four options with only one correct answers.</li>
                <li>The test will auto-submit when the time runs out</li>
                <li>Ensure a stable internet connection to avoid disconnection issues.</li>
                <li>Do not refresh the page during the test, or you may lose progress</li>
            </ul>

            <button className='start-test-btn' onClick={startTest}>Start Test</button>

        </div>

    </div>
  )
}

export default TestInstructions