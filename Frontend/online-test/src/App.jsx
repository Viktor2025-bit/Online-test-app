import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'
import Dashboard from './Components/Dashboard/Dashboard'
import TestPage from './Components/TestPage/TestPage'
import TestInstructions from './Components/TestInstructions/TestInstructions'
const App = () => {
  return (
    <div>

        <Router>
            <Routes>
                <Route path='/Home' element={<Home/>}/>
                <Route path='/Login' element={<Login/>}/>
                <Route path='/Signup' element={<Signup/>}/>
                <Route path='/Dashboard' element={<Dashboard/>}/>
                <Route path='/TestPage' element={<TestPage/>}/>
                <Route path='/TestInstructions' element={<TestInstructions/>}/>
            </Routes>
                
        </Router>

    </div>
  )
}

export default App